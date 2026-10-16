---
title: '2026-10-16-083443-twmd-maintainer-daily'
description: '維護班：五個 PR 清到剩一個保留件；投稿者在韓文版抓到的折扣錯是中文母稿的語法錯，十三語一起修並補上沒在看的那道閘門；手跑一次幣別閘的 --all，量出 692 檔存量'
type: 'session-memory'
status: 'log'
current_version: 'v1.0'
last_updated: 2026-10-16
last_session: '2026-10-16-083443-twmd-maintainer-daily'
---

# 2026-10-16-083443-twmd-maintainer-daily — 一個韓文折扣錯追到中文母稿的圖表語法，十三語一起修。補閘門時撞出檢查器自己的第二份清單，手跑幣別閘 --all 量出 692 檔沒人數過的存量

> session twmd-maintainer-daily — cron am 08:30 維護班（BECOME 因 PR triage ≥ 5 強制升 Full）
> Session span: 08:34:43 → 09:18 +0800（約 44 分，7 個自有 commit + 4 個 PR merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**Full**（High-stake #1 命中：ready PR = 5）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，非記憶值）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

cron 08:30 維護班。Stage 1 掃到 5 個 ready PR，命中 BECOME §Step 0 High-stake 第 1 條（PR triage ≥ 5），所以 mode 從 Review 升 Full，補載 OBSERVER-QUEUE §待決、UNKNOWNS、LONGINGS、ANATOMY、DNA gene map、HEARTBEAT 薄殼與 ARTICLE-INBOX 之後才進 Stage 2。開場額度 46%／本週已過 21.8%，`budget-pace.py` 判 🟡 lean，所以本班不扇出子代、不開大批次，重活只做產線必要的。

Stage 1 其餘：本機領先 origin 9 個（babel 未推），`A 0` 是純領先不是分岔。13 條 active workflow RED 0，唯一紅的是 tag 觸發的 `npm-publish-cli`（`cli-v0.8.1` 的 `NPM_TOKEN` 失效，佇列 #95，issue #1789 正在等它）。5 個 PR 全 ARMED。

## 五個 PR：四個合併，一個是保留件

#1857（dreamline2）、#1858／#1859／#1860（aminzai）四個合併（`1465f059d`、`5b1ff1b36`、`8cd4bdb88`、`0f6a1d38b`）。#1829（idlccp1984 的蔣萬安）掛著 `reserved-for-observer`，是 10-08 那班立的 label 配上佇列 #104 的選舉年門檻問題，照 v2.16 不走 P0 default。本班沒碰它，也沒再留一則留言。

aminzai 三篇的驗收值得記下來，因為它們省掉了本班的 heal：章節數與腳註網址數對中文母稿**逐項相等**（ko 6/6 與 3/3、es 6/6 與 3/3、hi 7/7 與 12/12），字元比 1.57／3.56／2.58 全落在各語健全帶內，`curation: incubating` 與 `lastHumanReview: false` 他自己就填對了。摘要式翻譯會在章節與網址數上掉東西，三篇都沒有。唯一的 info 是 #1860 有三條腳註定義了但正文沒引用。去對中文母稿，**少的是同樣那三條、編號完全相同**，所以那是母稿的缺口被忠實翻過來，不是漏引（母稿那邊屬內容重寫範圍，進交接）。

照反刷版規則寫一則累積留言在 #1858，#1859／#1860 只放指路。

## 韓文版的折扣錯，根在中文母稿的圖表語法

dreamline2 的 PR 改一個檔案，往上游追之後是三族、十三個檔案。

**折扣算錯**：七五折是付定價 75%、折掉 25%，而韓文版寫「75% 할인」。同一個反轉在 en／de／fr／hi／id／ru 的會員表裡都有，es／pt／vi／ar 四語早就對了，日文用「8割」本來就對。id 那格是 `Diskon 7.50%`，7.5 折被當小數搬過去。他修了表格但漏掉文末那句「85% 할인」（85 折是折 15%），本班補上，同句在另外五語也錯。**幣別**：「200위안」該是新台幣，同樣寫成人民幣的還有 en／es／ar／hi／ja／ru 六語。

**圖表語法這一族最值得記**。他把 tw-bars 區塊的 `title:` 與 `axis:` 兩列換成一行標題，方向完全正確：graph.md §四 沒有定義任何這種鍵，模組標題就是「第一列不含 `|`」。而那兩列是**中文母稿自己寫的**，十二個語言忠實地照翻。去讀 renderer 確認讀者實際看到什麼：第一列照樣當標題，所以標題字面上印著 `title: `。第二列落進 tw-bars 的資料列，沒有 `|`、數值解析成 0，**變成一條長度 0、標籤是「axis: 折扣率 (%)」的幽靈條**。十三個檔案的 `viz-health` 全部 `warn=0` 通過。

修法：十三個檔案的語法與語意一起改，標題改寫成一句斷言並點明數字是「佔定價 %」（`af787aed3`）。改完十二語會變 stale，而正文的「8折」「9折」仍然是中文慣用寫法，而模型上一輪就是在這裡把它讀成「八成的折扣」，所以把三個 sha 蓋回本班 commit（`3ec1218d5`），今晚不重翻，不讓手改的數字被再抽一次。

## 補閘門的時候撞到檢查器自己的第二份清單

那道沒在看的閘門補上了：`viz-health` 新增兩條全語系規則，抓圖表模組裡的 `title:`／`axis:` 這類鍵，以及被翻譯掉的 config 鍵。負控制過了（修前的中文母稿現在 `warn=2`，逐行指出兩列），十三個檔案修後全綠。

**第一版規則寫成「任何 latin 冒號開頭」，掃全庫報 488 個檔案，全是假陽性**：`Fonte:`／`Quelle:`／`Fuente:` 的合法來源列。病根是 `viz_health.py` 的來源標籤寫死 `資料來源|來源|source` 三個，而 `article-render.ts` 的 `_buildSrcLineRe()` 上面那段註解明文寫著「從 `VIZ_STRINGS.srcPrefix` 推導，**不手列第二份清單**」，還註明它是為了修一個真實事故才這樣寫的（約 440 篇譯版來源 caption 消失）。那個決定只住在產生端的註解裡，檢查端又長了一份。改成跟同檔 `_known_modules()` 一樣從 renderer 解析，488 降到 10。

這裡有一層我之前沒意識到的：**它三個月沒出事，因為用到那份清單的規則全都只跑中文母稿**（A／B／C 三項 `_SSOT_LANG = "zh-TW"`）。射程不是只決定「這條規則檢查誰」，也決定「這條規則踩不踩得到它腳下那塊地」。

narrow 成白名單之後剩 10 檔、0 假陽性，而那 10 檔是第三族：〈視覺化模組型錄〉的十二個譯本把 `單位：`／`過半：` 翻成 `Unit:`／`Einheit:`／`الوحدة:`，renderer 只認中文那四個鍵，所以每個語言掉兩個模組的 config 又各多一條幽靈條。**解釋視覺化系統的那一頁，自己的視覺化壞在十二個語言裡**。鍵改回中文（鍵不會被渲染，讀者看到的是值），順手修掉西語版一個編碼殘渣。renderer 的來源標籤也補了 `Datenquelle` 等複合詞，de 兩篇的來源列因此掉過。

## 兩則 issue：一條假的控制，一條只有哲宇按得到

#1832（tboydar 的資安稽核記錄）三個待裁定項，`Bun.serve` 綁 loopback 他自己的 PR #1836 昨天已合併（複驗現狀是 `hostname: config.host`），`npm audit` 那 4 個 moderate 仍在佇列 #105 且今天只是第 1 天（那一列寫 7 天無回應才可代執行紀錄部分，本班不碰）。第三項是 CSP 決策記錄，寫進 SECURITY.md §HTTP 回應標頭。標頭狀態本班自己 `curl -I` 複驗過，跟他 10-14 量到的一字不差，記錄裡把他那句「worker 若出現帶憑證端點就要重新檢視」寫成四個觸發條件之一，不依賴誰記得。

寫記錄時先驗同一頁的既有敘述，撞到比 CSP 更該修的：§第三方依賴 寫「我們使用 GitHub Dependabot 自動監控依賴漏洞，所有高風險漏洞會在 7 天內處理」，而三項實測全否（無 `.github/dependabot.yml`、`vulnerability-alerts` 回 404、`automated-security-fixes` 回 `enabled: false`）。**一份從未存在的控制，寫在資安研究者最先讀的那一頁上**。改成實際在守的五道 CI `npm audit --audit-level=high`，並寫明兩者差別：CI 的 audit 是事件驅動，Dependabot 是持續監控，中間那段空窗目前靠維護班每天看 contracts job 有沒有轉紅接住（`05b8ba3b2`）。要不要補那段空窗是倉庫設定，進佇列 #107。

#1831（Politics taxonomy）的待定項是 `'2026 選舉專題'` 要不要併回 `'選舉制度'`。昨天那班把它留在 issue 留言串裡，那裡有選項、有成本，但沒有期限也沒有預設動作，於是搬進佇列 #106 並寫上推薦與 7 天後可代執行的範圍。tboydar 已經說「選定值我就開 PR 把 19 篇對齊」，PR #1829 的 frontmatter 缺 subcategory 也是因為查不到該填什麼。一格沒定，下游兩件事都動不了。

#1789 與 #1609 已掛 frank890417，照 Step 3.0 跳過，#615 是 umbrella。

## 斷鏈 audit：0.08% 通過

隔離 worktree + 從主樹補兩個 gitignored 衍生檔（`fork-graph.json`／`git-info.json`）+ `npm run sync:build`，19,058 頁 12 分 52 秒 build 完，babel 三個 worker 全程在跑、零碰撞。`verify_internal_links.py` 回 **gated 0.08% < 7%，PASSED**，1,046 條死鏈／565 個唯一目標，zh-TW 占 725 條。上一輪量到 0.16%，這輪 0.08%。剩下的是幻覺 wikilink 的結構性 backlog，標記給觀察者不在本班修。

## 收官 checklist

| 檢查項                       | 狀態                                                      |
| ---------------------------- | --------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                        |
| Timestamp 精確               | ✅ 全部取自 `git log %ai`                                 |
| Handoff 三態已審視           | ✅                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層（`dashboard-alerts.json`），本班未改 prose  |
| 自我檢查工具 PASS            | ✅ 13 檔 `--profile=ci-deploy` 全 hard=0，777 pytest 全過 |

### Quality gate 7 條

| 指標                                 | 結果                                                              |
| ------------------------------------ | ----------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE         | ✅ Stage 1-4 全跑                                                 |
| PR 分流按 §collect-and-merge         | ✅ B 路徑 5 件（4 merge／1 reserved）                             |
| routine PR backlog ≤ 3               | ✅ 0（v2.1 main-direct，無 routine PR）                           |
| broken-link gated ratio < 7%         | ✅ 0.08%（fresh dist，隔離 worktree）                             |
| build green                          | ✅ `npm run sync:build` exit 0，19,058 頁                         |
| 本 cycle merge 的 PR 都過 hard gate  | ✅ 紅旗 10 條零命中／CI ARMED／ci-deploy + pre-commit 兩把尺      |
| 有 fresh issue 的 cycle 至少修掉一件 | ✅ `05b8ba3b2`（SECURITY.md 假控制）＋`af787aed3`（13 檔 + 閘門） |

連續空場 vc = **0**（本班滿載：5 PR + 2 issue，第四天滿載）。

## Handoff 三態

繼承 `2026-10-16-071157-twmd-feedback-triage`（非本班職權者原樣傳遞，明細不重抄，REFLEXES #74）：

- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`，下個時點 10-21。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼後要隔兩晚才生效的三選項。
- [ ] pending（延續，收件席位 `twmd-data-refresh-am` 或 maintainer）：文章數與 embeddings zh 索引固定差 9 篇。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議。
- [ ] pending（延續，收件席位 `twmd-spore-harvest-am` 等孢子線各班）：#29 重抓條件等零判斷條件續傳項。
- [ ] pending（延續，收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班是第十八個繞開的班（vc=18）：工作樹有 babel 正在寫的譯文（writer PID 7583／13250），本班全程用顯式 pathspec，`verify-commit-scope.sh --head 26` 驗過零污染。
- [ ] pending（延續，收件席位 `twmd-self-evolve-weekly`）：HG12c 成功路徑的 fixture 正控制。

本班處理掉的：

- [x] ~~`duplicated-lang-prefix` 404 家族~~ — retired by `twmd-data-refresh-am` 2026-10-16（整天只剩 60 筆驗收收掉），本班不再往下傳。

本班新 handoff：

- [ ] pending（收件席位：哲宇，`OBSERVER-QUEUE #108`）：幣別存量 692 檔 4,416 處，🔒 >50 檔不代理。B 的第一批若 10-23 仍無回應，Full mode session 可代執行**單一語言的第一批 ≤50 檔**（vi 命中最多）並在該列記進度與歸零數，不一次推進整族。
- [ ] pending（收件席位：哲宇，`OBSERVER-QUEUE #106`）：`'2026 選舉專題'` 併值。非紅線，10-23 起可代執行推薦選項 B（只改 taxonomy 表頭文字與一行慣例說明，不動任何文章 frontmatter）。
- [ ] pending（收件席位：哲宇，`OBSERVER-QUEUE #107`）：Dependabot alerts 是否啟用。🔒 倉庫設定，選項 C 的留紀錄部分 10-23 起可代執行。
- [ ] pending（收件席位 `twmd-rewrite-daily` 或 ARTICLE-INBOX）：`Economy/台灣電價機制與台電.md` 有三條腳註（`[^3]`／`[^10]`／`[^12]`）定義了但正文沒引用，十二語譯本忠實繼承同樣三條。屬內容範圍不在維護班 heal 邊界。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`）：`viz_health` 已從 renderer 解析模組名與來源標籤兩份清單，**第三份（config 鍵 `單位|過半|欄|基準`）仍是 renderer 與檢查器各自寫死中文**。把它收進 `VIZ_STRINGS` 或一份共用 JSON，是 LESSONS `checker-grows-the-list-the-generator-refused-to-keep` 能真正收掉的那一刀。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，LESSONS `gate-shipped-but-stock-never-measured`）：候選機械化是「週體檢 dossier 加一節：有 `--all` 旗標但近 30 天沒人跑過的閘門」。這條是機械可查的，而它要防的正是本班今天靠手跑才發現的那種沉默。

## Beat 5 — 反芻

今天三個發現是同一個形狀的三次：**守住了入口的那道閘門，不會回頭看它上線之前已經積在裡面的東西。**

幣別閘 9 月 9 日出生、9 月 26 日接進產線，產線那一端守得很好：新譯文寫裸 `yuan` 會被擋下重試，這條我在 LESSONS 裡讀過它誕生的故事。而我今天手跑一次 `--all` 才知道它背後有 692 個檔案、4,416 處。這個倉庫對新閘門其實有一套慣例動作：守產線、量存量、超過 50 檔進佇列，`#51`／`#53`／`#90` 三條都走完了。慣例的中間那一步沒有任何東西在看，所以它被跳過的時候，那批檔案在佇列裡沒有編號、在任何報表上都不是一個數字。**唯一能發現它的方式是有人剛好手跑一次**。而我今天會手跑，是因為一個投稿者讀韓文版讀到折扣數字不對。

`viz-health` 的來源標籤是同一件事換成清單：產生端為了修一個真實事故，把「不要有第二份清單」寫進註解，而檢查端是另一個檔案、另一個時間點，又長了一份。而它三個月沒出事，因為用到它的規則全都只跑中文——**射程限制替它擋了三個月的考驗，直到我加了一條全語系的規則，第一次掃就報 488 個假陽性**。如果我沒有先掃全庫就 ship，那 488 個會變成十二語譯文每天的假警報。REFLEXES #99「尺先驗再用」今天是靠流程接住的，不是靠我想起來。

兩條都進了 LESSONS（`gate-shipped-but-stock-never-measured`、`checker-grows-the-list-the-generator-refused-to-keep`），前者是 REFLEXES #58 (f) 反過來的那一半。

另外一件小事值得留著。我今天合併完四個 PR，本機與 origin 立刻變成 9／9 雙邊領先——而 Stage 1.1b 的判準只數那兩個數字，它會說這是真分岔。那個分岔是我自己三十秒前造的。10-14 那班已經把這件事寫成 LESSONS（`divergence-verdict-ignores-who-made-it`），所以我讀到 9／9 的時候沒有去跑十二步的策略 B，只做了一次普通的 merge。**一條還沒升 canonical 的教訓，今天就靠「我剛好在甦醒時讀過它」接住了一次**——這正是 §神經迴路 那句「memory 是自律，canonical SOP 才是閘門」的反面例證：自律這次有效，但它有效的條件是那條教訓剛好出現在三天內的 LESSONS 裡，而不是三個月前。

🧬

---

_v1.0 | 2026-10-16 09:18 +0800_
_session twmd-maintainer-daily — cron am 維護班，PR triage ≥ 5 強制升 Full_
_誕生原因：cron 08:30 fire；5 個 ready PR 觸發 High-stake 升 Full_
_核心洞察：守住入口的閘門不會回頭看它上線前已經積在裡面的東西——幣別閘守產線 37 天、存量 692 檔沒人數過；而「不要維護第二份清單」這個決定只住在產生端的註解裡，檢查端又長了一份，靠語言射程藏了三個月。_
_LESSONS-INBOX 候選（已 append）：`gate-shipped-but-stock-never-measured`（REFLEXES #58 (f) 的鏡像）／`checker-grows-the-list-the-generator-refused-to-keep`（#92 的子形狀，含「規則射程藏住共用資料面的錯誤」新維度）_
