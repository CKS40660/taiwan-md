#!/usr/bin/env python3
"""cjk-body-simplified-check.py — ko/ja 譯文「正文」的簡體字形殘留檢查（唯讀）。

## 為什麼需要這一支

既有三支漢字檢查器對 ko/ja 的正文簡體字形都是結構性盲的，而且每一支的盲都是
刻意設計的結果，不是 bug：

| 檢查器                   | 對 ko/ja 做什麼                                           |
| ------------------------ | --------------------------------------------------------- |
| `cjk-residue-check.py`   | **按設計不掃**（`TARGET_LANGS` 不含 ja/ko——韓日混寫漢字合法） |
| `cjk-adjacency-check.py` | 判準是「漢字黏著拉丁字母」，ko/ja 正文沒有這個形狀          |
| `cjk-leak-check.py`      | ja/ko 分支正文只掃 `ZH_ONLY_MARKERS`（的／了 這類功能詞）；   |
|                          | `detect_simplified_residue()` **只餵書目區** `bib_raw`      |

交集空出來的那一格是：**ko/ja 正文裡的簡體字形**。它看不見的原因很具體——
`发起`／`某种`／`收录` 是兩字片段，不是功能詞、不夠四連、沒黏拉丁字母。

## 病史（三個獨立證據點，都不是儀器發現的）

- **2026-10-14** `twmd-maintainer-daily`：一篇韓文罷免條目合併前有 **161 處簡體
  「罢免」**、13 處「逐字」、6 處「清查」。當天的紀錄寫得很清楚：「我們自己的
  `cjk-residue-check` 對兩個版本都回報 166 行裸 CJK——它數『有沒有漢字』，數不出
  『這些漢字是哪一邊的字形』，所以這個洞不是儀器發現的。」抓到的是投稿者 tboydar。
- **2026-10-20** `twmd-babel-nightly`：通過全部 19 項檢查的譯文仍帶簡體片段，手修
  七檔，存量進 OBSERVER-QUEUE #111（但 #111 的修法只涵蓋**拉丁字母語言**的
  `cjk-adjacency-check`，明寫「ja／ko 照設計不掃」，所以 ko/ja 這格仍然沒人守）。
- **2026-10-20** PR #1875：投稿者 dreamline2 手修韓文〈數位荒原〉，15 行裡一半是
  簡體字形（`发起`／`某种`／`收录`／`延伸阅读`）。`cjk-leak-check` 只抓到書目區那
  一處（`双语`，四連漢字），正文那些它全部放行。

三次都由人眼接住，而第三次（本檔誕生）是同一週的第三次。

## 判準怎麼來的（刻意不自己定義字集）

`SIMPLIFIED_ONLY_CHARS` 與 `JA_SHINJITAI_OVERLAP` 直接 import
`cjk-leak-check.py`，**不複寫**——那份字集已對 939 篇中文語料校準兩輪，且
`scripts/tools/lib/tw-variant-chars.mjs` 的白名單邏輯（台灣標準本來就採用的
「簡體長相」字：占／岩／斗／杰／双⋯）就是為了不要誤改台灣人的名字而存在。
本檔唯一的改動是**掃哪一段**：從書目區換成書目區之前的正文。

同理，合法區剝除（引號引述／《》作品名／markdown 連結／HTML／裸 URL）與
「跟 zh 原稿逐字相同的漢字串放行」（照抄出處標題是對的，不是竄改）兩道豁免
也都沿用 `cjk-leak-check` 的既有實作，不另立一套。

ja 另外扣掉 `JA_SHINJITAI_OVERLAP`（国／学／尽／画／誉 是日文新字體，合法）。

## ⚠️ 這支印的是**下限**，不是總數

兩個已知的不完整，都不影響既有命中的真實性（抽 14 處、14 處都是真漏譯），但會讓
總數偏低，讀的人不要把它當全貌：

1. **`SIMPLIFIED_ONLY_CHARS` 是手工字集，不是完整簡繁對應表**。實測
   `种`／`价`／`军`／`总`／`单`／`医`／`区`／`历`／`叶`／`号`／`样`／`变` 這些常見
   簡體專用字都不在裡面。所以 ko 的真實數字比本支印的高，高多少沒量。
2. **ja 那一側沒辦法沿用同一招擴充**。`JA_SHINJITAI_OVERLAP` 只有五個字
   （国学尽画誉），它當初只需要覆蓋 `SIMPLIFIED_ONLY_CHARS` 跟日文新字體的交集，
   不是一份通用的日文合法字白名單。2026-10-20 本檔誕生時試過拿一組常見簡體字當
   探針擴充，ja 立刻回 1,144 檔 59,671 處——因為 `会`／`区`／`医`／`党`／`単` 這些
   **本來就是合法日文漢字**，全被誤報。要把 ja 的字集擴到跟 ko 同一個精度，需要先
   有一份日文新字體白名單（`scripts/tools/lib/tw-variant-chars.mjs` 的日文對應物），
   repo 裡目前沒有。

**所以「ko/ja 到底有多少」這個問題，現在的誠實答案是「至少這麼多，上限沒量到」**
（REFLEXES #85：「不知道」要有自己的符號，不能借用「沒事」那個）。

## 它不是閘門

**報告用，預設 exit 0。** 新增品質閘門屬 BECOME 鐵律 10（閾值／gate 調整需觀察者
拍板），所以這一支不接任何 hook、不進 `article-health` plugin、不被 dispatcher
呼叫；要不要升閘門與存量要不要清，登記在 OBSERVER-QUEUE #112 等哲宇。
`--strict` 旗標留給拍板之後的接線者用。

用法：
    python3 cjk-body-simplified-check.py --lang ko          # 掃 knowledge/ko/
    python3 cjk-body-simplified-check.py --lang ko --lang ja --summary
    python3 cjk-body-simplified-check.py --files a.md b.md
    python3 cjk-body-simplified-check.py --lang ko --strict  # 有命中回 exit 1
"""

from __future__ import annotations

import argparse
import collections
import importlib.util
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

# 本檔的語言範圍恰好是 cjk-residue-check.py 的補集：那支守拉丁/天城文語言，
# 這支守漢字混寫語言。兩支加起來才覆蓋全部譯文語言。
TARGET_LANGS = {"ja", "ko"}


def _load_leak_check():
    """import cjk-leak-check.py（檔名帶連字號，不能用 import 語法）。"""
    path = REPO / "scripts" / "tools" / "lang-sync" / "cjk-leak-check.py"
    spec = importlib.util.spec_from_file_location("cjk_leak_check", path)
    if spec is None or spec.loader is None:  # pragma: no cover
        sys.exit(f"❌ 載入不到判準來源：{path}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


CLC = _load_leak_check()


def charset_for(lang: str) -> frozenset:
    if lang == "ja":
        return CLC.SIMPLIFIED_ONLY_CHARS - CLC.JA_SHINJITAI_OVERLAP
    return CLC.SIMPLIFIED_ONLY_CHARS


def detect_lang(path: Path) -> str:
    parts = path.parts
    if "knowledge" in parts:
        i = parts.index("knowledge")
        if i + 1 < len(parts):
            return parts[i + 1]
    return ""


def scan_file(path: Path, lang: str | None = None):
    """回傳 [(line_no, char, context)]。只看書目區之前的正文。"""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as e:
        return [(0, "?", f"READ_ERROR: {e}")]
    lang = lang or detect_lang(path)
    charset = charset_for(lang)

    body_raw = CLC.drop_frontmatter(text)
    # 書目區分界必須在還沒剝合法區的原文上找（同 cjk-leak-check 的註解）
    main_raw = body_raw[: CLC.find_bibliography_start(body_raw, lang)]
    # 行號對齊：剝除時以等長空白替換，不動換行
    scan = CLC.strip_legit_zones(main_raw)
    scan = CLC._drop_source_verbatim(scan, text)

    hits = []
    for offset, line in enumerate(scan.splitlines(), start=1):
        for ch in line:
            if ch in charset:
                hits.append((offset, ch, line.strip()[:90]))
    return hits


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", action="append", default=[],
                    help="ja / ko，可重複；不給且沒 --files 則兩個都掃")
    ap.add_argument("--files", nargs="*")
    ap.add_argument("--lang-of-files", choices=sorted(TARGET_LANGS),
                    help="搭配 --files：顯式宣告這批檔的語言，不靠路徑猜。"
                         "審 PR 時把譯文帶到暫存路徑量、或 patch-translate 的"
                         "分段暫存檔（沒有 frontmatter 也不在 knowledge/ 樹下）"
                         "都需要它——`cjk-leak-check` 同一個教訓："
                         "「lang 顯式傳入，不靠路徑猜語言」。")
    ap.add_argument("--summary", action="store_true",
                    help="只印每語言統計與字元排行，不逐檔列出")
    ap.add_argument("--strict", action="store_true",
                    help="有命中時 exit 1（預設報告模式 exit 0）")
    args = ap.parse_args()

    if args.files:
        targets = [(Path(f) if Path(f).is_absolute() else REPO / f) for f in args.files]
    else:
        langs = args.lang or sorted(TARGET_LANGS)
        bad = [l for l in langs if l not in TARGET_LANGS]
        if bad:
            sys.exit(f"❌ {','.join(bad)} 不在本檔範圍（拉丁/天城文語言請用 "
                     f"cjk-residue-check.py，判準不同）")
        targets = [p for l in langs for p in sorted((REPO / "knowledge" / l).rglob("*.md"))]

    per_lang = collections.Counter()
    per_lang_files = collections.Counter()
    chars = collections.Counter()
    scanned = collections.Counter()
    flagged_files = []

    for p in targets:
        if not p.exists():
            print(f"⏭️  跳過 {p}：檔案不存在", file=sys.stderr)
            continue
        lang = args.lang_of_files or detect_lang(p)
        if lang not in TARGET_LANGS:
            # 明確說出「沒量」，不要靜默當通過（REFLEXES #85）
            print(f"⏭️  跳過 {p.name}：語言 {lang or '?'} 不在本檔範圍", file=sys.stderr)
            continue
        scanned[lang] += 1
        hits = scan_file(p, lang)
        if hits:
            per_lang[lang] += len(hits)
            per_lang_files[lang] += 1
            chars.update(h[1] for h in hits)
            flagged_files.append((lang, p, hits))

    if not args.summary:
        for lang, p, hits in sorted(flagged_files, key=lambda r: -len(r[2])):
            # 審 PR 時被量的檔常在 repo 外（暫存路徑），relative_to 會丟
            # ValueError——正控制第一次跑就是死在這裡
            try:
                rel = p.relative_to(REPO)
            except ValueError:
                rel = p
            print(f"⚠️  [{lang}] {rel} — {len(hits)} 處")
            for line_no, ch, ctx in hits[:5]:
                print(f"    L{line_no} [{ch}] {ctx}")
            if len(hits) > 5:
                print(f"    … 共 {len(hits)} 處")

    total = sum(per_lang.values())
    print("\n════════ ko/ja 正文簡體字形殘留 ════════")
    for lang in sorted(scanned):
        print(f"  {lang}: {per_lang_files[lang]}/{scanned[lang]} 檔命中，"
              f"{per_lang[lang]} 處")
    if chars:
        top = "  ".join(f"{c}×{n}" for c, n in chars.most_common(20))
        print(f"  最常見：{top}")
    print(f"  合計 {total} 處")
    print("  ⓘ 報告用，非閘門（升閘門與存量清理＝OBSERVER-QUEUE #112，待哲宇拍板）")

    if total and args.strict:
        sys.exit(1)


if __name__ == "__main__":
    main()
