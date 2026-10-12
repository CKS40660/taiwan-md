# 2026-10-13-055748-twmd-embeddings-nightly — 例行重建：13 語 14,495 向量 0 fail，verify PASS，索引逐位元組不變，照規則不 commit

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:05 → 06:00 +0800（約 55 分鐘，1 commit：本 memory）
> 資料來源：rebuild log 建立與修改時間（05:15:18 → 05:57:33）、`git log %ai`、`date`；甦醒起點沒有落地的時間戳，取估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次重建是昨天的 `29941c03b`。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步。器官讀數 🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59（快照齡 23 小時，標 stale）。parallel-check 報 ACTOR_BUSY：babel writer 在寫，工作樹裡七個 babel 報表與 `_translation-status.json` 的改動一個都沒碰。

## 重建與驗證

§前置先問本機：`127.0.0.1:11434` 有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。本機與 origin 0/0，`git pull` 是空轉。`build-embeddings.mjs --langs all` 從 05:15:18 跑到 05:57:33，每語 183〜202 秒，13 語全部 0 fail，共 14,495 向量。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語，每語 1,115 篇、全部有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。

`src/data/related/` 沒有任何 diff，也沒有未追蹤檔，照 Stage 3 規則不 commit。回頭查原因：`29941c03b` 之後 `knowledge/` 沒有任何 commit（babel 夜班缺口連兩夜為零，白天的 commit 都在工具、報表與 memory），輸入相同，輸出就逐位元組相同。這順帶說明在同一台機器、同一個模型版本上重建是可重現的，昨天看到的鄰居變動可以放心歸因到內容改動，而不是重建本身的雜訊。

本班重建期間 routine-sync 在同一工作樹 05:39:48 推了 `4d438c68d`（memory），並覆寫了 `.taiwanmd/wake-context.latest.md`（05:38:42）。兩條 routine 的寫入面不重疊，沒有衝突。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（rebuild 起訖取 log 檔時間，甦醒起點標約）         |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班不刷新，06:00 data-refresh 接手）             |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-12-055706-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 self-evolve-weekly，本班動不了殼層）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [ ] pending（延續，收件席位：哲宇或 Muse 在營運機 Claude 桌面 app 動排程設定，本 routine 動不了）：`ROUTINE.md 註 ²⁸` 的模型釘選。本班仍是 Opus 5.5 在跑，第二個證據點。本班在 `~/Library/Application Support` 與 `~/.claude` 下沒找到 `scheduled-tasks.json`，所以沒辦法重讀檔案確認，只能從執行模型看出釘選還沒生效。關聯 `OBSERVER-QUEUE #93（已決）`。

本 session 新 handoff：無。

## Beat 5 — 反芻

一班什麼都沒變的重建。值得記一句的是「零 diff」本身也該查原因：查到 `knowledge/` 自上一版起零 commit 才算合理，若當天有內容改動而索引仍零 diff，那就是重建沒吃到新內容的訊號。今天屬於前者。沒有新教訓寫進 LESSONS，日記與 evolve 照 routine 預設略過。

🧬

---

_v1.0 | 2026-10-13 06:00 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,495 向量 0 fail，verify PASS，無 diff 不 commit_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：knowledge/ 零改動時索引逐位元組重現，證明重建可重現；模型釘選仍未生效（本班 Opus）_
_LESSONS-INBOX：無新增_
