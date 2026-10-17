#!/usr/bin/env python3
"""grader-pilot 2026-10：§8.0 閱卷小實驗的可重跑建置腳本（唯讀，不碰任何文章或流程）。

子指令：
  extract   依 manifest.json 從 git 取出每對兩版的原檔（逐位元組）→ raw/，
            並產出給冷讀分身看的 reader-view/（只留標題＋正文，去掉其他 frontmatter）
  assign    以固定種子替每位分身、每一對抽甲乙順序 → assignment.json
  prompts   依 reader-prompt-template.md 與 assignment.json 組出逐字提示詞 → prompts/
  baseline  只用 opening-readability 與 prose-health 的讀數替每對選邊 → baseline/
  collect   從分身的 JSONL 逐字稿抽出最後一則回覆 → readers/，同時數工具呼叫次數
  score     解析「最終選擇」行，對照 assignment 算選對 → score.json

全部路徑相對於本檔所在資料夾；repo 根由 git 推得。
"""
from __future__ import annotations

import json
import random
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = Path(
    subprocess.run(["git", "-C", str(HERE), "rev-parse", "--show-toplevel"],
                   capture_output=True, text=True, check=True).stdout.strip()
)
MANIFEST = HERE / "manifest.json"
SEED = 20261018
READERS = ["opus", "sonnet"]


def load_manifest() -> list[dict]:
    return json.loads(MANIFEST.read_text(encoding="utf-8"))["pairs"]


def git_show(commit: str, path: str) -> bytes:
    return subprocess.run(["git", "-C", str(REPO), "show", f"{commit}:{path}"],
                          capture_output=True, check=True).stdout


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return {}, text
    fm_raw = text[4:end]
    body = text[end + 5:]
    title = None
    for line in fm_raw.splitlines():
        m = re.match(r"^title:\s*(.+)$", line)
        if m:
            title = m.group(1).strip().strip("'\"")
            break
    return {"title": title}, body


def reader_view(raw: str, spec: dict) -> str:
    """標題＋正文。其他 frontmatter（日期、標籤、審核旗標、描述）全部拿掉，避免洩漏新舊。"""
    for prefix in spec.get("strip_leading_lines", []):
        if raw.startswith(prefix):
            raw = raw[len(prefix):].lstrip("\n")
    fm, body = split_frontmatter(raw)
    body = body.lstrip("\n")
    if fm.get("title") and not body.startswith("# "):
        return f"# {fm['title']}\n\n{body}"
    return body


def cmd_extract() -> None:
    (HERE / "raw").mkdir(exist_ok=True)
    (HERE / "reader-view").mkdir(exist_ok=True)
    for pair in load_manifest():
        for side in ("bad", "good"):
            spec = pair[side]
            if "commit" in spec:
                data = git_show(spec["commit"], spec["path"])
                src = f"{spec['commit']}:{spec['path']}"
            else:
                data = (REPO / spec["file"]).read_bytes()
                src = spec["file"]
            raw_path = HERE / "raw" / f"{pair['id']}-{side}.md"
            raw_path.write_bytes(data)
            view = reader_view(data.decode("utf-8"), spec)
            (HERE / "reader-view" / f"{pair['id']}-{side}.md").write_text(view, encoding="utf-8")
            print(f"{pair['id']:<12} {side:<4} {len(data):>7}B  view {len(view):>6}ch  ← {src}")


def cmd_assign() -> None:
    rng = random.Random(SEED)
    out = {"seed": SEED, "readers": {}}
    for reader in READERS:
        out["readers"][reader] = {}
        for pair in load_manifest():
            bad_is_jia = rng.random() < 0.5
            out["readers"][reader][pair["id"]] = {"甲": "bad" if bad_is_jia else "good",
                                                  "乙": "good" if bad_is_jia else "bad"}
    (HERE / "assignment.json").write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n",
                                          encoding="utf-8")
    print(json.dumps(out, ensure_ascii=False, indent=2))


def cmd_prompts() -> None:
    tpl_full = (HERE / "reader-prompt-template.md").read_text(encoding="utf-8")
    tpl = tpl_full.split("\n---\n", 1)[1].lstrip("\n")
    assign = json.loads((HERE / "assignment.json").read_text(encoding="utf-8"))
    (HERE / "prompts").mkdir(exist_ok=True)
    for reader, pairs in assign["readers"].items():
        for pid, m in pairs.items():
            jia = (HERE / "reader-view" / f"{pid}-{m['甲']}.md").read_text(encoding="utf-8").rstrip("\n")
            yi = (HERE / "reader-view" / f"{pid}-{m['乙']}.md").read_text(encoding="utf-8").rstrip("\n")
            prompt = tpl.replace("{TEXT_甲}", jia).replace("{TEXT_乙}", yi)
            (HERE / "prompts" / f"{reader}-{pid}.txt").write_text(prompt, encoding="utf-8")
            print(f"prompts/{reader}-{pid}.txt  {len(prompt)} chars")


def run_json(cmd: list[str]) -> dict:
    r = subprocess.run(cmd, capture_output=True, text=True, cwd=REPO)
    return json.loads(r.stdout)


def readings(path: Path) -> dict:
    orr = run_json([sys.executable, "scripts/tools/opening-readability.py", str(path), "--json"])
    if isinstance(orr, list):
        orr = orr[0]
    ph = run_json([sys.executable, "scripts/tools/article-health.py", str(path),
                   "--check=prose-health", "--output", "json"])
    rep = ph["reports"][0]
    score = None
    for res in rep["results"]:
        for v in res["violations"]:
            m = re.search(r"prose-health score: (\d+)", v.get("message") or "")
            if m:
                score = int(m.group(1))
    return {"opening_readability": orr, "prose_health": {"score": score, **rep["summary"]}}


def cmd_baseline() -> None:
    rule = json.loads((HERE / "baseline-rule.json").read_text(encoding="utf-8"))
    results = []
    for pair in load_manifest():
        r = {s: readings(HERE / "raw" / f"{pair['id']}-{s}.md") for s in ("bad", "good")}
        metrics = {}
        for s in ("bad", "good"):
            o = r[s]["opening_readability"]
            metrics[s] = {k: o[k] for k in rule["opening_keys"]}
            metrics[s]["prose_health_score"] = r[s]["prose_health"]["score"]
        votes = {"bad": 0, "good": 0}
        for k in rule["opening_keys"] + ["prose_health_score"]:
            a, b = metrics["bad"][k], metrics["good"][k]
            if a < b:
                votes["bad"] += 1
            elif b < a:
                votes["good"] += 1
        if votes["good"] != votes["bad"]:
            pick = "good" if votes["good"] > votes["bad"] else "bad"
            how = "majority"
        else:
            a, b = metrics["bad"]["prose_health_score"], metrics["good"]["prose_health_score"]
            pick = "good" if b < a else "bad" if a < b else "tie"
            how = "tiebreak:prose_health_score" if pick != "tie" else "tie"
        hit = 1.0 if pick == "good" else 0.5 if pick == "tie" else 0.0
        results.append({"id": pair["id"], "scored": pair["scored"], "metrics": metrics,
                        "votes": votes, "pick": pick, "how": how, "hit": hit, "raw": r})
    (HERE / "baseline" / "baseline.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for x in results:
        print(f"{x['id']:<12} scored={x['scored']!s:<5} votes={x['votes']} pick={x['pick']:<4} "
              f"({x['how']}) hit={x['hit']}  {x['metrics']}")
    tot = sum(x["hit"] for x in results if x["scored"])
    print(f"\n計分題機械基準線命中數：{tot} / {sum(1 for x in results if x['scored'])}")


SENTINEL = "=== END ==="


def parse_transcript(jsonl: Path) -> dict:
    """最後一輪的文字（最後一個 user 事件之後的所有 assistant text block 依序相接）、
    全部工具呼叫、工具結果裡有沒有出現結束標記、實際跑的模型。"""
    final_parts: list[str] = []
    tools: list[dict] = []
    sentinel_seen = False
    models: set[str] = set()
    for line in jsonl.read_text(encoding="utf-8").splitlines():
        try:
            ev = json.loads(line)
        except json.JSONDecodeError:
            continue
        msg = ev.get("message") if isinstance(ev, dict) else None
        if not isinstance(msg, dict):
            continue
        content = msg.get("content")
        if msg.get("role") == "user":
            final_parts = []
            if isinstance(content, list):
                for c in content:
                    if c.get("type") == "tool_result":
                        cc = c.get("content")
                        s = cc if isinstance(cc, str) else json.dumps(cc, ensure_ascii=False)
                        if SENTINEL in s:
                            sentinel_seen = True
            continue
        if msg.get("role") != "assistant":
            continue
        if msg.get("model"):
            models.add(msg["model"])
        if isinstance(content, list):
            for c in content:
                if c.get("type") == "text":
                    final_parts.append(c.get("text", ""))
                elif c.get("type") == "tool_use":
                    inp = c.get("input") or {}
                    tools.append({"name": c.get("name"),
                                  "target": inp.get("file_path") or inp.get("command") or inp.get("pattern")})
        elif isinstance(content, str):
            final_parts.append(content)
    return {"text": "".join(final_parts).strip(), "tools": tools,
            "sentinel_seen": sentinel_seen, "models": sorted(models)}


def cmd_collect(reader: str, pid: str, jsonl: str, expected_path: str) -> None:
    r = parse_transcript(Path(jsonl))
    text = r["text"]
    out = HERE / "readers" / f"{reader}-{pid}.md"
    out.write_text(text + "\n", encoding="utf-8")
    clean = all(t["name"] == "Read" and t["target"] == expected_path for t in r["tools"])
    rec = {"reader": reader, "pair": pid, "chars": len(text), "models": r["models"],
           "tool_calls": len(r["tools"]), "only_read_own_prompt": clean,
           "read_to_end_sentinel": r["sentinel_seen"], "transcript": Path(jsonl).name}
    if not clean:
        rec["tools"] = r["tools"]
    with (HERE / "readers" / "collect-log.jsonl").open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")
    print(json.dumps(rec, ensure_ascii=False))


def cmd_score() -> None:
    assign = json.loads((HERE / "assignment.json").read_text(encoding="utf-8"))
    pairs = {p["id"]: p for p in load_manifest()}
    rows = []
    for reader, m in assign["readers"].items():
        for pid, lab in m.items():
            f = HERE / "readers" / f"{reader}-{pid}.md"
            if not f.exists():
                continue
            finals = re.findall(r"最終選擇[:：]\s*(甲|乙)", f.read_text(encoding="utf-8"))
            choice = finals[-1] if len(set(finals)) == 1 else None
            side = lab[choice] if choice else None
            rows.append({"reader": reader, "pair": pid, "scored": pairs[pid]["scored"],
                         "choice": choice, "picked": side, "correct": side == "good"})
    (HERE / "score.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n",
                                     encoding="utf-8")
    for r in rows:
        print(r)
    for reader in READERS:
        n = sum(1 for r in rows if r["reader"] == reader and r["scored"] and r["correct"])
        t = sum(1 for r in rows if r["reader"] == reader and r["scored"])
        print(f"{reader}: 計分題選對 {n}/{t}")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "extract":
        cmd_extract()
    elif cmd == "assign":
        cmd_assign()
    elif cmd == "prompts":
        cmd_prompts()
    elif cmd == "baseline":
        cmd_baseline()
    elif cmd == "collect":
        cmd_collect(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
    elif cmd == "score":
        cmd_score()
    else:
        print(__doc__)
        sys.exit(1)
