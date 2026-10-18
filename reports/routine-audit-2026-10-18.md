---
title: 'Routine audit 2026-10-18 (W42)'
description: '7-day 跨 routine 飛輪自審：533 commit，其中 321 條是不吃 Claude 額度的 babel 調度器。10-17 00:41 到 10-18 08:31 營運機 18 次排程觸發全部撞上週額度，週日反思鏈四棒整批落空，是三週內第二次全黑。上週本審計預告的形狀照著發生了。另查到 ROUTINE.md 註 ²⁸ 寫 10-10 已釘好的排程模型，營運機排程器實際讀的檔裡一條都沒有，十八條仍跑預設或舊版 Opus'
type: 'audit-doc'
status: 'active'
current_version: 'v1.0'
last_updated: 2026-10-18
routine: 'twmd-routine-audit-weekly'
window: '2026-10-11 21:09 → 2026-10-18 21:09 (7d)'
related:
  - 'docs/pipelines/ROUTINE-AUDIT-PIPELINE.md'
  - 'docs/semiont/LESSONS-INBOX.md'
  - 'docs/semiont/OBSERVER-QUEUE.md'
  - 'docs/semiont/ROUTINE.md'
  - 'reports/routine-audit-2026-10-11.md'
---

# Routine audit 2026-10-18（W42）

第 21 次飛輪自審。本班準時觸發，開工時週額度讀數 2%（營運機 Exhibitions-Mac-mini，`get_usage`），工作樹與 origin 同步，babel 寫入程序三支在跑（ACTOR_BUSY，本班不碰它們正在改的檔）。

上週報告的最後一句是「這週同一個池在第四天又到 94%，而會因此餓死的仍是排在週末的必要鏈，包括這個 routine 自己」。這週它照著發生了，只差在本班自己剛好活下來。

---

## Executive summary（5 分鐘 read）

| 面向                         | 數字 / 說明                                                                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 窗口                         | 2026-10-11 21:09 → 2026-10-18 21:09（7 day）                                                                                                                                                                              |
| Commit 總量                  | 533 條（2,871 檔 / +321,075 / −184,664）。逐日：10-12 33、10-13 96、10-14 60、10-15 208、10-16 110、**10-17 8、10-18 17**                                                                                                 |
| 分類                         | babel 統一調度器 321 條（60%）／routine 殼 27／manual 68／未分類 117                                                                                                                                                      |
| Heal                         | 12 條（2.3%），上週 137 條（24%）是哲宇在場清佇列的落地，這週回到常態                                                                                                                                                     |
| **具名 cron routine 健康度** | 每日級六條（embeddings / routine-sync / data-refresh-am / spore-harvest-am / feedback-triage / maintainer-daily）各 **5 次**，10-17、10-18 全缺。babel-nightly 殼 4 次。週日鏈 10-18 四棒全缺。supporters 1、本 routine 1 |
| 全黑                         | **10-17 00:41 → 10-18 08:31，18 次觸發全部 failed**，錯誤一律是 `You've hit your weekly limit · resets Oct 21 at 8pm`。上一次是 10-04（87 小時）                                                                          |
| Collision                    | 偵測器讀 0。手動看到兩筆非 PR merge（10-18 13:11、14:32，間隔 81 分鐘，未達 60 分鐘門檻）                                                                                                                                 |
| 4-lens finding               | 3A：🔴 三週內第二次全黑，週日鏈整批落空／3B：🔴 註 ²⁸ 的模型釘選不在排程器讀的那份檔，十八條仍跑 Opus／3C：🟠 用另一台主機的額度讀數收掉了營運機的交接／3D：🟠 兩班看見釘選沒生效，交接在第三班消失                       |
| LESSONS                      | 新增 `config-declared-in-ssot-absent-from-the-file-the-runner-reads` vc=3 **distill_ready**；新增 `usage-reading-from-a-host-that-is-not-the-one-that-stalls` vc=1；REFLEXES #45 共享額度池上位規則補第四個載體           |
| OBSERVER-QUEUE               | 新增 #110：在營運機 app 逐條設排程模型。理由是這件事只有哲宇按得到，而它的交接已經在 memory 裡斷掉一次                                                                                                                    |

**這次審計最重要的一句話**：上週拍板維持現狀的額度池在三週內第二次讓週日鏈整批落空，而註 ²⁸ 認定的主因之一（十五條沒寫模型、跑預設 Opus）到今天一條都沒有改到排程器實際讀的那份檔。

---

## 逐 routine 概況

| Routine                                                     | 本週實際次數 | 備註                                                                                                                                                                       |
| ----------------------------------------------------------- | :----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| babel 統一調度器（launchd 常駐，地端模型）                  |  321 commit  | 全黑期間照常產出（10-17 的 8 條裡 7 條是它，另一條是 merge；10-18 白天其餘的 commit 是哲宇筆電上的手動班）。它吃的是地端算力，不吃 Claude 額度，這是兩天裡唯一還在轉的產線 |
| `twmd-babel-nightly`（cron 殼）                             |      4       | 10-16 把只改摘要的 356 份譯文改走補丁（6/6 成功、均 37 秒）；10-17、10-18 兩夜撞額度                                                                                       |
| `semiont-heartbeat`（哲宇本機）                             |      7       | 10-15 三拍、10-16 四拍；額度判讀 🟢→🟡→🔴，10-16 14:38 那拍把多出的 17 點對到本機七個同時執行的 Muse 對話；10-16 20:38 讀 91% 判保留後停                                   |
| `twmd-maintainer-daily`                                     |      5       | 10-13 投稿佇列一夜 0→14；10-15 26 個 PR 清 25、留 1；10-16 幣別閘存量首次量出 692 檔（佇列 #108）                                                                          |
| `twmd-data-refresh-am`                                      |      5       | 告警改到 dump 後重生；10-15 發現「平均互動秒數」填的是工作階段長度；10-16 多語前綴 404 家族驗收收掉                                                                        |
| `twmd-embeddings-nightly`                                   |      5       | 每夜 0 fail。**10-12、10-13 兩班記下自己在跑 Opus、釘選不在檔裡**，之後的班不再提（見 3D）                                                                                 |
| `twmd-spore-harvest-am`                                     |      5       | 窗口連六天空場，末孢子 08-23，量的是發布端停了多久                                                                                                                         |
| `twmd-feedback-triage`                                      |      5       | 沉默在第 14.7 天由讀者勘誤結束（issue #1851），寫入端與讀取端都沒壞                                                                                                        |
| `twmd-routine-sync`                                         |      5       | 第 71〜75 輪全一致；審庫存排程仍待哲宇在 app 註冊。它不對賬 model，所以 3B 那件它看不到                                                                                    |
| 週日鏈（news-lens → weekly-report → distill → self-evolve） |    **0**     | 10-18 01:00〜04:07 四棒全部撞額度。W42 週報沒有寄、LESSONS 105 條沒有人消化、MEMORY 索引黃燈的負責人（distill）沒醒                                                        |
| `twmd-supporters-weekly`                                    |      1       | 10-12 零候選，正控制照常命中                                                                                                                                               |
| manual（哲宇本機）                                          |      2       | 10-18 凌晨 outcome-graded-design 與 grader-pilot，第三代產線設計報告與閱卷小實驗，進佇列 #109                                                                              |
| `twmd-routine-audit-weekly`                                 |  1（本次）   | 21:05 觸發時額度已恢復，本班活下來                                                                                                                                         |

---

## Cross-cutting patterns（4 lens）

### 3A. Collision lens：🔴 三週內第二次全黑，撞掉的仍是週日鏈

**時間軸**（營運機 `list_task_runs` 逐條讀，非推算）：

| 時刻（台北）       | 事件                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| 10-16 09:21        | 最後一筆 routine commit（maintainer-daily）                          |
| 10-16 14:38        | 心跳讀 65%，五小時加 17 點，旁證是本機七個同時執行的 Muse 對話       |
| 10-16 20:38        | 心跳讀 91% 判 🔴，只記帳                                             |
| 10-17 00:41        | babel-nightly 殼第一個撞額度                                         |
| 10-17 05:38〜08:31 | 晨鏈六條全部 failed                                                  |
| 10-18 00:41〜04:07 | babel 殼、news-lens、weekly-report、distill、self-evolve 全部 failed |
| 10-18 03:50        | 哲宇筆電上的 grader-pilot 讀到 19%（重置點 10-23）                   |
| 10-18 05:38〜08:31 | 營運機晨鏈六條仍全部 failed，重置點仍寫 10-21                        |
| 10-18 21:05        | 本班觸發成功，營運機讀 2%（重置點 10-21）                            |

18 次觸發落空，跟 10-04 那次的形狀相同：池在重置後第五天用完，排在最後的週日鏈最先餓死。

這件事在決策層已經有結論。OBSERVER-QUEUE #93 在 10-10 由哲宇拍板「選 A 維持現狀」，本班不重議。本班能做的是把拍板之後才出現的三個事實交上去，讓下一次重議時有東西可看：

1. **10-16 下午的消耗不在 routine 這一側。** 心跳把那五小時的 17 點對到本機七個同時執行的 Muse 對話，routine 帳本裡沒有對應的大班次。這是旁證，不是分帳。
2. **註 ²⁸ 認定的另一個主因沒有落地**，見 3B。
3. **兩台主機在 10-18 看到的不是同一個額度窗口**，見 3C。這動搖 #93 與 HEARTBEAT §額度節律共同的前提「兩台機器共用一個帳號的週額度」。

上週 P0 第 1 條建議「營運機每日入口班開工先讀額度、🔴 時只做必要的事」本身值得回頭看：#93 已選 A，那條建議跟拍板方向不一致，本週也沒有任何班動它。本班把它降為「重議 #93 時的選項之一」，不再列 P0。

**本週其他碰撞**：沒有新的。babel 調度器在全黑期間獨自推送，沒有撞到任何人，因為沒有別人在推。

### 3B. Dormant entropy lens：🔴 註 ²⁸ 的模型釘選不在排程器讀的那份檔

ROUTINE.md 註 ²⁸（10-10，哲宇 directive、Muse 落地）寫：營運機 18 條排程已逐條釘好模型，Opus／Sonnet／Haiku 分級，embeddings 降 Haiku，備份在 `scheduled-tasks.json.bak-20261010-muse-models`。

本班直接讀營運機排程器的 `scheduled-tasks.json`（21:04 剛被 app 改寫過）：

- 18 條裡只有 3 條有 `model` 欄（weekly-report、feedback-triage、maintainer），值是舊的 `claude-opus-5`
- 其餘 15 條沒有 `model`，落到 app 預設
- 現行檔跟那份備份逐行比，**model 欄完全相同**，差別只有 `lastRunAt` 之類的時間欄

所以釘選要嘛從沒寫進這份檔，要嘛寫進去之後被 app 用它記憶體裡的版本蓋回去。本班分不出是哪一種，兩種的處置相同：在 app 的排程頁逐條設，設完重讀這份檔確認。

這一格看不見的原因跟上週 3B 的 Finding 2 是同一件：`routine-sync-check.py` 解析了 ROUTINE.md 的 Model 欄卻不拿去比，`routine-live-state.json` 沒有 model 欄，scheduled-tasks MCP 的 list 也不回傳 model。三層對賬工具每天報「一致」，而唯一會說實話的那份檔不在任何工具的讀取路徑上。

**對 3A 的意義**：註 ²⁸ 自己寫了這「很可能是共用週額度連兩週提前用完的主因之一」。如果這個判斷對，10-10 之後的一週本來應該比較省，實際上沒有任何一條改到，第二次全黑就不能拿來評估「釘選有沒有用」。

**Finding 2（舊，持續）**：counts-drift 33 drift／48 宣稱點（上週 34／49）；thick(hard) 殼 7 條；pipelines/README 少列 9 檔；本任務殼與 SKILL.md 仍寫 `/Users/cheyuwu/…`；ROUTINE-AUDIT-PIPELINE 仍寫 Sunday 12:00。第五週，仍留 dna-checkup 一次清。

### 3C. Boundary input precision lens：🟠 用另一台主機的讀數收掉了營運機的交接

grader-pilot（10-18 03:29，哲宇筆電）把繼承來的交接「週額度 10-16 晚間 91%，重置 10-21」標成 retired，理由是「週期已提前重置，10-18 03:50 讀數 19%」。帳本那一列寫的重置點是 10-23 08:00Z。

同一時段營運機的排程器在 05:38、06:01、06:40、07:07、08:31 五次觸發都撞額度，錯誤訊息寫的重置點是 10-21。今晚營運機自己讀到的是 2%、重置點 10-21 11:59Z。

兩台在同一個早上讀到兩個不同的窗口（重置點差兩天），而交接的收件人是營運機上的 routine。拿筆電的讀數去收營運機的交接，等於用一台不會停的機器證明另一台不會停。這是 REFLEXES #16 環境代表性那一條的額度版，也跟 #67「量測對象繼承執行環境」同族：讀數本身正確，錯在它代表的不是交接在問的那台。

本班沒有能力判斷兩台是不是已經換成不同帳號，或是同帳號但窗口計法不同。能確定的只有：「兩台共用一個週額度」這句話寫在 HEARTBEAT §額度節律、#93、REFLEXES #45 上位規則三處，10-18 的讀數跟它對不起來。

**同 lens 其他讀數**：data-refresh 10-15 發現儀表板「平均互動秒數」實際填的是 GA4 工作階段長度，每天讀它的人都跟著錯；maintainer 10-13「交接給的選項是線索不是題目」，前班給的 404 規則式修法被當班推翻（這台主機不讀 `_redirects`）。

### 3D. Heal bidirectional lens：🟠 兩班看見釘選沒生效，交接在第三班消失

embeddings-nightly 10-12 那班寫得很完整：本班跑 Opus 5.5、註 ²⁸ 說是 Haiku、讀了 `scheduled-tasks.json` 發現 15 條沒 model，handoff 寫「收件席位：哲宇或 Muse，在營運機 app 動排程設定；本 routine 與 routine-sync 都動不了」。10-13 那班再記一次「本班仍跑 Opus，模型釘選未生效」。

10-14、10-15、10-16 三班的 memory 索引列都沒有再提。沒有任何一班把它標成 retired，它就這樣安靜地從交接裡掉出去。收件人寫的是兩個不跑 routine 的席位，而 routine 交接鏈只在 routine 之間傳，沒有一條會走到哲宇眼前。OBSERVER-QUEUE 的規則寫「carry ≥ 3 cycle 就 append 這裡」，這條在第二班之後就不再被 carry，所以三振規則永遠不會觸發。

這是 handoff-latency 雙峰的第三種形狀：前兩種是「做得掉的當天做掉」與「做不掉的缺一個決定」，這一種是**做得掉、但只有一個不在交接鏈上的人做得掉**，於是它既沒被做掉，也沒變成一個決定。本班把它補成 OBSERVER-QUEUE #110。

**過度行動與過度延遲的對照**：

- 正確的不行動：10-16 20:38 心跳讀到 91% 判保留，整拍只記帳。這是上週規則 (c) 唯一一次被執行。
- 正確的更正：outcome-graded-design 被審稿分身抓到報告寫得比證據滿，當班就更正（`d35ce000f` 把 EZ WAY 移出計分題）。
- 延遲：W42 週報、distill、self-evolve 三個週班落空後，本週沒有補跑機制。週班有下週可延，但延期會整串滾到 10-25 那一班。

---

## LESSONS-INBOX 候選

| Pattern                                                         | 動作             | vc 後 | 嚴重度     | 說明                                                                                |
| --------------------------------------------------------------- | ---------------- | :---: | ---------- | ----------------------------------------------------------------------------------- |
| `config-declared-in-ssot-absent-from-the-file-the-runner-reads` | 新 entry         |   3   | structural | 10-12、10-13 embeddings 兩班各自看見，10-18 本班對備份逐行比確認。**distill_ready** |
| `usage-reading-from-a-host-that-is-not-the-one-that-stalls`     | 新 entry         |   1   | high       | 筆電讀數收掉營運機交接；兩台重置點差兩天                                            |
| REFLEXES #45 共享額度池上位規則                                 | canonical 補驗證 |   —   | structural | 第四個載體：三週內第二次全黑，週日鏈四棒落空。照 DNA-first 直接補一行，不進 inbox   |

---

## 進化建議

### P0（本週內）

1. **OBSERVER-QUEUE #110：營運機排程逐條設模型**（只有哲宇按得到）。設完後任何 session 讀一次 `scheduled-tasks.json` 確認 18 條都有 `model`，在 #110 記結果。這一步也決定下一週能不能拿來評估註 ²⁸ 的判斷。
2. **重議 #93 前先把三個新事實放進那一列**（本班已寫在報告與 #110，#93 本身是 §已決，不改）：消耗旁證在 Muse 對話側、釘選沒落地、兩台窗口不一致。

### P1（兩週內）

3. **三層對賬補 model 維度**：上週 P1 第 3 條原樣保留，本週多一個理由。最小改法是 `routine-sync-check.py` 直接讀營運機的 `scheduled-tasks.json` 比 ROUTINE.md 的 Model 欄，不經 MCP。收件：self-evolve-weekly（它本週也落空了）。
4. **週班落空的補跑**：這週三個週班與上上週同一批都是整批落空。`routine-stall-check.py` 尺二已經算得出「應 fire 而沒 commit」，缺的是在額度恢復後提示補跑哪幾條。屬工具改動，收件同上。

### P2（觀察）

5. 10-21 重置後看第一週的消耗速度。如果 #110 在那之前完成，這是第一個能比較「釘選前後」的週。
6. 兩台主機的額度窗口要不要分開記帳，等哲宇確認帳號狀態後再說。帳本 `claude-usage-ledger.jsonl` 已有 `host` 欄，資料是夠的。

### P3（純記錄）

7. counts-drift 家族（殼層路徑、pipeline 排程時刻、README 索引）第五週，留 dna-checkup。

---

## 收官

本班沒有改任何 pipeline 或排程。動到的檔：本報告、LESSONS-INBOX 兩條新 entry、REFLEXES #45 上位規則一行驗證、OBSERVER-QUEUE #110、memory 與索引。

🧬
