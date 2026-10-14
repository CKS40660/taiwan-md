# 2026-10-15-061009-twmd-embeddings-nightly — 例行重建：13 語 14,584 向量 0 fail，verify PASS，兩篇新文進索引，`e8bea7f69`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:05 → 06:14 +0800（約 69 分鐘，2 commit：索引＋本 memory）
> 資料來源：`git log %ai`（索引 commit 06:09:10）、`date`（06:10:09）、重建 log 檔 mtime 06:08:53 與各語耗時加總（約 53.6 分鐘，推回起點約 05:15）；甦醒起點沒有落地的時間戳，取估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次重建是昨天的 `8c1cba1cc`。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步。器官讀數 🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59（快照齡 23 小時，標 stale）。parallel-check 報 ACTOR_BUSY：babel writer 在寫，工作樹裡十篇外語譯文、babel 報表與 `src/i18n/home.ts` 都是它的，本班一個都沒碰。

## 重建與驗證

§前置先問本機：`127.0.0.1:11434` 有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。本機領先 origin 15、落後 0，沒有東西要拉。`build-embeddings.mjs --langs all` 每語 226〜268 秒，13 語全部 0 fail，共 14,584 向量。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語：十一語各 1,122 篇，vi 與 ru 各 1,121 篇，全部有 8 個鄰居。manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。vi、ru 各差一篇，對得上 babel 交接裡〈勇鷹高教機〉這兩語仍是缺口。

zh-TW 從 1,120 到 1,122，新增的鍵正好是 10-13 晚上合併的兩篇：`art/看不見的台灣` 與 `society/台灣與亞運`，沒有鍵消失。輸入變了，輸出變在對的位置。

## 推送撞上同機的晨鏈

Stage 3 照規格走：`$NOW` 先落變數印出 `2026-10-15 06:09`，index 裡沒有別人的暫存，帶 pathspec 只 commit `src/data/related/` 13 檔，成 `e8bea7f69`。`git push` 被拒，訊息是「遠端 ref 已經在 `e8bea7f69`，不是預期的舊值」。fetch 後確認 `origin/main` 已含這個 commit、雙邊 0/0：06:00 開跑的 data-refresh-am 在 06:08:59 commit 後推了整條 main，順手把本班 06:09:10 的索引 commit 一起帶上去。結果正確，只是推送的不是本班。反方向也發生一次：本班 memory commit `2b2be5932` 收進 MEMORY.md 時，data-refresh 06:10 剛把它的索引列 append 進同一份檔，於是它那一列跟著本班的 commit 進了 git，它自己的 `a09d09e7b` 只含 memory 檔。兩列各一筆、無重複，內容沒錯，只有歸屬錯位（REFLEXES #68 共享檔案碰撞）。

重建跑到 06:08 才結束，跟 06:00 起跑的 data-refresh 重疊了八分鐘以上（ollama 同時被 babel 佔用，每語耗時跟昨天同一區間）。data-refresh 量到文章 1,131 篇，本班索引的 zh 是 1,122 篇，差九筆的原因本班沒有查證。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（重建起點由 log 推回，甦醒起點標約）               |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班不刷新，data-refresh 06:08 已刷）             |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-14-060847-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 self-evolve-weekly）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [ ] pending（延續，收件席位：哲宇或 Muse 在營運機 Claude 桌面 app 動排程設定，本 routine 動不了這個路徑）：`ROUTINE.md 註 ²⁸` 的模型釘選。本班仍是 Opus 5.5 在跑，第四個證據點。關聯 `OBSERVER-QUEUE #93（已決）`。

本 session 新 handoff：無。

## Beat 5 — 反芻

有內容的一班，跟昨天同型：新鍵對得上前一天合併的文章，缺的兩格對得上 babel 的交接。今天多一件小事是推送由別班代勞，看到 push 被拒的第一反應容易是「沒推上去」，實際上是「已經在上面了」。拒絕訊息裡那個 hash 就是自己的 commit，讀一遍訊息再 fetch 對一次就分得清，不需要重試或 force。沒有新教訓寫進 LESSONS。

🧬

---

_v1.0 | 2026-10-15 06:14 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,584 向量 0 fail，verify PASS，`e8bea7f69`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：兩篇新文進 zh 索引；push 被拒是因為 data-refresh 已代推本班 commit，fetch 對賬即可；模型釘選仍未生效（本班 Opus）_
_LESSONS-INBOX：無新增_
