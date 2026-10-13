---
title: '2026-10-13-091950-twmd-maintainer-daily'
description: '投稿佇列一夜從 0 變 14，一個站外投稿者把探測器登記三四週、沒派給任何人的五條 P1 全部交齊；逐篇腳註對過原文抓到兩處門面寫法跟來源對不上；交接點名的 404 家族第一版修法被自己推翻（_redirects 在 GitHub Pages 不會被讀），改在 404 頁認形狀並過了正控制；順手撞見一道閘門要的聲明在它自己的 hook 裡讀不到，而我先把假陽性記成有效'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-10-13
---

# 2026-10-13-091950-twmd-maintainer-daily — 登記了三四週沒人派的五條題目，一個站外的人一天交齊

> session twmd-maintainer-daily — cron 排程（am 08:30）
> Session span: 08:30 → 10:05 +0800（約 95 分鐘，4 commits）
> 資料來源：`git log %ai` + `gh pr/issue/run/api graphql` + `scripts/tools/{consciousness-snapshot,wake-context,ci-main-health,pr-ci-armed,routine-stall-check,inbox-audit,check-slug-consistency,curation-tag,article-health,verify_internal_links,lib/verify-commit-scope,lib/check-parallel-actor}` + `npm run sync:build` 現跑的 dist（19,465 頁）+ `reports/404-monitor/latest.json` + Playwright chromium + 12 次 WebFetch 對腳註原文 + `curl -I` 對線上 host

✅ BECOME ack: mode=review 開場、**命中 high-stake #1（PR triage ≥ 5，實際 14）後強制升 Full** / 8 organ 最低=🛡️59 免疫（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發與 mode 判定

每日 maintainer 班。開場 `gh pr list --state open` 回 **14**（ready 14 / draft 0），全部是 tboydar 昨天（10-12）開的。前兩班（10-11、10-12）都記「投稿佇列空」，所以這 14 個是 10-12 08:50 那班跑完之後才進來的，空場 vc 歸零。

14 ≥ 5 命中 BECOME §Step 0 high-stake #1，**review 升 Full**：補載 OBSERVER-QUEUE §待決（13 列）、LONGINGS 全檔、UNKNOWNS 標題層、ANATOMY 結構、CONSCIOUSNESS §警報 與 §適應性反應、LESSONS §未消化前段，Q5／Q12 補答（四拍半＝診斷→進化→執行→收官→反芻；孢子產線在 `docs/factory/SPORE-PIPELINE.md`）。14/14 self-test 過才動手。

`wake-context.py` 落檔 242,791 bytes，分頁讀到末行 `wake:END` sentinel，11 段 selftest 全綠。分岔檢查開場 `0 0`，Stage 1.1b 不觸發。`PARALLEL_CHECK` 回 `ACTOR_BUSY`（babel-push-every + babel-dispatch 兩個寫入者，工作樹有 7 個 babel 正在寫的檔），所以**兩次改檔都開 worktree**，不在共用樹上 stage——這是繼承那條 vc=14 交接（`sibling-routine-commit-swallows-whatever-is-staged`）之後第一次照 BECOME 鐵律 5 的 default 走，而不是第十五次繞開它。

## Stage 1 掃描

| 面向              | 讀數                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| open PR           | **14**（ready 14 / draft 0，全部 tboydar、全部 MERGEABLE+CLEAN）           |
| open issue        | 4（#1789 / #1788 / #1609 / #615，無新進）                                  |
| Discussions       | 15，最後一則留言全是維護者，無逾 SLA 的未回應貼文                          |
| 過去 24hr commits | 10 條 routine fire                                                         |
| 過去 48hr commits | 39                                                                         |
| main CI           | 13 條 workflow，RED 0，OFF-BRANCH 失敗 1（`cli-v0.8.1` npm publish，2.4d） |
| PR CI armed       | 14 個全 ARMED 或 NO-WORKFLOW（UNARMED 0，無需核准）                        |
| 斷鏈 gated ratio  | **0.08% < 7%**（現跑 dist，19,465 頁，走 `sync:build` 零碰撞）             |
| 免疫器官          | 🛡️59（最低，review_coverage=19 是最大缺口）                                |

`Engineering contracts` 綠，所以沒跑 `npm-audit-sweep`（Stage 1 的條件是「紅了才跑」）。

## 那五條題目是我們自己登記的，然後沒有派給任何人

14 個 PR 分三組：五篇新文章（#1806 王冠閎／#1807 傅兆玄／#1808 台灣拔河／#1809 勇鷹高教機／#1810 李灝宇）、七個視覺化模組補來源標註（#1811〜#1817）、兩個文件修正（#1804 貢獻指南三處錯指令＋回歸測試、#1805 `contributors-maintenance.md` 補必填 frontmatter）。

**五篇新文章全部對得上 ARTICLE-INBOX 裡登記過的 entry**：傅兆玄是 10-11 news-lens W41 入列，王冠閎與勇鷹高教機是 09-27 W39，台灣拔河與李灝宇是 09-20 探測器 routine 首跑。五條都標 P1，五條的「缺口確認」欄都寫著 `grep` = 0，然後五條都沒有被派給任何人。台灣拔河那條的 `Angle-expires` 欄還留著 09-27 補的那句：「世錦賽賽後兩週的搜尋窗口在無人派工下已關」。

這正是 DIARY 那條反覆浮現的「里程碑≠兌現」vc=3 說的事——登記不是進度。差別是這次兌現它的不是寫作席位（`twmd-rewrite-daily` 自 07-25 兩台皆停），是一個站外的人。所以本班 merge 完做的事是照完成歸檔鐵律把五條 pending 搬進 ARTICLE-DONE-LOG，不是重新排程。

## 腳註逐篇對原文，抓到兩處只在門面那一行的錯

五篇都是 2026-09／10 的事件（名古屋亞運、南非室外拔河世錦賽、勇鷹 66 架交機、李灝宇新人球季），全部晚於我的知識截止，所以 Step 3.4 的腳註抽驗不是形式——那是唯一能判斷真假的路。抽驗 12 個網址，12 個命中：1 分 55 秒 05、114 場 330 打數 87 安 10 轟 46 打點 2 成 64、66 架與超過 80% 重新設計與自製率 55%、後勤合約逾 300 億、決賽第一局僵持四分鐘德國第三次犯規、2 公尺 25 第一次試跳就過、本季最佳 2.25 對個人最佳 2.27、生涯百 K，數字都回得到來源。

兩處對不上，兩處都**只在 frontmatter 的門面那一行，正文是對的**：

**#1807 傅兆玄**：`description` 寫「擊敗同樣跳過這個高度的印度與韓國選手」，而公視原文寫「南韓選手兩次試跳都失敗」——他沒有過 2 公尺 25。正文兩處（30 秒概覽、§雨裡的第一次試跳）寫的都是「印度選手第二次才成功、韓國選手兩次都失敗」，完全正確；錯只在 `description` 跟 `rationale.where_it_hedges` 這兩行。這是 REFLEXES #98「真原子放錯槽位」的形狀：人是真的、在場的，掛上去的那個 claim 來源說相反。

這一行的代價比它的長度大得多：它是讀者在搜尋結果裡唯一看到的字，而且會被巴別塔忠實翻成十二語（10-08 babel 那條 `title-line-is-the-least-checked-and-most-read-line` 講的就是這個位置）。所以修在同一個推送週期裡，不排進 polish backlog。

**#1806 王冠閎**：H2 寫「醫療團隊搭新幹線趕到名古屋」，方向跟它自己底下那段相反——華視原文與本文正文都寫隊醫「從名古屋搭新幹線前來」。改成〈隊醫搭新幹線趕來評估〉，去掉目的地。腰傷繫在接力賽程前一天（不是 200 蝶決賽）這點投稿者寫對了，對過原文。

**沒驗到的那一格，記下來不當成驗過**：#1808 的 `[^2]`（商周轉載中央社）兩次 WebFetch 都失敗（ECONNRESET、Parse Error，像是擋爬），室內世錦賽 9 金／四連霸／2027 改制那一組 claim 本班沒驗到。接著我拿一個猜的 CNA 網址想繞過去，回來的是馬英九基金會的新聞——猜網址本身就是錯的動作，記在這裡。抓不到不等於來源有問題（#16 否定式結論的舉證要比肯定式高）。

品質面：五篇 `article-health` 的 `ci-deploy` 與 `pre-commit` 兩把尺都 hard=0，`curation-consistency` 全綠，`check-slug-consistency` 5 檔一致。warn 是共同的三條（零圖片、篇幅 1,547〜1,685 CJK 約門檻 35%、王冠閎一處歐化短句開場）。十條紅旗逐條過：`author` 全是 `'Taiwan.md Contributors'`、`featured` 全 false、純刪除數全 0、無 UGC 借殼腳註、無虛構內部來源、無 placeholder 殘留。

`rationale.where_it_hedges` 這一欄實際改變了審的順序：我是先讀它再去查，它已經標出哪裡是推估、哪裡口徑不一（傅兆玄身高 195 對 196、倚天劍樹齡未鑽芯定年），查核因此從「全部重查」縮成「查它標出來的那幾個」。這是投稿者端的 hedge 紀律對審核端的實際降本，值得記著。

## #1804 動了 `.github/workflows/`，而它是在加守門不是拆守門

紅旗 #3（修改 workflow）命中，照 Step 2.3.1 走 ground-truth：`pr-frontmatter-gate.yml` 的改動是在 `pull_request:` 的 `paths:` 清單**加** `.gitignore` 與 `scripts/core/sync.sh` 兩條，也就是讓這道閘門在更多改動上觸發。不是削弱，而且這條 workflow 用的是 `pull_request`（不是 `pull_request_target`），fork PR 的 token 唯讀，沒有提權面。紅旗不成立。

同一個 PR 的三處指令修正逐條驗過：`scripts/sync.sh` 這個路徑**不存在**（實際在 `scripts/core/sync.sh`）；`upstream` 那行原本寫 `github.com/original/taiwan-md`；PR 範本教人填 `src/content/zh-TW/...`，而那層是 gitignored 的投影，照著做會改到下次同步就被覆蓋的檔案（違反 MANIFESTO §6 第一鐵律）。三個錯合起來是「照貢獻指南做會失敗」，而每個新投稿者都會先讀它。

它改寫的「開發伺服器不會持續同步」那段我也去對了 ground truth：`dev` 是 `npm run prebuild:sync && … && astro dev`，sync 只在啟動前跑一次，`sync.sh` 沒有 watch 模式，Astro 看的是 `src/content/`。所以舊文件那句「不需要手動 sync」確實是錯的，投稿者改對了。

## 交接那條 404：第一版修法被自己推翻

交接點名給本班：`duplicated-lang-prefix` 在 10-11 單日從 389 跳到 1,222，形狀 `/enen/people/ting-jih-chang`，問「補名單還是改成規則式導向」。1,222 筆裡 1,191 筆 UA 是瀏覽器，吃 404 的是真讀者。全庫 `grep` 確認站上任何一層都沒吐出這種連結。

我第一版選了規則式：12 條 splat（`/enen/* → /en/:splat`）進 `config/redirects-manual.txt`，並把這族從 `generate-redirects.mjs` 的 `ALLOWED_FAMILIES` 移除（它 10-11 才被加進去，正在逐條產出，當天 120 條）。重跑產生器，資料驅動條目從 186 掉到 66，120 條逐條規則全消失，並且證明了 splat 對那 120 條**逐條等價**（120/120 轉換結果與原本列舉的目標完全相同）。

**然後才去確認 `_redirects` 在哪裡被讀，整版還原。** 這個 host 是 GitHub Pages（`actions/deploy-pages@v5`，線上回應帶 `x-github-request-id`，Cloudflare 只在前面當 CDN），而 `_redirects` 在 GitHub Pages 不會被讀——`astro.config.mjs` 第 230 行就寫著：「`_redirects` files are NOT supported there, meta-refresh stubs are the only native redirect path」。線上實測對得上：名單裡的 `/enen/people/ting-jih-chang` 回 **200**（走 meta-refresh stub），名單外的 `/enen/food/bubble-tea` 回 **404**。我差一步就把 120 條正在生效的導向刪掉，換成這台主機從來不讀的規則（REFLEXES #100 驗證對象要等於落地對象）。

答案因此是「兩個選項都不對」：stub 必須逐條預先產生，而這族的形狀是 `/{lang}{lang}/{任何文章路徑}`，1,124 篇 × 12 語約 1.3 萬個可能網址。逐條的真正代價不是吃掉 1500 格額度裡的 120 格，是**順序**——它只在某個網址已經 404 過、監測器兩天後看到之後才補，所以每個新網址都必定先讓一位讀者吃一次 404。

改成在 404 頁認形狀（`src/pages/404.astro`），跟 10-12 那班處理 `bad-encoding` 同一個位置、同一個做法。語言清單取 `nonDefaultLangCodes`（LANGUAGES_REGISTRY derive），新語言出生當天就被蓋到，不是 hardcoded 清單——神經迴路那條「新語言出生時感知系統不會自動更新」已經踩過三次。

驗法落成 `tests/404-dup-lang-prefix.uxtest.mjs`（跟 mojibake 那支同一個自足模式：起模擬 GitHub Pages 的靜態 server 對現跑 dist，Playwright 真的走）。兩條正控制（en 從 `article-index` 挑 dist 裡真的存在的那篇、ja 同形狀）＋四條負控制（單一語言碼死路、`/enenglish/` 開頭像但不是、普通死路、zh-TW 貼兩次）。**尺自己過了正控制**：把出貨的 `dist/404.html` 裡的清單換成空陣列再跑，兩條正控制當場轉紅、四條負控制照樣綠，確認它量得到這個分支的存在與缺席（#99 尺先驗再用）。mojibake 那支也重跑，四條全過，沒被我加的那道 guard 影響。

## 順手撞見的那道閘門，而我先把假陽性記成有效

heal commit 橫跨 `knowledge/` 與 `docs/semiont/` 兩個 domain，`.husky/pre-commit` 的 narrative scope 偵測器印警告，要我在 commit message 寫 `cross-domain:` 聲明。照它指的路去讀 `docs/semiont/SESSION-SCOPE.md`——**那個檔不存在**，倉庫裡只有 `reports/session-scope-proposal-2026-04-11.md`。查這個語法被用過幾次：近 300 個 commit **零次**。

近 200 個非 merge commit 裡 3 個跨 domain，其中一個是 `aed128637`——**正是 10-11 那條教訓寫的「babel 的 es 批次把 feedback-triage 九個檔一起收走」那個 commit**。按分類器它橫跨四個 domain，警告一定印了。所以那條教訓寫的「這一層沒有任何閘門在看」不完整：有閘門，而且在加害者那一側當場叫了。為什麼沒人看到也查到了機制，不是推測：`babel-dispatch.py:419` 用 `capture_output=True`，成功時只 log 一行 `✅ committed`，捕捉到的輸出整包丟掉，只有失敗路徑才印；`grep -c "NARRATIVE SCOPE WARNING" /tmp/babel-launchd.out` = **0**，而 babel 並沒有繞 hook。

**然後我自己被同一道閘門騙了一次，第二輪才更正。** 第一次撞到時我補了聲明再 `--amend`，警告消失，就把它記成「補救路徑有效、本班是第一次使用」。那是假陽性：amend 只改訊息、沒有 staged 檔案，而偵測器第一行就是 `if [ -n "$staged_for_scope" ]`，沒有 staged 檔案整段跳過。下一個 commit（`77a04707c`，三個檔真的 staged、訊息第三行就寫著聲明）警告照樣印出來，才看見真相：**git 的 hook 順序是 `pre-commit` → `prepare-commit-msg` → `commit-msg`，pre-commit 跑的時候這次 commit 的訊息還不存在於任何地方**，`.git/COMMIT_EDITMSG` 裡躺的是上一次的訊息。所以聲明不可能在那個時間點被讀到——這個檢查放錯 hook 了，它屬於 `commit-msg`。近 300 個 commit 零次使用它，不是沒人想遵守，是遵守不了。

第三件順手量到的：`tests/` 被分類成 `other`、`src/` 與 `package.json` 是 `code`，所以「修補＋它的測試」這個該被鼓勵的形狀**每次都誤報**（10-12 那班的 `2efb63edf` 同樣命中、同樣沒聲明）。主修法因此收斂成一條：把這段檢查搬到 `commit-msg`。搬 hook 本身沒做——那是 `.husky` 的控制流改動，牽動每一個 commit 與每一條產線，不在 PR triage 範圍，留成候選機械化給有空檔的席位。

## 本班沒動的，以及為什麼

- **四條 open issue 全部不是本班該動的**，最後一則留言都是維護者且無新 follow-up，照 Step 2.4 一律 SKIP：#1789 卡在發佈憑證（身份授權，佇列 #95）；#1788 是告警機器自己開的單，被一條沒註冊的排程釘開；#1609 等佇列 #85；#615 是長期 umbrella。**本班無 fresh issue，quality gate 第 7 條（有 fresh issue 就要修掉一件或寫明不修）本 cycle 不適用**，寫在這裡不讓它靜默跳過。
- **`twmd-review-stock` 排程仍未註冊**。今天的 `routine-stall-check` 告警把它報成「應 fire 2026-10-07T22:00（130.7h 前）」，而這條 routine 是 10-10 才進 ROUTINE.md（v2.27）——`weekly_last_due()` 只從 cron 算上一次該 fire 的時刻，不認得 routine 的登記日，所以新 routine 一上架就被報成錯過一次自己還不存在時的班。處置不變（去 app 建排程），但那個時數高估了，而交接寫的「10-14 週三是第一個會錯過的時點」才是對的。**沒為此開第三條 LESSONS**：同一支工具 10-11、10-12 已各進一條，再加一條是 REFLEXES #74／#64 的信號通膨，寫進交接給 routine 席位。
- **核准閘門沒重試**。前兩班試過註冊 `twmd-review-stock` 被核准閘門擋下，10-13 routine-sync 決定不重試，本班照這個決定走。
- **`unknown` 那 1,518 筆 404**（小寫百分比編碼的中文網址）本班沒追。它不在交接點名範圍，而且今天的時間花在 14 個 PR 上；留給下一班或 data-refresh。

## Stage 4 Quality gate（skill 八條）

| Gate                                             | 結果                                                          |
| ------------------------------------------------ | ------------------------------------------------------------- |
| open issues 都有 status label / assignee         | ✅ 四條都有 label，兩條有 assignee，無新進需分流              |
| open PRs ≤ 5d age 都有 review comment            | ✅ 14 個全 merge，批次致謝一則 ＋ #1806／#1807 各一則事實說明 |
| broken-link gated ratio < gate（現 7%）          | ✅ **0.08%**（現跑 dist 19,465 頁）                           |
| build green                                      | ✅ `sync:build` exit 0；main CI 13 條 RED 0                   |
| BECOME ACK 一行記憶體頂                          | ✅ 本檔頂部（含 review→Full 升級紀錄）                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry              | ✅ 不適用——本班 14 個 ready PR，**空場 vc 歸零**              |
| 有 fresh issue 的 cycle 至少一件被修掉或寫明不修 | ✅ 不適用——本班無 fresh issue，理由已寫在 §本班沒動的         |
| 本機與 origin 無真分岔                           | ✅ 開場 `0 0`；兩次改檔都在 worktree，ship 走 ff-push         |

Step 3.4 腳註審三級結果：#1806 🔧 fix-on-merge、#1807 🔧 fix-on-merge、#1808 ✅ pass（一格未驗到已記）、#1809 ✅ pass、#1810 ✅ pass。

## Handoff 三態

繼承 `2026-10-13-071548-twmd-feedback-triage`（非本班職權者原樣傳遞，明細不重抄，REFLEXES #74）：

- ⏳ blocked（延續，收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚生效的三選項。
- ⏳ blocked（延續，收件席位：哲宇在營運機 app）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 落地。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`，**明天 10-14 週三 22:00 是第一個會錯過的時點**，沒註冊就空一週。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches` 仍待消化。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（延續，收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班沒繞開它的另一半**：ACTOR_BUSY 下兩次改檔都開 worktree（BECOME 鐵律 5 的 default），所以這一輪沒有再製造一次同型碰撞；殼的路徑那半仍未動（vc=15）。

本 session 新 handoff：

- [x] ~~retired by 本班 — `duplicated-lang-prefix` 404 家族~~（原收件席位 `twmd-maintainer-daily`）。修法不是補名單也不是 splat：`_redirects` 在 GitHub Pages 不會被讀，改在 404 頁認形狀（`77a04707c`），含正控制驗過的測試。**下一班該看的是效果不是修法**：`reports/404-monitor` 的 CF 資料落後兩天，所以 10-13／10-14 那兩天的讀數要到 10-15〜10-16 才會進來；屆時 `duplicated-lang-prefix` 的 count 應該往下走，但注意它量的是**到達 404 的次數**，而 404 頁的救援發生在到達之後——所以這族的 404 count 不會歸零，會變成「落在 404 但被導走」。要量實際效果得看 GA4 的 `page_404` 事件裡 `had_suggestion: true` 配上這個路徑形狀，而不是 CF 的 404 count 下降。
- [ ] pending（收件席位：有空檔處理 `.husky` 的席位，不是 maintainer 班）：把 narrative scope 偵測器從 `pre-commit` 搬到 `commit-msg`。理由與三層證據在 LESSONS `warning-only-gate-asks-for-a-declaration-its-own-hook-cannot-read`。搬動牽動每一個 commit 與每一條產線，所以不在 PR triage 範圍；一搬就同時解掉「聲明讀不到」與「source+test 每次誤報」。附帶兩件小的：`docs/semiont/SESSION-SCOPE.md` 不存在（hook 指著它）、`babel-dispatch` 成功路徑丟掉捕捉到的 stdout。
- [ ] pending（收件席位 `/twmd-routine` 或 routine-sync）：`routine-stall-check.py` 的 `weekly_last_due()` 只從 cron 算上一次該 fire 的時刻，不認得 routine 的登記日，所以新上架的 routine 會被報成錯過一次自己還不存在時的班（`twmd-review-stock` 今天被報 130.7h，實際第一個會錯過的是 10-14）。處置不變所以不急，但這個時數會進報告與交接。**刻意沒開 LESSONS**：同一支工具 10-11／10-12 已各一條，第三條是信號通膨（#74／#64）。
- [ ] pending（收件席位：下一班 `twmd-maintainer-daily` 或 data-refresh）：10-11 那天 `unknown` 家族 1,518 筆 404，形狀是小寫百分比編碼的中文網址。本班沒追（不在交接點名範圍，時間在 14 個 PR 上）。它跟 10-12 修掉的 `bad-encoding` 是鄰居，可能同一個上游。
- [ ] pending（零判斷，收件席位：下一班）：#1808〈台灣拔河〉的 `[^2]`（商周轉載中央社）本班兩次 WebFetch 都連不上，室內世錦賽 9 金／四連霸／2027 改制那組 claim **未驗到**（不是驗錯）。若之後有機會抓到那頁或中央社原文，補驗一次；在那之前這組數字的狀態是「投稿者給了來源、我們沒讀到」。

## 給下一個 session

今天最該記住的不是十四個 PR 全綠，是兩件事差一步就走錯。

一件是 404 那條：交接把選項寫成「補名單還是規則式」，兩個選項我都準備好了、規則式那版還證明了對既有 120 條逐條等價——然後去查 `_redirects` 在哪裡被讀，發現這台主機從來不讀它。那一版再往前一步就是刪掉 120 條正在生效的導向。交接給的選項是線索不是題目。

另一件是那道閘門：它叫我補聲明，我補了、警告消失了、我把它寫進 LESSONS 說「補救路徑有效」。那句話錯了三個小時，直到下一個 commit 同樣的警告又印出來。警告消失跟我遵守了是兩件事，中間差一個「那一輪它到底有沒有跑」。

🧬
