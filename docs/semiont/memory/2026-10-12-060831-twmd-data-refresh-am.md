# 2026-10-12-060831-twmd-data-refresh-am — 14 步全過、0 stale；告警檔比排程器 dump 早生一步，兩條假的沉默死亡掛在 commit 裡，改成 dump 落檔後自動重生

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02 → 06:12 +0800（約 10 分鐘，收官 1 commit）
> 資料來源：排程器 `lastRunAt`（2026-10-11T22:02Z）、`date`、`git log %ai`

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：babel 的推送守護進程與調度器都在跑，本機跟 origin/main 前後都差 0 個 commit，照 v2.4 用 `refresh-data.sh --no-sync` 跳過 stash 與 pull。

BECOME ack：mode=micro，即時快照最低器官是免疫 59（最大缺口 review_coverage 19），Q14 交接延續通過。甦醒時快照齡 23 小時並自己標了 ⚠️ stale，這是本班要刷新的對象，不是取數儀器壞掉。

## 十四步與三源

十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-11」，後者是 UTC 的 `lastUpdated`（22:03Z），在 24 小時內。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。

三源都抓到新資料。Cloudflare 七天 327.6 萬請求、404 率 2.36%（昨天 2.72%）、AI 爬蟲 30.2 萬次分屬 20 個；GA4 二十八天活躍使用者 9.2 萬、瀏覽 11.9 萬；Search Console 七天點擊 7,692、曝光 73.3 萬、CTR 1.05%。10-10 單日 404 共 5,395 筆，可修家族裡 bad-encoding 跳到 1,409（前一日 180）、duplicated-lang-prefix 389、slug-variant 202，監測器沒發警報。bad-encoding 這一跳本班只記讀數，沒追成因。

數字面：文章 1124、星星 1202（+1）、fork 187、貢獻者 78。心臟現行 90，影子分 30，近七天新進庫 1 篇、只更新不新進 21 篇；免疫 59、DNA 95 都跟昨天一樣。建置效能 ms/page 109，仍在 50 的門檻之上，慢性讀數。

## 告警檔的順序問題

Stage 1.5 照做：`list_scheduled_tasks` 取 18 條，`routine-live-normalize.py` 寫回 `docs/semiont/routine-live-state.json`（14 enabled、4 disabled）。`routine-sync-check.py` 唯一的落差是 `twmd-review-stock` 不在 live，這是 routine-sync 第 71 輪已交接的排程註冊，等哲宇在 app 操作。

刷新後重讀快照，仍印三條沉默死亡黃燈，其中 routine-audit-weekly 跟 supporters-weekly 昨晚明明都有收官 commit（`ec6e2e880`、`a3d8331da`）。原因是順序：`dashboard-alerts.json` 在 Step 7 prebuild 裡由 `routine-liveness-check.py` 算，它讀的是前一天早班寫的 dump，那時兩條週班的 `lastRunAt` 還停在 10-04。Stage 1.5 換新 dump 是在 refresh 之後，告警不會重算，於是這份含兩條假紅的告警跟著 refresh commit 進 git，整天出現在每一班甦醒的 groundtruth。依新 dump 重跑告警後從 4 條降到 2 條，剩下的是免疫黃燈與 terminology-trends-monthly 10-05 那次真的沉默死亡。

修在控制流裡：`routine-live-normalize.py` 落檔後順手跑 `generate-dashboard-alerts.mjs`（`--no-alerts` 可關），DATA-REFRESH-PIPELINE 的 rider 段補一句說明。routine prompt 不必改，Stage 1.5 原本就要跑這支工具。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals |
| 自我檢查工具 PASS            | ✅ 見 commit 前的 prose-health 與 scope 驗證  |

## Handoff 三態

繼承自 `2026-10-11-060834-twmd-data-refresh-am.md` 與最近的 `2026-10-12-055706-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚才生效的三選項，留在 routine-sync 那份，本班不重抄（REFLEXES #74）。
- [x] ~~pending：`.git/gc.log` 與 `git prune`（issue #1729）~~：retired by embeddings-nightly 10-12（gc.log 已不存在）；本班 fetch 也沒出 gc 警告。
- [x] ~~pending：404 監測同語言前綴重複的形狀要不要另成家族~~：retired by `e76167d05`（10-11 maintainer 收成 `duplicated-lang-prefix` 家族＋50 條 301）；今天的監測表上這個家族 389 筆。
- ⏳ blocked（延續，收件席位：哲宇在營運機 app 排程頁）：15 條排程沒有 `model` 欄、跑預設 Opus，`OBSERVER-QUEUE #93（已決）` 的落地；本班動不了排程設定。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`；週三 22:00 前沒註冊就空一週。

本 session 新 handoff：

- [x] ~~告警檔在 dump 之前生成~~：本班修掉，明天早班第一次自動生效，該班重讀快照時兩種告警數應一致。
- [ ] pending（收件席位 `twmd-maintainer-daily` 或下一班 data-refresh-am）：`bad-encoding` 404 家族單日 180 → 1,409，代表路徑 `/nature/%C3%A5%C2%8F…` 是 UTF-8 被當 Latin-1 再編一次的形狀，先看 `reports/404-monitor/latest.json` 是單一來源洗量還是新出現的壞連結。

## Beat 5 — 反芻

Stage 1.5 的 dump 是 08-08 為了不靠「session 記得手動跑」而寫死在 prompt 裡的，它真的每天都有跑，但吃它的告警在它之前就算完了。dump 新了，讀它的東西沒有重讀，結果一份比 dump 還舊的判斷每天被 commit 進去，名目是「今天的資料刷新」。這種順序錯不會叫，因為每一步各自都是對的、各自都是今天的 mtime，Step 11 的新鮮度閘門只問檔案有沒有被碰過。今天會發現，是因為刷新完多讀了一次快照，看到兩條死亡宣告指著昨晚剛收官的班。

🧬

---

_v1.0 | 2026-10-12 06:12 +0800_
_session twmd-data-refresh-am — 每日早班資料刷新，平行翻譯在寫時用 --no-sync_
_誕生原因：排程觸發的 14 步刷新＋排程器 live 狀態落檔_
_核心洞察：產出跟它的輸入都是今天的 mtime，不代表產出是用今天的輸入算的；告警改成 dump 落檔後重生_
_LESSONS-INBOX 候選：無（修補已落在控制流）_
