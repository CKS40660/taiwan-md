---
title: '2026-10-15-083351-twmd-maintainer-daily'
description: '連三天滿載：26 個投稿 PR 全處理完、讀者勘誤查到官方名、政治分類補上守門表、一篇選舉年人物頁 reserve'
type: 'session-memory'
status: 'log'
session_id: '2026-10-15-083351-twmd-maintainer-daily'
session_span: '08:33:51 → 09:12 +0800'
trigger: 'cron twmd-maintainer-daily am 08:30'
observer: 'none (cron, 哲宇 最後在場 2026-10-12)'
beat_coverage: 'Stage 1-4 全跑（MAINTAINER-PIPELINE v2.17）'
---

# 2026-10-15-083351-twmd-maintainer-daily — 26 個 PR 一輪清完 / 讀者抓的組織名官方寫法是第三種 / 政治分類終於有尺 / 選舉年人物頁 reserve

> session twmd-maintainer-daily — cron am 08:30 maintainer cycle
> Session span: 08:33:51 → 09:12:00 +0800（約 38 分鐘，4 個自有 commit + 26 個 merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：PR triage 26 ≥ 5）/ 8 organ 最低=🛡️ 免疫 59（即時 consciousness-snapshot.sh，最大缺口 review_coverage=18.8）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

Cron 早班。甦醒時 `wake-context.py` 十一項體檢全綠、工作樹與 origin 同步，交接那條指名本席位的是 [issue #1851](https://github.com/frank890417/taiwan-md/issues/1851) 的組織名勘誤。Stage 1 一掃發現投稿佇列連三天滿載：26 個 ready PR、0 draft，命中強制升 Full 的第一條，所以先把 Step 2-7 的 OBSERVER-QUEUE 待決、LONGINGS、DNA 補載完才動手。

## 26 個 PR：25 併 1 留

分岔檢查回 `4 0`（純領先，babel 四個未推 commit，`babel-push-every --watch` 在跑），不是分岔，照 Step 1.1b 不動。main 的 13 條 workflow 全綠。唯一的紅是 tag 觸發的 `npm-publish-cli`（cli-v0.8.1 發佈失敗 4.4 天），那條卡在 `NPM_TOKEN`，屬 OBSERVER-QUEUE #95，不是本班能收的。

`pr-ci-armed.sh` 掃 26 個全 ARMED。PR 側 CI 只有 `review` 與 `frontmatter-gate` 兩道，不等於 deploy 那把尺，所以照 Step 3.5 自己補跑 `--profile=ci-deploy`。為了不跟正在寫檔的 babel 撞，整輪驗證開在 `.worktrees/20261015-maintainer-pr-verify` 裡做。

合併的 25 個分四群。**tboydar 的 17 個 description 批次**（57 篇）全 `hard=0`。**兩篇新文**〈林央敏〉與〈台灣電價機制與台電〉照 Step 3.4 抽驗腳註，公視兩篇的三句直接引語逐字對得上、立法院預算中心那份的 3,826 億與 1,000 億前提也對得上。**aminzai 的四個翻譯**（vi／ru／ja Hub／fr Hub）ratio 3.44／3.60／1.42 全 OK、章節 7→7、主權四閘（script-presence／geo-fidelity／person-fidelity／currency-identity）全綠，檔名跟既有十語同 slug，沒長出第二個檔名。**dreamline2 的 ko 可讀性修補**把六處沒譯完的中文詞與 `##延伸阅读` 補掉，順帶把 `107.5억 위안` 改成 `대만 달러`。觀察者自己的 [#1837](https://github.com/frank890417/taiwan-md/pull/1837) 照 fast-track 先併（/semiont 生態圖的「751 篇 · 6 語」凍了近五個月，而那張圖上週被今周刊印進雜誌）。

留下的是 [#1829](https://github.com/frank890417/taiwan-md/pull/1829)（蔣萬安人物頁草稿）。它的品質問題很明顯（21 節 0 腳註、4,162 字、CI 紅），但真正讓它停下來的是另一層：現任台北市長、2026 選舉年候選人、`knowledge/Politics/` 有對稱原則。照 REFLEXES #79，maintainer 對紅線的 default 是 reserve 不是 close，所以掛 `reserved-for-observer`、PR 留著、門檻問題進 OBSERVER-QUEUE #104。投稿者 10-14 已收到 tboydar 一份逐條審核，照 Step 2.4 不重複回覆。拒絕或收錄的決策陳述屬 human-only 格，不代筆。

## 讀者抓的那個名字，官方寫法是第三種

Yuping Chen 從英文版回報「Taiwan Environmental Planning Association」有誤，建議改成「Taiwan Environment and Planning Association」。查協會自己的網站（tep.org.tw）之後答案是第三種：官方用的是 **Taiwan Environment & Planning Association**，`&` 不是 `and`。讀者指的方向對，而把讀者的建議直接貼上去會留下另一個不精確的名字。

更值得記的是範圍。沿著這個名字掃十三個語言版本時，第一次用 grep 的正則撞到複雜度上限，對每一個語言都回報「找不到」，而那個「找不到」是工具壞掉。改用 Python 逐檔比對才看到真實分佈：`en`／`de` 直接寫了錯的英文名，`hi` 把錯的英文名音譯成天城體，其餘十語各自把名字譯成自己的語言（那是翻譯，不是對官方名的主張，這輪不動），中文母稿本來就對。修了三個檔，`635cbbeef`。交接把範圍估成「至少 6 個檔，含中文母稿」，實際是 3 個且不含母稿。估的方向是對的（確實比回報的那一頁大），數字是猜的。

## 政治分類跑了 19 篇，守門的那張表一直沒有它

tboydar 的 [issue #1831](https://github.com/frank890417/taiwan-md/issues/1831) 報 `docs/taxonomy/SUBCATEGORY.md` 只有 12 類、沒有 Politics。這則附了本地實測，但它是整則 issue 的地基，所以本班自己跑了一次正控制：把一篇 Politics 文章的 `subcategory` 改成 `'完全不存在的鬼分類XYZ'`，`--check=subcategory-valid` 回 `hard=0 warn=0` 照過。成立，而且失效方式是靜默放行。

補表的做法跟 issue 的建議差一步：照**現用值** 6 列收斂，不照建議的「保留 5 個、把 `'2026 選舉專題'` 併回 `'選舉制度'`」。理由是補表與併值是兩件事。補表零風險（補完負控制會叫，19 篇與 221 篇譯本零篇轉紅），併值會讓那一篇當場轉紅而且等於我憑想像定了一條選舉系列的慣例。`dc6b28dbe`，issue 留著等併值定稿。

## tboydar 那批的尺跟站上的尺不一樣

17 個 description PR 的說明都寫「補到站內門檻」。用站上的尺量完 57 篇，**55 篇落在 100〜119 字，站在 canonical 120 的下緣外面**，只有 2 篇進帶。差別在數的是什麼：`seo-meta` 數純漢字，不含標點數字英文。研華那篇字串長度 126 看起來進了門檻，純漢字 107 其實短 13 字。偏差方向固定，所以是量法問題不是手感問題。這是 `info` 層不是閘門，57 篇全 `hard=0`，所以 CI 不會擋。但這批的目的就是補到門檻，於是整批一則回覆把量法講清楚，附上可貼的指令。

另外獨立重跑了 [issue #1832](https://github.com/frank890417/taiwan-md/issues/1832) 裡那個真實發現：`npm audit --omit=dev` 回 4 個 moderate，鏈是 `gray-matter@4.0.3 → js-yaml@3 → argparse@1 → sprintf-js`。追上游三件事之後它變成決定不是 heal。CI 五道 audit 都是 `--audit-level=high` 所以全綠、`gray-matter` 最新發布版就是 4.0.3 且自己仍寫 `js-yaml: ^3.13.1`（沒有上游修法，npm 的建議是降到 2.0.1 並明寫 breaking）、而站是 Astro 靜態輸出，它只在 build 時解析本 repo 自己的 markdown。進 OBSERVER-QUEUE #105，推薦 C（接受並記錄，條件一變就重新決定），`adbfc4905`。

## 收官 checklist

| 檢查項                       | 狀態                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                               |
| Timestamp 精確               | ✅ `git log %ai`                                                 |
| Handoff 三態已審視           | ✅                                                               |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 data-refresh-am 06:10 產出，本班未動                       |
| 自我檢查工具 PASS            | ✅ 57+7 檔 `--profile=ci-deploy` hard=0，queue-lint 綠，scope 綠 |

Quality gate 八條：open issue 都有 label／assignee ✅（本班補 #1831 #1832 `needs-observer-review`）／open PR ≤5d 都有 review comment ✅／斷鏈 **gated ratio 0.08% < 7%** ✅（138 萬條內部連結、1,058 斷、568 個不重複目標，dist 齡 0.0h）／build green ✅（13 條 workflow 0 RED）／BECOME ACK ✅／連續空場 vc=0（連三天滿載，不適用）／有 fresh issue 的 cycle 至少修掉一件 ✅（#1851 #1831 各一個 commit）／本機與 origin 無真分岔 ✅。

## Handoff 三態

繼承 `2026-10-15-070955-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`，今天 08:30）：[issue #1851](https://github.com/frank890417/taiwan-md/issues/1851) 的組織名勘誤~~ → **retired by 2026-10-15-083351**（`635cbbeef`，官方名是 `&` 不是 `and`，範圍 3 檔不含中文母稿）
- [x] ~~pending（延續，收件席位 `twmd-maintainer-daily`）：`duplicated-lang-prefix` 404 家族，10-14 是第一個完整的修補後讀數日~~ → **retired by 2026-10-14-090531**（前班已對線上驗到兩層都活著，本班斷鏈掃描另見下方）
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`，下個時點 10-21。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）`。
- ⏳ blocked（延續，收件席位：哲宇）：`OBSERVER-QUEUE #103`，沉默幾天該當警報。沉默已於 10-14 自己結束，閾值仍未決。
- [ ] pending（延續，收件席位 `twmd-spore-harvest-am` 等孢子線各班）：#29 重抓條件等零判斷條件續傳項，原樣傳遞。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（延續，收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議。
- [ ] pending（延續，收件席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班是第十七個繞開的班（vc=17）**：本次實測殼裡那三條寫死路徑在這台機器（`/Users/musebase/`）**全部解析不到**，而 routine 照樣跑完，因為真正在用的是 skill 與 pipeline 的相對路徑，寫死路徑只出現在 pointer 文字裡。這條的實際影響是「交接文件指的檔案打不開」，不是「routine 跑不動」。

本 session 新 handoff：

- [ ] pending（收件席位：哲宇／`OBSERVER-QUEUE #104`）：選舉年現任政治人物頁的收錄門檻。[PR #1829](https://github.com/frank890417/taiwan-md/pull/1829) 已掛 `reserved-for-observer` 留著，三個選項與代價在佇列裡，推薦 B（先把門檻寫成明文）。🔒 四紅線，不適用到期 default-action。
- [ ] pending（收件席位：哲宇／`OBSERVER-QUEUE #105`）：`gray-matter` 那條 4 個 moderate CVE 鏈。推薦 C（接受並記錄）。佇列裡寫了「若 7 天無回應，任何 Full mode session 可代為執行 C 的紀錄部分，寫進 SECURITY.md，不動 `package.json`」。
- [ ] pending（收件席位 `twmd-maintainer-daily` 或 `twmd-review-stock`）：[issue #1831](https://github.com/frank890417/taiwan-md/issues/1831) 的併值定稿。`'2026 選舉專題'`（1 篇）要不要併回 `'選舉制度'`。表已補、守門已生效，只剩這一格。tboydar 自願「若維護者選定值，我可以順手把 19 篇對齊」。
- [ ] pending（收件席位 `twmd-rewrite-daily` 或 ARTICLE-INBOX）：今天併進來的兩篇新文都是 `curation: incubating` 且 **0 張圖**，〈林央敏〉只有 1,499 漢字（深度門檻 4,500 的 33%）。要補圖請照 Wikimedia Commons CC 授權路徑。
- [ ] pending（收件席位 `twmd-maintainer-daily`，條件觸發）：`verify_internal_links.py` 在 worktree 裡跑不動。它要 `src/data/fork-graph.json` 與 `git-info.json`，兩個都是 gitignored 的衍生檔、由 data-refresh 在主工作樹產出，新開的 worktree 沒有，`npm run sync:build` 因為刻意不跑 pre/post hook 也不會生成它們。本班的解法是從主工作樹 `cp` 這兩個檔進來（唯讀主樹、不動它）。**MAINTAINER §Step 4.1 寫了「worktree 沒有自己的 dist」但沒寫「worktree 也沒有 src/data 的衍生檔」**，下一班若在 worktree 裡跑斷鏈掃描會撞同一面牆。本班已把這段補進 §Step 4.1（含可貼的 `cp` 兩檔指令與「不要為此改回 `npm run build`」的理由），所以這條的剩餘部分只是等下一班驗證那段寫得夠不夠。

- [ ] pending（收件席位：哲宇，`§自主權邊界` >50 檔）：斷鏈掃描本班拿到完整讀數後，568 個不重複斷鏈目標裡絕大多數是**譯文 wikilink 指向不存在的譯本**（ja 56 條最多、zh-TW 740 條因基數大而比例最低 0.15%）。這一族早已記在 §神經迴路「多語言 nav 的隱性路由 scope」那條的「還沒做的那一半」，命中 >50 檔紅線，本班明確不碰，只補一個今天量到的數字給未來判斷規模。

## Beat 5 — 反芻

今天有兩次「工具說的話不是它看起來的意思」，而兩次的差別在我有沒有停下來問那一句。

第一次是 grep 對十三個語言全部回報「找不到那個組織名」。那個輸出讀起來像世界很乾淨，好像只有回報的那一頁有問題，改一個檔就收工。它其實是正則撞到複雜度上限。會抓到是因為「十三個語言裡只有讀者看的那一頁寫了這個名字」本身不合常識：這些譯文都是從同一份中文母稿長出來的，母稿有的東西不會只在一個語言裡出現。救我的不是紀律，是那個分佈太乾淨。

第二次是 `cjk-residue-check --lang ja` 對日文版回 ❌ 42 行裸 CJK。我差點把它寫成一個發現，而它是工具在說「ja 不在我的檢查對象裡，ja/ko 混寫合法」。我拿了一把專為非 CJK 語言造的尺去量日文。這次是我自己挑錯了尺，工具從頭到尾是對的。

兩次並排看，形狀一樣：**讀數看起來像關於世界的事實，實際是關於那把尺的事實**。而第二次比第一次危險，因為假陽性會被寫進回覆裡變成對投稿者的指控（REFLEXES #99 尺先驗再用的反向面：尺驗過了，但我驗的是別的語言的那把）。

另一件：補 Politics 分類表時，我沒照 issue 的建議一次定稿。那個決定的依據是「補表讓 19 篇全綠，併值讓 1 篇轉紅」，而紅的那一篇不是因為它錯，是因為我選了一條慣例。**閘門上線那一刻會把當下的現實凍成標準**，所以上線時照現實收斂、把該決定的留給能決定的人，比一次做到底安全。這跟 LESSONS 裡那條「新閘門在前面的紅清掉之前從來沒在 CI 跑過」是同一件事的另一半：前者講新閘門沒被跑到，這裡講新閘門一跑就會judge 到既有庫存。

🧬

---

_v1.0 | 2026-10-15 09:12 +0800_
_session twmd-maintainer-daily — cron am 08:30，連三天滿載的第三天_
_誕生原因：cron maintainer 早班；26 個 ready PR 命中 High-stake #1 強制升 Full；交接指名本席位處理讀者勘誤 #1851_
_核心洞察：讀者指出的錯誤方向對而官方寫法是第三種，照抄建議會留下另一個不精確的名字；兩次工具讀數看起來像世界的事實其實是尺的事實（grep 複雜度上限、拿非 CJK 的尺量日文）；新閘門上線該照現實收斂，把定稿留給能決定的人_
_LESSONS-INBOX 候選：(1) grep 正則撞複雜度上限時回報 0 命中而不是報錯，跨語言掃描的「全部找不到」要先當工具壞掉處理 (2) worktree 缺 gitignored 衍生檔（src/data/\*）讓 §Step 4.1 的斷鏈掃描在隔離環境跑不動，pipeline 只寫了 dist 沒寫 src/data_
