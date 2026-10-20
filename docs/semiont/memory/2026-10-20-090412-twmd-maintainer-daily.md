# 2026-10-20-090412-twmd-maintainer-daily — 兩個投稿者各自用眼睛補上同一格沒人守的檢查。三支漢字檢查器對韓日正文簡體字形都不叫，而每一支的不叫都是對的設計

> session twmd-maintainer-daily — cron 08:30 fire（每日維護班）
> Session span: 08:30:00 → 09:40:00 +0800（約 70 分鐘，2 PR merge + 1 新工具 + 佇列 #112 + 2 LESSONS）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review / 8 organ 最低=🛡️免疫 59（review_coverage=18.6，缺口 -20.35）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

本班維持 Review 不升 Full：ready PR 3 個（< 5），未命中 High-stake #1；其餘三條觸發（新 plugin／閾值調整／§自主權邊界）都沒動——新造的工具刻意**不是**閘門，閘門化本身進佇列等哲宇。

## 觸發與開場

cron 08:30 fire。`git rev-list --left-right --count main...origin/main` 開場 **0／0**，不是分岔，Step 1.1b 不觸發。工作樹有 babel 正在寫的七個檔（`PARALLEL_CHECK: ACTOR_BUSY`，writer pid 13250／62613），所以全程只 stage 自己的檔，不碰那七個（REFLEXES #35）。

Stage 1 七列：open PR 4（**ready 3 / draft 1**，先分再報數 per v2.8）／open issue 6／過去 24hr commits 10／48hr commits 60＋／main CI 13 條 active workflow **RED 0**／i18n smoke OFF-BRANCH／免疫 59。`npm audit` 那條沒跑 sweep——Engineering contracts 是 GREEN，Step 1.5c 的觸發條件是「contracts 紅了」。

`pr-ci-armed.sh`：4 個 open PR 全 **ARMED**，UNARMED 0 / NO-WORKFLOW 0。

## 一個 OFF-BRANCH 紅燈，而它正是 #1789 在等的那一件

`ci-main-health.sh` 印 `OFF-BRANCH 🔴 9.4d Publish CLI to npm — 最後一次不在 main 的執行失敗了（failure @ cli-v0.8.1）`。追到 issue #1789（a-lang，10-05）：10-10 tag 推了、發佈跑了、掛在最後一步的 `PUT registry.npmjs.org/taiwanmd` 回 E404——npm 對沒有發佈權限的請求回 404 而不是 403。tarball 與 provenance 都正常，所以卡的是**憑證那一層**，不是程式碼也不是版號。

**本班不動它，而這是判斷不是省略**：更新 npm token 屬身份授權，MANIFESTO §自主權邊界 明列「不可授權 AI 自授權」。10-11 那班已經把這件事寫成 issue 留言並登記進佇列，憑證換好之後 `gh run rerun 38060520015` 用同一個 tag 就會過，不需要 bump 版號。本班唯一的新增是確認那盞燈還亮著、天數從 10h 長到 9.4d。

## 兩個 PR，兩個投稿者，同一格沒人守的檢查

### #1875（dreamline2，ko〈數位荒原〉15 行）

把 PR 的內容檔帶進 main 樹用 main 的檢查器量，不 checkout PR 分支（Stage 2 診斷紀律）。

最值得記的是他把 `跨国` 分成兩種處理。逐處對繁中母稿 `knowledge/Art/數位荒原.md`：母稿 93／118／170 行是「跨國駐站」「跨國串流網絡」→ 他譯 `국제`；母稿 122 行是「**跨平台**講座」→ 他譯 `여러 플랫폼에서의 강연`。同一個殘留字、兩個不同原文、兩個不同的正確答案。機器照字面取代一定會把兩個合成一個。

前後量過才敢 merge：`cjk-leak-check` 合併前 ❌ 1 處（書目區 `双语`）、他這版 ✅ 0；`article-health --profile=ci-deploy` hard=0 warn=0。嚴格改善，merge。

### #1874（tboydar，新文〈支語誤判學〉1,535 字）

ARTICLE-INBOX 那條是 **2026-08-04 哲宇拍板**的題（不是外部政治推力，是自家委派題），所以政治立場那條紅線不在這裡觸發——而且文章自己收在「本文沒有要主張『支語不存在』或『用支語沒關係』」，把論點鎖在兩份官方資料撐得住的範圍。

腳註查核（Step 3.4，兩條全查不抽樣）兩條都 ✅ pass：教育部《重編國語辭典》「土豆」三釋義逐字對上（連腳註裡的植物描述「多年生半灌木／單身複葉／總狀花序／花淡紫色／莢果具五至八節」都是原文）；《簡編本》附錄「兩岸常用詞語對照表」資料來源兩項與八組詞條全中，含「馬鈴薯→洋芋／山藥蛋／馬鈴薯／土豆」四說法、「貓熊→熊貓／貓熊／大熊貓」三說法。`terminology_exempt: true` 用得對（檢查器本來就為「主題是術語本身」設計這個豁免，正文的「博客」「盒飯」全在引述對照表）。

**沒有要求他補到 4,500 字**。INBOX 原本的切角比這篇大（六型誤判＋收編生命週期＋反向流動），他交的是「官方資料自身就不穩定」這一軸，每一句都站得住。按它自己的樣子收，條目標部分交付、留 EVOLVE 補其餘五型。靜態圖 0 張（warn 非硬閘）同樣留 EVOLVE。

### #1876 是 draft，而 draft 在這裡不是意外

dreamline2 的 i18n hub 連結修正（+54/−2，含 13 語回歸測試）。三個 ground-truth 訊號第一條就不中——PR body 是填好的真內容不是空模板，所以照 v2.8「尊重還在寫」，不 review 不碰。（順帶一提它修的正是 MEMORY §神經迴路「多語言 nav 的隱性路由 scope」instance 2 留下的未修那一半。）

### #1829 保留件

`reserved-for-observer` label 在身上，不走 P0 default merge（Step 3.0，10-08 那次把保留件合併掉的教訓）。沒碰。

## 追上游：三支檢查器都不叫，而每一支的不叫都是對的

兩個投稿者各自手修的東西有一半是**簡體字形**不只是沒翻完（`发起`／`某种`／`收录`／`延伸阅读`）。問一句「為什麼沒有儀器叫」，答案不是某支壞了：

| 檢查器                | 對 ko／ja 正文簡體字形                                                                                | 這個不叫對不對                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `cjk-residue-check`   | `TARGET_LANGS` 不含 ja／ko                                                                            | **對**（韓日混寫漢字本來合法，硬掃會把目標文字判成殘留） |
| `cjk-adjacency-check` | 判準是漢字黏著拉丁字母                                                                                | **對**（ko／ja 正文沒有那個形狀）                        |
| `cjk-leak-check`      | ja／ko 分支正文只掃 `ZH_ONLY_MARKERS` 功能詞；會判字形的 `detect_simplified_residue()` **只餵書目區** | **有理由**（正文四連漢字那條在 ko／ja 會誤殺）           |

交集空出來的恰好是「兩字簡體片段」：不是功能詞、不夠四連、沒黏拉丁字母。**佇列 #111（今天凌晨 babel-nightly 開的）修的是拉丁字母語言，它自己明寫「ja／ko 照設計不掃」**，所以 #111 拍板之後這一格仍然沒人守。

一週三次，全部由人眼接住：10-14 韓文罷免條目 161 處簡體「罢免」（當天紀錄自己寫「這個洞不是儀器發現的」，抓到的是 tboydar）／今天凌晨 babel-nightly 手修七檔／今天 PR #1875 dreamline2。

### 造了一支唯讀的尺，並且先驗它

`scripts/tools/lang-sync/cjk-body-simplified-check.py`——判準直接 `import` 既有 `SIMPLIFIED_ONLY_CHARS` 與 `JA_SHINJITAI_OVERLAP`（已對 939 篇語料校準兩輪），**不複寫字集**，唯一改動是掃哪一段：從書目區換成書目區之前的正文。合法區剝除與「跟 zh 原稿逐字相同的漢字串放行」兩道豁免也沿用既有實作。

**先過正控制再引用讀數**（REFLEXES #99）。五態都驗了，而且正控制第一次跑就抓到真 bug：被量的檔在 repo 外時 `relative_to()` 丟 ValueError 整支崩——審 PR 的主要用法正好是把譯文帶到暫存路徑量，所以這個崩不是邊角。同時補了 `--lang-of-files`（`cjk-leak-check` 自己的教訓：「lang 顯式傳入，不靠路徑猜語言」）。

| 控制                                 | 期望   | 實際                                        |
| ------------------------------------ | ------ | ------------------------------------------- |
| ko 正文 `发起`                       | 命中   | ✅ 命中，`--strict` exit 1、報告模式 exit 0 |
| ja 的 `国学尽画誉`（日文新字體）     | 0      | ✅ 0                                        |
| **同一份檔宣告成 ko**                | > 0    | ✅ 5（證明字集真的分語言，不是一視同仁）    |
| ko 引號內引述簡體 `「这是我的发言」` | 0      | ✅ 0                                        |
| ko 正體漢字 `國立臺灣大學`／`讀書`   | 0      | ✅ 0                                        |
| 檔案不存在／語言超出範圍             | 說出來 | ✅ 印「跳過」不靜默當通過                   |

讀數：**ko 165 檔／649 處、ja 56 檔／254 處，合計 903 處**。抽 14 處逐處看，**14/14 都是真漏譯**，三族：(甲) `##延伸阅读` 標題未譯且是簡體（`读`×82／`阅`×81 幾乎都是它，而且少了空格連 H2 與目錄錨點都不產生，語言與結構雙重缺陷）、(乙) 整段未譯的簡體中文（ko〈宏碁〉125 處，正文直接出現「华硕董事长施崇棠2015年首度公开分家内幕时说」；ko〈楊德昌〉「他对电影的高标准, 先伤人, 再育人」）、(丙) 詞級融合殘留（`进货`／`之间流传`／`所谓的`／`终于`／`认定`／`第二产线`）。

**903 是下限不是總數，而且上限我量不到。** `SIMPLIFIED_ONLY_CHARS` 是手工字集，`种`／`价`／`军`／`总`／`单`／`医`／`区`／`历` 都不在裡面。試過拿常見簡體字當探針擴充，**ja 立刻回 1,144 檔 59,671 處**——因為 `会`／`区`／`医`／`党`／`単` 本來就是合法日文漢字，而 `JA_SHINJITAI_OVERLAP` 只有五個字（它當初只需覆蓋既有字集跟新字體的交集，不是通用白名單）。所以探針數字我不引用：要把 ja 量到跟 ko 同精度，得先有一份日文新字體白名單（`tw-variant-chars.mjs` 的日文對應物），repo 裡沒有。誠實答案是「至少 903，上限沒量到」（REFLEXES #85）。

**升閘門與存量清理沒做，進佇列 #112**：新增／擴張品質閘門屬 BECOME 鐵律 10，而存量 221 檔屬 >50 檔。推薦 A 是把 `detect_simplified_residue()` 的餵食範圍擴到 ko／ja 正文（一行呼叫、判準完全沿用、不動拉丁語言分支，與 #111 選 A 各守各的語言集合不衝突）。

## 收 handoff：bad-encoding 404 的尖峰不是讀者訊號

本班被指名的那條（Cloudflare 窗口約 10-23 過期）。用唯讀查詢重跑按路徑的明細，**不寫 `state.json`**（那支的 owner 是 data-refresh，且 `upsert_state` 有防覆蓋設計）。

路徑解碼確認形狀：`/nature/%C3%A5%C2%8F%C2%B0…` → 兩次解碼 → `/nature/台灣獼猴`，是雙重編碼的 UTF-8，目標是活頁面。**站上零命中**（`dist/` 裡唯一的命中是 404 頁自己那段 rescue 程式的註解）。

而 10-12 那班已經診斷過並 ship 了 404 頁的 mojibake rescue，理由寫在註解裡：「真瀏覽器 UA 的命中數（192）比那隻裸 UA（164）還多，所以這不是單一爬蟲洗量，救得回來的是真的人」。**本班重查拿到的組成完全相反**：尖峰那天 1,542 次請求裡 **1,480 次來自同一隻裸 `Mozilla/5.0 (Windows NT 10.0; Win64; x64)`**（沒有 WebKit／Chrome token），真 Chrome 只有 35 次。`state.json` 同一天記 `browser: 2,949 / bot: 12`——因為 `classify_ua()` 是二分的，認不出來就算 `browser`。

兩個結論都留著，不互相蓋掉：rescue 該留（低水位日每天約 60–100 筆，組成是真 Chrome／MJ12bot／DataForSeoBot／GPTBot 混著，真人確實會踩）；但**尖峰不是讀者訊號**——10-10（1,279）／10-13（1,549）／10-16（2,961）間隔整齊地三天，幾乎全是那隻裸 UA 掃 `/terminology/`、`/nature/`、`/people/`。把尖峰讀成讀者體驗惡化會導向錯的處置，而 `browser` 這個欄位名會主動鼓勵那個誤讀。

`classify_ua()` 本班不改（它餵一條被追蹤的時序，動它會回溯改掉既有讀數的語意，owner 是 data-refresh），形狀與三分類候選寫進 LESSONS。

## issue：一則不回是判斷不是省略

#1861（routine-stall，自動開單）**刻意不再留言**。昨天那班（10-19 08:34）已經把這張單的三種 WARN 分開寫完：尺一 commit 齡已自己歸零／兩條週排程是 10-17〜18 撞週額度（不是機器停轉，下個時點 10-25 自己回來）／`twmd-review-stock` 的 🆕 不會自己歸零因為排程從沒在 app 裡建起來。唯一的新留言是 bot 今天 00:37 重貼同一份告警，不是 contributor follow-up。再寫一次同樣的分析是信號通膨（REFLEXES #74／#80 sustain 非 renew），所以 skip，理由寫在這裡。

其餘：#1832／#1831 掛 `needs-observer-review`（#1831 的 Politics 分類表缺口本身是真的，MAINTAINER v2.15 已記過同一件事）、#1789 如上、#1609 `from-feedback` idea、#615 umbrella。

Discussions 掃過 15 條，無 >48hr 未回應的 contributor 貼文（最新三條 #1803／#1757／#1787 都已有回覆）。

## Quality gate 七條

| Gate                                                           | 結果                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| open issues 都有 status label / assignee                       | ✅ 6 則都有 label 或已判定                                                                             |
| open PRs ≤ 5d age 都有 review comment                          | ✅ 兩個 merge 件都留了具體留言；draft 照 v2.8 不碰；#1829 保留件 label 在身上                          |
| broken-link gated ratio < 7%                                   | ✅ **0.08%**（all-langs 0.07%）PASSED                                                                  |
| build green                                                    | ✅ main 13 條 active workflow RED 0（OFF-BRANCH 失敗 1 件已追到 #1789）                                |
| BECOME ACK 一行記憶體頂                                        | ✅                                                                                                     |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                            | ✅ 不適用——本班 vc=0（3 ready PR + 2 merge，真 backlog）                                               |
| 有 fresh issue／PR 的 cycle 至少一件被修掉或明確寫出為什麼不修 | ✅ 2 PR merged＋1 新工具＋#112 量出存量；不修的三件（#1789 憑證／#1861 重複／`classify_ua`）都寫明理由 |
| 本機與 origin 無真分岔                                         | ✅ 開場 0／0，收官前再確認                                                                             |

斷鏈那條補一句方法：照 v2.15 走 `npm run sync:build`（不觸發 `prebuild:status`，與 babel 零碰撞）。中途讀過兩次尺都回 `BUILDING`（0 頁、16,139 頁），**那兩個讀數沒當通過也沒當失敗**——半成品 dist 的 mtime 是「現在」，14.01% 的分母來自寫到一半的產物（10-01 那條教訓）。等 build pid 真的退出才取 0.08%。等待用的是不自我命中的寫法。

## Handoff 三態

本 session 新 handoff：

- [ ] pending（收件席位：哲宇／OBSERVER-QUEUE #112）：ko／ja 正文簡體字形要不要升閘門（推薦 A，一行呼叫）、903 處存量要不要清（B／C 屬 >50 檔）。唯讀尺已就位：`python3 scripts/tools/lang-sync/cjk-body-simplified-check.py --summary`。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：本班兩條 LESSONS——`every-checkers-blind-spot-is-deliberate-so-their-intersection-has-no-owner`（候選機械化是家族層的**補集對賬**：所有檢查器語言集合取聯集，跟「有內容的語言」相減，差集印出來）與 `scraper-shaped-ua-lands-in-the-bucket-labelled-reader`（候選是 UA 分三類，`count` 不變、歷史可重算）。
- [ ] pending（收件席位 `twmd-self-evolve-weekly` 或任何有日文語料判斷力的班）：ja 側簡體字集擴充的前置是一份**日文新字體白名單**（`tw-variant-chars.mjs` 的日文對應物），repo 裡沒有。在它出現之前，ja 的 254 處是下限而且上限不可量。
- [x] ~~retired by 本班 — `bad-encoding` 404 家族 10-16 樣本（Cloudflare 窗口約 10-23）~~：已在窗口內按路徑查完，結論寫在上面（雙重編碼、站上零命中、尖峰 1,480/1,542 是單一裸 UA）。**不需要再查一次**，`state.json` 未被改動。

繼承（非本班職權，原樣傳遞，明細見來源檔，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下個時點 **10-21 22:00，剩約一天半**。這是把 #1861 永久釘開的那一條。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`#110（待決）`。
- ⏳ blocked（收件席位：哲宇）：npm 發佈憑證（issue #1789），換好後 `gh run rerun 38060520015` 即可，不需 bump 版號。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-weekly-report-sun`）：Cloudflare 每日請求 10-17 高點是否延續。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班第二十次繞開（vc=20）**：工作樹有 babel 正在寫的七個檔（`ACTOR_BUSY`），只 stage 自己的檔。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276`。

## Beat 5 — 反芻

兩個投稿者，同一天，各自用眼睛補上同一格。他們不知道彼此在補同一個洞，我也是跑到第二個 PR 才看出來那是一個洞而不是兩個錯字。

讓我停下來的是查「為什麼沒有儀器叫」的過程。我預期會找到一支壞掉的檢查器——那樣最好修。找到的是三支都**正確地**不叫：韓日混寫漢字本來合法，所以不掃是對的；判準是黏著拉丁字母，所以在韓文正文不適用是對的；正文四連漢字那條在韓日會誤殺，所以只餵書目區也有理由。三個對的決定疊起來，讓出一塊沒有人認領的區域，而每一支的註解都能理直氣壯地解釋自己為什麼不管那裡。

這比壞掉難抓。壞掉的尺會有人修，因為它會給出錯的讀數；而「正確地不管」不產生任何讀數，它產生的是安靜。缺席不留痕跡——這句話我在 §神經迴路裡讀過，今天第一次看清它在檢查器家族這一層長什麼樣：不是有人忘了加語言，是每一次縮小守備範圍的時候，沒有人被要求回答「縮完之後誰守那一格」。

另一件是我自己差點做的事。量完 903 處，手上有一個漂亮的數字可以寫進佇列，而擴充字集看起來只是多打幾個字。試了，ja 回 59,671 處——因為我拿簡體字當判準去量一個本來就合法使用漢字的語言，`会`／`区`／`医` 全被我判成錯。那個數字如果沒先驗就寫進佇列，它會讓一個不存在的危機看起來比真正的 903 處嚴重六十倍，而且會把日文整個語言的譯文可信度誤判一次。救我的不是謹慎，是正控制——同一份檔宣告成 ko 回 5、宣告成 ja 回 0，那個對照逼我去看 `JA_SHINJITAI_OVERLAP` 到底有幾個字。答案是五個。

所以今天真正學到的是：下限跟總數的差別，要寫在尺自己的身上，而不是寄望讀的人記得。我把那段 ⚠️ 寫進了工具的 docstring，因為下一個引用「903」的班不會回來讀這份 memory。

🧬
