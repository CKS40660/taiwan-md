---
title: '2026-10-16 twmd-feedback-triage — 留言同步那條線第一次在健康的時候被看見'
description: '佇列空一輪，四層健檢全綠；archive-comments-synced=1 把昨天那則維護者回覆收進主權層，而這個 1 正是這條線平常量不到的成功讀數'
type: 'session-memory'
session: '2026-10-16-071157-twmd-feedback-triage'
date: 2026-10-16
---

# 2026-10-16 twmd-feedback-triage — 那個 1 比十九個 0 說得多

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（最大缺口 review_coverage 18.8，少 20.3 分）/ Q13 anti-bias=PASS / Q14 cross-session=PASS

**Session span**：2026-10-16 07:11:57 → 07:20 +0800（cron fire 07:11:57，收官 commit 的 hash 與時間見 `git log`——不把自己的 hash 寫進自己，LESSONS `rebase-invalidates-hashes-already-written-into-prose`）

繼承 `2026-10-16-064254-twmd-spore-harvest-am` 的 handoff（非本班職權者原樣傳遞，明細不重抄，REFLEXES #74）。

## 轉錄那半：佇列空一輪

`node scripts/feedback/triage.mjs` 讀到 `fetched 0`。昨天那筆勘誤之後沒有新的回報，沉默 1.6 天，離歷史最長 14.7 天還很遠，三段事實沒有一段指向要停下來查。

`--show-all` 照樣跑了一次，印出 0 筆。HG13 要求的是「讀完全文才准動手」，沒有東西可讀的那一輪，這道閘門的讀數是空的而不是跳過的——兩者在報表上長得不一樣，印的是 `show-only · 印出 0 筆全文 · 未開任何 issue、未回寫任何 status`。

佇列空也照跑 `--commit`，因為不跑的代價是留言 sync 與兩道對賬跟著消失（LESSONS `zero-input-cycle-drops-the-reconciliation`，這條線第三個 instance 之後就寫進 pipeline 了）。

## 那個 1：成功路徑第一次有讀數

`archive-comments-synced=1`。被收進來的是昨天 issue #1851 下面哲宇的回覆，進了 `docs/feedback/archive/2026-10/de2f7502-....md` 的 §溝通紀錄。

這個數字值得單獨記一筆，因為 HG12c 當初誕生是為了修「0 同時是沒有新留言跟一則都抓不到」，而修法（`fetchIssueComments()` 抓不到回 `null`、真的沒留言才回 `[]`）補的是**失敗**那半的辨識度。成功那半一直沒被觀察過：這條 routine 大多數輪次沒有新留言，所以 sync 真的把一則文字從 GitHub 搬進 git 這件事，只有在剛好有人回覆的那一天才看得見。今天是那一天，而它確實搬對了（逐字核過 diff，26 行全是哲宇留言的原文，沒有被改寫）。

跟 v1.14 那次正控制是同一個形狀的另一面：那次講的是「告警分支沒人看過它叫」，這次是「成功分支沒人看過它動」。兩種都是綠燈的資訊量問題，只是一個綠燈代表沒事、一個綠燈代表沒事可做。

## 寫入端四層全綠，第五層照舊誠實空著

| 層              | 今天的讀數                                                                       |
| --------------- | -------------------------------------------------------------------------------- |
| 站上 bundle     | ✅ 首頁指得到 `FeedbackWidget` chunk，40,017 bytes                               |
| 表單的 backend  | ✅ `mode=supabase`、URL 有、金鑰 inline 長度 46、`providers=google,github,email` |
| 金鑰與資料表    | ✅ HTTP 200、匿名 select 回 0 列（RLS 正確地什麼都不給外人看）                   |
| 登入這條路      | ✅ HTTP 200、三個 provider server 端開著、`disable_signup=false`                 |
| 登入讀者 INSERT | ❔ 未涵蓋（要登入態或真寫一筆，後者會留假回報）                                  |

第五層昨天拿到過一個帶時間戳的實證（讀者 10-14 16:13 真的送進一筆，RLS 放行），而今天報表仍然印 `❔`。這是對的：昨天那個讀數帶的是昨天那一刻的時間戳（REFLEXES #67），綠燈不能從別處借，也不能從昨天借。

## 兩道對賬

```
archive-reconcile=89/89 ✅
comment-reconcile=88/89 · 上游已刪留言 1 份紀錄,git 留著: #1252 ✅
```

那個 88/89 是主權層正常運作的長相，不是破口——7/29 答錯的留言在 GitHub 被刪掉，git 這邊留住了。這個方向（archive > 線上）照 HG12c 的表就是「記錄不報警」。

## 收官 checklist

| 檢查項                       | 狀態                                    |
| ---------------------------- | --------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                      |
| Timestamp 精確               | ✅（`git log %ai`）                     |
| Handoff 三態已審視           | ✅                                      |
| CONSCIOUSNESS 反映最新狀態   | ✅（警報走 derived 層，本班無新增維度） |
| 自我檢查工具 PASS            | ✅（prose-health 見 pre-commit）        |

## Handoff 三態

繼承 `2026-10-16-064254-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細不重抄，REFLEXES #74）：

- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`，下個時點 10-21。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼後要隔兩晚才生效的三選項。
- [ ] pending（延續，收件席位 `twmd-data-refresh-am` 或 maintainer）：文章數與 embeddings zh 索引固定差 9 篇（1,133 對 1,124）。固定的差先當定義不同。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議。
- [ ] pending（延續，收件席位 `twmd-spore-harvest-am` 等孢子線各班）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先 `select_browser` 回 `6a0a1276` 等零判斷條件續傳項，原樣傳遞。
- [ ] pending（延續，收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班是第十七個繞開的班（vc=17）：工作樹有 babel 正在寫的四十幾個譯文檔（writer PID 13250／14411／91989／92657），本班只 stage 自己的兩個檔。

本班處理掉的：

- ✅ `OBSERVER-QUEUE #103` 昨天那班已經把前提更新到最新（沉默在 14.7 天結束），今天沉默 1.6 天，前提沒有過期，不需要再補一行。決定本身仍是閾值，留哲宇。
- ✅ 昨天交接的 `duplicated-lang-prefix` 404 家族，今早 `twmd-data-refresh-am` 已用「整天只剩 60 筆」驗收收掉，本班不再往下傳。

本班新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`，不急）：HG12c 的成功路徑今天第一次被觀察到真的搬了一則留言（`archive-comments-synced=1`，逐字核過）。失敗那半 2026-08-08 就分層了，成功那半從誕生到今天只在「剛好有人回覆」的日子才看得見，所以它的正控制一直是順便拿到的、不是驗出來的。要不要比照 v1.14 的 `FEEDBACK_HEALTH_SITE` 做法，讓出貨的那份 sync 程式碼對一個 fixture issue 跑一次，把這條線的成功分支也變成隨時驗得到的東西。
