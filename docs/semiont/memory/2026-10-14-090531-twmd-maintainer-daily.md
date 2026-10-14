---
title: '2026-10-14-090531-twmd-maintainer-daily'
description: '投稿佇列連兩天滿載，九個 PR 全合併；兩篇新文的腳註逐條打開比對原文、十條全逐字命中；交接傳一班的地圖錯釘追到根因是產生器把研究團隊的學校當成文章位置，全庫量出同型三筆後連產生器一起修；另一條交接的 404 家族其實兩天前就修好了，只是沒有人回去對線上驗一次，本班驗到兩層都活著'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-10-14
---

# 2026-10-14-090531-twmd-maintainer-daily — 釘錯的那個點，錯在它引用了研究者的學校

> session twmd-maintainer-daily — cron 排程（am 08:30，實際 08:45 起跑）
> Session span: 08:45 → 09:5x +0800（4 commits + 9 PR merge）
> 資料來源：`git log` + `gh pr/issue/run/api graphql` + `scripts/tools/{consciousness-snapshot,wake-context,ci-main-health,pr-ci-armed,routine-stall-check,curation-tag,article-health,verify_internal_links,inbox-audit,inbox-signal,lib/verify-commit-scope,lib/check-parallel-actor}` + `scripts/core/generate-map-markers.js` + `npm run sync:build` 現跑的 dist + `reports/404-monitor/latest.json` + 內建瀏覽器（4 個 JS 渲染頁）+ 6 次 WebFetch 對腳註原文 + `curl -IL` 對線上 host + npm registry

✅ BECOME ack: mode=review 開場、**命中 high-stake #1（PR triage ≥ 5，實際 9）後強制升 Full** / 8 organ 最低=🛡️59 免疫（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

`wake-context.py` 落檔 253,724 bytes，分頁讀到末行 `wake:END` sentinel（11 段 / 1,393 行），selftest 11 項全綠。`PARALLEL_CHECK` 回 `ACTOR_BUSY`（babel 四個寫入者，工作樹有 11 個 babel 正在寫的檔）。

## 觸發與 mode 判定

開場 `gh pr list --state open` 回 **9**（ready 9 / draft 0）：tboydar 八個、dreamline2 一個。昨天那班 merge 了 14 個，所以這是連續第二天滿載，空場 vc 歸零（連兩天非空）。

9 ≥ 5 命中 BECOME §Step 0 high-stake #1，review 升 Full：補載 ANATOMY 結構與 §資源地圖、DNA 基因組總覽、CONSCIOUSNESS §警報＋§適應性反應＋§里程碑＋§進化方向、LONGINGS 全檔、UNKNOWNS 標題層、OBSERVER-QUEUE §待決 11 列、LESSONS §未消化標題層、HEARTBEAT v3.1 全檔。Q5／Q6／Q12／Q13 補答，14/14 過才動手。

## Stage 1 掃描

| 面向              | 讀數                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------- |
| open PR           | **9**（ready 9 / draft 0，全部 MERGEABLE+CLEAN、全部 checks SUCCESS）                  |
| open issue        | 4（#1789 / #1788 / #1609 / #615，無新進；最新一張是 10-05）                            |
| Discussions       | 15，最後一則留言全是維護者，無逾 48hr SLA 的未回應貼文                                 |
| 過去 24hr commits | 10 條 routine fire                                                                     |
| main CI           | 13 條 workflow，RED 0 / BLOCKED 0 / UNKNOWN 0，OFF-BRANCH 失敗 1（`cli-v0.8.1`，3.4d） |
| PR CI armed       | 9 個全 ARMED（UNARMED 0 / NO-WORKFLOW 0），無需核准                                    |
| 免疫器官          | 🛡️59（最低，review_coverage=18.8 是最大缺口，連第 15 週）                              |

`Engineering contracts` 綠，照 Stage 1.5c 的條件（紅了才跑）沒跑 `npm-audit-sweep`。

### 分岔：開場 `1 0`，收尾前變 `2 18`，是我自己造的

開場 `git rev-list --left-right --count main...origin/main` 回 `1 0`（純領先，babel 有一筆未推），Stage 1.1b 不觸發。九個 PR merge 完之後變成 `2 18`——兩邊都 > 0，字面上命中「真分岔」。但這不是 09-09 那種病：origin 的 18 筆是我自己剛 merge 的，本機的 2 筆是 babel 的，**兩側檔案零重疊**（babel 動 `knowledge/{ar,id}/` 與 `reports/babel/`，我動 zh 文章與 `knowledge/ko/`）。

照 REFLEXES #35「跨 session work 期間禁 destructive git ops」選 merge 不選 rebase——babel 四個寫入者正在跑，rebase 會重寫它那兩筆。`git merge origin/main` 零衝突，回 `3 0`。

## Stage 2-3：九個 PR

全部 B 路徑。十條紅旗逐個對過：`author` 全是 `'Taiwan.md Contributors'`、`featured` 全 false、零刪除、無 placeholder、無虛構內部來源、改動全在 `knowledge/*.md`（不碰 workflow／robots／外部 JS）。無 `reserved-for-observer` label、無他人 assignee、九個留言串全空（Step 2.4 → 全部首次回覆）。動手前照 Step 3.0 全部 `--add-assignee @me`。

### v2.16 那道閘門這次真的攔到東西

#1818 是 dreamline2 對 ko 版《大罷免》的重譯（139/-139 單檔），形狀跟 10-08 誤 merge 的 #1782／#1784 一模一樣——「投稿者的等質重譯要不要取代既有譯文」那一格。所以照 v2.16 先讀留言串與 OBSERVER-QUEUE，而不是量完 ratio 就合併。

查到 **#67 已於 2026-10-10 由哲宇拍板選 B**：開著的 PR 先跳過＋人寫譯文 stale 只記提議不覆蓋，#1782／#1784 的投稿者版本已還原。方向是**人的譯文優先於機器譯文**，所以 #1818 不是被保留的決定，走正常 B 路徑。這次是閘門問對了問題、而答案是「可以動」——不是每次讀留言串都會攔下東西，但不讀就分不出這兩種情況。

### 兩篇新文的腳註：6 條抽驗全逐字命中

〈台灣與亞運〉（#1826，接哲宇 09-18 開的 P0）與〈看不見的台灣〉（#1819）走 Step 3.4 完整 footnote audit。後者 4 條腳註全查（小文章全查），前者 9 條抽 6 條：

- 國家文化記憶庫寫「26 位旅港的足球員返國飛抵松山機場，接受眾人接機與獻花。隨後，遊行臺北市區」，正文一字不差。**中途我差點誤判**：中央社「遷臺黃金十年」那頁寫的是「22 名香港僑胞組成足球代表隊」，我以為抓到數字錯，回頭看才發現文章引的是說 26 位的那一個來源——兩個政府來源數字不同，原子放在對的槽位（REFLEXES #98 反例，這次是真的對）。
- 臺史博特展單元二那段引語與館方頁面逐字相同；開眼電影網的 118 分／2018-06-15／影市堂／牽猴子／110 萬與「天語是光『降頻』之後在人類聽覺範圍內產生的聲音」也逐字相同。
- 獎牌數有個細節：聯合新聞網自己一則新聞標題寫「5 金 17 銀 **23** 銅」，獎牌榜表格是 **33** 銅，投稿者取的是表格那個（正確）。
- `where_it_hedges` 又一次改變審的順序：投稿者自己標明 1973 年 38:13 與 1979 年 62:17 只有維基記載、找不到官方一手文件，所以我沒把那兩個數字當已查證。

**兩個 JS 渲染頁要用瀏覽器才看得到內容**：`cnaphoto.culture.tw` 與 `tcmb.culture.tw` 對 WebFetch 與 curl 都只回導覽骨架（後者 87 KB HTML、CJK 正文零命中）。照 REFLEXES #16 的否定式結論延伸，沒有拿「查不到」當結論，改用內建瀏覽器渲染，兩頁的內容都在。**差一步就會把兩個政府典藏來源判成無效**。

### #1818 修掉的東西比標題寫的多

量過才知道規模：合併前那份 ko 檔有 **161 處簡體「罢免」**、13 處「逐字」、6 處「清查」，這版 0。一篇講台灣罷免制度的韓文條目，正文用的是中國字形。我們自己的 `cjk-residue-check` 對兩個版本都回報 166 行裸 CJK——它數「有沒有漢字」，數不出「這些漢字是哪一邊的字形」，所以這個洞不是儀器發現的。

另外三個：第 51 行 `##罢免이...` 少一個空格，Markdown 不當 heading，整節不在目錄裡（H2 8 → 9）；預算「3,753 억 **위안**」韓文的위안指人民幣，改成「대만 달러」——同一個晚上 babel 才在修同族的另一半（`7953e9305` 讓腳註翻譯帶上「裸的元是新台幣」）；台南被譯成「난터우」（南投），而中文母稿寫的是台南地方法院與國民黨台南市黨部，改成타이난並補「좡잔쿠이(莊占魁)」。還有「소야대야」→「여소야대」（前者在韓文講不通）。53 個腳註、2 張圖、9 條站內連結、frontmatter 其餘欄位全保留。

### 處置

九個全 `gh pr merge --merge --delete-branch`（保留投稿者 commit 與譜系，沿用昨天的做法），全部 MERGED。heal 一項：〈看不見的台灣〉是唯一沒帶 `curation` 的新文章，補 `incubating`（`0c2b8854b`）；〈台灣與亞運〉投稿者自己標好了。

回覆照 Step 3.7 burst 紀律：tboydar 八個 PR **一則累積留言**（發在 #1826），不逐個發；dreamline2 單獨一則。兩人都用中文投稿，兩則都用中文。內容只有已發生的事實＋致謝＋技術說明，不許諾時程（§外向留言分層 AI 自主那一側）。

## 交接那兩條

### 一、地圖把巨木釘到台南，根因是它引用了研究團隊的學校

〈大安溪倚天劍〉在地圖上被釘到台南（lat 22.998/lng 120.218＝台南市中心），而那棵台灣杉在大安溪源頭、海拔 1,650 公尺的雪山山脈深谷。**文章整篇沒提過台南一個字**，所以不是文章寫錯。

追上游：`generate-map-markers.js` 對地標做內容匹配，出現 ≥3 次就 `次數 × 15` 分。那篇提了五次「成功大學」（找樹的人團隊的學校），地標表裡成功大學屬台南 → 75 分，壓過文中真正出現的南投（3）、台中（1）、苗栗（1）。**機構名是隸屬關係，被當成了主題位置。**

修兩層。文章補 `geo: 苗栗`——依據是它自己的腳註「大安溪中上游屬苗栗縣泰安鄉」；**刻意不寫精確座標**，巨木的確切位置本來就不公開，而這篇的主題正好是「藏在我們到不了的地方」。產生器加判準：機構型地標（大學／科學園區／醫院…）只有在出現於標題、或所屬縣市本身也被文章點名時才算位置證據。

**先量才改**（REFLEXES #66 / #101）：地標表 72 條裡機構型只有三個（成功大學／逢甲大學／新竹科學園區），全庫同型誤標連這篇共 **3 筆**。2,022 個標記重新產生後只動 4 筆——倚天劍台南→苗栗、張志祺與朱經武兩筆移除（兩人位置在文中都沒交代，朱經武那項研究是在休士頓做的）、今天新收的〈台灣與亞運〉正常入列。**釘錯的點比沒有點更糟，因為讀者會相信它**，所以移除是對的處置而非退讓。

commit 被 narrative-scope 閘門警告橫跨 content-ssot 與 tooling，照它給的機制補 `cross-domain:` 聲明後 amend（`de4dde0c9`）——分開 commit 會留下「資料已修、產生器還會再犯」的中間狀態。

### 二、`duplicated-lang-prefix` 404 家族：兩天前就修好了，但沒有人回去驗

這條交接從 feedback-triage 傳過來，點名收件席位是本 routine。查下去發現 10-13 那班已經 ship（`77a04707c`），而**沒有人回頭對線上驗一次**，所以它還掛在 pending。

先量規模：`reports/404-monitor/latest.json`（10-12，修補前一天）的 `duplicated-lang-prefix` 是 **1,124 次，其中 1,100 來自真實瀏覽器**——全站最大的人類 404 家族，佔總 404 的 15.6%，而 scanner／unknown 那兩族主要是 bot。形狀是 `/arar`、`/dede` 這種語言碼貼兩次，不是 `/ar/ar`。

本機 `dist/404.html` 是 10-12 的，不含修補（REFLEXES #100：本機產物不是落地對象），所以直接打線上。**兩層都活著**：已知網址走 `generate-redirects.mjs` 的 meta-refresh stub（`/eses/geography/ankeng-light-rail/` 回 200，canonical 指 `/es/...`）；沒人踩過的網址走 404 頁那支規則（我自己編一個 `/koko/...` 探針，回 404 且頁面帶 `dupLangTarget`）。驗證時間戳 2026-10-14（REFLEXES #67）。

所以這條可以 retire 了，剩下的只是等下一次 404-monitor 刷新把 1,124 這個數字收掉。

## Stage 3.6 issue

四張 open，無新進，所以 quality gate 第 7 條（有 fresh issue 的 cycle 至少修一件）本 cycle 不適用。逐張的判斷：

- **#1788（routine-stall 告警單）**：開票的原因**已解**——票名寫「尺二要等 10-11 那趟才會自己歸零」，那趟發生了，六條週 routine 10-11〜10-12 全部補上 memory 檔，尺一同時綠著。沒有人回來記這件事，本班記了並留言。**沒有關它**：`routine-stall-alert.yml` 的 WARN 分支找不到帶 label 的 open issue 就**開新的**，而這支尺現在 exit=1（唯一 WARN 是 `twmd-review-stock` 排程器從沒聽過這條），關掉六小時內會長出一張同內容新票——那是換帳單不是付帳單。那個 WARN 住 OBSERVER-QUEUE #86／#100(b)，#100(b) 標 `🔒閾值`，而觀察者在場（10-12，2 天前，非缺席模式）→ **不代理**，只把現況寫清楚。
- **#1789（CLI 0.8.1 沒發佈）**：read-only 複驗阻塞點未變。`npm error 404 PUT https://registry.npmjs.org/taiwanmd`，而 registry 上 `taiwanmd` 確實存在、latest 0.8.0、0.8.1 未發佈、本機 `cli/package.json` 是 0.8.1——**套件存在而 PUT 回 404 是 npm 對無發佈權限的標準回應**，所以是憑證層，不是名稱或 scope。阻塞在哲宇換 npm token（身份授權，不可自授權）。**沒留言**：10-11 那則已經把同樣的診斷寫完，投稿者沒有新 follow-up，照 Step 2.4 應 SKIP，不發罐頭重複。佇列 #95 default-action 2026-10-22。
- **#1609**（郭淑姿日記）：等 OBSERVER-QUEUE #85 註冊帳號（🔒紅線）。**#615**：哲宇的 umbrella。兩張都不動。

**順手收掉 #100(a) 留的一個未知**：佇列那條寫「10-08 把 cli 測試掛進 contracts job 最後一道，而它排在 `harvest/ui` 的紅後面，所以那道閘門從掛上到現在一次都沒在 CI 跑過」。contracts 現在綠了，所以我去 `gh run view 38483544457 --json jobs` 對那一步——**success，不是 skipped**。那道閘門現在真的在守了，這個未知可以劃掉。

## Quality gate（7 條）

| 條目                               | 結果                                                                                                                                                                                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE       | ✅ Stage 1-4 全跑                                                                                                                                                                                                                                  |
| PR 分流按 §collect-and-merge       | ✅ 九個全 B 路徑（A 路徑 v2.1 已廢）                                                                                                                                                                                                               |
| routine PR backlog ≤ 3             | ✅ 0（v2.1 main-direct，無 routine PR）                                                                                                                                                                                                            |
| 斷鏈 gated ratio < 7%              | ✅ **0.08% < 7%**（all-langs 0.08%）——本班現跑 `npm run sync:build`（19,470 頁），掃描時已確認無 astro build 在跑。剩下的斷鏈是譯文 wikilink 未在地化那族（ja／ko 指向不存在的譯文），結構性 backlog、命中 >50 檔紅線、屬 babel 產線，本班明確不碰 |
| build green                        | ✅ main CI 13 條 RED 0；本班另跑 `sync:build`                                                                                                                                                                                                      |
| merge 的 PR 都過 hard gate         | ✅ 十條紅旗 + CI + close-hard-gate + Step 3.4 footnote audit + article-health 兩 profile                                                                                                                                                           |
| 有 fresh issue 的 cycle 至少修一件 | ⏭️ 本 cycle 無新進 issue（最新 #1789 是 10-05）；既有四張逐張寫了判斷與不動的理由                                                                                                                                                                  |

連續空場 vc = **0**（連兩天滿載）。

## 教訓候選

1. **機構名被當成位置證據**：地標匹配對「這個地名是文章的主題位置」與「這個機構是文章提到的組織」沒有分層，而研究類文章幾乎一定會提研究者的學校。這是 REFLEXES #82 proxy signal 在地理層的形狀——機構名是位置的替身。已修且已量（同型 3 筆）。
2. **修好了但沒人回去驗，等同沒修完**：`duplicated-lang-prefix` 兩天前 ship，交接照實寫「pending」，而它其實已經在線上活著兩層。交接傳遞了「這件事還沒結束」這個狀態，傳遞不了「去對線上看一眼」這個動作（REFLEXES #15 第 N 次／handoff 層變體）。候選機械化：ship 修補時同時寫下「驗法」與「驗的對象是線上還是本機」，讓下一班照著跑而不是重新設計驗法。
3. **自己造的分岔與病態分岔長得一樣**：`2 18` 字面命中 Step 1.1b 的「真分岔」判準，但根因是「我剛 merge 了 18 個 PR 而 babel 有 2 筆未推」，處置是一次 merge 而不是 12 步策略 B。判準只看兩個數字 > 0，看不出哪一側是誰造的、檔案有沒有重疊。候選：Step 1.1b 的偵測加一句「先看兩側檔案有沒有重疊」，零重疊的分岔是協調問題不是合併問題。

## Handoff 三態

繼承（非本班職權，原樣傳遞，不重抄明細，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`。**10-14 22:00 是第二個會錯過的時點**（首次 10-07）；在註冊之前 `routine-stall-check` 不會歸零，#1788 會一直開著。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）`。
- ⏳ blocked（收件席位：哲宇）：`OBSERVER-QUEUE #95` CLI 0.8.1 發佈——**只差 npm token**，本班已複驗套件存在、PUT 404 是憑證層。default-action 2026-10-22。
- ⏳ blocked（收件席位：哲宇）：`OBSERVER-QUEUE #103` 讀者回報沉默幾天該當警報。
- [ ] pending（收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議。
- [ ] pending（收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班沒有繞開它的那一半**：四次 commit 全用顯式 pathspec（不用 `git add -u`），每次 commit 前後各跑一次 `verify-commit-scope.sh --staged/--head`，四次都 scope OK，工作樹上 babel 的 11 個檔一個都沒被捲進來。殼裡那條寫死的 `/Users/cheyuwu/` 路徑仍待改（本機是 `/Users/musebase/`，本班手動對應）。

本班處理掉的：

- ~~pending：`duplicated-lang-prefix` 404 家族~~ → **retired by 2026-10-14-090531**（10-13 `77a04707c` 已 ship，本班對線上驗到兩層都活著：已知網址走 redirect stub、未知網址走 404 頁規則。剩下只等 404-monitor 刷新把 1,124 收掉）。
- ~~pending：〈大安溪倚天劍〉地圖標記 geo~~ → **retired by 2026-10-14-090531**（`de4dde0c9`，補 `geo: 苗栗` ＋產生器加機構型地標判準，同型 3 筆一次蓋完）。
- ~~unknown：#100(a) 那道 cli 閘門從掛上有沒有真的在 CI 跑過~~ → **已驗**（run 38483544457 該步 success）。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly` 或 `twmd-distill-weekly`）：上方教訓候選 2 與 3——「ship 修補要同時寫下驗法與驗的對象」、「Step 1.1b 分岔偵測加一句檔案重疊檢查」。兩條都是 1-file 規格改動，不需要決策。
- [ ] pending（收件席位：下一班 `twmd-maintainer-daily`）：〈看不見的台灣〉0 張圖，`media-richness` 的 image ≥ 3 是硬門檻，它暫時不具備發孢子資格。補圖屬 EVOLVE 不屬 maintainer heal，可登 ARTICLE-INBOX；本班沒登，因為它才剛進庫、還在 incubating。
- [ ] pending（收件席位 `twmd-rewrite-daily` 或 REWRITE Stage 5）：兩篇新文的反向連結都還沒補——〈台灣與亞運〉單向連到〈中華台北〉〈台灣體育發展與奧運〉〈傅兆玄〉，〈看不見的台灣〉單向連到〈看不見的國家〉，四個目標檔都存在但都沒連回來（`article-health` 的 cross-reference 以 info 級報出）。沒有在本班補，因為反向連結的**描述**要跟新文的論點對齊，那是改既有文章的內容實質（REWRITE Stage 5），不在 maintainer heal 範圍；而且反向連結只驗存在不驗準確是 §神經迴路 記過的坑。
