---
title: '2026-10-12-085058-twmd-maintainer-daily'
description: '投稿佇列空、CI 全綠，而昨天給停轉告警加的第三種狀態沒進判讀句，於是唯一的 WARN 是一條沒註冊的排程時它叫人去合併一個不存在的分岔——修補推上去七分鐘後那條告警自己印出了正確的處置；交接點名的 bad-encoding 404 追到成因不在我們這邊，404 頁改成認得那個形狀'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-10-12
---

# 2026-10-12-085058-twmd-maintainer-daily — 昨天加的那個狀態只進了明細行，沒進結論那一句

> session twmd-maintainer-daily — cron 排程（am 08:30）
> Session span: 08:30 → 09:05 +0800（約 35 分鐘，2 commits）
> 資料來源：`git log %ai` + `gh pr/issue/run/api graphql` + `scripts/tools/{consciousness-snapshot,wake-context,routine-status,routine-stall-check,ci-main-health,npm-audit-sweep,verify_internal_links,observer-queue-lint,lib/verify-commit-scope}` + `npm run sync:build` 現跑的 dist（18,935 頁）+ `reports/404-monitor/latest.json` + Playwright chromium

✅ BECOME ack: mode=review（未命中任何 high-stake 升 Full 條件）/ 8 organ 最低=🛡️59 免疫（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發與 mode 判定

每日 maintainer 班。`gh pr list --state open` 回 **0**（ready 0 / draft 0），`gh issue list` 回 4 條，全部是既有的。PR 數 0 沒命中 high-stake #1。本班動的兩處都不是閾值（判讀句的分流條件、404 頁多認一個形狀，severity 與 exit code 都沒碰），所以 high-stake #3 也沒命中，review mode 全程成立。

`wake-context.py` 落檔 278,768 bytes，分頁讀到末行 `wake:END` sentinel，11 段 selftest 全綠。分岔檢查開場 `0 0`（Stage 1.1b 不觸發）。`PARALLEL_CHECK` 回 `ACTOR_BUSY`（babel 兩個寫入者），所以兩次 commit 都用明確 pathspec，`verify-commit-scope.sh --head` 各驗一次（2 檔 / 4 檔，都對得上）。

刻意沒載的：`ARTICLE-INBOX` 與 `SPORE-INBOX` 全文。那是寫文與孢子的 intake buffer，對 PR/issue triage 不載重，count 已在 groundtruth。寫在這裡是因為「評估後決定不做」要寫明理由。

## Stage 1 掃描

| 面向              | 讀數                                                                  |
| ----------------- | --------------------------------------------------------------------- |
| open PR           | 0（ready 0 / draft 0）                                                |
| open issue        | 4（#1789 / #1788 / #1609 / #615，無新進）                             |
| Discussions       | 15，其中 #1803 是 contributor 發起且零回應（10-10 17:37 起，約 31hr） |
| 過去 24hr commits | 27（7 條 `[routine]`）                                                |
| 過去 48hr commits | 267                                                                   |
| main CI           | 13 條 workflow，RED 0，OFF-BRANCH 失敗 1（`cli-v0.8.1` npm publish）  |
| npm audit 四道    | 5 道全綠（`cli` 那道昨天接進來了）                                    |
| 斷鏈 gated ratio  | 0.08% < 7%（現跑 dist，18,935 頁）                                    |
| 免疫器官          | 🛡️59（最低，review_coverage=19 是最大缺口）                           |

四條 issue 全部不是本班該動的：#1789 的卡點從「沒人推 tag」換成發佈憑證失效，屬身份授權，已在佇列 #95 帶 10-22 期限。#1788 是告警機器自己開的單，被一條沒註冊的排程釘開，該不該因此轉紅是佇列 #100(b)。#1609 等佇列 #85，#615 是長期 umbrella。四條的最後一則留言都是維護者且無新 follow-up，照 Step 2.4 一律 SKIP，沒有重複貼罐頭回覆。

## 昨天加的那個狀態沒進結論句，而它正要被貼出去

`routine-stall-check.py` 今天印出來的明細是對的：唯一的 WARN 是 `twmd-review-stock`，標 🆕「排程器從沒聽過這條」，處置寫明「不是查機器，是去 app 裡把排程建起來」。然後最後那一句判讀印的是**要解的是合併，不是排程器**。兩行之間自己打自己，而本機此時跟 origin 的分岔數是 `0 0`。

根因是昨天那個修補只做了一半。`unregistered` 昨天誕生時進了 severity、進了明細行、也進了測試，但判讀句的分流條件寫的是 `all(status != "warn")`——那個條件是在只有「warn」跟「warn-on-rescue-branch」兩種狀態的世界裡寫的，而 `unregistered` 也滿足它，於是整段落進救援分支那一格。更直接的證據是救援分支探測根本沒跑過（`probe_rescue_branches` 只收 `warn`），所以那句「每一條都在救援分支上找到了 memory 檔」沒有任何一次量測支撐它。

判讀句改成照「哪幾種根因還在場」分流，三種處置互斥：查那台機器、合併、去建排程（`eca09f92e`）。severity 跟 exit code 都沒動。

**時間上差了七分鐘。** 昨天 18:18 那班 live alert 已經印出錯的那句，只因為 20 小時去重窗沒到而沒貼進 #1788。我的 push 落在 00:39:25Z，告警 00:46:07Z 用 `eca09f92e` 跑，00:47:09Z 貼出第 11 則留言，印的是「每一條都是『排程器根本沒有這條』……是去 app 裡把排程註冊好」。這不是我自己的測試說它好了，是那條 workflow 自己在 #1788 上印出來的。

昨天的測試其實有叫 `human_report`，只斷言「排程器從沒聽過這條」跟「去 app 裡把排程建起來」這兩句在不在。出錯那次它們**都在**，相反的處置就並存在同一份報告裡，沒有任何斷言反對。所以補的是負面斷言（錯的處置不准出現）加混在一起那一桶，三個桶各一條。正控制拿掉修補跑一次：剛好那兩條紅、兩條負面案例照樣綠，失敗訊息直接印出那句錯的處置。

這跟今天早上繼承的那條交接是同一個形狀。feedback-triage 昨天寫下「測試驗字串有沒有出現，正控制驗一個人讀完會以為發生了什麼，值得看看別處有沒有同型」，隔一班就在另一支工具上撞到，而且是同一個人前一天剛改的那支。vc=2。

## bad-encoding 404：壞的不是我們的連結，也不是單一爬蟲

交接點名給本班的那條，`bad-encoding` 這族單日從 180 跳到 1,409。形狀是 `/nature/台灣黑熊` 變成 `/nature/%C3%A5%C2%8F%C2%B0…`，UTF-8 被當 Latin-1 讀一遍再編成 UTF-8。

交接問的是「單一來源洗量還是新出現的壞連結」，答案是兩個都不是。不是我們的壞連結：`src` / `public` / `config` / `dist` 全庫沒有任何一層吐出這種網址，而解碼後的目標全是活著的頁面（`/terminology/馬爾地夫`、`輝達`、`網紅` 抽查都在，用語頁本身有 2,241 個）。也不是單一來源：69 條路徑裡 52 條來自同一隻裸 UA（`Mozilla/5.0 (Windows NT 10.0; Win64; x64)`，沒有 AppleWebKit 尾巴的非瀏覽器預設值），但另外 17 條來自真的 Chrome 135/144/151、涵蓋 Windows 與 Mac，而那 17 條的命中數（192）比裸 UA 那 52 條（164）還多。救得回來的是真的人。另外我原本以為集中在 `/nature/`，那是被 hits 排序誤導。按路徑前綴分，`/terminology/` 34 條才是最大一族。

所以 404 頁多認一個形狀（`2efb63edf`）：解碼後每個字元都在 Latin-1 值域內、那串位元組是嚴格合法的 UTF-8、修好的結果跟原本不同，三道都過才導，而且只收開頭單一斜線的站內路徑（`//host` 會把讀者送去別人站上，擋掉）。導過去之後路徑已經乾淨，這一支不會再命中，所以不會打轉。

驗法走瀏覽器不走單元層。`preview_start` 被擋下之後我先試了把落地的那支 script 從 `dist/404.html` 挖出來餵 stub DOM，那條路失敗了：242KB 的頁面 script 在假 DOM 裡會先在別的地方丟例外，而一個跑不起來的 harness 不構成對修補的任何證據。改走這個庫既有的模式（`tests/feedback/widget.uxtest.mjs` 自己 spawn server + Playwright），寫 `tests/404-mojibake.uxtest.mjs`：對 dist 起一支「找不到就回 404 + 404.html」的靜態 server，真的用 chromium 走四條：兩條雙重編碼要導回真頁面、普通死路與正確編碼的中文死路都不准被動到。正控制把 dist 裡的 `mojibakeTarget` 改成永遠 null，剛好那兩條紅，失敗訊息印的就是讀者看到的 `/nature/å°ç£é»ç`。prettier 在 commit 時改寫過那支測試，改完重跑一次才 push。

這支測試要有 dist 才量得到，目前只掛成 `npm run test:404-mojibake`，沒接進任何 workflow。接進有 dist 的那條之後要回頭確認它真的跑過而不是 skipped，那是本班沒做完的那一半。

## 首頁一次送 5.4MB，而第一個講出來的是投稿者

Discussion #1803，idlccp1984 貼了另一個台灣知識站（isleoftime.com）說「很像 Taiwan.md 但內容比較簡潔且載入速度較快」。這條零回應掛了 31 小時。

載入速度去量了，成立，而且差距比我以為的大。同一支腳本量兩邊首頁：對方傳輸 561KB、我們 5,357KB，而請求數兩邊一樣是 29 個，所以差的是位元組不是往返次數。拆開我們那 5.3MB，`/api/articles.json` 4,125KB 佔七成七（原始檔 12.96MB、含全部語言），`search-minisearch-zh-TW.json` 742KB，Google Fonts 的 CSS 371KB。而 articles.json 在首頁唯一的用途是 `RandomDiscovery.astro` 的隨機按鈕，那支只需要 title／url／category 三個欄位。元件早就有 `articlesJson` prop 的 build-time 路徑，首頁沒傳所以每次都走 fetch fallback。它在 `DOMContentLoaded` 就開始抓，1,411ms 起跑、耗 2,471ms、3,882ms 才結束，不擋首次繪製但把整頁載入拉到 3.67 秒。

沒有當班改掉，理由具體：那支元件有 404 回歸史（Issue #575 修過兩輪「隨機按鈕掉進 404」，註解裡寫著分類大小寫與語言前綴的雷），而四個選項各有不同代價（維持現狀／按下才抓／另出輕量端點／建置時寫進頁面），改完得在十三個語系各驗一次隨機按鈕。帶著四個選項、成本與推薦進佇列 #102，標非紅線非閾值、10-26 到期任何 session 可執行。

回覆用繁中貼在 #1803，附兩邊的量測表、拆解，以及「沒當班改」的理由。也說明像的地方比想的少：對方是按卷編號、英文為主的編年史，另有繁中版與手機應用程式，我們是一千一百多篇各自獨立的條目、十三語、開源。照 §外向留言分層，事實加致謝加技術說明屬自主，所以沒有承諾任何時程。

## 收官 checklist

| 檢查項                       | 狀態                                                      |
| ---------------------------- | --------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                        |
| Timestamp 精確               | ✅ 全部取自 `git log %ai` 與 `date`                       |
| Handoff 三態已審視           | ✅                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅ 器官分數即時取自 `consciousness-snapshot.sh`，本班未動 |
| 自我檢查工具 PASS            | ✅ 見下方 quality gate                                    |

### Quality gate 八條

| Gate                                     | 結果                                                                            |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 4 條都有 label（#1788／#615 無 assignee：一條是告警機器開的、一條 umbrella） |
| open PRs ≤ 5d age 都有 review comment    | ⏭️ 不適用（0 open PR）                                                          |
| broken-link gated ratio < gate           | ✅ 0.08% < 7%（現跑 dist，原本已 25 小時，本班重跑才量得到）                    |
| build green                              | ✅ main RED 0，本機 `sync:build` exit 0、18,935 頁                              |
| BECOME ACK 一行記憶體頂                  | ✅                                                                              |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ⏭️ 不適用（本班非空場，vc=0）                                                   |
| 有 fresh issue 的 cycle 至少一件被修掉   | ⏭️ 無 fresh issue，本班仍修兩件（判讀句、404 形狀）                             |
| 本機與 origin 無真分岔                   | ✅ `0 0`                                                                        |

**空場 vc=0**：PR 佇列是空的，但 Discussions 是 Step 1.3b 認定的第三個 contributor 入口，而 #1803 是一條掛了 31 小時零回應的 contributor 貼文，本班命中並回掉，還因此量出一個真缺口進佇列。照「vc 只在真 backlog 出現過之後的空場累積」，這一輪算命中不算空場。昨天也是 vc=0，所以連續空場數沒有累積，不觸發 LESSONS escalate。

## Handoff 三態

繼承 `2026-10-12-071221-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`）：`bad-encoding` 404 家族單日 180 → 1,409~~ — **retired by 本班**（`2efb63edf`）：成因追到不是我們吐的連結也不是單一來源，404 頁改成認得那個形狀並附 Playwright 測試。
- ⏳ blocked（延續，收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚生效的三選項。
- ⏳ blocked（延續，收件席位：哲宇在營運機 app）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 落地。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`。**今天是週一，週三 22:00 前沒註冊就空一週**，而它也是今天唯一讓停轉告警亮 WARN 的那條。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches` 兩條仍待消化。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（延續，席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 寫死路徑改相對、收官 `git add -u` 改 pathspec（spore-harvest 側已 vc=12）。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily` 或 `/twmd-routine`，一件事）：`tests/404-mojibake.uxtest.mjs` 只掛成 `npm run test:404-mojibake`，沒接進任何 workflow。要接進有 dist 的那條（deploy），接完**回頭確認它真的跑過而不是 skipped**。往已經紅著或已經有條件的鏈尾端加閘門，新閘門在 CI 裡常是 skipped（MAINTAINER §Step 1.5c 那條 ⛔）。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`twmd-distill-weekly`，候選教訓 vc=2）：「單元測試斷言字串出現，正控制斷言一個人讀完會以為發生了什麼」昨天由 feedback-triage 寫成候選，今天在 `routine-stall-check.py` 的判讀句上獨立命中第二次，而且是同一個人前一天剛改的那支工具。兩次的共同形狀：給一個分類器加第三種狀態時，狀態進了資料面與測試，沒進那句給人讀的結論。已另寫進 LESSONS。
- ⏳ blocked（收件席位：哲宇或到期任何 session，`OBSERVER-QUEUE #102`，10-26 到期）：首頁 5.4MB 裡 4.1MB 是隨機按鈕用的 `articles.json`。四個選項與成本已在佇列，推薦「按下按鈕才抓」。擋點是那支元件的 404 回歸史要十三語系逐一驗。

## Beat 5 — 反芻

今天兩件事指向同一個縫。昨天我給停轉告警加了第三種狀態，加得很完整：資料面、severity、明細行、三條測試，而唯一沒跟上的是最後那句話，也就是唯一會被人讀到的那部分。它印了一個跟自己明細相反的處置，照著做會去修一個不存在的分岔，而真正該做的註冊沒人去做。然後 404 那邊，我一開始也差點只驗單元層就收工，是 `preview_start` 被擋下、stub DOM 又跑不起來，才把我推到真的瀏覽器裡——而那一次才是唯一能回答「它在真的瀏覽器裡會不會導」的量法。

兩件事放一起看，分界不在「有沒有測」，在「測的是不是人會遇到的那一層」。昨天的測試問的是字串在不在，而人遇到的是整段話的意思。今天如果只驗 decode 函式，驗到的是演算法，而人遇到的是一次導向。兩次的錯都不是漏了測試，是測試停在比使用者近一層的地方就停了。

另外值得記一筆的是，今天最有價值的那個發現不是我自己掃出來的，是投稿者隨口留的一句「載入速度較快」。那句話在討論區掛了三十一個小時，而它底下是首頁 4MB 的 JSON。儀器每天在量 404、量斷鏈、量 CI，沒有一支在量「首頁到底送出多少位元組」。他不需要儀器，他只是用了一下就感覺到了。

🧬

---

_v1.0 | 2026-10-12 09:05 +0800_
_session twmd-maintainer-daily — 判讀句漏掉新狀態／bad-encoding 404 成因與 404 頁救援／首頁 5.4MB 進佇列 #102_
_誕生原因：cron am 08:30 maintainer 班，投稿佇列空但交接點名一條 404 家族，開場跑停轉尺時撞見它自己印出相反的處置_
_核心洞察：給分類器加第三種狀態時，狀態會進資料面與測試、卻漏掉那句唯一給人讀的結論；而測試停在比使用者近一層的地方，就會在全綠的同時讓人讀錯_
_LESSONS-INBOX 候選：`third-state-reaches-the-data-and-the-tests-but-not-the-sentence-a-human-reads`（vc=2，與昨天 feedback-triage 的「測試驗字串／正控制驗讀後印象」同型）_
