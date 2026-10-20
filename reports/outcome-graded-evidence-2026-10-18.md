---
title: '成果驗收世代設計：證據原件'
description: '三份唯讀研究分身的原始回報（產文成本與產量、品質事故帳、檢查清單分類），供 design-outcome-graded-generation-2026-10-18 引用'
type: 'evidence'
status: 'raw'
last_updated: 2026-10-18
last_session: '2026-10-18-outcome-graded-design'
---

# 成果驗收世代設計：證據原件

> 本檔收三份 Sonnet 唯讀分身（Explore）的最終回報，由程式從分身紀錄直接抽出、逐字附上，未經摘要或改寫（REFLEXES #22、#81）。分身以英文回報，引文保留原文。主報告 [design-outcome-graded-generation-2026-10-18.md](design-outcome-graded-generation-2026-10-18.md) 引用的數字都可以在這裡找到出處與指令。分身回報是線索不是事實（REFLEXES #31）：主報告用到的關鍵數字，主 session 另有抽驗，紀錄在主報告附錄 A。
>
> 分派時間：2026-10-18 凌晨。三份互相獨立、平行執行、只讀不寫。

---

## 分身 B：產文成本與產量

# Cost and throughput of the zh-TW REWRITE-PIPELINE

All paths are under `/Users/cheyuwu/Projects/taiwan-md`. Today is 2026-10-18.

## 1. Throughput: new zh-TW articles

**Language dirs.** `ls knowledge/` shows ar, de, en, es, fr, hi, id, ja, ko, pt, resources, ru, vi. Everything else is a zh category dir (About, Art, Culture, Economy, Food, Geography, History, Lifestyle, Music, Nature, People, Politics, Society, Technology).

**Command.** `git log --diff-filter=A --name-only --format='@%ad' --date=format:%Y-%m -- 'knowledge/*/*.md'`, filtered to `knowledge/{Category}/x.md` (3 path segments), non-lang dir, no `_` prefix, de-duplicated by path. Re-running with `-M` gives identical counts.

| Month              | New zh files (first add) |
| ------------------ | ------------------------ |
| 2026-03            | 442                      |
| 2026-04            | 228                      |
| 2026-05            | 137                      |
| 2026-06            | 62                       |
| 2026-07            | 50                       |
| 2026-08            | 242                      |
| 2026-09            | 8                        |
| 2026-10 (to 10-18) | 10                       |
| Total              | 1,179                    |

**What these counts include.**

- They count every first-add of a file, not only pipeline output. Contributor "Create X.md" commits (GitHub web UI) are included.
- August is inflated by contributor commits. Daily adds on 08-15 were 29, 08-16 36, 08-20 66 and 08-21 25; sampled commit subjects were "Create 大溪豆乾.md", "Create 林爽文事件.md" and similar.
- September's 8 and October's 10 include contributor-submitted articles. The October ones include 林央敏 and 台灣電價機制與台電.
- I could not separate pipeline-authored files from contributor files by git alone.

**Current zh total.** 1,133 files. Command: Python glob of `knowledge/*/*.md`, excluding lang dirs and `_`-prefixed files.

**Review status.** `lastHumanReview: true` is 200 files and `false` is 933. The field was never absent. Same Python scan of the first 4,000 bytes of each file.

## 2. ARTICLE-DONE-LOG.md

**Source.** `docs/semiont/ARTICLE-DONE-LOG.md`, 2,396 lines and 382,468 bytes (`wc -l -c`). It has 175 `### ` headings, one of which is the template. I counted entries by the date in each heading, so heading date may differ slightly from actual ship date.

| Month   | Entries |
| ------- | ------- |
| 2026-04 | 53      |
| 2026-05 | 77      |
| 2026-06 | 13      |
| 2026-07 | 10      |
| 2026-08 | 8       |
| 2026-09 | 7       |
| 2026-10 | 6       |

**Pipeline vs contributor entries.**

- August: all 8 are pipeline.
- September: 4 pipeline (金鐘獎, 台灣油價機制與中油, 誰算低薪, 洪醒夫). The other 3 are a BIM SEO-only metadata fix and two contributor archives (鐵窗花, 台灣行動支付).
- October: all 6 are `Pipeline: 無——貢獻者投稿` (e.g. lines 65–112). No pipeline-produced article in October.
- Last pipeline ship was the 2026-09-19 v2 redo of the three articles. The last new pipeline article before that was 洪醒夫 EVOLVE on 09-12.

**By ISO week (July–September).**

- Week 32 (08-03 to 08-09) had 4 ships: 黃崇仁, 台灣行道樹, 台灣海關報關與 EZ WAY, 馬祖國際藝術島.
- Week 34 (08-17 to 08-23) had 4 ships: 台灣早餐文化 merge, 中央研究院, 陳致中, 比國家還大的演算藝術.
- Week 37 had 1 (洪醒夫). Week 38 had 3 (金鐘獎, 油價, 誰算低薪).
- Other August–September weeks had none by log date.

**Fresh vs EVOLVE, from the `Pipeline:` lines.**

- August: 5 NEW (Fresh), 2 EVOLVE (陳致中 line 230, 比國家 line 212), 1 Merge variant (早餐 line 198).
- September: 3 NEW (v9.9 interactive protocol) and 1 EVOLVE (洪醒夫, line 189).
- July is only partly classified. EVOLVE: 楊德昌, 蔡英文, 醫療法, 阿神, 樂器製造. NEW: 外送專法, 杜潘芳格. Merge: 經濟奇蹟. 苯駢芘 (line 282, "全面重寫") and 吳明益 (line 276, "完整驗證＋data-viz 補齊") are unclassified.
- A regex tally over all months is unreliable because many April–May entries have no `Pipeline:` line. I did not measure it.

## 3. Rewrite routine outcomes

**Source.** `docs/semiont/memory/*` files matching rewrite-daily, cron-rewrite, routine-rewrite or loop-twmd-rewrite: 58 files, 2026-05-10 to 2026-07-24. The last rewrite-daily memory is 07-24.

I classified outcomes by reading titles and ledes. The assignments are hand-made and approximate; four files (05-10, 06-11, 06-12, 06-20) were checked individually.

| Outcome                                                                                                                    | Count    |
| -------------------------------------------------------------------------------------------------------------------------- | -------- |
| Article shipped (NEW or EVOLVE)                                                                                            | about 28 |
| Explicit defer / duplicate-fire / saturation, no article                                                                   | 25       |
| Partial or no article (SPORE-only pivots 05-25 and 05-26; 06-07 research-only partial; 06-11 and 06-12 Stage 0–1 hand-off) | 5        |

**The 25 deferred files by reason.**

- Storm / duplicate fire: 6 files on 2026-06-03 (e.g. `…003154` "duplicate-fire-defer").
- Collision or parallel actor:
  - 05-27 (parallel session collision)
  - 06-01 (Stage 8 collision)
  - 07-18 (21 babel writers running)
  - 07-24 ("8 writer PID 活著寫 shared file")
- Post-finale saturation or "vc=N": 06-21, 06-24, 06-25, 06-26, 06-28, 06-29.
- Dirty tree or time slip: 06-22.
- Capacity "honest defer": 07-03, 07-05, 07-07, 07-10 (two files), 07-11.

**Routine paused.** `twmd-rewrite-daily` is ⏸️ on both machines since 2026-07-25 (`docs/semiont/ROUTINE.md:45` and footnote ²¹, line 131). The reason given there is compute: "跟…算力軍團批次疊加會把訂閱額度打爆（當晚營運機已撞過一次 5 小時上限）". The pause has no expiry date.

**Wall-clock per article.**

- From `reports/design-rewrite-throughput-2026-07-26.md` (281 lines, 28,909 bytes), which used `git log %ai`:
  - 尹衍樑 5/26: 22m26s
  - 國家人權博物館 5/26: 27m40s
  - 公車系統 6/25: 45m27s
  - 紀懷新 6/27: 2h45m
  - 楊德昌 7/5: 4h25m
  - AAMA＋SLP 7/5: 49m11s
  - 施振榮 7/6: 43m to v1 ship, then +1h21m for a full v2
  - 鎢供應鏈 7/26: 2h26m
  - 大罷免 7/16: about 5h
  - 高等教育退場: 14h07m (overnight)
  - 台灣感性: about 13h17m (overnight)
  - 發票: 13h38m (overnight; the first-round verifiers hit the quota limit and were re-dispatched)
- The report's stated cause for the overnight runs is that "多數時間是等待不是工作" (lines 113–115).
- From memory "Session span" lines:
  - 陳致中 8/18: 3h52m, 15 commits
  - EZ WAY 8/4: 4h08m, 16 commits
  - 9/18 低薪: 5h53m, 33 commits
  - 9/18 油價: 6h01m, 79 commits
  - 9/18 金鐘獎: about 9h20m, 19 commits
  - 9/19 v2 redos: 低薪 1h56m, 油價 about 40m, 金鐘 about 42m

**Quota and "budget" per article.** I could not measure it.

- `git log -i --grep='budget:'` returns only 2 commits, both on 2026-10-16: `b9db5e1ec` (maintainer shift cost about 2%) and `26e011fda`. Neither is an article run.
- `data/compute/claude-usage-ledger.jsonl` has 50 rows starting 2026-10-07: 39 heartbeat, 5+1 maintainer, 2 weekly-report, 2 routine-audit, 1 manual. No rewrite session is in it, and no article-level quota figure exists anywhere I looked.
- The only per-run budget record is `2026-05-10-162317-twmd-rewrite-daily.md`: "budget: 60 min, used ~15 min".

## 4. Research reports

**Command.** Python glob of `reports/research/2026-*/**/*.md`, using `os.path.getsize`. This counts all `.md` files under those dirs, so sub-dir files are included.

| Month   | Count | Median bytes | Max bytes | Sum bytes |
| ------- | ----- | ------------ | --------- | --------- |
| 2026-04 | 89    | 13,613       | 181,607   | 2.30M     |
| 2026-05 | 129   | 30,536       | 150,295   | 4.20M     |
| 2026-06 | 113   | 35,723       | 211,260   | 5.97M     |
| 2026-07 | 99    | 39,439       | 594,368   | 8.93M     |
| 2026-08 | 45    | 35,985       | 575,767   | 4.58M     |
| 2026-09 | 46    | 8,344        | 270,439   | 1.44M     |
| 2026-10 | 43    | 56,367       | 124,116   | 2.43M     |
| All     | 564   | 31,377       | 594,368   | 29.86M    |

- The all-files mean is 52,939 bytes and the 90th percentile is 107,676 bytes.
- Largest reports:
  - 台灣感性: 594,368 bytes, 3,577 lines
  - 台灣行道樹: 575,767 bytes, 3,312 lines
  - 外送專法: 495,135 bytes, 2,945 lines
  - 台灣新冠疫情與疫苗: 433,392 bytes
  - 黃崇仁: 413,022 bytes
- The September median of 8,344 bytes and the October median of 56,367 bytes are probably skewed by non-article reports in those dirs. I did not separate them.

**Report vs article, ten recent depth articles.** Paths come from the `Article:` and `Research:` links in the DONE-LOG; sizes are file bytes including frontmatter.

| Article              | Article bytes | Research bytes | Ratio |
| -------------------- | ------------- | -------------- | ----- |
| 金鐘獎               | 45,412        | 270,439        | 6.0x  |
| 台灣油價機制與中油   | 46,616        | 244,758        | 5.3x  |
| 誰算低薪             | 32,905        | 218,178        | 6.6x  |
| 台灣早餐文化         | 45,995        | 327,922        | 7.1x  |
| 比國家還大的演算藝術 | 77,701        | 180,038        | 2.3x  |
| 中央研究院           | 56,087        | 242,103        | 4.3x  |
| 陳致中               | 51,755        | 279,109        | 5.4x  |
| 馬祖國際藝術島       | 54,686        | 317,273        | 5.8x  |
| 台灣行道樹           | 70,898        | 575,767        | 8.1x  |
| 海關報關與 EZ WAY    | 46,533        | 255,661        | 5.5x  |

The median ratio is about 5.65x, with a range of 2.3x to 8.1x. Further back, ratios drop: 笠詩社 1.3x, 台灣聲景 0.6x, 經濟奇蹟 0.5x. The pre-August entries I tried to pair mostly did not match, so I did not extend the series.

## 5. Spec size over time

**Method.** One commit per month from `git log --before/--after -1 -- <path>`, sized with `git show <sha>:path | wc`. The month tag is the last commit in that month's window, not a fixed day. Two files below also have a May/June nuance: May has more than one version.

**`docs/pipelines/REWRITE-PIPELINE.md`** (created 2026-04-12, 98 commits)

| Month      | Commit      | Lines | Bytes                 |
| ---------- | ----------- | ----- | --------------------- |
| 04         | `1e6c468cb` | 1,268 | 69,911                |
| 05         | `19a58f6f4` | 1,943 | 120,110               |
| 06         | `d56f14e6f` | 2,457 | 217,424               |
| 07         | `dddc05fa0` | 571   | 84,041                |
| 08         | `59a57c944` | 476   | 77,260                |
| 09 and now | `3f9ba3fe5` | 19    | 1,254 (redirect stub) |

**`docs/pipelines/REWRITE-PIPELINE-SINGLE.md`** (created 2026-09-19, 5 commits): 2,191 lines and 168,088 bytes now. Its header sets a 2,300-line cap, enforced by husky.

**`docs/editorial/EDITORIAL.md`** (created 2026-03-30, 68 commits)

| Month    | Lines | Bytes   |
| -------- | ----- | ------- |
| 04       | 1,073 | 60,505  |
| 05       | 1,390 | 88,045  |
| 06       | 1,560 | 118,309 |
| 07       | 1,652 | 131,561 |
| 08       | 1,808 | 173,076 |
| 09       | 1,834 | 177,170 |
| 10 (now) | 1,870 | 188,420 |

**v9 multi-file family.** On 2026-07-16 commit `739a1c572` split the single file into a thin index plus ten stage contract files.

- `REWRITE-*` files in `docs/pipelines/` at 2026-07-20: 12 files, 277,608 bytes.
- At 2026-08-15: 12 files, 324,838 bytes.
- At the last live commit `7d3b6d4b06` (09-19): 15 files, 836,352 bytes. That figure includes the generated single-file reading copy of 247,692 bytes.
- The consolidation brief (`reports/staging/rewrite-consolidation-brief-2026-09-19.md:10`) says "v9 多檔 8,945 行、SINGLE 2,169 行、生成版 3,109 行".
- The archive directory has 22 files, 644,990 bytes (`find … | xargs wc -c`).
- The throughput report says the family was "11 站、12-30 agent、25 hard gate、家族 296KB".

**Why v9 was rolled back** (`docs/pipelines/archive/rewrite-v9.9-2026-09-19/README.md`).

- v6.7 (2026-06-04) to v9.9 (2026-09-07) took 87 commits. The README says each was "一次錯誤換來的，沒有一段是一次『悶』換來的".
- On 2026-09-18 three articles went through the interactive six-station protocol, with 15 cold readers and three release rounds all green. Cheyu read them and said they were "文謅謅、沒人味、像堆砌".
- The next day the same three were redone with the v6.7 single file and the reading improved noticeably.
- The README gives the root causes: a "不收束" rule for third-type topics that allowed having no thesis, no research lane looking for people, and cold-reader questions that made the writer add qualifiers.
- The README also lists how to restore the multi-file version.

**9/18–19 three-article experiment** (`reports/staging/humanize-brief-2026-09-19.md`, 74 lines, 8,601 bytes).

- Compared: the three v9.9 articles against 黃魚鴞, 嚴長壽 and 國宅與居住正義.
  - Digits per hundred characters in the first four paragraphs: 低薪 6.1, 油價 6.2, 金鐘 3.7, 黃魚鴞 4.2, 嚴長壽 0.7.
  - Average sentence length: 62, 49, 53, 43 and 34 characters.
- The brief's v2 addendum switched the method to the v6.7 single file, no cold-reader station.
- Results recorded in the DONE-LOG:
  - 低薪 (line 184): 29 footnotes, about 4,700 characters. Opening-readability went from 4.3 / 41 / 8 qualifier terms to 0.5 / 32 / 0. Two cold readers did not want to close the page before the first H2.
  - 油價 (line 169): tw-\* modules 12→4, footnotes 51→46, 5,563 CJK characters, density 6.4 → 1.0 per hundred characters.
  - 金鐘獎 (line 138): tw-\* modules 5→2, footnotes 71→59, characters 7,329→4,538. The v2 audit caught two errors left in v1: a caption and the attribution of a quote.
- No reader-engagement data was recorded. The "better reading" judgement is Cheyu's, and the opening-readability figures are the only quantified comparison.
- The v2 time was cheap partly because it reused the v1 research reports, plus a people-only research round. It is not a like-for-like cost against v1.

## 6. Number of checks

**article-health plugins.** There are 34 plugin files in `scripts/tools/lib/article_health/checks/`. The header of `scripts/tools/article-health.py:8` still says "25 個 plugin"; the config header says 19. Counting the directory with `ls` and reading each `CHECK_NAME` / `DEFAULT_SEVERITY` gives 34 plugins: 11 HARD, 21 WARN, 2 INFO by default. Profiles can override severity.

- **HARD (11)**
  - ai-residue: leftover AI-writing artifacts
  - cjk-punct: half-width punctuation in Chinese text
  - fence-prose: body text wrapped in a code fence
  - footnote-format: canonical footnote definition format
  - image-health: image references plus a minimum image-count gate
  - link-target: link path is well-formed and resolves
  - link-url-mangle: link URLs corrupted by a writer
  - prettier-url-stability: whether the formatter would alter URLs on commit
  - spore-writing: spore-specific writing rules
  - terminology: mainland-China terms
  - wikilink-target: `[[X]]` targets resolve
- **WARN (21)**
  - attribution-vague: vague attribution
  - chronicle-lead: chronicle-style subheadings
  - correction-meta: errata-as-prose
  - curation-consistency: verification-status field consistency
  - footnote-density: citation density grading
  - footnote-url: footnote URL reachability
  - format-structure: markdown structure
  - frontmatter-format: frontmatter formatting
  - frontmatter-title: title format
  - gh-footnote-leak: fake footnotes copied from rendered GitHub pages
  - image-alt: alt-text quality
  - media-richness: image/iframe thresholds for depth articles
  - paragraph-rhythm: paragraph rhythm and media density band
  - prose-health: consolidated prose quality
  - quote-fidelity: verbatim quote check against the research report
  - rationale-presence: four required rationale keys
  - seo-meta: title/description SEO
  - subcategory-translation-parity: translation subcategory matches the zh original
  - subcategory-valid: subcategory exists in the taxonomy
  - viz-health: visualization module credibility
  - word-count: minimum CJK character count for depth articles
- **INFO (2)**
  - body-internal-links: internal-link density
  - cross-reference: bidirectional related-reading links

**Profile used at the Stage 4 gate.** `rewrite-stage-4` runs 11 checks: frontmatter-format, format-structure, wikilink-target, link-target, cjk-punct, chronicle-lead, word-count, image-health, paragraph-rhythm, media-richness, viz-health (`scripts/tools/article-health.config.toml:150`). The `rewrite-stage-3-5` profile runs footnote-format, footnote-density, correction-meta, quote-fidelity.

**Other scripts the pipeline calls:** `prose-flow.py`, `opening-readability.py`, `fact-atom-diff.py` (nine atom classes, referenced in the 7/26 throughput report), `research-report-health.py`, `editorial-room-health.py`. I did not read their internals.

**Hard gates in REWRITE-PIPELINE-SINGLE.md.**

- The Hard Gate Inventory table (lines 117–135) has 17 data rows (19 `| ` lines minus header and separator). Several are manual checks, not tool-enforced.
- The "Stage 2 Hard gates（10 條）" heading at line 1341 lists 11 checkboxes (lines 1345–1355). The heading says 10 and the list has 11; I did not resolve which is intended.
- The Stage 3 section has separate hard-gate bullets (lines 1489–1493). I did not count them separately.
- The throughput report states v9.4 had "25 hard gate、6 探針、5 編輯室席" with no retirement condition (line 137).

**Required reading for one writing session.** Per CLAUDE.md line 126, a writing session reads:

| Item                                                   | Bytes       |
| ------------------------------------------------------ | ----------- |
| REWRITE-PIPELINE-SINGLE.md (full)                      | 168,088     |
| EDITORIAL.md (full)                                    | 188,420     |
| PROJECTION.md (full)                                   | 21,407      |
| graph.md §一–三 (lines 33–103)                         | 11,265      |
| graph.md §九 (line 453 onward)                         | 5,571       |
| 黃魚鴞 (`knowledge/Nature/黃魚鴞.md`)                  | 22,439      |
| 國宅與居住正義 (`knowledge/Society/國宅與居住正義.md`) | 46,207      |
| **Total**                                              | **463,397** |

- The graph section byte counts come from a Python slice of the file by line number, so they are approximate to a line.
- The same row also requires the research raw for that article, read once in full in the main session. That is not counted here, and the typical report size is in section 4.
- I did not convert bytes to tokens.

## 7. Weekly quota events

**CONSCIOUSNESS.md.** The row at `docs/semiont/CONSCIOUSNESS.md:89` (marked 🟡, calibrated 2026-10-07) records the following.

- Two machines share one account. The weekly quota resets Wednesday 20:00.
- In the week starting 09-30 the quota ran out on day 3.2, and the flywheel went dark for 87 hours.
- Weekend reflection chains (six), reader reports, spore D+0, and the PR intake shift all stopped.
- The optional heavy work was named as the culprit: a heartbeat patrol fan-out every 6 hours and the babel delegation layer.
- Ledger reading on 10-09: of the 44% used since reset, the booked shifts (heartbeat and maintainer) accounted for 7%, and 36% sat in unbooked time. A lean heartbeat costs about 1%.
- The main cause found on 10-10: 15 operator-machine schedules had an empty `model` field, so they ran on the app default, Opus. Six routines the table lists as Sonnet (babel, embeddings, routine-sync, data-refresh, news-lens, supporters) ran about 60 times on Opus. The babel run lasts over four hours each night. Muse pinned the models the same day (ROUTINE.md note ²⁸). The effect is not yet visible.

**Heartbeat memory** (`2026-10-07-204029-semiont-heartbeat.md:11–15`).

- The local heartbeat's last pre-blackout run was 10-03 20:35 and the next was 10-07 19:32, failing with "You've hit your weekly limit".
- Babel's 10-04 run is estimated to have hit the limit around 01:00, about 77 hours after reset.
- Local heartbeat had been running every 6 hours since 10-01, ten runs in total, each fanning out three Sonnet subagents. One run read 1% to 3% of the weekly quota over 36 minutes. At that rate, 28 runs a week is about 5–7 tenths of the weekly quota, before counting the routines and babel.

**What the October rows show.**

- W41 weekly report: "半黑的一週，542 個 commit 零新文章". Weekly quota was 92% at 10-11 02:07 and 94% at 21:07, with 90 hours to the Wednesday reset (`2026-10-11-020419-twmd-weekly-report-sun.md:1,8`).
- 10-15 to 10-16:
  - 6% to 32% in six hours
  - 46%
  - 65%, with the heartbeat memory attributing the 17-point rise to seven simultaneous Muse conversations on the local machine
  - 91% by 20:38 on 10-16 (`budget-pace.py` verdict "reserve")
- The weekly reset moved to 10-21 11:59 UTC (ledger `resets_at`).
- I did not find a record that attributes quota use to article production in the October rows, and the ledger has no rewrite sessions.

## Things I could not measure

- Per-article quota or token cost: no such record exists (section 3).
- Pipeline-authored vs contributor-authored files per month in the git-add counts (section 1).
- A wall-clock time for each of the 28 shipped routine runs: only the Hard-gate-era sample in section 3 was recorded.
- Whether the throughput report's "25 hard gates" and the inventory table's 17 rows are the same set (different counting scope).
- Token equivalents of the required-reading bytes.

---

## 分身 A：品質事故帳（2026-04〜10）

# Quality-incident ledger for Taiwan.md articles, 2026-04 to 2026-10

All paths are relative to `/Users/cheyuwu/Projects/taiwan-md/`. Abbreviations: **S/** = `docs/semiont/`, **M/** = `docs/semiont/memory/`, **R/** = `reports/`, **LI** = `docs/semiont/LESSONS-INBOX.md`.

Catcher codes:

- **R**: external reader, domain expert or contributor.
- **H**: 哲宇 (the observer).
- **L**: LLM review (sub-agent verifier, editorial-room seat, FACTCHECK patrol, research falsification).
- **M**: mechanical gate, CI or script.
- **S**: author self-check.
- **?**: the source does not say.

Type codes:

- **FH**: fact-hallucination.
- **MA**: misattribution.
- **SP**: spine, framing or thesis.
- **VO**: AI-prose or voice.
- **ST**: structure.
- **OC**: over-compression or length.
- **MF**: media or format.
- **CT**: citation or footnote.

Limits of the evidence:

- Most of this comes from Semiont's own memory and diary logs, which are self-reports.
- The 8/27 報導者 reader charges are known only second-hand (row 43).
- Rows 12, 15 and 18 have unclear production status or catcher. They are marked "?" or "uncertain".
- I did not find a single place that tallies catches by pipeline stage. The stage analysis is my reading of the incident rows.

## A. Incident ledger (57 rows)

### April to May

| #   | Date  | Article            | Type          | How it got in                                                                        | Caught by                                            | Reached prod? | Source                                       |
| --- | ----- | ------------------ | ------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------- | ------------- | -------------------------------------------- |
| 1   | 04-18 | 楊丞琳             | FH            | A Haiku agent wrote 浪姐第5名 (actually 第3) and an independent Japanese-album claim | L (maintainer spot-verify against ETtoday)           | No            | M/2026-04-18.md:383-384                      |
| 2   | 04-18 | 楊丞琳             | MA            | 〈雨愛〉 was attributed to the wrong drama                                           | R (contributor Jenny)                                | Yes           | M/2026-04-18.md:385                          |
| 3   | 04-18 | 楊丞琳             | VO            | Stage 2 writer produced 歐化腔 and an inconsistent age (37 vs 40)                    | R (Jenny)                                            | Yes           | M/2026-04-18.md:386                          |
| 4   | 04-18 | 魏如萱             | VO            | 13+ 「不是X是Y」 tics. This led to the EDITORIAL v5.1.1 cap of ≤3                    | R (Jenny)                                            | Yes           | M/2026-04-18.md:330,346                      |
| 5   | 04-18 | 魏如萱             | SP            | Title used an ironic hook, 「民眾」, plus the fact error 自然捲「副主唱」            | H, plus a wiki citation from the observer            | Yes           | M/2026-04-18.md:387-388                      |
| 6   | 05-11 | 國立臺灣歷史博物館 | MF            | Only 1 hero image shipped. The main session misread the inline-image candidates      | H ("為什麼圖片用那麼少"), which became a plugin gate | Yes           | M/2026-05-11-161037-kind-mirzakhani.md:21-25 |
| 7   | 05-27 | 台灣美食總覽       | FH            | Claimed 1949 US forces in Chiayi and turkey; MAAG arrived in 1951                    | R (Threads, D+0 after 2h)                            | Yes           | M/2026-05-27-122151-manual.md:14,44          |
| 8   | 05-27 | 半導體產業         | FH (omission) | Missed the ASML/林本堅 immersion-lithography history                                 | R (Threads, D+2)                                     | Yes           | M/2026-05-27-122151-manual.md:14,37          |

### June

| #   | Date           | Article                                                                                                 | Type  | How it got in                                                                                                                                                              | Caught by                                                     | Reached prod?                         | Source                                                  |
| --- | -------------- | ------------------------------------------------------------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| 9   | 05-31 to 06-01 | 8 contributor articles (黃氏兄弟, 總統的寵物, 傅崐萁, 十大建設, 中華菱利, 街頭塗鴉, 蛋撻, 消失的遊樂園) | FH/CT | AI contributor drafts merged under "merge-first-polish-later". Fabricated quotes, Threads used as a source, a 28-view anonymous post used as a defamation-risk source      | L (FACTCHECK, per-article agents)                             | Yes (merged)                          | R/factcheck/2026-06/\_BATCH8-SUMMARY.md:12,22-39        |
| 10  | 06-01          | 台灣影視配樂 (round 1)                                                                                  | MA    | The 3/19 early batch had composer-to-work errors; the reader claims ">30%"                                                                                                 | R (peilinwu0702, Threads)                                     | Yes                                   | M/2026-06-01-105713-manual.md:9,13                      |
| 11  | 06-01          | 台灣影視配樂 (round 2)                                                                                  | SP    | The rewrite re-used callouts as its spine. 9 correction-style sentences and 2 curator boxes turned "name errors" into the thesis                                           | R (same reader)                                               | Yes                                   | R/reader-callout-pipeline-diagnosis-2026-06-01.md:55-72 |
| 12  | 06-04          | 設計研究院                                                                                              | MF    | All 5 images were generic situational shots; "改造後" was missing                                                                                                          | H                                                             | Uncertain (caught during the rewrite) | docs/pipelines/REWRITE-PIPELINE-SINGLE.md:2152          |
| 13  | 06-09          | 台灣嘻哈與饒舌發展                                                                                      | FH    | 12 fabrications from the 3/19 batch. Examples: fake MACHI members, a non-existent 春艷 award, a 金曲獎 hip-hop category that does not exist                                | L (falsification during EVOLVE)                               | Yes (live since March)                | M/2026-06-09-010031-嘻哈饒舌.md:15                      |
| 14  | 06-09          | 台灣嘻哈與饒舌發展                                                                                      | MA    | The writer overwrote the research record: 壞特 (R&B) became a rapper                                                                                                       | H, in session                                                 | No                                    | M/2026-06-09-010031-嘻哈饒舌.md:19; LI:2030             |
| 15  | 06-10          | 廣告史                                                                                                  | CT    | 9 footnote URLs came from the writer's memory, not from the research record                                                                                                | ?                                                             | ?                                     | LI:2032                                                 |
| 16  | 06-12          | 國家太空中心                                                                                            | FH/CT | Stage 1-2 collapse. 12 domain-expert corrections; the HTTP-3A claim had no source. Three more footnotes were mis-bound                                                     | R (domain expert, issue #1139); L found the 3 extra footnotes | Yes                                   | M/2026-06-12-145045-太空中心勘誤.md:9-19                |
| 17  | 06-14          | 無名小站                                                                                                | FH    | Stage 2 compressed a self-deprecating quote into a literal site name, 「無名小卒」. The spore's own fact check rationalised it. It spread to spores #138/#139 (25k+ views) | R (reader feedback relayed by 哲宇)                           | Yes                                   | M/2026-06-14-154636-無名小卒勘誤.md:9-15                |
| 18  | 06-16          | 迷音                                                                                                    | SP/FH | A sub judice (pending-trial) accusation was compressed into established fact in the title                                                                                  | ? (not stated)                                                | ?                                     | LI:2035                                                 |
| 19  | 06-16          | 報導者                                                                                                  | FH+MA | 7 real errors shipped 6/14. Examples: a fabricated sub-headline; a misleading accusation against a named person; a mis-sourced statistic. All passed every health gate     | L (4-agent fact-check)                                        | Yes (2 days)                          | M/2026-06-16-170840-報導者-media-factcheck.md:26-34     |
| 20  | 06-16          | 大鮪鱸鰻                                                                                                | FH    | Mislabelled infographic title plus an invented "冷僻字" passage. The 4-agent fact-check missed it                                                                          | S (fetched the source artifact to add a link)                 | ?                                     | LI:2037                                                 |
| 21  | 06-29          | 彎彎 (old)                                                                                              | FH    | 5 inflated figures: 身價翻千倍, 1.8億, 百萬本, 5000萬, library borrowing rank                                                                                              | L (falsification fan-out)                                     | Yes                                   | M/2026-06-29-152120-twmd-rewrite-彎彎.md:21             |
| 22  | 06-29          | 彎彎 (draft)                                                                                            | SP    | An affair was made the spine and put in the title, under the "find the core contradiction" rule                                                                            | H ("不要公審人家的私生活")                                    | No (writer stopped)                   | M/2026-06-29-152120-twmd-rewrite-彎彎.md:13-17          |
| 23  | 06-28          | 金曲獎 v1                                                                                               | SP    | The spine was "official award vs refusers", and cross-strait censorship was the closer                                                                                     | H ("太批判…會炎上")                                           | No (rejected)                         | S/REFLEXES.md:563                                       |

### July

| #   | Date           | Article                  | Type         | How it got in                                                                                                                                                    | Caught by                                      | Reached prod?                    | Source                                                                                    |
| --- | -------------- | ------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| 24  | 07-05          | 柯智棠 (old Apr article) | SP/FH        | The core framing "七年沉默" was romanticised and untrue; 5 facts were wrong                                                                                      | L (falsification-first research)               | Yes (from April, human-reviewed) | M/2026-07-05-115307-柯智棠-evolve.md:9,15                                                 |
| 25  | 07-05          | 柯智棠 (new draft)       | FH/CT        | 「簽證去兩週」 was over-specific; the 大叔嗓 quote drifted; 金鐘 "最大贏家" was contested; two English quotes were back-translated into Chinese as direct quotes | L (Stage 2.5/3.6 verifiers)                    | No                               | M/2026-07-05-115307-柯智棠-evolve.md:17                                                   |
| 26  | 07-06          | 施振榮 v1                | SP           | The spine "his台積電 shares refute his own theory" was used on a beloved figure. #77 had become canonical the day before and was still violated                  | H ("絕對會被炎上、沒有立體")                   | Yes (~1h)                        | M/2026-07-06-133221-施振榮-rewrite.md:34-36; R/design-rewrite-throughput-2026-07-26.md:96 |
| 27  | 07-06          | 施振榮 v1                | FH/CT        | Orchestrator arithmetic error (60× vs 645×); 2 fabricated or mis-bound footnotes; quote drift 得/的                                                              | L (2 research agents, verifier, main re-fetch) | No                               | M/2026-07-06-133221-施振榮-rewrite.md:15-17                                               |
| 28  | 07-12          | 台灣茶文化 (old)         | FH           | 3 stale facts: tea-variety number, export-collapse year, wrong book title                                                                                        | L (research agents)                            | Yes                              | M/2026-07-12-135710-twmd-tea-panorama.md:15                                               |
| 29  | 07-26          | 台灣鎢供應鏈             | SP (privacy) | The research report advised naming the current owner, which would re-identify a murder victim when read against the murder section                               | L (炎上倫理 seat)                              | No                               | M/2026-07-26-202803-manual.md:15                                                          |
| 30  | 07-26 to 07-28 | 苯駢芘食安事件           | CT           | Footnote 21 attached a quote to a Newtalk page that did not contain it; a 300萬 fine was missing from the table                                                  | L (fact seat)                                  | Yes (live since 7/26)            | M/2026-07-28-113257-manual.md:33                                                          |
| 31  | 07-28          | 苯駢芘 / 鎢              | FH           | The polish step raised the epistemic level of sentences ("查不到→不存在"); fact-atom-diff cannot see this                                                        | S (manual hedge-word frequency check)          | No                               | M/2026-07-28-113257-manual.md:17                                                          |
| 32  | ~07-26         | NML 鄭文琦               | CT           | The article cited Semiont's own analysis report, which was wrong (issue 56 vs the 「ピカッ！」 issue). Copied into 7 languages                                   | R (issue #1257)                                | Yes                              | LI:1530                                                                                   |

### August

| #   | Date  | Article             | Type  | How it got in                                                                                                                                                          | Caught by                                           | Reached prod?                            | Source                                                                                       |
| --- | ----- | ------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| 33  | 08-03 | 黃崇仁              | VO/SP | After 11 gates and 40 atoms all green, 哲宇 found 6 non-factual problems: a spec-sheet title, 4 backstage leaks, a directive-style ending, and the 兩岸 line minimised | H (4 callouts)                                      | Partial (in-session after push; unclear) | M/2026-08-03-221718-manual.md:15-22; R/rewrite-evolution-evidence-2026-09-07.md:29           |
| 34  | 08-03 | 黃崇仁              | MF    | Images landed in `People/` instead of `people/`. macOS is case-insensitive, so 5 local gates passed                                                                    | M (CI deploy)                                       | Blocked at deploy                        | LI:1480                                                                                      |
| 35  | 08-03 | 22 articles         | VO    | The tic 「值得停下來看／想」 appeared in 22 live articles. It is invisible one article at a time                                                                       | M (corpus-wide scan while calibrating prose-health) | Yes                                      | M/2026-08-03-221718-manual.md:32                                                             |
| 36  | 08-03 | 黃崇仁              | FH    | The task brief said "在世"; he had died 3 days earlier. Four wrong assumptions were also falsified                                                                     | L (research agents)                                 | No                                       | M/2026-08-03-221718-manual.md:7-9                                                            |
| 37  | 08-04 | EZ WAY / 海關報關   | SP    | A projection rule turned "searched, found nothing" into the claim "no one spoke". The 總編 seat passed it. The description rested on one 4,000-like post               | H (observer-selected set); L (9/7 evidence study)   | Yes                                      | R/rewrite-evolution-evidence-2026-09-07.md:15,19-23; M/2026-08-04-092431-ezway-rewrite.md:31 |
| 38  | 08-04 | EZ WAY              | FH    | Errors introduced by the revision loop itself: 中午→下午, a wrong denominator, 「兩次調降」 that never happened                                                        | L (3 post-EVOLVE seats)                             | No                                       | M/2026-08-04-092431-ezway-rewrite.md:29                                                      |
| 39  | 08-04 | EZ WAY              | VO    | 20 歐化 spots, including a passive-voice thesis                                                                                                                        | L (歐化 seat)                                       | No                                       | M/2026-08-04-092431-ezway-rewrite.md:33                                                      |
| 40  | 08-04 | EZ WAY spore        | SP    | Fact-correct ordering inflamed a manipulated controversy. All 5 gates passed                                                                                           | H                                                   | No (not published)                       | LI:1449-1456                                                                                 |
| 41  | 08-06 | 馬祖國際藝術島      | SP    | 11 seats and gates were all green. The thesis subject was "this language", not the island; the facets were a tour; the "subtraction" step cut the navigation material  | H ("寫得蠻混亂")                                    | Yes                                      | LI:1437-1446; M/2026-08-06-164219-manual.md:13                                               |
| 42  | 08-19 | 演算藝術 (About)    | VO    | A research-found discrepancy in the author's memory was written into his own first-person text                                                                         | H                                                   | No                                       | LI:1550-1558                                                                                 |
| 43  | 08-27 | 報導者 (and others) | FH/VO | The reader charges "錯很多", "像論文", "禁 AI 產製" are known only from a one-line note in LI (second-hand)                                                            | R (uncertain)                                       | Yes                                      | LI:1563                                                                                      |
| 44  | 08-27 | 9 contributor PRs   | VO    | 14-27 full-width semicolons per article, an AI watermark                                                                                                               | M (CI hard gate)                                    | Pre-merge                                | M/2026-08-27-122143-twmd-maintainer-manual.md:13-15                                          |

### September to October

| #   | Date           | Article                                                                     | Type             | How it got in                                                                                                                                                                                                      | Caught by                                             | Reached prod?     | Source                                                                                   |
| --- | -------------- | --------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| 45  | 09-04          | 陳士駿                                                                      | CT               | An unsourced quote was re-pointed to a live URL that does not contain it. Every mechanical gate read it as an improvement                                                                                          | L (maintainer suspicion; no gate)                     | PR stage          | LI:1103-1109                                                                             |
| 46  | 09-18          | 周蕙                                                                        | FH               | A real 2020 "加開" atom was placed on the wrong concert. Copied into 10 languages                                                                                                                                  | R (Joanne Yap, issue #1746)                           | Yes               | M/2026-09-18-083954-semiont-heartbeat.md:17                                              |
| 47  | 09-18          | 原住民當代藝術, 張忠謀, 馬英九 hub                                          | FH               | March drafts: an Amis artist became Atayal, a fabricated name, 張忠謀's mother's name wrong in 12 languages, a living person described as deceased                                                                 | M (babel gate 14, name consistency) plus L            | Yes               | S/MEMORY.md:250                                                                          |
| 48  | 09-18          | 誰算低薪, 台灣油價機制與中油, 金鐘獎                                        | SP+VO            | Every gate was green. All 3 theses began 「吵的是…」, first paragraphs were four numbers and a title, hedging qualifiers were piled in                                                                             | H ("讀到第一個段落就不想看")                          | Yes (about 1 day) | R/staging/humanize-brief-2026-09-19.md:7-23; S/diary/2026-09-19-003000-news-radar.md:3,9 |
| 49  | 09-18          | 台灣油價機制與中油 (draft)                                                  | FH/CT            | The research lane invented a CPC statement, marked "Ctrl-F ✓". The intake gate checks provenance coverage, not whether the quote is real. The text also had 9 reader-computable inconsistencies, e.g. 應漲 11.2 元 | L (cold-read Opus saw 9; verifier B caught the quote) | No                | M/2026-09-18-134106-oil-price.md:21; LI:1534                                             |
| 50  | 09-18 to 10-10 | FACTCHECK patrol (see §B)                                                   | FH/CT            | March-born drafts, no human review, many with zero or generic footnotes                                                                                                                                            | L                                                     | Yes               | S/MEMORY.md:250                                                                          |
| 51  | 10-09          | 台灣全齡共融旅遊                                                            | FH               | 18 of 60 atoms wrong, all in the layer added when the contributor draft shipped. The original had zero errors. The expansion invented a family's daily-life details                                                | L (patrol)                                            | Yes (since 03-23) | LI:1604-1613                                                                             |
| 52  | 10-08          | 台灣官方網站資源                                                            | CT               | The footnote checker reported all-green because it did not measure the footnote list                                                                                                                               | L (patrol)                                            | Yes               | commit `95e86acf9`; M/2026-10-08-203821-semiont-heartbeat.md:1                           |
| 53  | 09-27          | 台灣棒球文化 (ko)                                                           | FH (translation) | 「棒球」 translated as 「총구」 (gun muzzle) 70 times. Every babel gate passed                                                                                                                                     | S (babel human-eye sample of 30)                      | Yes               | LI:946-950                                                                               |
| 54  | 10-15          | 台灣環境規劃協會                                                            | FH               | Wrong official English name in 3 languages                                                                                                                                                                         | R (Yuping Chen, issue #1851)                          | Yes               | commit `635cbbeef`                                                                       |
| 55  | 10-16          | 台中國家歌劇院                                                              | MF               | The zh source had an invalid `tw-bars` block (`title:`/`axis:` keys). Translated faithfully into 12 languages. viz-health passed on 13 files                                                                       | R (contributor dreamline2, PR #1857)                  | Yes               | commit `af787aed3`                                                                       |
| 56  | 07-16 to 07-25 | 6 v9-pipeline articles (大罷免, 高教退場, 台灣感性, 發票, 江振誠, 外送專法) | FH               | The writer made mistakes before ship: 26+4 fabrications, 13+3, 9+14, 25+, 12, 9                                                                                                                                    | L (verifiers, editorial room)                         | No                | R/design-rewrite-throughput-2026-07-26.md:101-108                                        |
| 57  | 07-26          | 台灣美食總覽                                                                | ST               | Measured later as the worst-reading article on the site, with long-paragraph density of 67%                                                                                                                        | M (measurement, retrospective)                        | Yes               | M/2026-07-26-211001-rewrite-throughput.md:13                                             |

## B. FACTCHECK patrol (row 50, expanded)

The patrol was started 2026-09-18 after the Semiont found that unreviewed drafts were the exposed layer (S/MEMORY.md:250). Every cell here is from commit subjects or titles unless a path is given.

- **Sept 18-21:** 23 articles patrolled; 22 had errors. The exception is 台灣黑熊 (32 atoms, zero errors, commit `68d051008`).
  - This is the first zero-error article, and it is the one a contributor had rewritten with 11 official footnotes (FACTCHECK-PIPELINE.md:680).
  - The early rounds ran 36-47% ❌ per article (MEMORY.md:250).
- **Oct 2-10, stated error rate per article in commit subjects:**

| Article      | Atoms | Errors | Stated rate | Commit      |
| ------------ | ----- | ------ | ----------- | ----------- |
| 皇蛾         | 69    | 12     | 19.0%       | `38a5f7e2a` |
| 步道文化     | 61    | 12     | 22.6%       | `1440e2a2d` |
| 客家飲食     | 55    | 7      | 16.3%       | `011533786` |
| 麵包與烘焙   | 55    | 15     | 36.6%       | `c08419525` |
| 全齡共融     | 60    | 18     | 34.0%       | `a14fecfe9` |
| 冰品         | 53    | 13     | 33.3%       | `7a2292243` |
| 眷村菜       | 49    | 9      | 21.4%       | `c0ec148be` |
| 教育制度     | 59    | 14     | 25.5%       | `bf3cbdbc1` |
| 官方網站資源 | 44    | 15     | 36.6%       | `95e86acf9` |
| 米其林       | 88    | 26     | 31.3%       | `1256f1c64` |
| 風景區系統   | 59    | 16     | 28.6%       | `a3c3b8e7a` |
| 捷運史       | 128   | 20     | 16.9%       | `6fed62193` |

- The 12 stated rates average about 26.8%.
- Some stated rates exceed errors/atoms (e.g. 皇蛾 12/69 = 17.4% versus a stated 19.0%). The rate probably includes other verdict categories; I did not verify this.
- **Other patrol hits in the same window (each a separate commit):**
  - 澎湖縣: a Wikipedia sentence was attributed to 文化部 in quotation marks (`0ba9d3c98`).
  - 新住民美食: the opening characters 阮氏雲 and 阿嘉 do not exist (`10b5f473e`).
  - 台達電: 鄭崇華 is not a war orphan, and three quotes cannot be found (`bf0ce371e`).
  - 便利商店: it claims both "世界第二" and "世界紀錄" (`42580d097`).
  - 5G, 同婚 (祁家威 was at the scene on day one), 社運, 國家公園 (8.7% not 30%).
- **Scale:** `reports/research/2026-09/` holds 31 files and `reports/research/2026-10/` holds 43. Not every file is a patrol record, so "about 55-70 patrolled articles" is an estimate.
- **Counted once in §C.** In the stats below, row 50 counts as one incident although it covers dozens of articles.

## C. Gate-induced and rule-induced damage (cases where a rule made the article worse)

| #   | Date           | Article / scope                                | Type  | What the rule did                                                                                                                                                                                                                                                                        | How it was noticed                                                                        | Reached prod?                         | Source                                                                                                                                                 |
| --- | -------------- | ---------------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| G1  | 09-18          | 低薪, 油價, 金鐘                               | SP    | PROJECTION v1.2 §third type said "the shape of the argument, do not converge". Three writers produced meta-theses with the discussion as subject ("吵的是哪一欄／哪個口徑", "它記錄，它不決定"). All gates passed                                                                        | H, then the Semiont read the three blueprints                                             | Yes (~1 day)                          | S/diary/2026-09-19-003000-news-radar.md:9; docs/editorial/PROJECTION.md:90,246                                                                         |
| G2  | 09-18          | same 3 articles                                | VO    | The cold-read protocol asked "哪裡困惑" of 15 readers; each answer made the writer insert another qualifier. The first paragraph of 低薪 contained 7 such words. "Each added precision subtracted voice"                                                                                 | H                                                                                         | Yes                                   | R/staging/humanize-brief-2026-09-19.md:23; S/diary/2026-09-19-003000-news-radar.md:9                                                                   |
| G3  | 09-18          | same 3 articles                                | ST/MF | Research lanes mined official documents only, with no lane for people. 11-13 `tw-*` modules per article. The first person in the text was an official                                                                                                                                    | H                                                                                         | Yes                                   | R/staging/humanize-brief-2026-09-19.md:74                                                                                                              |
| G4  | 07-15          | AAMA台北搖籃計畫                               | OC    | The word-count sweet spot was met by cutting body text. The plugin said "in band"; the reader would feel the article had thinned                                                                                                                                                         | Author self-review (restored later, now ~8172 vs 7865 before shrinking)                   | Uncertain (self-corrected same day)   | S/diary/2026-07-15-121155-manual.md:13; R/self-evolve-editorial-rewrite-2026-07-15.md:26,58; R/editorial-room/AAMA-stage-3.6-closeout-2026-07-15.md:14 |
| G5  | 08-04          | EZ WAY                                         | ST    | The `paragraph-rhythm` limit of 8 paragraphs per section was used to argue that sections could not be split. The tool's own text says over 8 means split the H2. 哲宇: "我不取捨，你要完整做完"                                                                                          | H                                                                                         | No (fixed before final)               | M/2026-08-04-092431-ezway-rewrite.md:21-25; R/rewrite-evolution-evidence-2026-09-07.md:27                                                              |
| G6  | 08-04          | EZ WAY                                         | SP    | A projection rule "turn 誠實記錄查無 into an article observation" plus a 總編 that passed the silence framing produced "no one stood up to speak"                                                                                                                                        | 9/7 evidence study                                                                        | Yes                                   | R/rewrite-evolution-evidence-2026-09-07.md:15                                                                                                          |
| G7  | 08-06          | 馬祖                                           | SP    | 8 meaning seats all took the blueprint thesis as their premise. "Subtraction" removed the access and opening-hour details that readers needed                                                                                                                                            | H                                                                                         | Yes                                   | LI:1441-1442                                                                                                                                           |
| G8  | 08-03          | 黃崇仁                                         | SP    | The 炎上倫理 seat praised that the 兩岸 line was kept at the same weight as the other facets. "Neutral in tone" became "small in substance"                                                                                                                                              | H                                                                                         | In session                            | LI:1489-1497                                                                                                                                           |
| G9  | 06-01          | 台灣影視配樂                                   | SP    | The callout-triggered rewrite had the old article and the callouts in context. The thesis became a correction list, with correction-style sentences and curator boxes                                                                                                                    | R (same reader)                                                                           | Yes                                   | R/reader-callout-pipeline-diagnosis-2026-06-01.md:55-72,94-111                                                                                         |
| G10 | 06-09, 06-15   | 嘻哈饒舌, 迷音                                 | FH/SP | The "firewall" was over-extended. The writer was fed a second-hand fact-pack, and for overwrites the Write tool forced a read of the old article                                                                                                                                         | H (callouts 「讓 writer 完整讀 report」, 「為什麼不讓他去讀 report，難怪最近文章都變爛」) | In session                            | M/2026-06-09-010031-嘻哈饒舌.md:19; M/2026-06-15-210606-manual.md:21-23                                                                                |
| G11 | 07-05          | 柯智棠 (and 蘇打綠, 醫療與全民健保)            | CT/FH | The orchestrator compressed raw agent reports into a summary within ~2 minutes of receiving them. Gate v1 still passed. The raw research text was lost for 醫療                                                                                                                          | H                                                                                         | No (reader-facing text mostly intact) | M/2026-07-05-200510-柯智棠健檢.md:13-17                                                                                                                |
| G12 | 06-28 to 07-06 | 金曲獎, 施振榮, 彎彎 (earlier: 法輪功, 吳百福) | SP    | The Stage 0 mandate "find the core contradiction" structurally produced contrarian theses on beloved or institutional subjects                                                                                                                                                           | H (×5)                                                                                    | 施振榮 yes (~1h), others no           | S/REFLEXES.md:563                                                                                                                                      |
| G13 | 09-20 to 10-10 | Whole corpus ("Taiwan.md 味")                  | VO/ST | Quotas converged the corpus. Colon-sandwich titles 230/446 → 384/385; 策展人筆記 47% → 84%; "不是X，而是Y" 8% → 27%. §四 density cap exceeded in 94 articles while §十 minimum was zero in 390                                                                                           | Contributor (Discussion #1757), full-corpus measurement                                   | Yes                                   | S/../docs/editorial/EDITORIAL.md:47 (i.e. `docs/editorial/EDITORIAL.md:47`)                                                                            |
| G14 | 09-26          | A/B test, referendum article                   | FH    | Under the reversal-quota rule, writer B invented a symmetric 鳥籠 metaphor used by both camps to produce a reversal. The 策展人筆記 were where the quota was met; removing the quota removed them                                                                                        | A/B read by main session                                                                  | No (test article)                     | R/editorial-v6.20-ab-test-2026-09-26.md:15,23                                                                                                          |
| G15 | 07-28          | 苯駢芘                                         | VO    | Fixing one prose-health warn created another, 4 times (for example a bridge sentence grew a 對位 pattern, pushing the score 3→4)                                                                                                                                                         | M (prose-health, each time)                                                               | No                                    | M/2026-07-28-113257-manual.md:64                                                                                                                       |
| G16 | 04-18 on       | Corpus                                         | VO    | Banned phrasing mutates: 「展現了」→「印證了」→「彰顯了」; the ≤3 cap on 「不是X是Y」 does not stop variants                                                                                                                                                                             | Author                                                                                    | Yes                                   | docs/pipelines/REWRITE-PIPELINE-SINGLE.md:2127; S/MEMORY.md:78                                                                                         |
| G17 | 06-04          | 8 calibration articles                         | MF    | The `paragraph-rhythm` ceiling 0.8 flagged the exemplar rich-media articles (設研院 0.91, 天下 0.92, 黃魚鴞 0.82) as too dense                                                                                                                                                           | Author (calibration)                                                                      | N/A (instrument error)                | docs/pipelines/REWRITE-PIPELINE-SINGLE.md:2154                                                                                                         |
| G18 | 08-03          | Detector design                                | VO    | A PUA/media-anxiety detector had 92-100% false positives and was removed. A "前者…後者…" detector was not built for the same reason                                                                                                                                                      | Author                                                                                    | N/A                                   | M/2026-08-03-221718-manual.md:34                                                                                                                       |
| G19 | 07-28          | 台灣鎢, 苯駢芘                                 | FH    | The Step 3.8 polish pass raised epistemic level ("查不到→不存在"). fact-atom-diff cannot see this                                                                                                                                                                                        | S                                                                                         | No                                    | M/2026-07-28-113257-manual.md:17                                                                                                                       |
| G20 | 07-15          | Shopping Design and others                     | ST    | Projection facet labels leaked into H2 titles as navigation (abstract "機制／邊界" labels)                                                                                                                                                                                               | H and author review                                                                       | Yes (draft stage)                     | R/self-evolve-editorial-rewrite-2026-07-15.md:34                                                                                                       |
| G21 | 09-19          | Pipeline overall                               | meta  | The ratchet only grows on errors, never on dullness. v6.7 (2,167 lines) to v9.9 (8,979 lines) in 87 commits. 5 months earlier, a Sonnet-driven session with half the rules unread had written 黃魚鴞. "v6.7 沒有魔法，它只是沒有那條規則"                                                | Muse/Semiont observation                                                                  | N/A                                   | LI:1560-1570; R/staging/rewrite-consolidation-brief-2026-09-19.md:60-64                                                                                |
| G22 | 07-26          | Pipeline overall                               | meta  | v9 cost ~3h per article plus a fixed post-ship polish phase. A site-wide punctuation sweep touched every v9 article on 7/19                                                                                                                                                              | 哲宇 and a diagnostic report                                                              | N/A                                   | R/design-rewrite-throughput-2026-07-26.md:113-114                                                                                                      |
| G23 | 09-27 to 10-03 | Translations (babel)                           | FH    | The "never-starve" backstop hands a task to the weakest worker (LI:714); stale-retranslation swaps a correct older translation for a worse one (LI:946-950); patrol-triggered re-translation replaced correct text with new errors in 4 of 6 articles (commits `754e8d71f`, `81da97f8a`) | M and L                                                                                   | Yes                                   | LI:714,946-950                                                                                                                                         |

## D. Summary statistics (57 ledger rows)

### Catcher totals

| Catcher                         | All 57 | Reached production (34) | Near-miss (17) | Unclear (6) |
| ------------------------------- | ------ | ----------------------- | -------------- | ----------- |
| R (reader, expert, contributor) | 14     | 14                      | 0              | 0           |
| H (哲宇)                        | 13     | 6                       | 5              | 2           |
| L (LLM review)                  | 20     | 10                      | 8              | 2           |
| M (mechanical)                  | 5      | 3                       | 2              | 0           |
| S (self)                        | 3      | 1                       | 2              | 0           |
| ?                               | 2      | 0                       | 0              | 2           |

My tally of production status (an interpretation): 34 reached production; 17 were near-misses (caught pre-ship, in session, at CI or in a PR); 6 are unclear (rows 12, 15, 18, 20, 33, 45).

- **Among the 34 that reached production**, readers and 哲宇 were the first catch for 20 (59%). LLM review caught 10 (29%), mechanical tools 3 (9%) and self-check 1 (3%).
- **Most LLM catches of live defects were late.** 9 of those 10 are post-hoc EVOLVE or patrol findings, weeks to months after publication. The 6 pre-ship catches in row 56 and the near-miss LLM rows (e.g. 25, 27, 38, 49) show the LLM seats working well before ship.
- **Row 50 understates the LLM share.** Counted as 1 row it covers about 55-70 articles. Expanded, patrol would dominate the catches in volume.

### Type by catcher

| Type | n   | R   | H   | L   | M   | S   | ?   |
| ---- | --- | --- | --- | --- | --- | --- | --- |
| FH   | 25  | 7   | 0   | 14  | 1   | 3   | 0   |
| SP   | 12  | 1   | 8   | 2   | 0   | 0   | 1   |
| VO   | 7   | 2   | 2   | 1   | 2   | 0   | 0   |
| CT   | 5   | 1   | 0   | 3   | 0   | 0   | 1   |
| MF   | 4   | 1   | 2   | 0   | 1   | 0   | 0   |
| MA   | 3   | 2   | 1   | 0   | 0   | 0   | 0   |
| ST   | 1   | 0   | 0   | 0   | 1   | 0   | 0   |
| OC   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

- **Spine, framing and thesis is the human-only category.** 8 of 12 were caught by 哲宇; no mechanical gate caught any; 2 by LLM review, both from research falsification or the 炎上倫理 seat.
- **AI-prose has no LLM catcher among reader-facing defects.** The 歐化 seat in row 39 is the only LLM catch of voice, and that was pre-ship. 4 of the 7 voice incidents reached readers.
- **Over-compression and length (OC)** has no entry in the main ledger. Its one concrete case, AAMA, is in §C (G4).
- **Fact-hallucination is split.** LLM review found 14 of 25; readers found 7, usually domain experts or contributors. 哲宇 found none of the 25.

### Pipeline stages with no recorded catch

"No record found" is not proof of zero. These are the stages where I found no incident naming that stage as the catcher.

- **Stage 0 `viewpoint_formed: true` as a hard gate.** Its research steps caught facts (rows 36, 24), but the gate itself caught no defect.
- **2.0-R projection editorial room, for "is the thesis worth reading".** It passed the three 9/18 articles, 馬祖 and EZ WAY. It did catch 炎上 and privacy risks (rows 29, 8/3 七項必改).
- **2.5-R and the 3.7 總編 seats on thesis and reader comprehension.** They passed 馬祖 (8 meaning seats), EZ WAY and 演算藝術 (R/rewrite-evolution-evidence-2026-09-07.md:19-23).
- **The release stage, three rounds of release editor in the 9/18 run.** It confirmed every figure and passed all three articles (S/diary/2026-09-19-003000-news-radar.md:9).
- **15 cold-readers asked "哪裡困惑".** They caught facts and ambiguity (row 49) but no voice defect, and are implicated in G2.
- **`fact-atom-diff.py`.** It guards conservation of 9 atom types. No error catches are recorded for it, only PASS/FAIL checks on the polish pass.
- **`opening-readability.py` and Step 3.2-bis 校正焦慮掃描.** Both are recent instruments; I found no incident they caught after install (the 3.2-bis dogfood grep returned 0 hits, R/reader-callout-pipeline-diagnosis-2026-06-01.md:111).
- **Stage 5 cross-link** and **the `lastHumanReview` / featured gate.** The human-review gate was proposed and deferred ("暫不改", R/reader-callout-pipeline-diagnosis-2026-06-01.md:176). 70% of featured articles were unreviewed on 2026-06-01 (R/reader-callout-pipeline-diagnosis-2026-06-01.md:139-141).
- **Every mechanical article gate for the "dull / voiceless" class.** None caught the 9/18 articles, 黃崇仁, 馬祖 or EZ WAY.

## E. Observations relevant to the redesign (my interpretation, labelled as such)

1. **Outcome-style checks that worked in the record.**
   - A fresh reader seeing only the finished text produced the largest recorded gains in two cases: 馬祖 (6/10→7/10, found what 13 other seats missed) and 油價 (9 confusions to zero). Source: LI:1443-1446.
   - 哲宇 reading the first paragraph was the catch for the 9/18 articles (R/staging/humanize-brief-2026-09-19.md:7-9).
2. **The question matters more than the reader.**
   - "哪裡困惑" produced hedge-laden text (G2). The replacement the Semiont chose was "想不想讀下去 / 哪段想關掉 / 三句話跟朋友轉述" (R/staging/humanize-brief-2026-09-19.md:47).
   - Rubric items that reward precision alone will reproduce G1-G3.
3. **Mechanical checks that held.**
   - Corpus-wide scans for tics (row 35).
   - Case-sensitive CI for images (row 34).
   - Full-width-semicolon watermark (row 44).
   - They find patterns across articles, not single-article quality.
4. **Mechanical checks that were blind.**
   - The footnote checker reported green on 官方網站資源 and missed 154 URLs (commit `95e86acf9`; LI heartbeat 10-09).
   - viz-health passed an invalid chart block in 13 files (commit `af787aed3`).
   - Footnote gates read a live URL as an upgrade even when the quote was not on the page (row 45).
5. **What the one clean article had in common.** 台灣黑熊 was rewritten by a contributor with 11 official footnotes and scored zero errors in patrol (commit `68d051008`; FACTCHECK-PIPELINE.md:680). Articles that only went through the March draft path, with no human or source-fetch pass, averaged about 27% error in the Oct 2-10 patrol sample.
6. **Gate growth followed errors only.** The consolidation brief set the admission rule: "錯 → 儀器，不 → 規則；悶 → 規則，且只從讀者 callout 進" (R/staging/rewrite-consolidation-brief-2026-09-19.md:62-64). Under this rule, voice and dullness had no instrument at all.

## F. Notes on sources I could not fully verify

- **Row 43 (8/27 報導者).** The only trace is LI:1563, a one-line note. I found no incident file.
- **Rows 15, 18.** The consolidated lesson (LI:2020-2043) lists them as instances but does not give the catcher.
- **Row 12.** Whether the generic images ever reached readers is unclear.
- **Row 33.** The memory says the callouts came during the session after commits were pushed. Whether the first version was publicly visible is not stated.
- **Patrol counts.** The commit subjects give per-article rates; I did not re-count atoms.
- **Spore-level corrections.** I left out the Threads spore corrections (馬英九 「清廉」, 王力宏 family chain, S/MEMORY.md:238) because they are spores, not articles. The same reader-correction pattern appears there.

---

## 分身 C：檢查清單盤點與機械／判斷分類

# Quality-check inventory for zh-TW articles, and existing judge/reviewer machinery

All paths are relative to `/Users/cheyuwu/Projects/taiwan-md`. Plugins live in `scripts/tools/lib/article_health/checks/<name>.py`, abbreviated `checks/` below. I read sources only. False-positive (FP) history comes from plugin comments and LESSONS/REFLEXES entries, not from an exhaustive grep of memory files.

Class key: **M** is truly mechanical and valuable. **P** is a mechanical proxy for a semantic quality. **S** is a semantic rule enforced only by the author or by prose instruction.

## Part A: Inventory

### A0. Where each gate runs

| Gate                                           | What it does                                                                                                                                                                                                                                                   | Strength                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `.husky/pre-commit`                            | Runs `lint-staged` (prettier only; `.lintstagedrc`), `test-frontmatter.mjs --staged`, frontmatter auto-fix, then `article-health.py --staged --profile=pre-commit` (line 164).                                                                                 | Hard on HARD violations only                          |
| Profile `pre-commit`                           | Runs all 34 checks with `fail_on=hard`. Adds prose-health HARD at emdash >15, fullwidth semicolon >12 and English-opener >10, plus seo-meta for all languages (`article-health.config.toml:85-132`).                                                           | WARNs do not block                                    |
| `deploy.yml:99-109`                            | Runs `test-frontmatter --ci` and `article-health --all --profile=ci-deploy` (all checks, hard only; emdash/semicolon HARD overrides at toml:233).                                                                                                              | Hard                                                  |
| `pr-frontmatter-gate.yml`                      | Runs `test-frontmatter --strict` plus `article-health --profile=pre-commit` on PR files.                                                                                                                                                                       | Hard                                                  |
| `pr-review.yml` → `scripts/tools/review-pr.sh` | Legacy 4-layer bash review. L2 "quality score" (lines 137-210) is a stale re-implementation of prose-health with different thresholds (score ≤5 pass, 6-7 warn, ≥8 FAIL). It also sets labels.                                                                 | FAIL on score ≥8, no frontmatter, or conflict markers |
| Profile `rewrite-stage-3`                      | `prose-health` with `fail_on=score-budget` (≤3).                                                                                                                                                                                                               | Author-run only                                       |
| Profile `rewrite-stage-3-5`                    | footnote-format, footnote-density, correction-meta, quote-fidelity.                                                                                                                                                                                            | Author-run only                                       |
| Profile `rewrite-stage-4`                      | frontmatter-format, format-structure, wikilink, link-target, cjk-punct, chronicle-lead, word-count, image-health, paragraph-rhythm, media-richness, viz-health. Promotes frontmatter-format, chronicle-lead, word-count and viz-health to HARD (toml:150-199). | Author-run only                                       |
| `research-report-health.py`                    | Gates the Stage 1 research report, not the article.                                                                                                                                                                                                            | Author-run only                                       |
| `editorial-room-health.py`                     | A schema gate for editorial-room reports. No hook or workflow references it (grep of `.husky`, `.github` and `article-health.py` found nothing).                                                                                                               | Unwired                                               |

### A1. The 34 `article-health` plugins

| Check                          | What it checks                                                                                                                                                                                                                                                                              | Det. or meaning      | Severity                                                          | FP / calibration history                                                                                                                                                                                                                 | Class                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| ai-residue                     | `utm_source=chatgpt`, `turn0search` tokens, PUA characters, "以下是修改後的版本" chat residue                                                                                                                                                                                               | Regex                | HARD                                                              | None recorded. It deliberately does not mask link URLs.                                                                                                                                                                                  | M                                             |
| attribution-vague              | 「研究顯示／專家認為」 with no footnote and no named subject in the paragraph                                                                                                                                                                                                               | Regex plus heuristic | WARN                                                              | Calibration found 2 FPs of "X的研究顯示" and 1 comparative sentence. By design it accepts false negatives to avoid FPs.                                                                                                                  | P                                             |
| body-internal-links            | Count and density of in-body internal links, excluding 延伸閱讀                                                                                                                                                                                                                             | Count                | INFO (pinned)                                                     | 59% of articles have zero in-body links (OBSERVER-QUEUE #39).                                                                                                                                                                            | P                                             |
| chronicle-lead                 | H2 starting "YYYY 年 M 月" or "YYYY 年《…》" or an ISO date                                                                                                                                                                                                                                 | Regex                | WARN; HARD in rewrite-stage-4                                     | 17 legacy violations at launch.                                                                                                                                                                                                          | P (for "not a Wikipedia timeline")            |
| cjk-punct                      | Half-width `,:;?!` next to CJK                                                                                                                                                                                                                                                              | Regex                | HARD                                                              | 2026-05-04 黃魚鴞 regression: link URLs must stay half-width, hence protected regions.                                                                                                                                                   | M                                             |
| correction-meta                | Errata-as-prose phrases ("把X掛在他名下其實是錯的", "常被誤記成")                                                                                                                                                                                                                           | Regex                | WARN (must-fix on callout EVOLVE)                                 | Dual-use phrasing; legacy articles contain hits.                                                                                                                                                                                         | P                                             |
| cross-reference                | Reciprocity of 延伸閱讀 links                                                                                                                                                                                                                                                               | Graph                | INFO                                                              | —                                                                                                                                                                                                                                        | M                                             |
| curation-consistency           | Enum validity and mutual exclusion of `curation`, `featured` and `verifiedVia`                                                                                                                                                                                                              | Enum                 | HARD (enums), WARN (rest)                                         | Prevents silent failures from typos.                                                                                                                                                                                                     | M                                             |
| fence-prose                    | Prose or footnotes wrapped in a code fence                                                                                                                                                                                                                                                  | Regex                | HARD                                                              | The criterion was kept narrow on purpose (LESSONS `gate-triggers-content-degradation-incentive`).                                                                                                                                        | M                                             |
| footnote-density               | A-F grade; footnote definitions never referenced in the body                                                                                                                                                                                                                                | Count                | WARN                                                              | 2026-09-20: a reference list with zero body citations graded A/B, a REFLEXES #82 proxy failure, now downgraded to C.                                                                                                                     | P                                             |
| footnote-format                | `[^N]: [Title](URL) — desc≥6`                                                                                                                                                                                                                                                               | Regex                | HARD                                                              | Prettier `<url>` autolink wrapping (2026-05-08); Japanese/Korean "same as" word order; desc threshold relaxed 10→6.                                                                                                                      | M                                             |
| footnote-url                   | HEAD reachability                                                                                                                                                                                                                                                                           | Network, opt-in      | WARN                                                              | 2026-10-08/09: numbered reference lists had no `[^N]`, so the check reported all-green over about 895 unchecked URLs.                                                                                                                    | M                                             |
| format-structure               | 延伸閱讀 and 參考資料 present, 30 秒概覽 blockquote, wikilink residue                                                                                                                                                                                                                       | Regex                | WARN; wikilink residue HARD                                       | —                                                                                                                                                                                                                                        | M for render-breakers, P for section presence |
| frontmatter-format             | Required fields, order, quoting, tags style                                                                                                                                                                                                                                                 | Parse                | HARD (missing), WARN (style); auto-fix                            | #884 conflict storm led to the pre-commit auto-fix.                                                                                                                                                                                      | M                                             |
| frontmatter-title              | Half-width punctuation (HARD); vague adjectives, length >45, People colon-sandwich (WARN)                                                                                                                                                                                                   | Regex                | WARN/HARD                                                         | 「國民」removed from the vague list (蘋果西打, 2026-05-11).                                                                                                                                                                              | P                                             |
| gh-footnote-leak               | GitHub-rendered `#user-content-fn` anchors                                                                                                                                                                                                                                                  | Regex                | WARN (soft-launch)                                                | Found 6 SSOT articles with 50 files affected.                                                                                                                                                                                            | M                                             |
| image-alt                      | Empty, generic or filename alt text                                                                                                                                                                                                                                                         | Regex                | WARN                                                              | —                                                                                                                                                                                                                                        | P                                             |
| image-health                   | File exists; no hot-links; 圖片來源 section; length-scaled media count (HARD in stage-4); duplicate inline src (HARD)                                                                                                                                                                       | Mixed                | HARD                                                              | 759 of 1,022 translation warnings were FPs (74%) until 2026-07-24. First duplicate-src version hit 125 articles, 108 of them FPs, so hero is now excluded (image_health.py:270-289). The count gate invites padding with the same image. | M (existence), P (count)                      |
| link-target                    | Casing and existence of internal links                                                                                                                                                                                                                                                      | Filesystem           | HARD (casing), WARN (existence)                                   | Percent-encoded paths were false-flagged as broken until 2026-07-23.                                                                                                                                                                     | M                                             |
| link-url-mangle                | Whitespace or `*` inside link destinations; CJK Commons `_NN` in italic captions                                                                                                                                                                                                            | Regex                | HARD, WARN                                                        | Prettier-caused; 24 PRs failed 2026-08-15.                                                                                                                                                                                               | M                                             |
| media-richness                 | Images ≥2 (WARN); iframe ≥1 (INFO)                                                                                                                                                                                                                                                          | Count                | WARN, INFO                                                        | The iframe hard gate was softened 2026-05-26 after 8/9–9/9 failures.                                                                                                                                                                     | P                                             |
| paragraph-rhythm               | Median paragraph <55 CJK; H2 with >8 paragraphs; media density band 1.2-2.0 per 1k characters; long-paragraph density; HARD at media >2.5 and median <55                                                                                                                                    | Count                | WARN/HARD                                                         | The old 0.8 ceiling mis-flagged 設研院, 天下 and 黃魚鴞, so the band was recalibrated (2026-06-04 and 07-12). Counted 9 paragraphs where the true count was 8 (外送專法).                                                                | P                                             |
| prettier-url-stability         | URL multiset unchanged after running prettier                                                                                                                                                                                                                                               | Run formatter        | HARD (pre-commit and release-pr only)                             | REFLEXES #100 (verify the file that actually lands).                                                                                                                                                                                     | M                                             |
| prose-health                   | About 20 dimensions: bullet density, hollow words, plastic phrases, 「不是X是Y」 variants, emdash, semicolon, English-style openers, run-on sentences, AI-metaphor words, ritual phrases, backstage leak, ledger metaphor, canned endings, stance vacuum, citation desert. Score budget ≤3. | Regex plus count     | WARN, scored; HARD only for emdash >15, semicolon >12, opener >10 | See "FP highlights" below.                                                                                                                                                                                                               | P (nearly all dimensions)                     |
| quote-fidelity                 | QF1: 「…」 quotes ≥12 CJK with a footnote within 12 characters, compared verbatim to the research report. QF2: lists superlatives.                                                                                                                                                          | Diff                 | WARN, INFO                                                        | FP when the report has no quote bank; a half-width comma FP was found in dogfood.                                                                                                                                                        | M (QF1)                                       |
| rationale-presence             | Four required `rationale` keys present                                                                                                                                                                                                                                                      | Presence             | WARN (strict categories), INFO (advisory), HARD (typo keys)       | Content depth deliberately not checked.                                                                                                                                                                                                  | P                                             |
| seo-meta                       | Title and description length, brand-prefix template, description equals title                                                                                                                                                                                                               | Count                | WARN                                                              | Non-zh threshold of 400 characters is still exceeded by 45% of English articles; the config says this is "現況門檻，不是目標".                                                                                                           | P                                             |
| spore-writing                  | Spore-prose rules                                                                                                                                                                                                                                                                           | Regex                | HARD                                                              | Applies to `docs/factory/SPORE-*`, not articles.                                                                                                                                                                                         | n/a                                           |
| subcategory-translation-parity | Subcategory label coverage across translations                                                                                                                                                                                                                                              | Lookup               | WARN                                                              | —                                                                                                                                                                                                                                        | M                                             |
| subcategory-valid              | `subcategory` in the taxonomy SSOT                                                                                                                                                                                                                                                          | Enum                 | WARN                                                              | 211 of 914 articles hit it, because the SSOT itself is incomplete.                                                                                                                                                                       | M                                             |
| terminology                    | PRC terms from a TSV list: A-class HARD, B-class INFO                                                                                                                                                                                                                                       | Wordlist             | HARD                                                              | `.china-terms.false-positives.tsv` (e.g. 博客來); LESSONS `terminology-misjudgment-direction-asymmetry`.                                                                                                                                 | M                                             |
| viz-health                     | Data modules must cite a source; no 「如上圖」; per-module geometry limits                                                                                                                                                                                                                  | Regex                | WARN; HARD in stage-4                                             | A Latin-colon heuristic had about 40% FPs and became a whitelist. Source-line presence is M; the 「如上圖」 ban is P.                                                                                                                    | M/P                                           |
| wikilink-target                | `[[X]]` resolves to a real article                                                                                                                                                                                                                                                          | Filesystem           | HARD                                                              | —                                                                                                                                                                                                                                        | M                                             |
| word-count                     | CJK characters ≥4500                                                                                                                                                                                                                                                                        | Count                | WARN; HARD in stage-4                                             | Trigger was 台灣無人機產業 at 3,273 characters. REFLEXES #69(g) cites AAMA compressing to pass a length gate and thinning the meaning.                                                                                                   | P (proxy for depth)                           |

**prose-health FP highlights** (`checks/prose_health.py`):

- The PUA-tone and media-anxiety detectors were removed on 2026-06-15 after 92-100% FPs across 814 articles (lines 47, 688, 1721).
- The first English-opener thresholds gave a 58% FP rate (line 140).
- 「值得一提的是」 gave 25/25 FPs, 「有兩個版本」 9/10, and 「變成」 4/5.
- The weight-metaphor regex needed a lookahead exclusion list (line 296).

### A2. Non-plugin checks that touch zh-TW articles

| Check                                                                                                          | What it does                                                                                                                                                                                                                                              | Class                                    | Strength                                   |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| `scripts/core/test-frontmatter.mjs`                                                                            | YAML parse, title/description/date/tags/subcategory, duplicate slug, translatedFrom                                                                                                                                                                       | M                                        | Hard on errors                             |
| Pre-commit `translatedFrom`, slug-consistency, credential scan                                                 | Translation and security hygiene                                                                                                                                                                                                                          | M                                        | Hard                                       |
| Pre-commit scope-pollution check                                                                               | Warns when a commit spans several narrative domains                                                                                                                                                                                                       | M                                        | WARN                                       |
| `research-report-health.py`                                                                                    | Tier depth: ≥25 distinct sources, ≥5 English, ≥5 primary, ≥8 confidence markers, ≥300 lines, §8 raw ≥120 lines, no `/tmp` pointers, process-noise ≤10 (line 146 TIERS; the process-noise cap is at line ~409). Also a Stage 0 gate for 觀點成型 sections. | P (counts as a proxy for research depth) | Hard (author-run)                          |
| `opening-readability.py`                                                                                       | Number density per 100 characters (warn 3.6, hard 4.7), average sentence length (38 and 49), qualifier-word repeats (4 and 6) in the first N paragraphs. Baselines set from the exemplar articles.                                                        | P                                        | Warn/hard; not wired into pre-commit or CI |
| `prose-flow.py`                                                                                                | Per-H2 long-paragraph density and visualization distribution                                                                                                                                                                                              | P                                        | Diagnostic only, exits 0 unless `--strict` |
| `fact-atom-diff.py`                                                                                            | Before/after multiset of quotes, numbers, footnotes, URLs, H2s                                                                                                                                                                                            | M                                        | Hard on FAIL (Step 3.8)                    |
| `curator-note-density.py`, `article-depth-audit.py`, `attribution-risk-audit.py`, `compare-article-quality.py` | Measure only; no gating                                                                                                                                                                                                                                   | P                                        | Instruments, not gates                     |
| `generate-dashboard-immune.py:83`                                                                              | Seven-weight "immune score" for the dashboard                                                                                                                                                                                                             | P                                        | Dashboard only                             |

### A3. Rules not instrumented (class S)

These exist in prose only, in `docs/editorial/QUALITY-CHECKLIST.md`, `EDITORIAL.md` or `REWRITE-PIPELINE-SINGLE.md`.

**From QUALITY-CHECKLIST.md** (the file's own footer says it is stale at v2.x):

- Five-finger test (驚訝點, two turns, curator line, read-aloud ending, one-sentence retell), lines 31-39. The same test is in EDITORIAL §十, line 1698.
- First name is a concrete person; 2+ real quotes with tone.
- Causal chain per turn; challenges woven in; not an encyclopedia list; narrative arc.
- Opening is one of five modes; ending is one of five modes and reads standalone.
- Plastic scan of the second half: "would the article lose information if this sentence were removed".
- Rich text counts, wikilink counts and footnote quantity (≥5, ≥2 primary, ≥1 English) are only quantity proxies.

**From EDITORIAL.md:**

- Core-contradiction anchor recurring in description, opening, middle and ending (line 441).
- Concrete anchor noun in every paragraph (line 459).
- Reverse explanation: testing the received view (line 482, 事實層 for the testing; the writing of it is 美學層).
- Curator-note quality: three allowed types, no summary (line 509).
- Transitions, enumeration discipline, social-media-as-material (lines 556-694).
- H2 restorable to subject-verb-object (line 694; the chronicle ban is instrumented, the restorability test is not).
- Six good endings and the ending self-check (lines 786-840).
- Register and the "plastic" essence (lines 851-960).
- European-style syntax: partly instrumented (about 20 regexes), but the conceptual diagnoses (cleft sentences, declarative openers) are admitted to be lexically indistinguishable from legitimate sentences (prose_health.py:160-200).
- Backstage leak, twelve shapes: only about 5 have a regex. The analysis-framework and grammar-recurrence shapes are explicitly human-only (prose_health.py:321-335).
- Hope-without-whitewash and PUA/anxiety register: no plugin (EDITORIAL line 1168).
- Documentary-not-sensational and the de-centering of living people's private disputes (lines 1280-1320); private-material granularity (line 1322).
- Fact triad: arithmetic, units and quotes are done by hand. Only QF1 and the footnote shape are mechanical.
- Naming rules (自稱台灣, 賽事脈絡稱名) are labelled 事實層 hard gate, but the "island" ratio is only a WARN proxy.
- Density balance (line 1455), media weaving and "the picture is described by the adjacent prose" (line 1482), and the 看圖一列 check.

**From the pipeline:**

- Stage 0 six core questions: `research-report-health` checks only that headings exist.
- Step 0.6.2 seven quality dimensions: a self-check table (`REWRITE-PIPELINE-SINGLE.md:498-510`).
- Step 2.7 seven self-checks; "Stage 2 hard gates" are checkboxes (lines 1205-1357).
- Title-plus-description spine sync, and "agent claims are leads, not oracles" (#31).

## Part B: Existing judge/reviewer machinery

### B1. Machinery found

**1. EDITORIAL-ROOM** (`docs/editorial/EDITORIAL-ROOM.md`, v1.2, 247 lines) and its prompts (`docs/pipelines/EDITORIAL-ROOM-PROMPTS.md`, 281 lines).

- Idea (lines 21-23, 27-29): fresh-context subagents, one role each, mutually exclusive tasks, a chief editor who rules. "Same brain must not write and review."
- Rooms and seats:
  - Projection room (Step 2.0-R, lines 73-80): structure, subtraction, flame/ethics, chief.
  - Prose-structure room (Step 2.5-R, lines 82-87): structure, thesis-delivery.
  - Fact room (Step 3.6, lines 89-91): points to REWRITE.
  - Chief room (Step 3.7, lines 198-230): 5-6 parallel Sonnet probes on facade payoff, per-paragraph spine, H2 restorability, link web, reading rhythm, and 立體地愛 when conditional. The probes see neither blueprint nor research report.
- Outputs (lines 98-139): a report with frontmatter `overall: pass|revise|block` and per-seat verdicts. It has a must-fix list of ≤7, an optional list of ≤5, a ruling on disagreements, and a repair list. Schema checked by `scripts/tools/editorial-room-health.py`.
- Gate (lines 143-153): block means at most 2 rounds, then escalate. Depth EVOLVE and A-class articles are HARD; Micro skips.
- Attack-and-defense round (lines 171-194): the writer answers each must-fix with `accept` or `defend`; one round only.
- Prompts: a shared prefix (read-receipt, no inventing "netizens said", block when footprint is thin) plus one block per seat (EDITORIAL-ROOM-PROMPTS.md:19-270).
- Evidence it ran: 102 files in `reports/editorial-room/`, committed 2026-07-15 to 2026-09-18. Examples: Shopping Design, 台灣早餐文化, 誰算低薪, 金鐘獎, 台灣油價機制與中油. The last commit is 2026-09-18 ("投影編輯室三席 revise, 必改七條").
- Current status: retired from the live pipeline on 2026-09-19. EDITORIAL-ROOM.md:204 says "現行單檔型不設多席編輯室，本檔留作歷史脈絡". The file still has `status: canonical`, and `EDITORIAL.md §〇` and EDITORIAL-ROOM.md:67 still describe seats reviewing N/A reasons. That is a live inconsistency.

**2. Cold readers.**

- The archived v9.9 pipeline ran 15 cold readers and a "cold-read station". Fresh Opus got only the finished text and was asked what confused it (LESSONS-INBOX.md:1437-1446).
- It was removed in the REWRITE-GUIDE v1.1 change of 2026-09-19 ("拿掉冷讀站，六站變五站", archive `REWRITE-GUIDE.md:8`).
- A different cold-read design exists in `reports/staging/humanize-brief-2026-09-19.md`: two fresh Sonnet readers get only the rewritten body. They are asked where they would stop reading, to retell it in three sentences, and which paragraph they would screenshot. The brief says the "想不想讀" question is "真正的閘門".

**3. Persona gap-audit** (`docs/pipelines/PERSONA-PIPELINE.md`). Twenty reader-brain angles, run after research. It is explicitly not an editorial seat (EDITORIAL-ROOM.md:238-240). Not used in the current single-file pipeline (callers list says "現行單檔型無 persona 站").

**4. Verifier fan-out** (`REWRITE-PIPELINE-SINGLE.md:195-225`). Orchestrator pattern with a tier table: Opus for viewpoint, Sonnet for research and 3.5 fact verifiers, a fresh Opus writer. Verifiers are "adversarial (prompted to falsify)", with ≥2 verifiers on quotes, attribution and award editions. Iron rule 3 (line 216): agent claims are leads, and the main session must re-verify.

**5. FACTCHECK-PIPELINE** (Phase 1-6, A/B/C tiers). Atom decomposition, source-authority audit, verbatim Ctrl-F, cross-claim arithmetic, triage ✅/⚠️/❌/🔴. Self-judge at lines 484 and 533 is a report section, not a grader.

**6. BENCH-PIPELINE** (`docs/pipelines/BENCH-PIPELINE.md:175-230`, `scripts/bench/scorer.py`). This is the only true LLM-as-judge in the repo, and it grades other models' answers about Taiwan, not articles.

- Axis A is deterministic.
- Axes B and D use rubric files (`bench/v0/prompts/sovereignty-direct.json`, D tiers 0-4, B tiers 0-3).
- REFLEXES #44 (`docs/semiont/REFLEXES.md:660`) moved the judge from OpenRouter Sonnet to a main-session Opus subagent. Reasons: reproducibility, reasoning trail written into the judgments JSON, one shared contract. Boundary: not for deterministic regex-checkable work, and above 1,000 responses cost needs re-evaluation. A disclaimer is needed when the judge and the judged are from the same family.

**7. Other LLM-in-the-loop tools.**

- `scripts/tools/terminology-llm-review.py` is a local Ollama model reviewing the term lexicon, with a human adjudicating the flags.
- `scripts/tools/compare-article-quality.py` compares an article with recent ones using only transparent structural densities. It states "evidence, not an LLM vibe score".
- `scripts/tools/review-stock-pick.py` only picks articles; it does not grade them.

**8. LLM-as-judge was explicitly deferred three times.**

- `checks/chronicle_lead.py:39` (density_balance).
- `checks/spore_writing.py:38` (Rule #16 scene-list-scene).
- `docs/pipelines/EVOLVE-PIPELINE.md:872` (a difficulty ladder labels "structural checks" as "需 LLM-as-judge", "難").

### B2. Scoring scales found

| Scale                                                                               | Where                                                                                              |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| prose-health score ≤3 pass, weighted per dimension                                  | `checks/prose_health.py` (~line 1138+)                                                             |
| A/B/C/D/F footnote grade                                                            | `checks/footnote_density.py:3-12`; scored 100/80/60/40/0 in `generate-dashboard-immune.py:343`     |
| PASS / PARTIAL / FAIL (hollow ≤3, five-finger, ending, word-count 4500 / 4000-4499) | `REWRITE-PIPELINE-SINGLE.md:2111-2117`                                                             |
| S/A/B article tiers by lines and sources                                            | `EDITORIAL.md:76-86`                                                                               |
| Rich-text defaults per tier                                                         | `EDITORIAL.md:1735-1745`                                                                           |
| Seven quality dimensions anchor (溫度, 人味, 故事, 策展, 觀點, 體驗, 歷史/社會關聯) | `REWRITE-PIPELINE-SINGLE.md:498-510`, not graded                                                   |
| Editorial room pass / revise / block                                                | `EDITORIAL-ROOM.md:98-153`                                                                         |
| Bench tiers 0-3 / 0-4                                                               | `scripts/bench/scorer.py`, `BENCH-PIPELINE.md:229-230`                                             |
| Research-report tiers depth / standard / hub                                        | `scripts/tools/research-report-health.py:146`                                                      |
| Immune score, seven weighted dimensions                                             | `scripts/core/generate-dashboard-immune.py:83` (docstring still lists six, with different weights) |
| `review-pr.sh` L2 quality 0-N                                                       | `scripts/tools/review-pr.sh:137-210`                                                               |
| T1/T2/T3 risk weights                                                               | `generate-dashboard-immune.py:72`                                                                  |

### B3. What was tried and abandoned, and why

**Abandonment of v9.9** (`docs/pipelines/archive/rewrite-v9.9-2026-09-19/README.md:7-9`; the header at `REWRITE-PIPELINE-SINGLE.md:26`).

- Cause: from v6.7 to v9.9 there were 87 commits, "每一段都是一次錯誤換來的，沒有一段是一次『悶』換來的".
- Trigger: on 2026-09-18 three articles (誰算低薪, 台灣油價機制與中油, 金鐘獎) passed the interactive six stations, 15 cold readers and three rounds of release editors, all green. 哲宇 reacted: "文謅謅、沒人味、像堆砌不像有主見的分析、過度強調數字".
- Same-day redo with the v6.7 single-file pipeline read noticeably better.
- Stated root causes:
  - The "third type" rule gave "不主張" a legitimate exit, so theses became meta-observations.
  - No research lane looked for people.
  - Each cold-reader "which scope?" question made the writer add another qualifier.
- Resulting freeze (`reports/staging/rewrite-consolidation-brief-2026-09-19.md` §三, §四):
  - Line cap of 2,300 in `.husky/pre-commit:49-60`.
  - Three things "不長回來": no cold-read station, no multi-seat editorial room, no meta thesis form.
  - Admission rule: errors become instruments; boredom becomes a rule, and only from a reader callout, each noting which callout and which article.
  - LESSONS `gate-ratchet-only-grows-on-errors` (LESSONS-INBOX.md:1559-1569): gates grew only on errors and never on boredom.

**Other abandonments and caveats:**

- The editorial-room seats and cold readers all graded against the writer's own blueprint thesis, so they could not see a wrong thesis (LESSONS-INBOX.md:1437, `self-consistent-gates-miss-reader-comprehension`).
  - On 2026-08-06 馬祖 passed 11 seats and the fact diff; 哲宇 said it was "寫得蠻混亂的".
  - Proposed fix: at least one seat that may not read the blueprint.
  - The 2026-09-18 oil-price case showed the cold-read station catching nine reader-visible errors that three projection seats, six probes, two verifiers and the finishing pass all missed.
- A cold seat has no source material, so the direction of its "A and B disagree" finding can be backwards (LESSONS-INBOX.md:1537, `cold-seat-attribution-inverted`).
- When two seats prescribe opposite fixes, there was no ruling doctrine (LESSONS-INBOX.md:1346).
- `reports/rewrite-evolution-evidence-2026-09-07.md` warns that "設計意圖不能自行證明閱讀效果" and that six "clean-context" seats still let an unsupported inference through. It suggests a cold reader who sees the body only, and who can ask for the thesis to be redone.
- PUA/media-anxiety regex detectors were removed on 2026-06-15 because they were semantic and not syntactic.
- The OpenRouter Sonnet judge was replaced by the Opus subagent (REFLEXES #44).
- The iframe hard gate was softened on 2026-05-26.
- The persona step moved to after research on 2026-07-06, because cold readers ask sharp questions that tilt the spine.
- The prose-flow "data-dense but no visual" gate was intentionally not made a gate: any threshold hit 35-60% of articles (archive `REWRITE-STAGE-3-VERIFY.md` ~line 313).
- The three-way gaming warning: gates invite content changes that satisfy them (LESSONS `gate-triggers-content-degradation-incentive`, cited in `image_health.py:270-289` and `fence_prose.py`).

**Principles recorded that bear on a grader design:**

- REFLEXES #69(g): "form gate ≠ meaning gate".
- REFLEXES #69: every self-report layer needs an external ruler, and "全綠" should trigger stricter review.
- REFLEXES #82: signals should touch ground truth, not a proxy.
- REFLEXES #66: calibrate thresholds on real output.
- `EVOLVE-PIPELINE.md:759-785`: a "production cost review" asks whether a gate has produced 5 articles with zero accepted findings.
- `EDITORIAL.md §〇` (lines 38-58): a two-layer model that already exists. The 事實層 hard gate has no N/A; the 美學層 default can be waived by writing "N/A：{rule}，{reason}". This came from the 2026-09-20 kwt-klure measurement (Discussion #1757) that stacked rules converged articles into a "Taiwan.md flavour".

## Part C: Semantic qualities the project demonstrably cares about, and the incident that set each

1. **Human voice and a reason to keep reading: the opening is a person doing something.**
   - Incident: 2026-09-18/19 callout on 誰算低薪, 油價 and 金鐘獎, which passed every gate (`reports/staging/humanize-brief-2026-09-19.md`).
   - Exemplars: 黃魚鴞, 居住正義.
   - Instrument that resulted: `opening-readability.py`.
   - The brief itself says the tool "抓不到有沒有人".

2. **A thesis that is a claim about Taiwan, not a meta-observation.**
   - Incident: the "third type" thesis problem on 2026-09-19.
   - Recorded in: `REWRITE-PIPELINE-SINGLE.md` header and description ("論點必須是一句對台灣的主張"); `docs/archive` README line 7.

3. **Fact, quote and attribution fidelity.**
   - Incidents: 2026-06-01 影視配樂 (a writer invented a quote that a spot-check caught); 2026-06-09/10 嘻哈 (a reader named 老莫 found a gloss error and quote drift, which led to quote-fidelity); 2026-08-18 two fabricated footnotes caught; 2026-08-27 報導者 accusations (LESSONS-INBOX.md:1562).
   - Anchors: EDITORIAL §十一 (the fact triad), REFLEXES #31.

4. **Writing addressed to the reader, not the editor: no backstage leak, no correction anxiety.**
   - Incidents: 2026-06-01 peilinwu0702 callout (correction-meta); 2026-08-03 黃崇仁 round 1 and 2 callouts, 12 shapes; 2026-08-04 EZWAY (a "searched and found nothing" turned into "the party said nothing").

5. **Natural Chinese rather than translation or AI voice.**
   - Incidents: 2026-07-19 高速公路 live review (semicolon, run-on, English opener); 2026-08-04 and 08-19 algorithmic-art callouts (same article twice, and the tool reported 0 hits while a human found 15).
   - Anchor: MANIFESTO §11.

6. **Reading rhythm: no paragraph walls, visuals where data is dense.**
   - Incidents: 2026-05-28 atomization drift; 2026-06-04 media density band; 2026-07-25 外送專法 (all gates green, but 哲宇: "文段太長／順暢感掉了／後段沒圖表").
   - Anchors: `design-prose-flow-station-2026-07-25.md`, `paragraph-rhythm.py`.

7. **Media weaving and image-caption truth.**
   - Incidents: 2026-05-11 NMTH "為什麼圖片用那麼少"; 2026-06-04 media directive; 2026-09-19 看圖一列 (金鐘獎, 低薪 and 油價 captions describing things not visible in the images).

8. **Tone toward people and Taiwan: documentary not sensational, hope without whitewashing, do not make a living person's private dispute the spine.**
   - Incidents: 2026-06-29 彎彎 ("不要公審人家的私生活"); 2026-06-15 PUA/anxiety evaluation; naming rules (自稱台灣, 賽事脈絡稱名).

9. **Depth, not a tiger head and snake tail.**
   - Incident: 2026-05-10 台灣無人機產業 at 3,273 characters, which led to the 4500 gate.
   - Counter-incident: the AAMA length squeeze thinned the meaning (REFLEXES #69(g)).

10. **Structure a stranger can follow: H2 you can read as a table of contents, not a chronicle, with a through-line.**
    - Incidents: 2026-04-18 (Cicada, 草東, 康士坦, via chronicle-lead); 2026-07-15 "小標≠副標" callout; 2026-08-06 馬祖 ("寫得蠻混亂的", the zero-knowledge reader could not say what it was); Shopping Design摘要尾句 and the 吸菸室 break.

Further qualities that appear in the sources but are secondary: density balance (2026-04-20 吳哲宇) and perspective coverage (Step 1.4.5).

## Gaps and cautions for the redesign

- **No grader exists for articles.** The only LLM-judge with a rubric is for model benchmarks. The article-grading-adjacent pieces are the retired seats and the standalone `humanize-brief` cold-read design.
- **`editorial-room-health.py` is not wired into any hook or workflow**, and EDITORIAL-ROOM.md and EDITORIAL.md §〇 still describe seats as live although the pipeline retired them.
- **Duplicated or stale checks:** `review-pr.sh` L2 and L3 duplicate prose-health with different thresholds; `QUALITY-CHECKLIST.md` self-describes as stale; `TOOL-INVENTORY.md` still says 13 plugins while the inventory is 34; `REWRITE-PIPELINE-SINGLE.md:2111` still has a 3-level PASS/PARTIAL/FAIL table that does not match the plugin's WARN/HARD word-count behaviour.
- **Prior art shows the grader needs its own safeguards:**
  - The grader must not read the writer's blueprint.
  - Seats with no source material can point the blame the wrong way, so rulings go to someone who holds the materials.
  - Gates measured through proxies get gamed, which is the `gate-triggers-content-degradation-incentive` pattern.
  - Admission of new rules should come from reader callouts rather than from errors.
