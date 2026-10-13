---
title: '2026-10-14 twmd-feedback-triage — 零回報第十九輪，寫入端健檢長出第四層'
description: '沉默 14.3 天連續第二天刷新紀錄；兩道對賬全綠；OAuth 那半從昨天的手寫查詢落成儀器，四條告警分支先過正控制才取讀數'
type: 'session-memory'
session: '2026-10-14-071629-twmd-feedback-triage'
date: 2026-10-14
---

# 2026-10-14 twmd-feedback-triage — 零回報第十九輪，而昨天手寫的那把尺今天變成儀器

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（最大缺口 review_coverage 18.8，少 20.3 分）/ Q13 anti-bias=PASS / Q14 cross-session=PASS

**Session span**：2026-10-14 07:12 → 07:30 +0800（cron fire 07:12，commit 時間見文末）

繼承 `2026-10-14-064142-twmd-spore-harvest-am` 的 handoff（非本班職權者原樣傳遞，明細不重抄，REFLEXES #74）。

## 轉錄那半：佇列空的第十九輪

`node scripts/feedback/triage.mjs` 讀到 `fetched 0`，`--commit` 照樣跑完（HG13：整條不跑等於保管那半跟著轉錄那半一起消失）。`file=0 reject=0 skip=0 hold=0`，沒有一筆要 `--show` 讀全文、沒有一筆要 `--exclude` 攔下。

兩道對賬都綠：`archive-reconcile=88/88 ✅`、`comment-reconcile=87/88 · 上游已刪留言 1 份紀錄,git 留著: #1252 ✅`。那個 87/88 是主權層正常運作的長相，不是破口：7/29 那則答錯的留言在 GitHub 被刪掉，git 這邊留住了。`archive-comments-synced=0` 今天分得出是「沒有新留言」而不是「一則都抓不到」，因為 reconcile 真的拿到了 88 份紀錄的線上則數。

機器身份（HG11）：`ghs_` 開頭、`{"issues": "write", "metadata": "read"}`、範圍 `frank890417/taiwan-md` 一個庫。

## 三段事實：沉默連續第二天刷新紀錄

最近一筆回報停在 2026-09-29，距今 **14.3 天**。歷史最長到達間隔是 12.6 天（2026-06-16→06-29，全庫 91 筆），所以這是觀測過最久的一次沉默，而且昨天（13.3 天）才剛第一次破紀錄，今天又多一天。

讀取端沒在漏接（任何 status 的新列都會排到那個排序最上面）。寫入端四層今天全綠。**沉默幾天該當成警報仍然不由我決定**，那是閾值。昨天已經連同三個選項與推薦預設送進 [OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #103 等哲宇，今天不重開一筆（REFLEXES #74 同 SPOF 不重複登記），只把讀數更新在這裡。

## 昨天手寫的那次查詢，今天變成第四層

10-13 那班為了把「讀者登不登得進來」問掉，手寫了一次唯讀 GET `/auth/v1/settings`，並在 handoff 寫明：**第二次需要它就落成 flag**。今天就是第二次。沉默連兩天刷新紀錄，而「登入這條路」正是判斷安靜是不是真的安靜要看的東西，而昨天那個結論帶的是昨天那一刻的時間戳，不是今天的讀數（REFLEXES #67）。這條線已有四次同樣的先例（`--show` 8/31、intake-age 9/10、intake-stats 10/10、intake-health 10/11），都是絆到第二次才動手。

`parseAuthSettings()` 是純函式，四種讀數分開：server 端一個 provider 都沒開／出貨 bundle 宣告了但 server 端沒開（讀者看得到按鈕、按下去進不來）／`disable_signup=true`（舊帳號登得進來、新讀者不行）／看不懂的回應回 `unknown`。

兩個配套修補同波落地。**未涵蓋清單改成條件式**：只有這層真的量到（`ok` 或 `broken`）才把 OAuth 從清單拿掉，回 `❔` 時它自動回去：沒量到不准從清單上消失，否則這支健檢會在自己最瞎的那天看起來涵蓋最廣（REFLEXES #85）。**bundle 層成功時也印一列**：舊版只在失敗時 push，健康的那天報表印兩層、pipeline 的表列三層，而判讀行數的是印出來的那幾層，於是有一層在健康時是隱形的（這筆是 10-13 handoff 記下的）。

**先驗再用**（REFLEXES #99）：新層的四條分支今天用本機 fixture 各跑一次，全部確認會叫：healthy `✅`／provider 關著 `⚠️`／`disable_signup=true` `⚠️`／auth 503 `❔`，而且 `❔` 那次 OAuth 確實回到未涵蓋清單。驗的是出貨的那份程式碼（`FEEDBACK_HEALTH_SITE` 指向本機 fixture），不是另外手寫一份邏輯（驗替身等於沒驗，REFLEXES #100）。全部確認之後才對 production 取讀數：

```
✅ 站上 bundle：首頁指得到 FeedbackWidget chunk,抓得下來（40017 bytes）
✅ 站上表單的 backend：mode=supabase · URL 有 · 金鑰 inline（長度 46,值不印）· providers=google,github,email
✅ 金鑰與資料表：HTTP 200 · 金鑰還認得、表還在 · 匿名 select 回 0 列
✅ 登入這條路：HTTP 200 · server 端開著 github／google／email · disable_signup=false
❔ 未涵蓋：登入讀者的 INSERT 過不過 RLS
```

讀數跟 10-13 手寫 curl 的結果一致。測試 84/84 綠（新增 7 條）。純讀取面、GET 不 POST、不碰判準、不碰閾值、不對外開口，HG8 不動。剩下沒蓋到的只有登入讀者的 `INSERT`，而那層要有登入態或真的寫一筆才驗得到，後者會在讀者看得到的表與主權層留一筆假回報，代價未定留人類（LESSONS 候選 (c)）。

三層文件同步：pipeline 升 v1.15、薄殼 skill、git 側 routine prompt 改完跑 `routine-sync.py --apply`，收官印「三層一致」，機器版存證落 `reports/routine-prompt-drift/2026-10-14-exhibitions-mac-mini-local-twmd-feedback-triage.md`。

## Handoff 三態

繼承 `2026-10-14-064142-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細不重抄，REFLEXES #74）：

- ⏳ pending（延續，收件席位 `twmd-maintainer-daily`）：`duplicated-lang-prefix` 404 家族。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`，**今晚 22:00 是第一個會錯過的時點**。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）`。
- [ ] pending（延續，收件席位 `twmd-maintainer-daily`）：〈大安溪倚天劍〉地圖標記 geo。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議。
- [ ] pending（延續，收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班是第十五個繞開的班（vc=15）：工作樹有 babel 正在寫的檔，本班只 stage 自己的六個檔。

本班處理掉的：

- ~~pending：`--intake-health` 未涵蓋的 OAuth 那半，第二次需要它就落成 flag~~ → **retired by 2026-10-14-071629**（第四層「登入這條路」上線，四條分支過正控制）。
- ~~pending：健檢的「站上 bundle」層成功時不印任何一列，報表層數跟 pipeline 表對不上~~ → **retired by 2026-10-14-071629**（成功時也印一列。今天兩次執行都沒再出現 10-13 那個 `fetch failed` 抖動，計數 0）。

本 session 新 handoff：

- ⏳ blocked（延續，收件席位：哲宇）：`OBSERVER-QUEUE #103`，沉默幾天該當警報。今天讀數更新為 **14.3 天，連續第二天刷新紀錄**，佇列那筆的 13.3 天是 10-13 的時間戳，不另開新筆。
- [ ] pending（收件席位：下一班 `twmd-feedback-triage`，零判斷、條件續傳）：寫入端唯一還沒蓋到的是登入讀者的 `INSERT`。唯一驗法會留一筆假回報，**不要自己決定去戳**（LESSONS 候選 (c)，代價未定留哲宇）。

## Beat 5 — 反芻

昨天那班寫下「十八輪都在手動扮演一個從來沒被設過的閾值」，今天第十九輪，那句話仍然成立，只是多了一天。今天真正值得記的是另一件事：**這條線修補自己的節奏已經穩定成一種形狀**。昨天手寫一次查詢、把它寫進 handoff 並標明「第二次就落成 flag」，今天第二次需要它，二十分鐘就變成一支會自己叫的儀器。四次先例排起來看，這條線沒有一次是「讀到 handoff 就動手」的，全部都是親手再絆一次才落地。handoff 傳得動資訊，傳不動急迫性，這件事已經被量到第五次了。

加完第四層之後有一個細節我差點做錯。最順手的寫法是把報表那句「未涵蓋 INSERT 與 OAuth」直接改成「未涵蓋 INSERT」，反正今天量到了。可是那會讓這支尺在它最瞎的那天（auth 端點問不到、回 `❔`）印出最有涵蓋力的那句話。所以改成條件式：收掉的條件是真的量到，沒量到就自動放回清單。這是同一條紀律第三次長在同一支尺上：空集合不准借用「沒事」的長相，第一次是 v1.13 把層數寫死，第二次是 10-12 正控制揪出的恆真判讀行，這次是未涵蓋清單。

還有一件事今天對上了：昨天改掉空集合假綠燈的那個修補，昨天就真的叫了一次。今天我加的四層正控制，是同一種動作在不同層的重複，講的都是**不要引用一支沒看過它叫的尺**。沉默破紀錄的這兩天，所有判斷都壓在這幾盞綠燈上，而綠燈正是它們最沒有資訊量的那一態。

🧬

---

_v1.0 | 2026-10-14 07:30 +0800_
_session twmd-feedback-triage — 零回報第十九輪：沉默 14.3 天連兩天刷新紀錄 / 兩道對賬 88/88 與 87/88 全綠 / 寫入端健檢長出第四層「登入這條路」，四條分支先過正控制才取讀數 / 剩 INSERT 未涵蓋_
_誕生原因：cron routine 每天 07:00 把讀者回報轉成 issue；本輪佇列空，而昨天留給本席位的兩筆零判斷交接今天都到了兌現條件。_
_核心洞察：收掉一塊未知的條件是真的量到它，不是今天剛好量到過——否則儀器會在自己最瞎的那天看起來涵蓋最廣。_
_LESSONS-INBOX 候選：無新條目——「第二次絆到才落地」是 `deferred-fix-lands-on-recurrence-not-on-reading` 的第五次驗證，照 LESSONS v2.3 規則 (a) 已在 pipeline v1.15 changelog 記驗證行，不開新 entry。_
