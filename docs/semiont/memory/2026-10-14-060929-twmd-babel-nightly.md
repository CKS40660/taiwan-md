# 2026-10-14-060929-twmd-babel-nightly — 五篇新文缺 slug 讓付費層空等十六小時。補 slug、修三個必敗閘門缺陷、重啟後十二語推到 99.9%

> session twmd-babel-nightly — cron 00:30 fire，Stage 0.5 判定「有 dispatcher 在跑、有產出」→ 續命，04:51 改判「活著但整輪只剩單一 worker 拖尾」→ 修復後重啟
> Session span: 00:43 → 08:20 +0800（本班 7 個 commit：`93514ba9e` `5ec05d0f4` `7953e9305` `3fb6d6e43` `d2e885366` `0a32b40e2` 加本檔）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261013-085232-62250/` 與 `-20261014-045124-74687/` 的 master.log、report.jsonl

## 觸發與甦醒

00:30 例行夜班。BECOME write mode：wake-context 1,366 行分頁讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步。

BECOME ACK：mode=write / 8 organ 最低＝免疫 59 / Q14 cross-session continuity=PASS（前一夜續命班缺口為零，10-13 08:48 合進 tboydar 14 個 PR、其中五篇新文，之後 dispatcher 整天出 60 多批，maintainer 修 404 重複語言前綴，交接要看 run 目錄數）。

## Stage 0：算力 healthy，但新母稿排不進佇列

`babel-preflight.py` healthy 4/4：OpenRouter 7/7、本機 ollama gemma4:26b、fleet mac-m4max、codex。沒有缺席層。同一份報告最後一行是 ⚠️：五篇新母稿沒有 slug（勇鷹高教機、拔河、傅兆玄、李灝宇、王冠閎），十二語都排不進。`status.py` 每語 missing=5。

三重巡檢加第四問：launchd 持有 PID 62250（10-13 08:52 起），近 45 分有產出（00:16 一筆成功），fleet 一台對得上，wrapper 是 repo 裡那份、走 `--profile babel`。照判準本該續命不動。但拆 report 看到兩件事：macm4max 20:38 起就印「本輪已無可接任務」退出等輪次結束。三個 Haiku 付費 worker 開跑十六小時零筆紀錄。`restricted_eligible` 印 60 篇，正好是五篇 × 十二語。付費層只吃 P0 缺檔，而那 60 筆全卡在沒有 slug，等於付費層整天沒有工作可接。

## 補 slug：模型給的是中國拼音

`slug-suggest.py` 回的是 `li-haoyu`、`fu-zhaoxuan`、`wang-guanhang`，還把「高教機」讀成 higher education。這正是 REFLEXES #16 主權延伸那條：模型的建議是線索。照站上既有慣例（lee-teng-hui、chen-wei-yin-mlb-pitcher，姓在前、台灣拼法）改成 `lee-hao-yu`、`fu-chao-hsuan`、`wang-kuan-hung`、`brave-eagle-advanced-jet-trainer`、`taiwan-tug-of-war`，`93514ba9e` 合進 `_slug-map.json`。

## 三個每次必敗的閘門缺陷

Stage 0.5 要找「同一篇跨模型敗在同一理由」。今晚只有兩個模型家族在產，門檻降到「兩家族同一理由」，抓出三組，每組都是派工前就判得出會敗的確定性缺陷：

〈幾米〉pt／ar 的補丁兩家族各敗兩次，理由是 description 含漢字。舊譯文摘要裡夾著「(廖福彬)」，補丁沿用舊 frontmatter，`validate_frontmatter_block` 必擋。`patch-translate.frontmatter_debt()` 本來就會把 imageAlt、tags 的舊債判成「改走 LLM 重翻 frontmatter」，`5ec05d0f4` 把驗證那把尺提前放進來。全庫量到十語 459 篇有同樣的舊債，以後碰到補丁就順手清。

〈台灣少子化危機〉在五語被幣別閘門擋，兩家族都一樣。印尼文那份 13 處 `miliar yuan` 全在腳註行，正文零處。`money_rule()` 的 docstring 自己寫著「教的那句要出現在每一條會送正文給模型的路上」，卻只進了 Phase F 與 Phase B，腳註批次（Phase N）和補丁的參考資料章兩條路都漏了。`7953e9305` 兩處補上，各一支測試。

〈台灣的公車系統〉hi 兩家族都敗在「書目區簡體殘留 '门'」。來源是 Wikimedia 上傳者帳號「厦门金龙永远的神」，原稿就是簡體。`cjk-leak-check` 對整篇檔案本來就豁免「跟原稿逐字相同的漢字串」，但逐段驗證寫的暫存檔沒有 frontmatter，查不到 translatedFrom，豁免失效。同一支檢查器對同一段文字給兩種判決（REFLEXES #83）。`3fb6d6e43` 讓 `scan_file` 多收 `source_text`，分段引擎的正文塊與補丁的參考資料章都把手上的中文原文帶進去。測試三組對照（不給原文會叫、給了放行、原稿沒有的簡體照擋）。

三組都已在工作樹裡現形：hi〈公車系統〉、ar〈少子化〉、pt／ar〈幾米〉都產出了譯文，等 dispatcher 落地。

## 重啟：一整輪被最慢的一隻 worker 拖住

補完 slug 與三個修補後，dispatcher 要等「下一輪」才會重讀 slug 與載入新程式碼。我背景等了四小時，round 2 沒結束：只剩 nemo 一隻在啃難篇，每篇 30 到 60 分鐘，00:16 之後四小時一筆成功，其餘四隻 worker 閒著，60 筆 P0 跟三個修補一起排隊。04:51 判定屬「活著但實質零產出」，先確認工作樹沒有未落地的譯文（`git status -s knowledge/` 為空），再照巡檢第四問用 `launchctl kickstart -k` 重啟，wrapper 是 repo 版。代價只有 nemo 剛開跑的 hi〈少子化〉。

新 run（PID 74687）開頭清掉 255 個閒置 run 目錄（597 → 343），`TBD-NEEDS-SLUG` 零處，round 1 排 83 篇，Haiku 第一筆 40 秒落地。到 08:16，89 筆紀錄 71 筆成功，Haiku 三隻合計 53 筆。五篇新文 58 份譯文跑 `verify-batch.py`，十二語全部 Errors 0、Warnings 0。

## 譯名：三位新人物在六個拉丁語言裡有五六種拼法

抽查 Haiku 首譯，王冠閎被寫成 Wang Kuan-hong，再掃下去：en 寫 Kan-hung、de 寫 Guan-hong 與 Fu Zhao-xuan（中國拼音），李灝宇在五語是 Li Hao-yu。OBSERVER-QUEUE #63（已決，10-10）定了規則：本人通用英文名＞zh 原文括號＞威妥瑪，但 `name-authority.json` 一筆都還沒填。三位各自查過外電與賽會登錄（Focus Taiwan、Olympics.com、Taipei Times／MLB），`d2e885366` 填進第一批：Wang Kuan-hung、Fu Chao-hsuan、Hao-Yu Lee。

裁決表只餵委派層的派工單（`names_for`），dispatcher 的翻譯引擎不讀它，所以今晚 Haiku 不會被它導正。等 dispatcher 把這些檔 commit 了，再用逐字串對換改十二個檔（`0a32b40e2`），讓更正有自己的 commit，不混進批次 commit 裡。俄、阿、印地文的轉寫有各自慣例，沒動。

## 進度 delta 與 backend

十二語 fresh 從開班的 1119–1126 推到 1127–1131，missing 從每語 5 降到只剩 vi、ru 各一（都是〈勇鷹高教機〉：vi 敗在幣別 3→1 處，ru 是 Haiku 在 description 留了「董事長」漢字，閘門判得對）。backend：新 run Haiku 53、gemma4（macm4max）14、nemotron 4。舊 run 這班只出 1 筆。Stage D：`diary-translation-audit.py` 2,080 份 0 critical。cascade exhausted 無新增。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅                                                    |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本席位不寫（dashboard 由 data-refresh 接）         |
| 整合性閘門                   | ✅ verify-batch 58 份 0 error、diary audit 0 critical |

## Handoff 三態

繼承 `2026-10-13-004538-twmd-babel-nightly`：

- [x] ~~pending（席位本席）`prune_idle_run_dirs` 有沒有在跑~~ — retired：本班重啟時清 255 個，597 → 343。平常 dispatcher 忙就不重生、不清，數字會隨閒置天數漲，重生時收掉
- [ ] pending（席位：哲宇，OBSERVER-QUEUE #101 待決 🔒）換算錯量級存量約 3,600 處，原樣傳
- [ ] pending（席位：OBSERVER-QUEUE #84／#91 已決存量重譯）138 篇存量批次降級，原樣傳
- [ ] pending（席位 `twmd-maintainer-daily`，#67 已決提議列）hi〈颱風假〉人翻譯文 bump，原樣傳

本 session 新交接：

- [ ] pending（席位 `twmd-babel-nightly` 下一班）〈勇鷹高教機〉vi、ru 是十二語最後兩格缺口，看付費層讓回後 normal worker 有沒有接住。ru 那份標題用了拼音「(Yǒngyīng)」，落地後順手看
- [ ] pending（席位 `twmd-babel-nightly`／渦流班，OBSERVER-QUEUE #63 已決）王冠閎、傅兆玄、李灝宇在 ru／ar／hi／vi 的轉寫還沒對過。更根本的是 `name-authority.json` 沒接進翻譯引擎的提示，裁決表填了也導不正 dispatcher 產線，要把 `names_for` 的輸出接進 Phase F／B 提示
- [ ] pending（席位：渦流班，`babel-dispatch.py`）一輪的結束被最慢的 worker 決定：其他 worker 印「本輪已無可接任務」退出後不會再補貨，新 slug、新程式碼都要等輪次結束才進場。今晚因此重啟一次。候選修法：退出的 worker 每隔一段時間重跑一次 topup，或輪內偵測 slug-map／程式碼變動就收工重生

## Beat 5 — 反芻

付費層開了十六小時沒有一筆紀錄，preflight 那行 ⚠️ 也寫得清清楚楚，兩件事卻分在兩個地方：一個在算力自檢最後一行，一個要拆 report 才看得到。把兩個數字放在一起（合格 60 篇、五篇 × 十二語也是 60），原因一眼就出來。儀器各自都誠實，答案在兩個儀器的交集裡。

另一件反覆出現的形狀：今晚三個閘門缺陷，修法都早已寫在程式碼裡。frontmatter 舊債有現成的判斷函式，money_rule 的註解寫明要進每一條路，原稿豁免在整篇檢查裡運作了三週，只是逐段那條路沒接上。缺的都是最後一段接線。這跟上週 self-evolve 量到的那批交接同一個形狀，只是這次發生在程式碼裡。

🧬

---

_v1.0 | 2026-10-14 08:20 +0800_
_session twmd-babel-nightly — 續命轉修復後重啟：補 slug 解開付費層、修三個確定性閘門缺陷、統一三位新人物譯名_
_誕生原因：五篇新文缺 slug，付費層 60 筆合格任務空等十六小時，preflight 已警告但沒人把它跟付費層零產出放在一起看_
_核心洞察：同一個病因分散在兩個儀器的兩行輸出裡。三個必敗缺陷的修法都已存在，缺的是接到最後一條路_
_LESSONS-INBOX 候選：一輪的長度由最慢 worker 決定，退出的 worker 不再補貨（已寫進 handoff）_
