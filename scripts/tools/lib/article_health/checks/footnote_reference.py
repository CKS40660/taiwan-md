"""footnote-reference — 抓「正文引用了 `[^N]`，但文章裡沒有 `[^N]:` 定義」的斷腳註。

## 為什麼要有這一支

`footnote-format` 驗的是**定義行的形狀**（`[^N]: [Title](URL) — desc`），
`footnote-density` 數的是**定義與引用的數量比**。兩支都不問同一個問題：

    正文引用 `[^12]`，文章裡到底有沒有 `[^12]:` 這行定義？

答案是「沒人問」。於是一篇 43 處引用全部落空的文章可以拿到兩個綠燈——
這正是 2026-10 的全庫掃描結果：708 處斷腳註、116 個檔。

站上怎麼看：`src/utils/article-render.ts` 的 `processFootnotes()` 遇到找不到
定義的標籤，會把 `[^12]` **原樣留在正文**（`if (!definitions[label]) return
`[${raw}]`;`）。讀者看到的是一串沒有上下文的方括號數字，點不下去，也沒有
文末條目——它不像壞掉的連結那樣會被讀者回報，因為它看起來「像文章的一部分」。

## 三種斷腳註的病根（2026-10-20 全庫掃描）

1. **投稿工具截斷**（最嚴重）：`knowledge/People/林郁婷.md` 在投稿時被工具截斷，
   原文留下 `(Content truncated due to size limit...)` 這行工具自己的話。58 條
   腳註只有 11 條定義活下來，`[^12]`–`[^58]` 全部落空——**定義是從來沒存在過**，
   不是被刪掉。修法是補回定義，不是改編號。
2. **翻譯時的標籤幻覺**：LLM 把 `[^16]` 寫成 `[^1le]`（`1le` = 「1」後面接了
   別的字）、`[^2_3]`、`[^retint]`、`[^arg9]`。這是模型自己編出來的 token，
   對應的定義在該語言版本裡根本沒有。
3. **漏寫定義**：定義行從來沒被寫出來（例如 `[^nippon]`、`[^pttweb-rayark]`）。

第 2、3 類的正確修法是**刪掉那個引用標記或補上定義**，兩者都需要判斷
「作者本來想引哪一條」——機器不能自己決定，所以這一支是 report-only。

## 嚴重度

WARN（不是 HARD）。理由跟 `gh-footnote-leak` 同一條路：全庫 708 處存量要先
清乾淨，否則全站掃描會被自己擋死。存量清完、只剩新造的斷腳註時再升 HARD。

WARN 也不代表可以放著不管——它跟 `footnote-format` 的 WARN 是同一個量級的
「引用層品質債」，而斷腳註比格式不對更嚴重：格式不對的腳註**還在**，
斷腳註是**連線都沒有**。

## 誤報防護

- 只算**正文**裡的引用；定義行本身（`[^N]:` 開頭）不算引用。
- 跳過 code fence 內的字串（`[^1]` 示範）。
- 跳過 provenance 註腳裡的**字面說明**：`[^N]` 這串字是作者在描述
  「12 條 ## 參考資料 全部 inline 化為 [^N] 腳註」——那是在**講**腳註這個
  機制，不是在引用。全庫有 12 處這種寫法（zh-TW + 11 個譯本），不跳就
  全部變假陽性。
- 定義行可以出現在任何位置（markdown 允許定義在文末或文中）。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "footnote-reference"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "docs/editorial/CITATION-GUIDE.md §腳註格式（每個 `[^N]` 引用都要有對應的 `[^N]:` 定義）"
APPLIES_TO = ["*"]


# 定義行：`[^label]:` 開頭（行首）。label 允許數字、字母、底線、連字號。
_RE_DEF_LINE = re.compile(r"^\[\^([0-9a-zA-Z_-]+)\]:")

# 引用：`[^label]`，但後面**不能**緊接 `:`（那是定義行）。
_RE_REF = re.compile(r"\[\^([0-9a-zA-Z_-]+)\](?!:)")

# 程式碼區塊（fenced code）——裡面的 `[^1]` 是示範不是引用。
_RE_FENCE = re.compile(r"```[\s\S]*?```")

# provenance 註腳裡講到腳註機制本身的那種寫法：
# 「12 條 ## 參考資料 全部 inline 化為 [^N] 腳註」
# 這裡的 `N` 是**字面量**說明（意思是「N 這條」），不是真的引用第 N 條。
# 判準：整個 token 就是 `N`（單一大寫字母）→ 視為字面說明。
_RE_LITERAL_N = re.compile(r"^\[\^N\](?!:)")

# provenance 註腳裡其他類似的「機制說明」寫法：
# `[^N]` 出現在中文/英文散文裡（「inline 化為腳註」「as [^N] footnotes」）。
# 保守做法：只跳過**單獨的 `[^N]`**，其他形狀照報——寧可多報也不漏報。
# 這裡再擋一層：連續的 `[^N][^N]` 之類是機械產物，一併視為字面說明。
_RE_LITERAL_N_RUN = re.compile(r"(?:\[\^N\])+")


def _iter_candidate_refs(body: str) -> Iterator[tuple[str, int]]:
    """Yield (label, line_number) for every reference that could be dangling.

    Skips fenced code blocks and literal-mechanism mentions.
    """
    # 先把 code fence 換成等長空白（保留行號對位）
    scrubbed = _RE_FENCE.sub(lambda m: " " * len(m.group(0)), body)
    for line_no, line in enumerate(scrubbed.split("\n"), start=1):
        # 定義行不是引用
        if _RE_DEF_LINE.match(line):
            continue
        # 字面量機制說明（`[^N]` / `[^N][^N]`）不是引用
        without_literal = _RE_LITERAL_N_RUN.sub(" ", line)
        for m in _RE_REF.finditer(without_literal):
            yield m.group(1), line_no


def dangling_refs(body: str) -> dict[str, int]:
    """Return {label → first line number} for every reference with no definition.

    Public so sweep tools and calibration scripts can count precisely without
    parsing the human-facing violation message.
    """
    defined: set[str] = set()
    for line in body.split("\n"):
        m = _RE_DEF_LINE.match(line)
        if m:
            defined.add(m.group(1))

    dangling: dict[str, int] = {}
    for label, line_no in _iter_candidate_refs(body):
        if label not in defined:
            dangling.setdefault(label, line_no)
    return dangling


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    if not body or "[^" not in body:
        return

    defined: set[str] = set()
    for line in body.split("\n"):
        m = _RE_DEF_LINE.match(line)
        if m:
            defined.add(m.group(1))

    if not defined:
        # 沒有任何定義行 → 所有引用都是斷的（正常情況下不該發生，因為
        # 沒有定義就等於沒有腳註系統；但若作者寫了 `[^1]` 忘了整段，就會這樣）
        dangling: dict[str, int] = {}
        for label, line_no in _iter_candidate_refs(body):
            dangling.setdefault(label, line_no)
        if not dangling:
            return
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=(
                f"正文有 {len(dangling)} 個腳註引用但全文沒有任何腳註定義行——"
                f"引用全部落空：{', '.join(f'[^{k}]' for k in sorted(dangling)[:8])}"
                f"{'…' if len(dangling) > 8 else ''}"
            ),
            line=min(dangling.values()),
            editorial_ref=EDITORIAL_REF,
        )
        return

    dangling = dangling_refs(body)

    if not dangling:
        return

    labels = sorted(dangling)
    shown = ", ".join(f"[^{k}]" for k in labels[:10])
    more = f"…（另 {len(labels) - 10} 個）" if len(labels) > 10 else ""
    yield Violation(
        check=CHECK_NAME,
        severity=DEFAULT_SEVERITY,
        message=(
            f"{len(labels)} 個腳註引用沒有對應的定義：{shown}{more}。"
            "斷掉的腳註在站上會原樣顯示成方括號數字（沒有上標、沒有文末條目），"
            "讀者點不到也看不出它引的是什麼。"
            "修：補上對應的腳註定義行（`[^標號]: [Title](URL) — desc`），"
            "或移除那個引用標記。"
        ),
        line=min(dangling.values()),
        editorial_ref=EDITORIAL_REF,
    )
