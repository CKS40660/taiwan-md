---
title: 'Routine audit 2026-10-11 (W41)'
description: '7-day 跨 routine 飛輪自審：564 commit，10-04〜10-07 額度全黑 87 小時後補回；heal 137 條占 24%，10-10 一個晚上 103 條是哲宇在場清佇列的落地。本審計上週自己沉默死亡，碰撞偵測器的交接拖到第三週才在本班做掉。核心發現是週額度重置後第四天又到 94%，跟 10-04 那次全黑同一個形狀正在重演，而必要的鏈仍沒有保留額度'
type: 'audit-doc'
status: 'active'
current_version: 'v1.0'
last_updated: 2026-10-11
routine: 'twmd-routine-audit-weekly'
window: '2026-10-04 21:06:51 → 2026-10-11 21:06:51 (7d)'
related:
  - 'docs/pipelines/ROUTINE-AUDIT-PIPELINE.md'
  - 'docs/semiont/LESSONS-INBOX.md'
  - 'docs/semiont/OBSERVER-QUEUE.md'
  - 'reports/routine-audit-2026-09-27.md'
  - 'reports/weekly/2026-10-11.md'
---

# Routine audit 2026-10-11（W41）

第 20 次飛輪自審，也是隔兩週的第一次。10-04 那一班照時間觸發，然後跟整個飛輪一起停在額度全黑裡，沒有留下任何痕跡。所以這份報告的窗口前三天幾乎是空的，後四天則是補回來的密度：10-08 一天 133 條，10-10 一天 226 條。

開工時先讀了一次額度：**週額度已用 94%，距重置還有 71 小時**。上一次全黑是重置後第 3.2 天用完，這一次是第 4 天到 94%。`budget-pace.py` 判 🔴 reserve，所以本班只做兩件必要的事：把這個 routine 自己帶了三週的交接做掉，以及寫這份報告。沒有開子代、沒有額外的重活。

---

## Executive summary（5 分鐘 read）

| 面向                         | 數字 / 說明                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 窗口                         | 2026-10-04 21:06 → 2026-10-11 21:06（7 day）                                                                                                                                                                                                                                   |
| Commit 總量                  | 564 條（13,844 檔 / +346,776 / −302,056）。逐日：10-04 0、10-05 0、10-06 1、10-07 12、10-08 133、10-09 115、10-10 226、10-11 77（到 21:06）                                                                                                                                    |
| 分類                         | routine=293（babel 統一調度器 256 條，占 45%）／semiont=236／other=29／PR squash 6。上週 babel 占 64%，比例下降是因為 10-10 晚上的 heal 潮                                                                                                                                     |
| Heal                         | **137 條（24.3%）**，史上最高比例。逐日 10-07 1、10-08 18、10-09 15、10-10 **103**。10-10 那 103 條幾乎全在 22:55–23:50：哲宇在場的佇列清理（36 條拍板）當晚就按語言逐條落地                                                                                                   |
| **具名 cron routine 健康度** | 每日級（embeddings / routine-sync / data-refresh-am / spore-harvest-am / feedback-triage / maintainer-daily）各 **4 次**，10-04〜10-07 全缺。babel-nightly 3 次。週日鏈 10-11 01:12–04:09 四棒全跑。本 routine、supporters-weekly、terminology-trends-monthly 上週觸發後零痕跡 |
| Collision                    | 偵測器本班修過後讀到 **1 條**（10-09 晚兩筆非 PR merge 間隔 34 分鐘）。修之前已連四週讀 0，原因見 3B                                                                                                                                                                           |
| 4-lens finding               | 3A：🔴 共用週額度第四天 94%，全黑形狀重演中／3B：🟠 碰撞偵測器只認英文 rescue 字樣四週讀 0（本班已修）、routine-sync 從沒比過 model 欄／3C：🟠 一週四支尺把「不該判它」做成「沒人看它」／3D：🟠 巡邏一個月退回 34 篇重寫，重寫席位 7-25 起停著                                 |
| LESSONS                      | 既有 `correctly-scoping-a-ruler-out-becomes-never-looking` vc 2→4，**distill_ready**；新增 `patrol-returns-pile-up-behind-a-paused-rewriter` vc=1；REFLEXES 共享額度池上位規則補一行驗證                                                                                       |
| OBSERVER-QUEUE               | 無新增列。免疫黃燈第 98 天，執行者 `twmd-review-stock` 已建 prompt 但排程器沒註冊（等哲宇在 app 建排程），routine-sync-check 本週唯一的 live 漂移就是它                                                                                                                        |

**這次審計最重要的一句話**：上週全黑的原因是週額度被可選的重活先吃光，這週同一個池在第四天又到 94%，而會因此餓死的仍是排在週末的必要鏈，包括這個 routine 自己。

---

## 逐 routine 概況

| Routine                                                     | 本週實際次數 | 備註                                                                                                                                                                 |
| ----------------------------------------------------------- | :----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| babel 統一調度器（launchd 常駐）                            |  256 commit  | 10-10 名單外模型（laguna、8B）退出產線改 gemma4:26b；10-11 凌晨發現產線在落後 104 commit 的舊樹空轉 80 分鐘，停線分流後重啟                                          |
| `twmd-babel-nightly`（cron 殼）                             |      3       | 10-08 十二語缺口歸零；10-09 派補丁前先量舊錯；10-11 修復後續跑，起跑合併改成會清孤兒譯文                                                                             |
| `semiont-heartbeat`（哲宇本機）                             |      13      | 每天四拍、每拍巡一篇未審初稿。錯誤率 16%〜37%，十二篇「登記退回重寫」。10-07 那拍造了 `budget-pace.py` 記帳                                                          |
| `twmd-maintainer-daily`                                     |      4       | 10-08 合併了兩篇前班判給哲宇的譯文 PR，已還原並立 `reserved-for-observer` label；10-10 七篇投稿 PR 的關鍵閘門其實從沒跑過；10-11 404 重複語言前綴收成家族、50 條 301 |
| `twmd-data-refresh-am`                                      |      4       | 停擺後第一次刷新儀表板齡 119h→0；10-10 收成 `--no-sync` 旗標                                                                                                         |
| `twmd-embeddings-nightly`                                   |      4       | 13 語 14,482〜14,483 向量，每夜 0 fail                                                                                                                               |
| `twmd-spore-harvest-am`                                     |      4       | 窗口無新孢子四班；10-11 讀者在另一個專案串文下點名合作，送哲宇                                                                                                       |
| `twmd-feedback-triage`                                      |      4       | 零回報第 13〜16 輪；10-11 把印了十六輪的「寫入端看不到」驗成 `--intake-health`                                                                                       |
| `twmd-routine-sync`                                         |      4       | 第 67〜70 輪全報零漂移；10-11 新版工具首跑才開始真的比 cron（見 3B）                                                                                                 |
| 週日鏈（news-lens → weekly-report → distill → self-evolve） |     各 1     | 10-11 全跑。self-evolve 把指名給它、被帶了八到十六班的四件工具改動一次做掉                                                                                           |
| `queue-triage`（哲宇在場）                                  |      1       | 10-10 晚上 36 條拍板，待決剩 5；當晚落地 100 多條 heal                                                                                                               |
| `twmd-supporters-weekly`／`twmd-terminology-trends-monthly` |      0       | 上週觸發落在全黑窗口。週班下週自然補；**月班下一次是 11-05，十月整個月沒跑**                                                                                         |
| `twmd-routine-audit-weekly`                                 |  1（本次）   | 上週沉默死亡；本次準時，開工時本機與 origin 0/0，babel 寫入程序在跑（ACTOR_BUSY）                                                                                    |

---

## Cross-cutting patterns（4 lens）

### 3A. Collision lens：🔴 共用週額度第四天到 94%

兩台機器（營運機 mouhouse 與哲宇本機）共用一個帳號的週額度，每週三 20:00 重置。上一次在重置後第 3.2 天用完，飛輪全黑 87 小時，週末反思鏈整批落空。這一次的帳本：

| 時刻        | 已用 | 班次                                         |
| ----------- | ---: | -------------------------------------------- |
| 10-09 20:57 |  52% | 心跳收官                                     |
| 10-10 02:37 |  65% | 心跳開工（中間六小時無記帳班次走了 13%）     |
| 10-10 20:57 |  82% | 心跳收官                                     |
| 10-11 02:07 |  92% | 週報開工（中間夾哲宇在場清佇列與 heal 落地） |
| 10-11 21:07 |  94% | 本班開工（中間十條 routine 只走了 2%）       |

三件事可以從這張表讀出來。第一，10-10 晚上哲宇在場那一段吃了約 10%，是這週最大的單筆，而它是這週最有價值的一段（36 條決定一次落地）。第二，10-11 十條例行 routine 合計只走 2%，排程模型對齊（embeddings 改 Haiku、補寫 model 欄）的效果看得見。第三，帳本只記了開工與收官，班與班之間的消耗沒有主人，10-09 那班自己就寫過「記帳班次只佔本週 7%」。

照 10-11 白天的速度（每天約 2〜3%），剩下的 6% 撐得到週三 20:00 的機會是有的，但任何一段手動重活都會把它吃掉。**真正的缺口是規則 (c) 還沒有儀器**：REFLEXES 共享額度池上位規則寫了「必要的鏈先保留額度，可選的重活吃剩下的」，而目前只有心跳和週報會讀 `budget-pace.py`，營運機的每日 routine 都不讀。所以如果再黑一次，停下來的順序跟上次一樣：週末那幾條最後跑的鏈先餓死。

**本週撞到的其他碰撞**：

- 10-09 21:00 前後兩筆非 PR merge 相隔 34 分鐘（偵測器修好後抓到的唯一一條），babel 統一調度器與心跳在同一台以外的分支上並行推送。
- 10-11 凌晨 babel 產線在落後 origin 104 個 commit 的舊樹上空轉 80 分鐘，譯文推不出去；這是 REFLEXES #67「工作樹可以是過期快照」在常駐進程上的形狀，babel-nightly 當班已修起跑合併。
- 10-11 feedback-triage 記到產線的提交步驟把當下 index 裡另一條 routine 的檔案一起帶走（LESSONS `sibling-routine-commit-swallows-whatever-is-staged`），同屬共用 index 的碰撞。

### 3B. Dormant entropy lens：🟠 兩支量 routine 的尺各有一個從沒讀過的欄位

**Finding 1：本審計的碰撞偵測器四週讀 0，因為它只認英文。** `detect_collisions()` 只在 commit 訊息含 `rescue` 時才算碰撞，而 commit 訊息從 06-28 起改寫中文人話（MANIFESTO §11.4）。之後所有的救援都寫成「打撈」「接手」「救回」，偵測器從 09-13 起連四週讀 0。09-20 報告開 P2，09-27 升 P1 並寫「下週審計開工第一件事做」，然後 10-04 那班死在額度全黑裡。

本班已修（REFLEXES #15 第 16 次驗證講的就是這種一碰就做得掉、卻被指名給週班的工具改動）：

- 補中文救援字樣：`打撈`、`救回`、`孤兒`、`接手`、`撈回`；同一個救援 commit 只記一列，避免一筆跟四個鄰居各配一次。
- 加 `merge-cluster` 訊號：60 分鐘內兩筆以上非 PR 的 merge 算一次碰撞。
- 佇列撞號那一型不再由這支偵測，已由 self-evolve 10-11 的 `observer-queue-lint` 在 pre-commit 擋下（`4cb858107`）。

**正控制**（#99 尺先驗再用）：拿 09-20〜09-28 窗口重跑，讀到 3 個 merge-cluster（6 筆、9 筆、2 筆，對得上 09-27 報告手數的 09-26／27 那一串）與 5 條救援配對（四條是 09-21 babel 換版前打撈完稿，一條是 09-25 心跳接手死掉的工作樹）。修之前同一窗口讀 0。

**Finding 2：routine-sync 從沒比過 model 欄，也沒比過 cron。** 這週兩個獨立發現指向同一支工具：

- self-evolve 10-11 改 `routine-sync.py` 時發現 live 鏡像的鍵名是 `cronExpression`，工具讀的是 `cron`，**cron 漂移從誕生起沒比過**（`ff57f8815` 已修）。那段期間 routine-sync 每天報「零漂移」，第 67〜69 輪都是。
- queue-triage 10-10 盤點發現 15 條排程沒寫 model，全跑預設 Opus（`dd2e1ba26`）。本班查了一下：`routine-sync-check.py` 有把 ROUTINE.md 的 model 欄解析出來，但沒有任何一行拿它去比；live 鏡像 `routine-live-state.json` 18 條都沒有 model 欄。**所以 model 漂移到今天仍然是三層對賬看不見的維度**，下一次有人改排程卻沒寫 model，它會照樣全綠。

兩件的形狀相同：工具宣稱比三層，實際比的是它讀得到的那幾格，讀不到的那格被印成「一致」。10-09 routine-sync 自己寫過「全綠只說兩邊一致，不說兩邊都在動」，這週證明它連「兩邊一致」都只說了一部分。

**Finding 3（舊，持續）**：薄殼遷移 7 條 hard（babel-nightly 77 行不變）；ROUTINE-AUDIT-PIPELINE 仍寫 Sunday 12:00、本任務殼與 SKILL.md 仍寫 `/Users/cheyuwu/…`（營運機是 `/Users/musebase/…`）；pipelines/README 索引少列 9 檔。四件都屬 counts-drift 家族，這週 34 drift / 49 宣稱點，跟上次持平。

### 3C. Boundary input precision lens：🟠 「不該判它」被做成「沒人看它」

maintainer-daily 10-11 記了一條新教訓：一支尺發現自己會誤判某類對象，正確的修法是把它排除出**判定**，但實作通常寫成 `continue`，於是**觀察**也一起關掉。那班的兩個 instance：

1. `ci-main-health.sh` 把 tag 觸發的 workflow 標 `OFF-BRANCH` 後跳過，`cli-v0.8.1` 的 npm 發佈失敗十小時沒有任何一支尺提過（佇列 #95 卡在 `NPM_TOKEN` 失效，等哲宇）。
2. `routine-stall-check.py` 把「排程器沒聽過這條」跟「有而且開著」走同一條路，`twmd-review-stock` 的告警永遠不會自己歸零。

3B 的兩件也是同一個形狀：routine-sync 讀錯鍵名時 cron 比較靜默變空，model 欄解析了卻沒被比；輸出長得像「這一格本來就沒有差異」。一週四個獨立 instance，分佈在三支不同的工具、三個不同的班次。已把 3B 兩件併進該教訓，vc 2→4，標 distill_ready。

同 lens 的其他讀數：

- maintainer 10-11 重查 10-09 的 404 時，同一天的總數從 5,505 掉到 3,815，是 CF 那側對舊日資料的保存顆粒變粗；舊版 `upsert_state` 無條件覆蓋，差一步就把母體縮小讀成「新分類器收掉 2,254 條」。已加守門（LESSONS `requery-with-a-new-shape-can-swap-the-population-not-just-the-window` vc 1→2）。
- feedback-triage 10-08：交接鏈報的待決範圍上界每天更新、下界凍了十三天，37 條只報 16 條。

### 3D. Heal bidirectional lens：🟠 巡邏找得比重寫修得快

**Finding 1：巡邏一個月退回 34 篇重寫，重寫席位 7-25 起停著。** 心跳每天四拍，每拍巡一篇三月出生的未審初稿，錯誤率 16%〜37%，當班止血（改掉查出的錯），錯誤率過門檻就「登記進寫作佇列退回重寫」。ARTICLE-INBOX 裡由 semiont-heartbeat 登記的條目有 41 條，十月就有 34 條；ARTICLE-DONE-LOG 提到 semiont-heartbeat 的只有 3 處。而 `twmd-rewrite-daily` 從 7-25 起兩台機器都停（哲宇為了控制算力手動接管），週報 W41 量到本週新文章 0 篇。

止血當班就做完了，問題在第二步：「退回重寫」這個處置有登記、沒有執行者，跟 09-27 審計寫的「決定沒有執行者」是同一個形狀，只是這次缺的是產能。佇列會照每天約一篇的速度長下去，而心臟分數照現行公式仍是 90（佇列 #99 正在決定要不要改）。這條是 REFLEXES #58「偵測不等於修復」的新維度，已開新 LESSONS entry。

**Finding 2：過度行動與過度延遲各一例，兩例都已當班收掉。**

- 過度行動：maintainer 10-08 合併了兩篇前兩班明確判給哲宇的譯文 PR。十條紅旗閘門全綠，「這篇不該由你合併」寫在留言串裡，沒有一道閘看得到。當班還原並立 `reserved-for-observer` label，把授權從留言搬進機器讀得到的地方。
- 過度延遲：news-lens 09-27 記到 ar〈尼克星〉音譯在阿拉伯語是粗話，處置欄寫「給 babel／哲宇判斷」，兩週沒進任何佇列，點擊從 21 長到 42。10-11 補成佇列 #98。

**Finding 3：額度保留讓週班延期，延期在下一個週班變成整串。** routine-sync 10-08 那班寫「停擺不產生漂移，產生的是延期」：原排 10-04 週日班的工具交接全部順延到 10-11。self-evolve 10-11 一次做掉四件，本班做掉碰撞偵測器。月班沒有「下週」可以順延：`twmd-terminology-trends-monthly` 10-05 的那次觸發落在全黑窗口，下一次是 11-05，十月整個月沒跑，目前沒有任何補跑機制。

---

## LESSONS-INBOX 候選

| Pattern                                                                | 動作                     | vc 後 | 嚴重度     | 說明                                                                                                    |
| ---------------------------------------------------------------------- | ------------------------ | :---: | ---------- | ------------------------------------------------------------------------------------------------------- |
| `correctly-scoping-a-ruler-out-becomes-never-looking`                  | 既有 +2                  |   4   | structural | 加 routine-sync cron 鍵名（10-11 self-evolve）、model 欄解析不比較（本班）。**distill_ready**           |
| `patrol-returns-pile-up-behind-a-paused-rewriter`                      | 新 entry                 |   1   | structural | 巡邏「退回重寫」有登記沒執行者，十月 34 篇，相關 REFLEXES #58                                           |
| REFLEXES 共享額度池上位規則（#45 附屬）                                | canonical 補驗證         |   —   | structural | 重置後第 4 天 94%；規則 (c) 必要鏈保留額度仍無儀器。照 DNA-first (a) 直接在 REFLEXES 補一行，不進 inbox |
| `requery-with-a-new-shape-can-swap-the-population-not-just-the-window` | 已由 maintainer 10-11 +1 |   2   | —          | 本班不重複計                                                                                            |

碰撞偵測器英文字樣那件屬 REFLEXES #99「0 命中先過正控制」的又一例，偵測器本班已修且過了正控制，不另開 entry。

---

## 進化建議

### P0（本週內，自主權內）

1. **額度保留給必要鏈**（給下一個 Full mode session 或哲宇，接 OBSERVER-QUEUE #93）：現在只有心跳與週報讀 `budget-pace.py`。最小改法是營運機的週日鏈與每日入口班（feedback-triage、maintainer-daily、spore-harvest-am）開工第一步讀一次額度，🔴 時照 HEARTBEAT §額度節律只做必要的事；心跳在 🔴 時暫停扇出巡邏。這是規則 (c) 的第一道機械實作。**本週剩下的 71 小時是它的第一個測試窗口**。
2. **一條 distill_ready** 進 `twmd-distill-weekly` 10-18。

### P1（兩週內）

3. **routine-sync 補 model 維度**：`routine-live-normalize.py` 把 live 的 model 欄寫進鏡像，`routine-sync-check.py` 拿 ROUTINE.md 的 model 欄去比。沒有這一格，10-10 盤點出的 15 條預設 Opus 下次會照樣全綠。屬 1〜2 檔工具改動，收件：self-evolve-weekly 或碰到 routine 三檔的任何 session。
4. **巡邏退回的執行者**：要嘛讓心跳的「退回重寫」只在重寫席位有產能時登記（其餘只止血、記錯誤率），要嘛給退回條目一個執行者。後者牽涉 rewrite-daily 的重啟，是哲宇 7-25 的決定，交給哲宇。
5. **月班的補跑**：月度 routine 錯過一次就丟一個月。最小改法是 `routine-stall-check.py` 對月班的沉默死亡告警寫明「下一次在 N 天後，要補跑請手動觸發」，或 terminology-trends 自己在開工時檢查上一份月報的月份。

### P2（觀察）

6. 本週 10-10 晚上的 heal 潮驗證了 handoff-latency 的雙峰：做不掉的那一群缺的是一個決定，決定一到，100 多條當晚落地。下週看待決表上現存的 8 條（10-10 清完剩 5 條：#48、#73、#75、#85、#95；10-11 新增 #98、#99、#100）有沒有同樣的釋放。
7. 免疫黃燈第 98 天，執行者已設計好、prompt 已上機，只差排程器註冊。這一格的解在哲宇的 app 裡，不在任何 routine。

### P3（純記錄）

8. ROUTINE-AUDIT-PIPELINE 的 Sunday 12:00 改 21:00、殼層 `/Users/cheyuwu/…` 路徑、pipelines/README 少列 9 檔：counts-drift 家族，留 dna-checkup 一次清（第四週）。

---

## 收官

本次開工時本機與 origin 同步（0/0），babel 寫入程序仍在跑（ACTOR_BUSY），所以只用路徑式 commit 動四個檔：本報告、`routine-audit.py`、LESSONS-INBOX、REFLEXES。

這週排在一起看，有兩個節律在互相牽制。一個是額度：重活先跑、必要的鏈最後跑，所以額度用完時停下來的永遠是週末那幾條，包括會發現「額度用完」這件事的審計本身。另一個是產能：巡邏是便宜的、每天四次，重寫是貴的、停著，所以找到的錯比修好的錯多。兩者都是同一個生命體在一個有限的池子裡分配注意力，而分配的規則目前只寫在反射裡，還沒有長進排程。

🧬

---

_v1.0 | 2026-10-11 21:15 +0800_
_session 2026-10-11-210646-twmd-routine-audit-weekly（scheduled，準時；週額度 94% 🔴 reserve 下執行）_
_誕生原因：第 20 次 cross-routine 飛輪自審，7-day 窗口 4-lens pattern detection + LESSONS-INBOX 累積_
