# 2026-10-12-055706-twmd-embeddings-nightly — 例行重建：13 語 14,495 向量 0 fail，鍵數回到一致，verify PASS，`29941c03b`；排程器上的模型釘選不在檔裡

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗，排程器 lastRunAt 05:14:17）
> Session span: 約 05:14 → 06:00 +0800（約 46 分鐘，2 commits：索引 `29941c03b` 05:56:36＋本 memory）
> 資料來源：排程器 `lastRunAt`、rebuild log 建立與修改時間（05:15:17 → 05:56:06）、`git log %ai`、`date`

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次重建是昨天的 `002658729`。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 11 項全綠，工作樹與 origin 同步。器官讀數 🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59（快照齡 23 小時）。parallel-check 報 ACTOR_BUSY：babel writer 在寫，工作樹七個 babel 報表與 `_translation-status.json` 的改動一個都沒碰。

## 重建與驗證

§前置先問本機：`127.0.0.1:11434` 有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。本機與 origin 0/0，`git pull` 是空轉。`build-embeddings.mjs --langs all` 從 05:15:17 跑到 05:56:06，每語 183〜195 秒（昨天 233〜281 秒，今晚 babel 已收工，機器沒被搶），13 語全部 0 fail，共 14,495 向量。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語，每語 1,115 篇、全部有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。昨天 zh 多一篇的落差今天收掉：十二語各多了 `politics/lai-lai-lai-zenmeyang-chant`，就是昨夜 babel 把〈來來來，怎麼樣、怎麼樣〉十二語譯本送進來。zh-TW 索引零變動。

鄰居變動 en、de 各 2 篇，ko 33 篇，ja 94 篇，懸空鄰居都是 0。ja 多出來的量去追了來源：自 `002658729` 以來 ja 只改了 5 個檔，但其中〈心戰〉與〈國家文化記憶庫〉落在政治與歷史那一叢的中心，一篇的座標移動會帶動整叢排序重洗，進出最多的是 `people/chia-yung-chieh` 與 `art/post-martial-law-taiwanese-literature`。ko 的變動也對得上它那 9 個改動檔（壞特、辦桌、心戰）。

照 v1.4 用路徑式 commit，commit 前 index 是空的，收進 `src/data/related/` 12 檔成為 `29941c03b`，commit 後只含這 12 檔。push 時 pre-push 判定 in-flight deploy 才跑 977 秒，直接推（`7cbb2792a..29941c03b`）；`7cbb2792a` 是 05:40 routine-sync 在同一工作樹推的 memory。

## 排程器的模型欄跟 ROUTINE.md 註 ²⁸ 對不上

這一班是 Opus 5.5 在跑，而 [ROUTINE.md](../ROUTINE.md) 註 ²⁸ 寫 10-10 起 embeddings 釘成 Haiku。scheduled-tasks MCP 不回傳 model 欄，所以直接讀營運機排程器的 `scheduled-tasks.json`（05:38 剛被改寫過）：18 條裡只有 feedback-triage、maintainer、weekly-report 三條有 `model`，而且是舊的 `claude-opus-5`，其餘 15 條含 embeddings 都沒有這個欄位。拿去跟 Muse 留下的 `scheduled-tasks.json.bak-20261010-muse-models` 比，兩份只差各任務的 `lastRunAt`／`lastScheduledFor`，模型欄一模一樣。

所以註 ²⁸「已把營運機 18 條逐條釘好」這句，在排程器讀的那份檔裡找不到痕跡。是 app 用記憶體裡的狀態蓋回檔案，還是當時改到別處，本班分不出來，也不該動這份設定（改排程器屬持久設定，不在本 routine 的寫入範圍）。這件事直接接到 `OBSERVER-QUEUE #93（已決，選 A）` 背後的週額度問題：拍板時的前提是「模型已釘好」，現在看前提不成立。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（起點取排程器 lastRunAt，甦醒結束時間標約）        |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班不刷新，06:00 data-refresh 接手）             |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-11-051528-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 self-evolve-weekly，本班動不了殼層）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [x] ~~pending：`.git/gc.log` 與 `git prune`（issue #1729）~~ — retired by 本班：`.git/gc.log` 已不存在，本班 fetch、pull、commit、push 都沒出 gc 警告。另注意 `gh issue view 1729` 現在回的是一則已關閉的馬英九腳註查核單，原交接引用的 issue 編號可能本來就寫錯，追不回是哪一則。

本 session 新 handoff：

- [ ] pending（收件席位：哲宇或 Muse，在營運機 Claude 桌面 app 動排程設定；本 routine 與 routine-sync 都動不了，後者不對帳 model，見註 ²⁸ (a)）：`ROUTINE.md 註 ²⁸` 的模型釘選不在 `scheduled-tasks.json`，15 條仍無 `model`、跑預設 Opus（本班即一例）。下一步：在 app 排程頁逐條設模型後，重讀那份檔確認 `model` 欄有落地；若 app 會蓋回，改走 app 內設定。關聯 `OBSERVER-QUEUE #93（已決）`。

## Beat 5 — 反芻

例行全綠的一班，鍵數回到 13 語各 1,115，昨天記下的時間差今天如期收掉。值得留下的是兩個「去看實際那份東西」的動作：ja 鄰居變動 94 篇，沒有停在「看起來是翻譯修補」，去對了改動檔清單才確定是兩篇樞紐文章帶動整叢；模型欄則是在排程工具不給答案時直接讀排程器的檔，才發現註腳宣稱的狀態不在現場。後者跟神經迴路那條「排程器 lastRunAt 是 fire 的替身」同一個形狀：文件說它做了，能證明的只有被執行的那份設定。沒有新教訓寫進 LESSONS，日記與 evolve 照 routine 預設略過。

🧬

---

_v1.0 | 2026-10-12 06:00 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,495 向量 0 fail，verify PASS，`29941c03b`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：十二語各多一篇〈來來來，怎麼樣、怎麼樣〉讓鍵數回到一致；ja 鄰居大動來自兩篇樞紐譯文；ROUTINE 註 ²⁸ 的模型釘選不在排程器讀的檔裡，本班跑 Opus_
_LESSONS-INBOX：無新增_
