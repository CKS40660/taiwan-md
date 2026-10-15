# 2026-10-16-010935-twmd-babel-nightly — 修復後續跑：只改了摘要的 356 份譯文改走補丁，兩篇新文補 slug

> session twmd-babel-nightly — cron 00:30 夜班（Write mode）
> Session span: 00:43 → 01:09 +0800（約 26 分鐘，6 個本班 commit，另有 dispatcher 自己的批次 commit）
> 資料來源：`git log %ai`、`/tmp/babel-unified-*/report.jsonl`

## 觸發

每晚 00:30 的巴別塔夜班。BECOME ack：mode=write／器官最低 🛡️ 免疫 59／Q14 跨班連續性 PASS。這班屬於「修復後續跑」：dispatcher 活著也在產出，但把一大類任務走了最貴的路。

## Stage 0 算力與三重巡檢

`babel-preflight.py` 判 healthy（四層全在：OpenRouter 7/7 把 key、本機 ollama gemma4:26b、fleet 一台 mac-m4max、codex）。入池門檻那行只剩名單外的 gemma4:e4b-nvfp4 仍裝在本機、fleet 沒核發，wrapper 早已改用 `--profile babel`，OBSERVER-QUEUE #78 那個落差在產線端已不存在。preflight 另報兩篇新母稿缺 slug。

launchd 持有的 dispatcher PID 53769 已跑 23.6 小時：近 45 分鐘 24 筆成功、近 6 小時 172 成 20 敗，fleet registry 與 dispatcher 用的 label 對得上。三重巡檢都過，照 Stage 0.5 本來該讓場。

## 兩把尺差八倍：metadata-stale 不在表上

status.py 的表每語只剩 1〜6 格 stale、2 格 missing，babel-pulse 同時報 gap=410。追下去是 status.py 的表格不印 `metadata_stale` 欄，三欄加起來對不上 1135，而 10-15 一批 SEO description 改寫（tboydar batch 3〜5m）讓十二語各累積 26〜35 份這種任務，合計 356 份。再看 report：近 6 小時的任務全部是 `whole` 引擎。dispatcher 只讓 `stale` 試章節補丁，`metadata-stale`（正文 hash 沒變）直接整篇重翻，每份約 145 秒，沒改的正文還要冒一次 10-03「社區→社協」那種整篇換詞的險。

patch-translate 本來就會「只重翻 frontmatter、章節原樣保留」。dry-run 抽五篇，四篇計畫是 0 章、只動 frontmatter，第五篇（蕭敬騰）因舊譯文帶網址債正確 exit 2。en〈手搖飲〉真跑一次 57 秒，正文零差異，dispatcher 閘門與 verify-batch 都 0 錯（`ef9e06ec6`）。於是把一行條件放寬成 `status in ("stale", "metadata-stale")`（`0288c9000`）。第一次手動測試時 `--out` 少了 `knowledge/` 前綴，產物落到 repo 根的 `en/`，已搬進 scratchpad 清乾淨。

## 重啟與孤兒落地

dispatcher 有「輪與輪之間自比程式碼、變了就讓 keepalive 重生」的機制，但輪中補貨讓第一輪跑了二十多小時都沒結束，自動重生等不到。照 BABEL-VORTEX「改 dispatcher 本體才需要重啟、只重啟一次」，先記下工作樹 31 份已驗未提交的譯文，`launchctl kickstart -k`（新 PID 14411），再逐份重跑 dispatcher 閘門與分語 verify-batch，十一語 31 份全過才落地（`250d410ae`）。

重啟後 33 筆實績：patch 6/6 成功、平均 37 秒（10〜69 秒）；三筆 exit 2 正確退回整篇（跨黨派的好政策 heavy、桂綸鎂兩語帶債）。

## 新文 slug、人名、儀器與文件

電價那篇用 `taiwan-electricity-pricing-and-taipower`（建議值 `taiwan-power-pricing` 丟了台電），林央敏照英文維基寫 `lin-yang-min`，同時登進人名裁決表（`ba882fb5d`）。dispatcher 每輪重讀 slug map，重啟後十分鐘內兩篇已在九語落地。status.py 補 MetaStale 欄、覆蓋率算進去（`b182561d5`）；SQUEEZE §Tier 0b 補「翻譯欄位變了就不能只 bump」、BABEL-VORTEX changelog v1.99 記本次覆盤（`40bf6866c`）。Stage D：`diary-translation-audit.py` 2,080 份 0 critical。

進度 delta（工作樹口徑）：班初 gap 410（stale 31＋metadata 356＋missing 24）→ 01:09 約 376（stale 29＋metadata 341＋missing 6）。本班六個 commit 由 push-every 下一輪（50 篇或三小時門檻）帶上 origin，寫 memory 時尚未推。

## 收官 checklist

| 檢查項                       | 狀態                                                |
| ---------------------------- | --------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                  |
| Timestamp 精確               | ✅                                                  |
| Handoff 三態已審視           | ✅                                                  |
| CONSCIOUSNESS 反映最新狀態   | ❌ 夜班不動，groundtruth 快照 18h 舊等 data-refresh |
| 自我檢查工具 PASS            | 見 commit 前 prose-health                           |

## Handoff 三態

繼承 `2026-10-15-203620-semiont-heartbeat`（本班是 babel 席位，非本席位項原樣傳）：

- ⏳ blocked（哲宇）：`OBSERVER-QUEUE #103／#104／#105`（待決）。
- ⏳ blocked（哲宇在 app）：`twmd-review-stock` 排程註冊，下個時點 10-21。
- [ ] pending（`twmd-maintainer-daily`）：issue #1831 選舉專題併值定稿；PR #1857、#1829。
- [ ] pending（`twmd-terminology-trends-monthly`，11-05）：月報第一段註明 10 月缺口。
- [ ] pending（哲宇或 `/twmd-routine`）：三個孤兒工作樹處置。
- [ ] pending（下一拍心跳）：週額度 6%→32% 來源，先看 `data/compute/claude-usage-ledger.jsonl`。

本 session 新 handoff：

- [x] ~~電價、林央敏兩篇缺 slug~~（`ba882fb5d`）
- [x] ~~metadata-stale 走整篇重翻~~（`0288c9000`，產線實測 patch 6/6）
- [ ] pending（`twmd-babel-nightly` 明晚）：確認 metadata-stale 存量 ~340 份已被補丁清掉，看 report 的 `engine=patch` 失敗理由有沒有新家族；hi〈電價〉`magnitude[8]` 一筆待看是母稿還是譯文。
- [ ] pending（`twmd-self-evolve-weekly`）：dispatcher 輪中補貨讓「輪間自比程式碼」永遠等不到（本班第一輪 23.6h 未結束），候選修法是補貨時也自比；改 dispatcher 本體目前仍需手動 kickstart。

## Beat 5 — 反芻

這班的病因分在兩把尺的同一欄：一把尺不印它，另一把尺印了總數不拆開。三重巡檢量得到「活著、在產出」，量不到「產出的路徑對不對」；一個健康的產線可以把四倍算力花在只改了摘要的檔案上，而每一個巡檢都會說它很好。讀數是 BABEL-VORTEX 那句「巡檢規格寫逐 worker」的鄰居：存活、生產之外，還有一個「每單位產出花多少」的維度沒有人在看，這次是靠 report 的 engine 欄順手看到的。

🧬

---

_v1.0 | 2026-10-16 01:09 +0800_
_session twmd-babel-nightly — cron 夜班，修復後續跑_
_誕生原因：status.py 表與 babel-pulse 對同一缺口差八倍，追出 metadata-stale 一律整篇重翻_
_核心洞察：三重巡檢量存活與產量，不量每份產出走了哪條路；engine 分布是成本維度的現成訊號_
_LESSONS-INBOX 候選：巡檢缺「每單位產出成本／路徑」維度（REFLEXES #38 (f) 鄰居）_
