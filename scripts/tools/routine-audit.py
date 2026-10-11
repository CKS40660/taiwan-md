#!/usr/bin/env python3
"""
routine-audit.py — Cross-routine commit audit + pattern detection (data-gathering layer).

Reads git log for a date range and outputs structured JSON ready for the SKILL
layer's analysis. Categorizes commits by routine signature, detects collisions
(overlapping spans), heal commits, and surfaces LESSONS-INBOX verification_count
accumulation per topic signature.

Usage:
    python3 scripts/tools/routine-audit.py --since=2026-05-10 --until=2026-05-16
    python3 scripts/tools/routine-audit.py --last-week    # last 7 days
    python3 scripts/tools/routine-audit.py --today

Design philosophy: script is data-gathering only. Pattern detection + insight
narrative is the SKILL (LLM) layer's job. Per ROUTINE-AUDIT-PIPELINE.md.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import defaultdict
from datetime import datetime, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent

# Routine signatures (extracted from git commit subjects)
# 2026-07-11 dna-checkup：list 是 2026-05-16 freeze frame，ROUTINE.md SSOT 長新 routine +
# commit subject 簡稱化（refresh: / rewrite:）讓 12-17% commit 落 unclassified（LESSONS
# routine-audit-script-classification-gap vc=2「飛輪自審腳本不能自己看到自己」）。
# 架構解：具名 pattern 之外加動態 fallback——任何 `[routine] X:` 都以 X 歸類，
# 新 routine / 新簡稱自動被看見，不再依賴這張表跟上 SSOT。
ROUTINE_PATTERNS = [
    ("twmd-rewrite-daily", r"\[routine\] (twmd-)?rewrite(-daily)?:"),
    ("twmd-babel-nightly", r"\[routine\] (twmd-)?babel"),
    ("twmd-data-refresh-am", r"\[routine\] (twmd-)?(data-)?refresh-am"),
    ("twmd-data-refresh-pm", r"\[routine\] (twmd-)?(data-)?refresh-pm"),
    ("twmd-data-refresh", r"\[routine\] (data-)?refresh:"),
    ("twmd-spore-harvest-am", r"\[routine\] (twmd-)?spore-harvest"),
    ("twmd-spore-pick-daily", r"\[routine\] (twmd-)?spore-(pick|inbox)"),
    ("twmd-maintainer-am", r"\[routine\].*maintainer.*(am|daily|0900)"),
    ("twmd-maintainer-pm", r"\[routine\].*maintainer.*(pm|2200|2235)"),
    ("twmd-feedback-triage", r"\[routine\] (twmd-)?feedback-triage"),
    ("twmd-embeddings-nightly", r"\[routine\] (twmd-)?embeddings"),
    ("twmd-news-lens-weekly", r"\[routine\] (twmd-)?news-lens"),
    ("twmd-weekly-report-sun", r"\[routine\] (twmd-)?weekly-report"),
    ("twmd-distill-weekly", r"\[routine\] (twmd-)?distill"),
    ("twmd-self-evolve-weekly", r"\[routine\] (twmd-)?self-evolve"),
    ("twmd-routine-audit-weekly", r"\[routine\] (twmd-)?routine-audit"),
    ("routine-memory", r"\[routine\] memory:"),
    ("routine-diary", r"\[routine\] diary:"),
    ("routine-heal", r"\[routine\] heal:"),
    ("routine-evolve", r"\[routine\] evolve:"),
]

# 動態 fallback：具名 pattern 全 miss 但 subject 是 `[routine] X:` 形 → 以 X 歸類
ROUTINE_FALLBACK_RE = re.compile(r"\[routine\] ([a-z0-9-]+):")

# memory commit 的 routine 名就寫在 subject 裡（MEMORY-PIPELINE canonical schema：
# `[routine] memory: {routine-name} @ {timestamp} — ...`），比具名 pattern 表可靠——
# 具名 pattern 有無 `.*` wildcard 不一致，讓部分 routine 的 memory commit 落進通用
# `routine-memory` 桶，跟自己的 action commit 拆進不同桶（LESSONS
# routine-audit-classifier-memory-commit-misattribution，vc=3：twmd-routine-sync /
# twmd-weekly-report-sun / twmd-data-refresh-am 等具名 pattern 缺 memory 變體）。
# 直接從 subject 解析比補齊每個具名 pattern 的 memory 變體更不會再漂移。
MEMORY_ROUTINE_RE = re.compile(r"\[routine\] memory: (\S+) @")

# 2026-09-20 routine-audit：origin 側的排程 session（commander-macbook 的 semiont-heartbeat、
# 週日鏈 distill / self-evolve / weekly-report）收官 memory 用的是 `[semiont] memory: {name} @`
# 同一套 schema，只差前綴——上一版只認 `[routine]`，這些全落 manual-memory。
SEMIONT_MEMORY_ROUTINE_RE = re.compile(r"\[semiont\] memory: ([A-Za-z0-9_-]+) @")

# babel 統一調度器是 launchd 常駐服務（OBSERVER-QUEUE #70），commit subject 固定
# `🧬 [semiont] babel: {lang} 批次 N 篇（unified dispatcher, worker=…）`，不帶 [routine]。
# 09-13 審計量到它占當週 71% commit 卻全落 manual-other，collision 偵測因此看不見它；
# 09-20 再量是 60%。這裡把它當一條 routine 看（category=routine），不改 [routine] 前綴的語意。
BABEL_DISPATCHER_RE = re.compile(r"\[semiont\] babel: ")
HEARTBEAT_RE = re.compile(r"\[semiont\] heartbeat: ")

SEMIONT_PATTERN = r"\[semiont\]"
PR_SQUASH_PATTERN = r"\(#\d+\)$"


def run_git(args: list[str]) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=REPO,
        capture_output=True,
        text=True,
        check=False,
        errors="replace",
    )
    return result.stdout


def classify_commit(subject: str) -> dict:
    """Map a git commit subject to a category."""
    mem = MEMORY_ROUTINE_RE.search(subject) or SEMIONT_MEMORY_ROUTINE_RE.search(subject)
    if mem:
        return {"category": "routine", "routine": mem.group(1)}
    if BABEL_DISPATCHER_RE.search(subject):
        return {"category": "routine", "routine": "babel-dispatcher"}
    if HEARTBEAT_RE.search(subject):
        return {"category": "routine", "routine": "semiont-heartbeat"}
    for name, pattern in ROUTINE_PATTERNS:
        if re.search(pattern, subject):
            return {"category": "routine", "routine": name}
    fb = ROUTINE_FALLBACK_RE.search(subject)
    if fb:
        name = fb.group(1)
        prefixed = name if name.startswith(("twmd-", "routine-")) else f"routine-{name}"
        return {"category": "routine", "routine": prefixed}
    if re.search(SEMIONT_PATTERN, subject):
        if "memory:" in subject:
            return {"category": "semiont", "routine": "manual-memory"}
        if "diary:" in subject:
            return {"category": "semiont", "routine": "manual-diary"}
        if "evolve:" in subject:
            return {"category": "semiont", "routine": "manual-evolve"}
        if "twmd-rewrite:" in subject or "] rewrite:" in subject:
            return {"category": "semiont", "routine": "manual-rewrite"}
        if "] merge:" in subject:
            return {"category": "semiont", "routine": "manual-merge"}
        if "ARTICLE-INBOX" in subject:
            return {"category": "semiont", "routine": "manual-inbox"}
        if "report:" in subject:
            return {"category": "semiont", "routine": "manual-report"}
        return {"category": "semiont", "routine": "manual-other"}
    if re.search(PR_SQUASH_PATTERN, subject):
        return {"category": "pr-squash", "routine": "external-pr"}
    return {"category": "other", "routine": "unclassified"}


def collect_commits(since: str, until: str) -> list[dict]:
    """Get commits in date range with full metadata."""
    log = run_git(
        [
            "log",
            f"--since={since}",
            f"--until={until}",
            "--reverse",
            "--pretty=format:%H%x00%h%x00%ai%x00%s",
        ]
    )
    commits = []
    for line in log.strip().split("\n"):
        if not line:
            continue
        parts = line.split("\0")
        if len(parts) != 4:
            continue
        full_hash, short_hash, iso_date, subject = parts

        # Get diff stat (files + insertions + deletions)
        stat = run_git(["show", "--stat", "--pretty=format:", full_hash]).strip()
        last_line = stat.split("\n")[-1] if stat else ""
        files = ins = dels = 0
        if "file" in last_line:
            m = re.search(r"(\d+) files? changed", last_line)
            files = int(m.group(1)) if m else 0
            m = re.search(r"(\d+) insertion", last_line)
            ins = int(m.group(1)) if m else 0
            m = re.search(r"(\d+) deletion", last_line)
            dels = int(m.group(1)) if m else 0

        classification = classify_commit(subject)
        commits.append(
            {
                "hash": short_hash,
                "full_hash": full_hash,
                "date": iso_date,
                "subject": subject,
                "files": files,
                "insertions": ins,
                "deletions": dels,
                **classification,
            }
        )
    return commits


# 2026-10-11 routine-audit：commit 訊息 06-28 起改寫中文人話，只認英文 "rescue" 的偵測器
# 從 09-13 起連四週讀 0（審計 P2→P1 自己帶了三週）。補中文救援字樣，並加 merge-cluster：
# 同一小時兩筆以上非 PR 的 merge（"Merge remote-tracking branch" / "Merge branch"）＝
# 平行 actor 在搶同一條 main。佇列撞號那一型已由 observer-queue-lint 在 pre-commit 擋（4cb858107）。
RESCUE_MARKERS = ("rescue", "打撈", "救回", "孤兒", "接手", "撈回")
NON_PR_MERGE = re.compile(r"^Merge (remote-tracking branch|branch) ")


def _ts(c: dict) -> datetime:
    return datetime.fromisoformat(c["date"].replace(" ", "T"))


def _is_rescue(subject: str) -> bool:
    s = subject.lower()
    return any(m in s for m in RESCUE_MARKERS)


def detect_merge_clusters(commits: list[dict], window_min: int = 60) -> list[dict]:
    merges = [c for c in commits if NON_PR_MERGE.match(c["subject"])]
    clusters, cur = [], []
    for m in merges:
        if cur and (_ts(m) - _ts(cur[0])).total_seconds() / 60 > window_min:
            if len(cur) >= 2:
                clusters.append(cur)
            cur = []
        cur.append(m)
    if len(cur) >= 2:
        clusters.append(cur)
    return [
        {
            "type": "merge-cluster",
            "first": cl[0]["hash"],
            "second": cl[-1]["hash"],
            "first_routine": cl[0]["routine"],
            "second_routine": cl[-1]["routine"],
            "gap_min": round((_ts(cl[-1]) - _ts(cl[0])).total_seconds() / 60, 1),
            "count": len(cl),
            "subjects": [c["subject"] for c in cl],
        }
        for cl in clusters
    ]


def detect_collisions(commits: list[dict]) -> list[dict]:
    """Surface adjacent commits where routine spans overlap (signal of collision)."""
    collisions = detect_merge_clusters(commits)
    seen_rescue: set[str] = set()
    for i, c in enumerate(commits):
        if c["category"] != "routine":
            continue
        # Check if next commit is by a different routine within 60 min
        for j in range(i + 1, min(i + 5, len(commits))):
            n = commits[j]
            if n["category"] != "routine" or n["routine"] == c["routine"]:
                continue
            t1 = datetime.fromisoformat(c["date"].replace(" ", "T"))
            t2 = datetime.fromisoformat(n["date"].replace(" ", "T"))
            gap_min = (t2 - t1).total_seconds() / 60
            if gap_min > 60:
                break
            # Same-window collision
            rescuer = n if _is_rescue(n["subject"]) else c if _is_rescue(c["subject"]) else None
            if rescuer and rescuer["hash"] not in seen_rescue:
                seen_rescue.add(rescuer["hash"])
                collisions.append(
                    {
                        "type": "rescue-pattern",
                        "first": c["hash"],
                        "second": n["hash"],
                        "first_routine": c["routine"],
                        "second_routine": n["routine"],
                        "gap_min": round(gap_min, 1),
                        "subjects": [c["subject"], n["subject"]],
                    }
                )
    return collisions


def find_heal_commits(commits: list[dict]) -> list[dict]:
    """Identify heal / fix commits."""
    heals = []
    for c in commits:
        s = c["subject"].lower()
        if "heal:" in s or "fix:" in s or " 字 heal" in c["subject"]:
            heals.append(
                {
                    "hash": c["hash"],
                    "date": c["date"],
                    "subject": c["subject"],
                    "category": c["category"],
                    "files": c["files"],
                }
            )
    return heals


def scan_memory_files(since_dt: datetime, until_dt: datetime) -> list[dict]:
    """List session memory files in date range."""
    memory_dir = REPO / "docs" / "semiont" / "memory"
    if not memory_dir.exists():
        return []
    entries = []
    for f in sorted(memory_dir.glob("*.md")):
        # Filename pattern: 2026-05-16-HHMMSS-{handle}.md
        m = re.match(r"^(\d{4}-\d{2}-\d{2})", f.name)
        if not m:
            continue
        try:
            d = datetime.strptime(m.group(1), "%Y-%m-%d")
        except ValueError:
            continue
        if since_dt.date() <= d.date() <= until_dt.date():
            entries.append({"path": str(f.relative_to(REPO)), "name": f.name})
    return entries


def scan_diary_files(since_dt: datetime, until_dt: datetime) -> list[dict]:
    """List session diary files in date range."""
    diary_dir = REPO / "docs" / "semiont" / "diary"
    if not diary_dir.exists():
        return []
    entries = []
    for f in sorted(diary_dir.glob("*.md")):
        m = re.match(r"^(\d{4}-\d{2}-\d{2})", f.name)
        if not m:
            continue
        try:
            d = datetime.strptime(m.group(1), "%Y-%m-%d")
        except ValueError:
            continue
        if since_dt.date() <= d.date() <= until_dt.date():
            entries.append({"path": str(f.relative_to(REPO)), "name": f.name})
    return entries


def summarize(commits: list[dict]) -> dict:
    """Per-routine + per-category counts + total file delta."""
    by_routine: dict = defaultdict(lambda: {"count": 0, "files": 0, "ins": 0, "dels": 0})
    by_category: dict = defaultdict(int)
    by_day: dict = defaultdict(int)
    total = {"count": 0, "files": 0, "ins": 0, "dels": 0}
    for c in commits:
        r = c["routine"]
        by_routine[r]["count"] += 1
        by_routine[r]["files"] += c["files"]
        by_routine[r]["ins"] += c["insertions"]
        by_routine[r]["dels"] += c["deletions"]
        by_category[c["category"]] += 1
        day = c["date"][:10]
        by_day[day] += 1
        total["count"] += 1
        total["files"] += c["files"]
        total["ins"] += c["insertions"]
        total["dels"] += c["deletions"]
    return {
        "total": total,
        "by_category": dict(by_category),
        "by_routine": {k: dict(v) for k, v in by_routine.items()},
        "by_day": dict(by_day),
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--since", help="ISO date (e.g. 2026-05-10) or relative (7.days.ago)")
    ap.add_argument("--until", help="ISO date (default: today)")
    ap.add_argument("--last-week", action="store_true", help="Last 7 days (default)")
    ap.add_argument("--today", action="store_true", help="Today only")
    ap.add_argument("--output", choices=["json", "human"], default="json")
    ap.add_argument("--out-file", help="Write JSON to file instead of stdout")
    args = ap.parse_args()

    today = datetime.now()
    if args.today:
        since_dt = today.replace(hour=0, minute=0, second=0, microsecond=0)
        until_dt = today
    elif args.since:
        since_dt = datetime.fromisoformat(args.since)
        until_dt = (
            datetime.fromisoformat(args.until)
            if args.until
            else today
        )
    else:
        # Default: last 7 days
        since_dt = today - timedelta(days=7)
        until_dt = today

    since_str = since_dt.strftime("%Y-%m-%d %H:%M:%S +0800")
    until_str = until_dt.strftime("%Y-%m-%d %H:%M:%S +0800")

    commits = collect_commits(since_str, until_str)
    collisions = detect_collisions(commits)
    heals = find_heal_commits(commits)
    memory_files = scan_memory_files(since_dt, until_dt)
    diary_files = scan_diary_files(since_dt, until_dt)
    summary = summarize(commits)

    result = {
        "window": {"since": since_str, "until": until_str},
        "summary": summary,
        "commits": commits,
        "collisions": collisions,
        "heals": heals,
        "memory_files": memory_files,
        "diary_files": diary_files,
    }

    output = json.dumps(result, ensure_ascii=False, indent=2)
    if args.out_file:
        Path(args.out_file).write_text(output)
        print(f"✅ Wrote {args.out_file} ({len(commits)} commits / {len(collisions)} collisions / {len(heals)} heals)", file=sys.stderr)
    elif args.output == "json":
        print(output)
    else:
        # Human-readable summary
        print(f"📊 Routine audit window: {since_str} → {until_str}")
        print(f"  Total commits: {summary['total']['count']}")
        print(f"  Files changed: {summary['total']['files']} / +{summary['total']['ins']} / -{summary['total']['dels']}")
        print(f"\n  By category:")
        for cat, cnt in sorted(summary["by_category"].items(), key=lambda x: -x[1]):
            print(f"    {cat:>15}: {cnt}")
        print(f"\n  By routine (top 10):")
        for r, s in sorted(summary["by_routine"].items(), key=lambda x: -x[1]["count"])[:10]:
            print(f"    {r:>25}: {s['count']} commits / {s['files']} files / +{s['ins']} -{s['dels']}")
        print(f"\n  Collisions: {len(collisions)}")
        for c in collisions:
            print(f"    {c['type']}: {c['first_routine']} ({c['first']}) ↔ {c['second_routine']} ({c['second']}) gap={c['gap_min']}min")
        print(f"\n  Heal commits: {len(heals)}")
        for h in heals:
            print(f"    {h['hash']} {h['date'][:16]}: {h['subject'][:80]}")
        print(f"\n  Memory files: {len(memory_files)}")
        print(f"  Diary files: {len(diary_files)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
