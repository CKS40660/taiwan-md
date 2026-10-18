#!/usr/bin/env python3
"""grader-v2 2026-10：第二版閱卷（總編預審單）的可重跑建置與計分腳本。

唯讀：不碰任何文章、流程或閘門。

子指令：
  extract   依 manifest.json 從 git（或 HEAD 檔案）取出每篇 → raw/，產出只留標題＋正文的 view/
  mutate    依 mutations.json 與本機私有的植錯文字（MUTATION_TEXT_DIR），產出植錯篇 → view/
            植錯文字不進 git，只把 sha256 寫回 mutations.json 對賬
  prompts   依 rubric.md 為每篇組出逐字提示詞，用中性檔名放進 PROMPT_DIR，
            對照表寫 dispatch-map.json（檔名不洩漏好壞、題組或是否植錯）
  score     讀 out/*.json，核對證據引句是否真的在文章裡，套 PREREGISTRATION §4 的判決規則，
            算各題組指標 → score.json

全部路徑相對於本檔所在資料夾。
"""
from __future__ import annotations

import hashlib
import json
import os
import random
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = Path(
    subprocess.run(["git", "-C", str(HERE), "rev-parse", "--show-toplevel"],
                   capture_output=True, text=True, check=True).stdout.strip()
)
SEED = 20261019
MODELS = ["fable", "sonnet"]
PROMPT_DIR = Path(os.environ.get("GRADER_V2_PROMPT_DIR", "/tmp/grader-v2-prompts"))
MUTATION_TEXT_DIR = Path(os.environ.get("GRADER_V2_MUTATION_DIR", "/tmp/grader-v2-mutations"))
ITEM_IDS = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "C1", "C2", "C3"]
TIER = {i: i[0] for i in ITEM_IDS}
VERDICT_ORDER = {"可出版": 3, "小修": 2, "重修": 1, "退件": 0}


def manifest() -> list[dict]:
    return json.loads((HERE / "manifest.json").read_text(encoding="utf-8"))["articles"]


def git_show(commit: str, path: str) -> bytes:
    return subprocess.run(["git", "-C", str(REPO), "show", f"{commit}:{path}"],
                          capture_output=True, check=True).stdout


def split_frontmatter(text: str) -> tuple[str | None, str]:
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---\n", 4)
    if end < 0:
        return None, text
    fm = text[4:end]
    m = re.search(r"^title:\s*(.+)$", fm, re.M)
    title = m.group(1).strip().strip("'\"") if m else None
    return title, text[end + 5:].lstrip("\n")


def view_of(raw: str) -> tuple[str, str]:
    """回傳（標題, 正文）。正文開頭若重複了 H1 標題就拿掉，標題另外給。"""
    title, body = split_frontmatter(raw)
    lines = body.split("\n")
    if lines and lines[0].startswith("# "):
        h1 = lines[0][2:].strip()
        title = title or h1
        body = "\n".join(lines[1:]).lstrip("\n")
    return title or "", body.rstrip("\n") + "\n"


def write_view(aid: str, title: str, body: str) -> None:
    (HERE / "view").mkdir(exist_ok=True)
    (HERE / "view" / f"{aid}.md").write_text(f"{title}\n\n{body}", encoding="utf-8")


def read_view(aid: str) -> tuple[str, str]:
    t = (HERE / "view" / f"{aid}.md").read_text(encoding="utf-8")
    title, _, body = t.partition("\n\n")
    return title, body


def cmd_extract() -> None:
    (HERE / "raw").mkdir(exist_ok=True)
    for a in manifest():
        if a["set"] == "mutant":
            continue
        data = git_show(a["commit"], a["path"])
        (HERE / "raw" / f"{a['id']}.md").write_bytes(data)
        title, body = view_of(data.decode("utf-8"))
        write_view(a["id"], title, body)
        print(f"extract {a['id']:<28} {a['commit']} {len(data):>7}B")


def cmd_mutate() -> None:
    spec = json.loads((HERE / "mutations.json").read_text(encoding="utf-8"))
    for m in spec["mutants"]:
        text = (MUTATION_TEXT_DIR / f"{m['id']}.txt").read_text(encoding="utf-8").strip()
        digest = hashlib.sha256(text.encode("utf-8")).hexdigest()
        if m.get("sha256") and m["sha256"] != digest:
            sys.exit(f"sha256 mismatch for {m['id']}")
        m["sha256"] = digest
        title, body = read_view(m["base"])
        op = m["op"]
        if op == "replace_title":
            title = text
        elif op == "insert_after":
            anchor = m["anchor"]
            if body.count(anchor) != 1:
                sys.exit(f"anchor not unique for {m['id']}: {body.count(anchor)}")
            i = body.index(anchor) + len(anchor)
            body = body[:i] + "\n\n" + text + body[i:]
        elif op == "replace":
            anchor = m["anchor"]
            if body.count(anchor) != 1:
                sys.exit(f"anchor not unique for {m['id']}: {body.count(anchor)}")
            body = body.replace(anchor, text, 1)
        else:
            sys.exit(f"unknown op {op}")
        write_view(m["id"], title, body)
        print(f"mutate {m['id']:<22} {op:<14} sha256={digest[:12]}")
    (HERE / "mutations.json").write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n",
                                         encoding="utf-8")


def all_article_ids() -> list[str]:
    ids = [a["id"] for a in manifest() if a["set"] != "mutant"]
    spec = json.loads((HERE / "mutations.json").read_text(encoding="utf-8"))
    return ids + [m["id"] for m in spec["mutants"]]


def cmd_prompts() -> None:
    tpl = (HERE / "rubric.md").read_text(encoding="utf-8").split("\n---\n", 1)[1].lstrip("\n")
    PROMPT_DIR.mkdir(parents=True, exist_ok=True)
    rng = random.Random(SEED)
    jobs = [(aid, model) for aid in all_article_ids() for model in MODELS]
    rng.shuffle(jobs)
    dmap = {}
    for n, (aid, model) in enumerate(jobs):
        token = f"r{n:03d}{rng.randrange(16**4):04x}"
        title, body = read_view(aid)
        (PROMPT_DIR / f"{token}.txt").write_text(
            tpl.replace("{TITLE}", title).replace("{TEXT}", body.rstrip("\n")), encoding="utf-8")
        dmap[token] = {"article": aid, "model": model}
    (HERE / "dispatch-map.json").write_text(json.dumps(dmap, ensure_ascii=False, indent=2) + "\n",
                                            encoding="utf-8")
    print(f"{len(dmap)} prompts → {PROMPT_DIR}")


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"\[\^\d+\]", "", s)
    s = re.sub(r"[\s*_`>#]", "", s)
    return s


def parse_out(path: Path) -> dict | None:
    t = path.read_text(encoding="utf-8").strip()
    m = re.search(r"\{.*\}", t, re.S)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError:
        return None


def judge(review: dict, article_text: str) -> dict:
    """核對引句、套判決規則。引句核不到的「有」降為「不確定」，不計入判決。"""
    full = norm(article_text)
    items = {it.get("id"): it for it in review.get("items", []) if isinstance(it, dict)}
    flags, quotes_total, quotes_ok = {}, 0, 0
    for iid in ITEM_IDS:
        it = items.get(iid, {})
        ans = it.get("answer")
        sev = it.get("severity")
        ev = [e for e in (it.get("evidence") or []) if isinstance(e, str) and e.strip()]
        ok = [e for e in ev if len(norm(e)) >= 4 and norm(e) in full]
        quotes_total += len(ev)
        quotes_ok += len(ok)
        verified = ans == "有" and bool(ok)
        flags[iid] = {"answer": ans, "severity": sev if verified else None,
                      "verified": verified, "evidence_ok": ok}
    a_heavy = sum(1 for i in ITEM_IDS if TIER[i] == "A" and flags[i]["verified"] and flags[i]["severity"] == "重")
    a_any = sum(1 for i in ITEM_IDS if TIER[i] == "A" and flags[i]["verified"] and flags[i]["severity"] in ("重", "中"))
    b_heavy = sum(1 for i in ITEM_IDS if TIER[i] == "B" and flags[i]["verified"] and flags[i]["severity"] == "重")
    b_any = sum(1 for i in ITEM_IDS if TIER[i] == "B" and flags[i]["verified"] and flags[i]["severity"] in ("重", "中"))
    c_any = sum(1 for i in ITEM_IDS if TIER[i] == "C" and flags[i]["verified"] and flags[i]["severity"] in ("重", "中"))
    if a_heavy >= 1:
        verdict = "退件"
    elif a_any >= 1 or b_heavy >= 1 or b_any >= 2:
        verdict = "重修"
    elif b_any == 1 or c_any >= 1:
        verdict = "小修"
    else:
        verdict = "可出版"
    return {"flags": flags, "verdict": verdict, "vector": [a_heavy, a_any, b_heavy, b_any, c_any],
            "quotes_total": quotes_total, "quotes_ok": quotes_ok}


def prefer(j1: dict, j2: dict) -> int:
    """1＝第一篇較好，2＝第二篇較好，0＝分不出。判決等級先比，再比旗標數（少者勝）。"""
    v1, v2 = VERDICT_ORDER[j1["verdict"]], VERDICT_ORDER[j2["verdict"]]
    if v1 != v2:
        return 1 if v1 > v2 else 2
    for x, y in zip(j1["vector"], j2["vector"]):
        if x != y:
            return 1 if x < y else 2
    return 0


def cmd_score() -> None:
    dmap = json.loads((HERE / "dispatch-map.json").read_text(encoding="utf-8"))
    arts = {a["id"]: a for a in manifest()}
    muts = {m["id"]: m for m in json.loads((HERE / "mutations.json").read_text(encoding="utf-8"))["mutants"]}
    texts = {aid: "\n".join(read_view(aid)) for aid in all_article_ids()}
    reviews: dict[tuple[str, str], dict] = {}
    missing, broken = [], []
    for token, d in dmap.items():
        p = HERE / "out" / f"{token}.json"
        if not p.exists():
            p = HERE / "out" / "mutant" / f"{token}.json"
        if not p.exists():
            missing.append(token)
            continue
        r = parse_out(p)
        if r is None:
            broken.append(token)
            continue
        reviews[(d["article"], d["model"])] = judge(r, texts[d["article"]])
    res: dict = {"missing": missing, "broken": broken, "by_model": {}}
    for model in MODELS:
        R = {aid: j for (aid, mo), j in reviews.items() if mo == model}
        out: dict = {}
        # 引句有效率
        qt = sum(j["quotes_total"] for j in R.values())
        qo = sum(j["quotes_ok"] for j in R.values())
        out["quote_validity"] = [qo, qt]
        # 開發題：成對
        dev = {}
        for pid in sorted({a["pair"] for a in arts.values() if a["set"] == "dev"}):
            bad = next(a["id"] for a in arts.values() if a.get("pair") == pid and a["side"] == "bad")
            good = next(a["id"] for a in arts.values() if a.get("pair") == pid and a["side"] == "good")
            if bad in R and good in R:
                w = prefer(R[good], R[bad])
                dev[pid] = {"result": {1: "選對", 2: "選錯", 0: "分不出"}[w],
                            "good": R[good]["verdict"], "bad": R[bad]["verdict"],
                            "bad_named_flagged": [i for i in arts[bad].get("concerns", []) if R[bad]["flags"][i]["verified"]]}
        out["dev_pairs"] = dev
        # 保留題：哲宇點名的問題有沒有被抓到
        held = {}
        for a in arts.values():
            if a["set"] == "heldout" and a["id"] in R:
                j = R[a["id"]]
                hit = [i for i in a["concerns"] if j["flags"][i]["verified"]]
                held[a["id"]] = {"named": a["concerns"], "hit": hit, "verdict": j["verdict"]}
            if a["set"] == "heldout_fixed" and a["id"] in R:
                held[a["id"]] = {"verdict": R[a["id"]]["verdict"], "vector": R[a["id"]]["vector"]}
        out["heldout"] = held
        # 對照組：哲宇稱讚過的文章
        ctrl = {}
        for a in arts.values():
            if a["set"] == "control" and a["id"] in R:
                j = R[a["id"]]
                ctrl[a["id"]] = {"verdict": j["verdict"],
                                 "a_flags": [i for i in ITEM_IDS if TIER[i] == "A" and j["flags"][i]["verified"] and j["flags"][i]["severity"] in ("重", "中")]}
        out["controls"] = ctrl
        # 植錯題
        mut = {}
        for mid, m in muts.items():
            if mid in R:
                j = R[mid]
                inj = norm((MUTATION_TEXT_DIR / f"{mid}.txt").read_text(encoding="utf-8")) if (MUTATION_TEXT_DIR / f"{mid}.txt").exists() else ""
                f = j["flags"][m["target"]]
                overlap = any(len(norm(e)) >= 6 and norm(e) in inj or (inj and inj[:12] in norm(e)) for e in f["evidence_ok"])
                mut[mid] = {"target": m["target"], "flagged": f["verified"], "evidence_on_injection": overlap,
                            "detected": f["verified"] and overlap, "verdict": j["verdict"]}
        out["mutants"] = mut
        res["by_model"][model] = out
    (HERE / "score.json").write_text(json.dumps(res, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1)[:6000])


if __name__ == "__main__":
    {"extract": cmd_extract, "mutate": cmd_mutate, "prompts": cmd_prompts, "score": cmd_score}[sys.argv[1]]()
