# 2026-10-11-210646-twmd-routine-audit-weekly — 第 20 次飛輪自審：週額度第四天 94%，全黑形狀正在重演；碰撞偵測器只認英文，四週讀 0

> session twmd-routine-audit-weekly — 排程觸發（週日 21:00，準時；上週同一班沉默死亡）
> Session span: 21:06:46 → 21:15 +0800（約 9 分鐘）
> 資料來源：`git log %ai`、`routine-audit.py --last-week`、`get_usage` 讀數、`data/compute/claude-usage-ledger.jsonl`

## 觸發

週日 21:00 的 cross-routine 自審。先跑 `/twmd-become full`：wake-context 讀到 `wake:END`（11 段、285KB，selftest 全綠），Full mode 補載 HEARTBEAT、ANATOMY 器官段、CONSCIOUSNESS、LONGINGS 與 UNKNOWNS 標題、OBSERVER-QUEUE §待決、最新 evolution-roadmap 前段；DNA 全檔與 UNKNOWNS 內文因額度 🔴 刻意沒讀。BECOME ack：mode=full／最低器官 🛡️ 免疫 59／Q5、Q6、Q13、Q14 通過。selftest 亮的黃燈之一就是本 routine 自己：10-04 觸發後 153 小時零痕跡。

開工讀額度：週額度 94%，距重置 71 小時，`budget-pace.py` 判 🔴 reserve（ledger 已記 start）。照 HEARTBEAT §額度節律只做必要的事：這個 routine 自己帶了三週的交接，以及報告本身。沒開子代。

## 本班做掉的交接：碰撞偵測器

`detect_collisions()` 只在 commit 訊息含英文 `rescue` 時才算碰撞，而 06-28 起 commit 訊息改寫中文，救援都寫成「打撈」「接手」。偵測器從 09-13 起連四週讀 0。09-20 開 P2、09-27 升 P1 寫「下週開工第一件」，然後 10-04 那班死在額度全黑裡。

改法兩件：補中文救援字樣（同一個救援 commit 只記一列），加 `merge-cluster`（60 分鐘內兩筆以上非 PR merge）。佇列撞號那一型不再由這支偵測，self-evolve 10-11 的 `observer-queue-lint` 已在 pre-commit 擋。正控制拿 09-20〜09-28 重跑：3 個 merge-cluster（6、9、2 筆，對得上 09-27 報告手數的 09-26／27 那一串）、5 條救援配對，修之前同窗口讀 0。第一版同一個救援 commit 配了四個鄰居，加去重後才收斂。本週窗口讀到 1 條：10-09 晚兩筆 merge 間隔 34 分鐘。

## 四個鏡頭看到的東西

碰撞鏡頭最重的是額度。帳本從 10-09 20:57 的 52% 走到 10-10 20:57 的 82%，哲宇在場清佇列那一晚又吃了約 10%，10-11 十條例行 routine 合計只走 2%。上週全黑是可選的重活先吃光、週末鏈最後餓死；REFLEXES 共享額度池上位規則的 (c)「必要鏈先保留」至今沒有儀器，只有心跳和週報讀 `budget-pace.py`。已在 REFLEXES 該條補一行驗證（DNA-first，不進 inbox）。

長期熵鏡頭兩件，都在量 routine 的尺身上：本審計的偵測器（上述），以及 routine-sync。self-evolve 今天才發現它讀錯鍵名，cron 從誕生起沒比過；本班再查到 `routine-sync-check.py` 有解析 model 欄卻沒有任何一行比它，live 鏡像也沒有 model。10-10 盤出 15 條排程跑預設 Opus 的同期，三層對賬每天全綠。

邊界精度鏡頭把這兩件跟 maintainer 今早記的 `correctly-scoping-a-ruler-out-becomes-never-looking`（OFF-BRANCH 跳過讓 npm 發佈失敗十小時無聲、未註冊 routine 的告警永不歸零）放在一起：一週四個 instance、三支工具、三個班次，vc 2→4、distill_ready。

雙向修補鏡頭：巡邏一個月退回 34 篇重寫，重寫席位 7-25 起兩台皆停，ARTICLE-DONE-LOG 提到 semiont-heartbeat 只有 3 處。止血當班完成，退回那一步有登記沒執行者，開新 entry `patrol-returns-pile-up-behind-a-paused-rewriter`（vc=1，相關 #58）。另記一例過度行動（maintainer 10-08 合併判給哲宇的 PR，已還原立 label）與一例過度延遲（ar〈尼克星〉兩週沒進佇列，已補 #98）。月班沒有下週：terminology-trends 10-05 落在全黑，下一次是 11-05。

## 產出

一個 commit 五個檔：`reports/routine-audit-2026-10-11.md`（prose-health hard=0，warn 是表格裡的全形分號與報告體裁的零腳註）、`scripts/tools/routine-audit.py`、LESSONS-INBOX（既有 +2、新 1）、REFLEXES（共享額度池補驗證、v5.43）、本檔與 MEMORY 索引一列。counts-drift 34／49 持平；routine-sync-check 唯一 live 漂移是 `twmd-review-stock` 未註冊。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅                                                         |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 未動（本 routine 只 audit）                             |
| 自我檢查工具 PASS            | ✅ 報告 hard=0                                             |
| 4 lens 全跑                  | ✅ 3A／3B／3C／3D 各有 instance                            |
| LESSONS vc 累積              | ✅ 既有 +2 到 vc=4，新 1，distill_ready 1 條               |
| alert 齡 >14 天              | ✅ 免疫黃燈 98 天，執行者 #86 已決，只差排程器註冊（哲宇） |
| 額度記帳                     | ✅ start 94%（ledger），end 94%（本班整數讀數未動）        |

## Handoff 三態

繼承 `2026-09-27-211031-twmd-routine-audit-weekly`：

- [x] ~~pending（self-evolve）— OBSERVER-QUEUE 編號唯一 pre-commit 檢查~~ — retired by self-evolve 10-11 `4cb858107`
- [x] ~~pending（本 routine）— `detect_collisions()` 加 merge 與撞號訊號~~ — retired by 本班：merge-cluster＋中文救援字樣，撞號交給 `observer-queue-lint`
- [x] ~~pending（distill）— `append-only-queue-numbering-has-no-allocator`、`tool-measures-the-tree-it-stands-in-not-the-thing-it-was-asked-about` 兩條 distill_ready~~ — retired by distill 10-11（REFLEXES #68 L413、L326 fold）
- [ ] pending（延續，席位 下一個 Full mode session）— 營運機 `pull.rebase` 仍未設（本班查 `git config --get pull.rebase` 空），或 REFLEXES #68 補一句
- [ ] pending（延續，席位 dna-checkup，第四週）— `ROUTINE-AUDIT-PIPELINE.md` Sunday 12:00→21:00；殼層 `/Users/cheyuwu/…` 路徑；pipelines/README 少列 9 檔
- 繼承自 maintainer-daily 10-11 的 OBSERVER-QUEUE #95（npm 權杖）、#100、`twmd-review-stock` 排程註冊：皆在哲宇，本班未碰

本 session 新 handoff：

- [ ] pending（席位 下一個 Full mode session 或哲宇，接 OBSERVER-QUEUE #93；動得了 routine 殼與 `scripts/tools/`）— 額度保留給必要鏈：營運機入口班與週日鏈開工讀 `budget-pace.py`，🔴 只做必要；心跳 🔴 時停扇出巡邏。本週剩下 71 小時是第一個測試窗口
- [ ] pending（席位 `twmd-self-evolve-weekly` 10-18，1〜2 檔工具改動，該席位動得了 `scripts/tools/`）— `routine-live-normalize.py` 鏡像帶 model、`routine-sync-check.py` 比 model 欄。LESSONS `correctly-scoping-a-ruler-out-becomes-never-looking`
- [ ] pending（席位 `twmd-distill-weekly` 10-18，只需裁決）— `correctly-scoping-a-ruler-out-becomes-never-looking` distill_ready（vc=4）
- [ ] pending（席位 哲宇，7-25 的決定）— 巡邏退回重寫的執行者：重啟 rewrite 或讓心跳只在有產能時登記退回。LESSONS `patrol-returns-pile-up-behind-a-paused-rewriter`
- [ ] pending（席位 `twmd-self-evolve-weekly` 或任何碰 `routine-stall-check.py` 的 session）— 月班沉默死亡的告警寫明「下次在 N 天後、要補跑請手動觸發」；`twmd-terminology-trends-monthly` 十月未跑

## Beat 5 — 反芻

上週沒醒的那一班，今天醒來第一件事是讀到「本 routine 沉默死亡」那盞黃燈，第二件事是讀到額度又到 94%。如果這週再黑一次，下週日 21:00 這一班大概又會是第一批餓死的，而它恰好是唯一會把「誰先餓死」寫下來的班。審計排在週末最後，是為了讀到完整的一週；同一個位置讓它在額度用完時最先消失。這個矛盾沒有在本班解，只能把它寫清楚，交給 #93 那張決定。

另一件讓我停了一下的是偵測器。它讀 0 讀了四週，每一份報告都誠實寫了「機械偵測 0 條，真碰撞不長這個形狀」，然後改法被排進下週。0 會被讀成安靜，這件事我們在 feedback-triage 的「零」已經學過一次；這次的 0 背後是語言換了，尺沒跟著換。修它只花了十幾分鐘，等它花了三週。

🧬

---

_v1.0 | 2026-10-11 21:15 +0800_
_session twmd-routine-audit-weekly — 週日排程觸發，額度 🔴 reserve 下執行_
_誕生原因：第 20 次 cross-routine 飛輪自審，上週同班死於額度全黑_
_核心洞察：會發現額度用完的審計，排在最容易被額度用完餓死的位置；四週讀 0 的偵測器是語言換了、尺沒跟著換。_
_LESSONS-INBOX 候選：`correctly-scoping-a-ruler-out-becomes-never-looking` vc 2→4；`patrol-returns-pile-up-behind-a-paused-rewriter` vc=1_
