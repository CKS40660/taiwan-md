# 2026-10-20-055916-twmd-embeddings-nightly — 八篇新文進索引：13 語 14,716 向量 0 fail，每語 1,132 篇，verify PASS，`e3e33294b`，固定差 9 篇查出是 About 頁

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:10 → 06:02 +0800（約 52 分鐘，2 commit：索引＋本 memory）
> 資料來源：重建 log 建立 05:15:03、修改 05:58:11；`git log %ai`（索引 commit 05:58:41）；`session-id.sh` 05:59:16；甦醒起點沒有落地的時間戳，取估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次是 10-19 的 `d1aacec86`，之後 maintainer 在 10-19 08:50 合併了 tboydar 的八篇建築與公民新文，babel 夜班今天 02:00 前把它們翻進十二語，這班是它們第一次進語意索引。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步。器官讀數 🫀90 🛡️59 🧬80 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59，快照齡 23 小時標 stale（停在 10-19 早上的 data-refresh）。parallel-check 報 ACTOR_BUSY：babel writer（PID 13250 的 `babel-push-every.py --watch`）在跑，工作樹裡 `_translation-status.json` 與 `reports/babel/*` 是它的，本班一個都沒碰。同一時段 routine-sync 也在跑（05:39 `c6f1959c8`），兩班沒有碰到同一個檔。

## 重建與驗證

§前置先問本機：EMBED_HOST 解析為 `127.0.0.1:11434`，有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。本機與 origin 0/0，不用 pull。`build-embeddings.mjs --langs all` 05:15 起跑，每語 187〜206 秒，13 語全部 0 fail，共 14,716 向量，05:58 結束，fail rate 0%。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語（zh-TW／en／ja／ko／es／fr／vi／id／pt／hi／ar／ru／de），每一語都是 1,132 篇、全部有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。從 1,124 到 1,132 剛好加八篇，十三語同步跳，對得上 babel 夜班「十二語 missing 歸零」的紀錄。

Stage 3：`$NOW` 先落變數印出 `2026-10-20 05:58`，index 裡沒有別人的暫存，帶 pathspec 只 commit `src/data/related/`，成 `e3e33294b`，13 檔各一行，事後確認 commit 裡沒有 `src/data/related/` 以外的檔。push 一次成功（pre-push 判斷 in-flight deploy 還早），fetch 後雙邊 0/0。

## 固定差 9 篇的來源

前兩班一直往下傳「data-refresh 的文章數與 zh 索引固定差 9 篇」這條。本班數了一次：`knowledge/` 底下 13 個分類資料夾的 zh 檔案正好 1,132，跟索引一模一樣，`knowledge/About/` 另有 9 篇。dashboard 的 1,133 是 10-19 早上 06:05 的快照，當時八篇新文還沒合併，1,124 加 9 篇 About 正好 1,133。差的是 About 頁：dashboard 算進文章數，embedding 只建分類文章的索引。這是定義不同，不是漏進索引。下次 data-refresh 跑完，預期 dashboard 是 1,141、索引 1,132，差距仍是 9。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（重建起訖取 log 建立／修改時間，甦醒起點標約）     |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 23h 等 data-refresh-am      |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-19-051507-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [x] ~~pending：data-refresh 文章數與 embeddings zh 索引固定差 9 篇~~ retired by 本班：差的是 `knowledge/About/` 的 9 篇，dashboard 計入、索引不建，定義不同，見上段。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`，不另行 carry）：本班照 #110 推薦應跑 Haiku，實際仍是 Opus 5.5。

本 session 新 handoff：無。

## Beat 5 — 反芻

被往下傳兩班的那條交接，數一次資料夾就收掉了，前後不到一分鐘。它一直沒被做掉，是因為每班都把它寫成「對一次兩邊的文章清單」，聽起來像要動 `scripts/` 的工作，所以收件席位寫成 data-refresh 或 maintainer。其實只需要讀，embeddings 自己這班就動得了。交接把「要誰做」寫得比實際需要的權限高，收件人就會一直是別人。沒有新教訓寫進 LESSONS，這跟 REFLEXES #97「收件席位動不動得了」是同一件事的反面，記在這裡就夠。

🧬

---

_v1.0 | 2026-10-20 06:02 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,716 向量 0 fail，verify PASS，`e3e33294b`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行；tboydar 八篇新文第一次進索引_
_核心洞察：十三語同步從 1,124 到 1,132；dashboard 與索引的固定差 9 是 About 頁的定義差；只需要讀的交接被寫成要動手的席位，就一直傳下去_
_LESSONS-INBOX：無新增_
