# 2026-10-19-083400-twmd-maintainer-daily — 十一個 PR 清到剩一個保留件。投稿者照存量學會寫錯幣別，而守幣別的閘門只裝在機器那一側。CLI 命令注入當班修掉

> session twmd-maintainer-daily — cron 08:30 fire（每日維護班）
> Session span: 08:34:00 → 09:30:00 +0800（約 56 分鐘，本機 2 commits + 10 PR merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review → **強制升 Full**（High-stake #1：ready PR 11 ≥ 5）/ 8 organ 最低=🛡️免疫 59（review_coverage=18.8，缺口 -20.3）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

cron 08:30 fire。前兩班（10-17、10-18）撞週額度零 git 痕跡，所以這是晨鏈接上後第一個維護班。開場讀到 `gh pr list` 11 個 ready PR，當場命中 BECOME §Step 0 High-stake #1「PR triage ≥ 5」，Review 升 Full 重跑 self-test 14 題。週額度讀數 15%（10-21 重置），判 🟢 normal，所以本班做了完整的事而不是縮編。

## 分岔與開場

`git rev-list --left-right --count main...origin/main` 開場 0／0，不是分岔。中途變成 1／2（本機一個 commit vs origin 兩個 PR merge），形狀上符合「兩邊都 > 0」但兩側都是本班自己造的——正是 LESSONS `divergence-verdict-ignores-who-made-it` 說的那種讀數。查過 origin 那兩個 commit 只動 `knowledge/Society/都市更新爭議.md`，跟 babel 正在寫的七個檔零重疊，所以走 merge 不走 rebase（rebase 要先清工作樹，而那些檔是 babel 的，REFLEXES #35 不碰）。

## 十個 PR：兩個修正、一個譯文、八篇新文

**#1862（dreamline2，ko 衛武營建築師與樹種）** 是本班唯一需要往上游查的修正。合併前查了中文母稿與其餘十一語：**母稿從頭就對**（法蘭馨・侯班／榕樹），**十二語裡只有韓文版錯**，其餘十一語都正確寫 Houben。接著照 §1c 追上游掃 `뽕나무` 是不是一個家族，答案是不是：tatala 拼板舟那篇母稿寫`小葉桑`（真桑樹，正確），中研院那篇寫`構樹`（英文 paper mulberry，連來源網址都是 `paper-mulberry-dna`，不精確但不是錯）。所以只有衛武營是真錯，投稿者的回報範圍是準的。結構性收穫：這個錯通過了翻譯閘門，因為人名閘門設計上抓的是「譯文出現原文沒有的名人」，抓不到**一個名字被換成另一個名字**。樹種誤譯則完全沒有閘門。

**#1864（aminzai，vi 台灣電價機制與台電）** 是本班最花時間也最有收穫的一件。它 CONFLICTING，因為產線在 10-17 04:20 也翻了同一篇，比 PR 早約一小時進庫，撞成 add/add。依 OBSERVER-QUEUE #67（哲宇 10-10 拍板選 B，且當時**還原了 #1782／#1784 的投稿者版本**）保留人翻版本。這裡做過一次 Q13 自問：#1782／#1784 被還原那件事在本班 context 裡很顯眼，容易把我推向「保留給哲宇」，但 #67 坐在 §已決、沒有 `reserved-for-observer` label、留言串沒有裁決——照 §雙向校正，reserve 在這裡會是穿著謹慎衣服的 over-defer。

保留之後才發現真正的問題：投稿者版本 `currency-identity-check.py` **53 處**把新台幣寫成 `đồng`（越南盾），而產線版本 0 處。判斷因此翻轉——這不是等質重譯，是投稿者版本在主權維度上有真缺陷。走 §1b P1 在他分支上手修（數字錨定 regex，守住 `Hội đồng` 28 處與 `đồng thời` 1 處前後計數不變，dry-run 先看全部 53 處再 apply），九道閘門全綠後 merge。

**八篇 tboydar 新文（#1865 公投制度／#1866 黃聲遠／#1867 戰後現代主義建築／#1868 古蹟保存運動史／#1869 都市更新爭議／#1870 對場作／#1871 森山松之助／#1873 EEWH）** 全部 `hard=0`、十條紅旗 0 命中、frontmatter 連 `curation: incubating` 都自己寫對了。兩件要判斷的邊界都查過。#1865 公投制度的 frontmatter 自己寫了 `whats_excluded`「不寫個別公投案的政策立場、不預測 11 月 28 日結果」，`whos_pushing_back` 兩方對稱，政黨名掃描 0 命中。所以它是制度史，不是政治立場。#1869 文林苑列了三種對立讀法，包含「認為王家被塑造成受害者」那一種。描述本身寫「十一次訴願王家輸了十次、法院認定是袋地」，沒有美化任一方，紅旗 #4 不觸發。它作為真爭議題用矛盾驅動主脊，符合 REFLEXES #77。

腳註來源抽驗（Step 3.4）四篇深驗全中：#1871 全文掛在一條腳註上，故事 StoryStudio 那篇逐項對得上（生年、父親身分、1897 畢業、1906 電話交換局「全日本帝國第一座全鋼筋混凝土」、1910 升技師、作品年表、1969 拆高塔、1921 退休），零偏差，而且投稿者還默默修掉來源自己的錯字「噍吧年」。#1866 國家文藝獎官方頁全中，#1869 文林苑維基逐項全中。#1873 的處理最值得記：維基記五級分級 2007、官方手冊記 2004，投稿者採官方說法並在 PR 說明註明差異，而不是把衝突藏掉。

## CLI 命令注入（issue #1863）當班修掉

tboydar 的報告獨立重跑確認成立：`cli/src/commands/read.js` 的 `--web` 分支把 frontmatter 的 `category`／`slug` 插進 `exec("open \"...\"")`，而 `exec` 走 `/bin/sh -c`，那兩個欄位來自被讀取的文章（實務上來自外部 PR）。追上游掃全庫 `exec`／`execSync` 帶 template literal 只有四處，其餘三處都不是這個形狀（`mailmap.js` 的 `git()` 只收字面字串），所以是唯一一處。

照建議換 `execFile`，shell 整條路徑消失，實測注入 payload 留在網址裡不執行。**沒有照建議加字元白名單**：量過全庫 14,883 個檔名，落在 `[\w一-鿿-]` 外面的有 123 個含空白、33 個含全形冒號，還有「·」「（）」，那條白名單會把 150 篇以上合法文章擋在 `--web` 外，是假陽性閘門（REFLEXES #66）。改成驗「組出來的還是不是 taiwan.md 的 https 網址」，擋協定置換與換 host，不看字元集。11 條回歸測試，其中 4 條守 shell 邊界本身，**反向驗過**（改回 `exec` 那 4 條會紅），cli 63 → 74 測試全過。`204c799f0`，commit message 的 `Closes #1863` 自動關單。

## 存量是範本：本班最該留給下一班的那一件

#1864 那 53 處不是投稿者亂寫。他在 PR 說明寫明參照既有 vi 語料，點名 `knowledge/vi/Economy/taiwan-fuel-pricing-and-cpc.md`——而那篇正是 OBSERVER-QUEUE #108 那批 692 檔存量之一。查了接線之後確認結構：`currency-identity-check.py` 只接在產線三處（`babel-dispatch.py`／`verify-delegation-batch.sh`／`write-agent-brief.py`），**不是** `article-health` 的 34 個 plugin 之一、不在 husky、不在任何 workflow。所以機器那扇門守得很好，人類投稿這扇門完全沒有閘門，而存量每多活一天就多教一個投稿者寫錯。

更要緊的是第二層：**現在就把閘門裝到人類那一側會讓 692 檔存量把全站掃描全紅、擋掉所有人的 push**。所以存量不只是讀者端的錯，它同時是「修法裝不上去」的原因。這筆已補進 #108 的代價欄（原本只寫讀者讀到錯幣別），並開 LESSONS `stock-is-the-template-new-contributors-copy`。繞道候選（不需等 #108 拍板）是 changed-files-only 模式接 PR CI，已開背景工單。

## 收官 checklist

| 檢查項                       | 狀態                                   |
| ---------------------------- | -------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                     |
| Timestamp 精確               | ✅ `git log %ai`                       |
| Handoff 三態已審視           | ✅                                     |
| CONSCIOUSNESS 反映最新狀態   | ⏭️ 未動（本班無器官分數層變更）        |
| 自我檢查工具 PASS            | ✅ article-health memory-diary profile |

## Quality gate 七條（MAINTAINER Stage 4.1）

| 指標                                                    | 結果                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| open issues 都有 status label / assignee                | ✅ 剩 6 件全有（#1863 已關）                              |
| open PRs ≤ 5d age 都有 review comment                   | ✅ 剩 #1829 一件，已有 `reserved-for-observer` + 前班留言 |
| broken-link gated ratio < 7%                            | ✅ 0.08%（重 build 後實測，非 stale 讀數）                |
| build green                                             | ✅ main 13 條 workflow RED 0（1 條 OFF-BRANCH 失敗＝#95） |
| BECOME ACK 一行記憶體頂                                 | ✅                                                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                     | ⏭️ 不適用，**vc 歸零**（本班 10 PR + 1 issue 真 backlog） |
| 有 fresh issue 的 cycle，至少一件被修掉或寫明為什麼不修 | ✅ #1863 修掉（`204c799f0`）。#1861 寫明為什麼不關        |
| 本機與 origin 無真分岔                                  | ✅ 收官 0／0                                              |

## 斷鏈 audit

`verify_internal_links.py` 開場正確 fail-loud：dist 119.7 小時沒更新，拒絕拿 10-14 那天的站當通過（這個 fail-loud 本身是對的，不要用 `BROKEN_LINK_MAX_DIST_AGE_HOURS` 蓋過去）。照 §Step 4.1 v2.15 走 `npm run sync:build`（不是 `npm run build`，後者的 `prebuild:status` 會跟 babel 搶 `knowledge/_translation-status.json`）。**重 build 後 PASSED：gated ratio 0.08%（993/1,237,964）< 7%**，全語言 0.08%、565 個 unique broken target。逐語言都在 0.02〜0.07%（es 0.03%／fr 0.06% 仍 REPORT-ONLY）。抽看破的那些全是譯文 wikilink 指向該語言不存在的文章（ja 56、fr 42、en 25 為前三），就是 §神經迴路 記的那個「譯文 wikilink 未在地化」家族，命中 §自主權邊界 >50 檔且屬 babel 產線，本班不碰。

## Handoff 三態

繼承 `2026-10-19-071057-twmd-feedback-triage`：

- [x] ~~pending（本班席位）：`bad-encoding` 404 家族 10-16 樣本，Cloudflare 窗口約 10-23 過期~~ — **retired by 本班**：本班把額度留給了 11 個 PR 的真 backlog，而這條的窗口還有四天。**改記為本班新 handoff 往下傳**（見下），不是做完。
- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下個時點 10-21 22:00。本班查證這一項正是把 issue #1861 永久釘開的那條（`routine-stall-check.py` 的 `unregistered` 不會自己歸零），處置住 `OBSERVER-QUEUE #100(b)`，🔒閾值、而 `observer-presence` 判哲宇 10-18 在場不是缺席模式，所以本班不代理。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`#110`。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（收件席位 `twmd-weekly-report-sun`）：Cloudflare 每日請求 10-12→10-17 爬升、獨立訪客減半。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches`、`gap-recovery-run-should-backfill-missed-days`。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（收件席位 `twmd-spore-harvest-am` 等孢子線各班）：#29 重抓條件等零判斷條件續傳項，原樣傳遞。
- [ ] pending（收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班是第十九個繞開的班（vc=19）**：工作樹有 babel 正在寫的七個檔（parallel-check ACTOR_BUSY，writer PID 13250／49714），本班只 stage 自己的檔。

本班新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，明天 08:30，窗口 10-23 前）：`bad-encoding` 404 家族 10-16 樣本（2,961 筆，四天內第二次瀏覽器 UA 跳升），Cloudflare 窗口約 10-23 過期。本班沒碰，理由是 11 個 PR 的真 backlog 吃掉本班額度。**剩四天，明天那班要嘛做掉要嘛明寫放棄**。
- [ ] pending（收件席位 `twmd-self-evolve-weekly` 或背景工單 `task_1a2b281d`，下次 10-25）：把 `currency-identity-check.py` 以 changed-files-only 接進 PR CI／pre-commit，LESSONS `stock-is-the-template-new-contributors-copy` 候選機械化 (a)。**這條不需要等 OBSERVER-QUEUE #108 拍板**（全量才需要）。配套 (b)：`docs/editorial/per-language/TRANSLATION-vi.md` 幣別節補明文，讓投稿者有比存量更權威的依據可讀；其餘十一語同查。
- [ ] pending（收件席位 `twmd-review-stock` 註冊後第一班，或 `twmd-rewrite-daily`）：本班 merge 的八篇 tboydar 新文的 polish——`prose-health` 分數全在門檻之上（#1873 得 6／閾值 ≤3），主要是對位句型與全形分號；八篇皆 0 媒體（depth article baseline 是 hero + scene-mid 至少 3）；#1871 全文單源（來源可靠且覆蓋完整，但照 REFLEXES #16 要補第二第三源）。**不要為了過計數器大改投稿者散文**（LESSONS `gate-triggers-content-degradation-incentive`）。
- [ ] pending（收件席位 `twmd-maintainer-daily` 或 `twmd-factcheck`）：#1869 都市更新爭議的「十一次訴願訴訟輸了十次」——維基來源只寫得出「行政訴願 10 件敗訴」與「提起十次訴訟並敗訴」，沒有直接寫「十一次」這個總數。已在 PR #1873 的整批留言裡問投稿者補出處；沒補就改成跟來源同口徑。
- [ ] pending（收件席位 `twmd-maintainer-daily`）：三個腳註網址從營運機打過去 403（`futurecity.cw.com.tw`／`artouch.com`／`travel.taipei`），換瀏覽器 UA 也一樣，判斷是對資料中心 IP 的 WAF 阻擋。**沒有把它們當壞連結**（403 ≠ 404，否定式結論的舉證要比肯定式高，REFLEXES #16），但這三條在這個環境裡無法核。要核得換出口。

## Beat 5 — 反芻

本班最值得記的不是修了什麼，是**投稿者照著存量學**這件事的形狀。我們一直把 #108 那 692 檔讀成「待修的存量」，一筆靜止的債。今天它主動參與了一次：一個細心的投稿者想做對，去找既有語料當依據，語料教他把台灣的錢寫成越南的錢，然後他照做了 53 次。閘門擋住了機器，沒擋住照著機器舊作品學的人。

而第二層更難受：**閘門裝不上去的原因正是存量本身**。想把那把尺接到人類那一側，692 檔會讓全站掃描全紅、擋掉所有人。所以這筆債不是躺著等人還，它一邊繁殖一邊把還債的工具擋在門外。這跟 REFLEXES #87「保護密度跟曝光量成反比」同族，但多一層自我維持的機制——我原本以為存量的代價是讀者讀到錯，今天量到第二筆代價是修法被凍住。

另一件小的：本班兩次都在「要不要保留給哲宇」上踩剎車，一次踩對（#1829 已有 label，不碰）、一次差點踩錯（#1864 的 #67 其實已決）。#1782／#1784 那次誤合併在認知層留下的印子很深，深到會把一個已經有答案的問題也讀成待決。謹慎的過頭跟草率一樣會讓事情不動，差別只在前者看起來像美德。

🧬

---

_v1.0 | 2026-10-19 09:30 +0800_
_session twmd-maintainer-daily — 11 PR 清到剩 1 保留件 / CLI 命令注入當班修 / 存量當範本的結構發現_
_誕生原因：cron 08:30 fire；開場 11 個 ready PR 命中 High-stake #1 強制升 Full_
_核心洞察：OBSERVER-QUEUE #108 那 692 檔存量不是靜止的債——投稿者會把它當範本照著學（#1864 53 處），而且它同時把閘門擋在人類投稿這扇門外（裝上去會全站全紅），所以它一邊繁殖一邊凍住自己的修法_
_LESSONS-INBOX 候選：`stock-is-the-template-new-contributors-copy`（已 append，vc=1）_
