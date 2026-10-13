# 2026-10-14-060847-twmd-embeddings-nightly — 例行重建：13 語 14,558 向量 0 fail，verify PASS，五篇新文進索引，`8c1cba1cc`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:05 → 06:12 +0800（約 67 分鐘，2 commit：索引 + 本 memory）
> 資料來源：`date`（重建起 05:15:33、驗證時 06:08:08）、`git log %ai`；甦醒起點沒有落地的時間戳，取估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次有內容的重建是 10-12 的 `29941c03b`，10-13 那班零 diff 沒有 commit。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步。器官讀數 🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59（快照齡 23 小時，標 stale）。parallel-check 報 ACTOR_BUSY：babel writer 在寫，工作樹裡 babel 報表、`_translation-status.json` 與五篇新文的十二語未追蹤譯文都是它的，本班一個都沒碰。

## 重建與驗證

§前置先問本機：`127.0.0.1:11434` 有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。本機與 origin 0/0，`git pull` 空轉。`build-embeddings.mjs --langs all` 從 05:15:33 跑到約 06:08，每語 217〜282 秒（比昨天每語慢約 40〜80 秒，同機同時有 babel 在跑 ollama），13 語全部 0 fail，共 14,558 向量。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語：十一語各 1,120 篇，vi 與 ru 各 1,119 篇（各差一篇譯文還沒落地），全部有 8 個鄰居；manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。

這次有 diff，而且對得上原因：10-13 早上合併的 tboydar 五篇新文（勇鷹高教機、傅兆玄、李灝宇、王冠閎、台灣拔河）進了 zh-TW 索引，1,115 → 1,120，zh 另有 15 篇的鄰居跟著重排；en 同樣多這五篇，92 篇鄰居變動（白天約六十批 babel 譯文的累積）。昨天那條「零 diff 要查是不是輸入沒變」反過來也成立：今天輸入有變，輸出就該變，而且新增的鍵正好是那五篇。

外語索引裡的五篇新文來自 babel 還沒 commit 的未追蹤譯文（`knowledge/{lang}/…/fu-chao-hsuan.md` 等，babel 剛為三位人名建裁決表 `d2e885366`）。查過 `src/utils/articles-index.ts`：鄰居 slug 要先在文章索引裡解析得到才會出卡，解析不到就略過，所以 babel 還沒推的譯文不會在站上變成死連結，等它推上來就自動接上。

Stage 3：`$NOW` 先落變數印出 `2026-10-14 06:08`，index 裡沒有別人的暫存，帶 pathspec `-- src/data/related/` commit，`git show --stat` 確認只有 13 個 related 檔，push 成功（pre-push 三道閘全綠）。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（重建起訖取 `date`，甦醒起點標約）                 |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班不刷新，06:00 data-refresh 接手）             |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-13-055748-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 self-evolve-weekly）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [ ] pending（延續，收件席位：哲宇或 Muse 在營運機 Claude 桌面 app 動排程設定）：`ROUTINE.md 註 ²⁸` 的模型釘選。本班仍是 Opus 5.5 在跑，第三個證據點；任務檔 `~/.claude/scheduled-tasks/twmd-embeddings-nightly/SKILL.md` 的 description 寫「sonnet」，但那是說明文字，不是釘選設定。關聯 `OBSERVER-QUEUE #93（已決）`。

本 session 新 handoff：無。

## Beat 5 — 反芻

有內容的一班。新鍵對得上前一天合併的五篇，鄰居變動量對得上白天的譯文批次，這種「輸入跟輸出對得上」的檢查兩分鐘就做完。沒有新教訓寫進 LESSONS，日記與 evolve 照 routine 預設略過。

🧬

---

_v1.0 | 2026-10-14 06:12 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,558 向量 0 fail，verify PASS，`8c1cba1cc`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：五篇新文進索引，未推送的外語譯文由站上解析層過濾，不會變死連結；模型釘選仍未生效（本班 Opus）_
_LESSONS-INBOX：無新增_
