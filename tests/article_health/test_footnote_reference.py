"""Tests for footnote_reference plugin.

背景：2026-10-20 全庫掃描發現 708 處斷腳註（正文引用 `[^N]`，文章裡沒有
`[^N]:` 定義），分佈在 116 個檔。這一支是那個洞的儀器化。
"""

from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import footnote_reference
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write(tmp_path: Path, body: str, name: str = "x.md") -> Path:
    f = tmp_path / "knowledge" / "Nature" / name
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(
        f"---\ntitle: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\n---\n\n{body}",
        encoding="utf-8",
    )
    return f


def _labels(violations) -> list[str]:
    """Extract the dangling labels from the violation message.

    The message also contains the fix hint `[^N]:` — the negative lookahead
    excludes it, since it is followed by a colon (i.e. it is a definition
    template, not a reported label).
    """
    import re

    out = []
    for v in violations:
        out.extend(re.findall(r"\[\^([0-9a-zA-Z_-]+)\](?!:)", v.message))
    return out


# ════════════════════════════════════════════════════════════════════════
# 基本行為
# ════════════════════════════════════════════════════════════════════════


def test_matched_ref_and_def_no_violation(tmp_path):
    body = "段落[^1]。\n\n[^1]: [Title](https://example.com) — desc enough chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_dangling_ref_flagged(tmp_path):
    """正文引用 [^2] 但只有 [^1] 的定義 → [^2] 落空。"""
    body = (
        "段落[^1][^2]。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.WARN
    assert _labels(violations) == ["2"]


def test_multiple_dangling_refs_counted_once_each(tmp_path):
    body = (
        "段落[^1][^2][^3][^2]。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert sorted(_labels(violations)) == ["2", "3"]


def test_no_defs_at_all(tmp_path):
    """全文沒有定義行 → 所有引用落空。"""
    body = "段落[^1][^2]。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert sorted(_labels(violations)) == ["1", "2"]


def test_no_footnotes_at_all_no_violation(tmp_path):
    body = "純文字段落，沒有任何腳註。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


# ════════════════════════════════════════════════════════════════════════
# 誤報防護
# ════════════════════════════════════════════════════════════════════════


def test_definition_line_is_not_a_reference(tmp_path):
    """`[^1]:` 定義行本身不該被算成對 `[^1]` 的引用。"""
    body = "段落[^1]。\n\n[^1]: [Title](https://example.com) — desc enough chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_literal_N_mechanism_mention_not_a_reference(tmp_path):
    """provenance 註腳裡「inline 化為 [^N] 腳註」是**講**腳註機制，不是引用。

    全庫 12 處這種寫法（zh-TW + 11 個譯本），不跳就全部變假陽性。
    """
    body = (
        "正文[^1]。\n\n"
        "_本文 EVOLVE：12 條 ## 參考資料 全部 inline 化為 [^N] 腳註。_\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == [], f"literal [^N] mention should not count: {violations}"


def test_literal_N_run_not_a_reference(tmp_path):
    """`[^N][^N]` 這種機械產物也視為字面說明。"""
    body = (
        "正文[^1]。\n\n"
        "_全部 inline 化為 [^N][^N] 腳註。_\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_footnote_ref_inside_code_fence_ignored(tmp_path):
    """code fence 裡的 `[^1]` 是示範不是引用。"""
    body = (
        "段落[^1]。\n\n"
        "```markdown\n"
        "正文[^2] 是壞的引用。\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
        "```\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == [], f"code fence refs should be ignored: {violations}"


def test_definition_anywhere_in_file_is_found(tmp_path):
    """markdown 允許定義在文中任何位置，不只是在文末。"""
    body = "[^1]: [Title](https://example.com) — desc enough chars\n\n段落[^1]。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_named_labels_supported(tmp_path):
    """非數字 label（`[^nippon]`、`[^pttweb-rayark]`）同樣要能對上。"""
    body = (
        "段落[^nippon][^pttweb-rayark]。\n\n"
        "[^nippon]: [Title](https://example.com) — desc enough chars\n"
        "[^pttweb-rayark]: [Other](https://example.org) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_named_label_dangling_flagged(tmp_path):
    """有定義的 named label 不報；沒定義的才報。"""
    body = (
        "段落[^nippon][^pttweb-rayark]。\n\n"
        "[^nippon]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["pttweb-rayark"]


def test_garbled_label_still_flagged(tmp_path):
    """`[^1le]` 這種幻覺 label 沒有對應定義 → 照報。"""
    body = (
        "段落[^1][^1le]。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["1le"]


# ════════════════════════════════════════════════════════════════════════
# plugin metadata
# ════════════════════════════════════════════════════════════════════════


def test_plugin_metadata():
    assert footnote_reference.CHECK_NAME == "footnote-reference"
    assert footnote_reference.DEFAULT_SEVERITY == Severity.WARN


def test_plugin_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "footnote-reference" in found
