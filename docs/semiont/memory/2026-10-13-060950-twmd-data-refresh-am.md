# 2026-10-13-060950-twmd-data-refresh-am — 14 步全過、0 stale；範圍驗證 31 對 32 追到地圖標記產生器少一個結尾換行，當班補上

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02 → 06:12 +0800（約 10 分鐘，3 commits 含本檔）
> 資料來源：排程器 `lastRunAt`（2026-10-12T22:02Z）、`date`、`git log %ai`

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：babel 的推送守護進程（PID 13250，跑了三天）與調度器（PID 45378）都在寫工作樹，本機與 origin/main 前後都差 0 個 commit，照 v2.4 用 `refresh-data.sh --no-sync`。

BECOME ack：mode=micro，即時快照最低器官是免疫 59（最大缺口 review_coverage 19），Q14 交接延續通過。甦醒時快照齡 23 小時並自己標了 ⚠️ stale，是本班要刷新的對象；刷新後齡 0 小時。

## 十四步與三源

十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-12」，後者是 UTC 的 `lastUpdated`（22:03Z），在 24 小時內。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。刷新成果收在 `bf622ff2a`（31 檔，babel 的 7 個檔留給它自己）。

三源都抓到新資料。Cloudflare 七天 357.1 萬請求、404 率 1.96%（昨天 2.36%）、AI 爬蟲 24.3 萬次分屬 20 個；GA4 二十八天活躍使用者 8.4 萬、平均互動 41.5 秒；Search Console 七天點擊 8,787、曝光 83.9 萬、CTR 1.05%。10-11 單日 404 共 4,401 筆，監測器沒發警報；可修家族裡 `duplicated-lang-prefix` 從前一日 389 升到 1,222，`bad-encoding` 從 1,409 回到 164，另有 1,518 筆歸在 `unknown`，代表路徑是小寫百分比編碼的中文網址。本班只記讀數，沒追成因。

數字面：文章 1124、星星 1207（+5）、fork 187、貢獻者 78。心臟現行 90、影子分 30，近七天新進庫 1 篇、只更新不新進 21 篇；免疫 59、DNA 95 與昨天相同。建置效能 ms/page 106，仍在 50 的門檻之上，慢性讀數。

## 排程器狀態落檔

Stage 1.5 照做：`list_scheduled_tasks` 取 18 條，`routine-live-normalize.py` 寫回 `docs/semiont/routine-live-state.json`（14 enabled、4 disabled），並依新 dump 重生告警，2 條、0 紅：免疫漂移，以及 `twmd-terminology-trends-monthly` 10-05 那次真的沉默死亡。這是昨天把告警移到 dump 之後重生的第一個早班，快照與告警檔的條數一致，修補生效。`routine-sync-check.py` 唯一落差仍是 `twmd-review-stock` 不在 live。

## 範圍驗證差一個檔

收官時 `verify-commit-scope.sh --head 32` 回 31，疑似跨 session 污染。查下去是 `src/data/map-markers.json`：`generate-map-markers.js` 用 `JSON.stringify` 寫檔沒有結尾換行，於是每天刷新後它都顯示已修改；commit 時 lint-staged 的 prettier 補回換行，內容跟 HEAD 一字不差，檔案掉出 commit，暫存區卻留著格式化前的版本（`MM`）。`--head` 的殘影清理只處理「本 commit 的檔」，掉出 commit 的這一個不在它的範圍，所以殘影留著；下一個不帶 pathspec 的 commit（常是平行的 babel）就會把那份少換行的版本帶進 git。

當班先 `git reset` 那個路徑，再用 `36275d6af` 讓產生器寫檔補上 `'\n'`，重跑產生器確認檔案不再出現在 `git status`。昨天 10-12 的刷新 commit 裡 map-markers 有真的 44 行新增，這個換行落差在有內容變動的日子被 prettier 一起吃掉，只有內容不變的日子才現形。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals |
| 自我檢查工具 PASS            | ✅ 見 commit 前的 prose-health 與 scope 驗證  |

## Handoff 三態

繼承自 `2026-10-12-060831-twmd-data-refresh-am.md` 與最近的 `2026-10-13-055748-twmd-embeddings-nightly.md`：

- [x] ~~告警檔在 dump 之前生成~~：retired，本班確認修補生效（落檔後重生 2 條，與快照一致）。
- [x] ~~pending：`bad-encoding` 404 家族單日 180 → 1,409~~：retired by `2efb63edf`（10-12 09:01 maintainer 讓 404 頁認得雙重編碼並導回真頁面）。10-11 單日已回到 164，那天早於修補上線，所以這個回落是來源自己退潮，修補的效果要等 10-12 之後的讀數才看得到。
- ⏳ blocked（延續，收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚才生效的三選項，留在 routine-sync 那份，本班不重抄（REFLEXES #74）。
- ⏳ blocked（延續，收件席位：哲宇在營運機 app 排程頁，本 routine 動不了）：15 條排程沒有 `model` 欄、跑預設 Opus，`OBSERVER-QUEUE #93（已決）` 的落地；embeddings 連兩晚仍是 Opus。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`；明天 10-14 週三 22:00 前沒註冊就空一週。

本 session 新 handoff：

- [x] ~~map-markers 結尾換行造成每日假修改與索引殘影~~：`36275d6af` 修掉。
- [ ] pending（收件席位 `twmd-maintainer-daily`，動得了 `public/_redirects` 與 404 監測）：`duplicated-lang-prefix` 在 10-11 的 50 條 301（`e76167d05`）上線後單日反而 389 → 1,222，代表路徑 `/enen/people/ting-jih-chang`；先看 `reports/404-monitor/latest.json` 這批是不是 301 名單外的新路徑，再決定補名單還是改成規則式導向。

## Beat 5 — 反芻

31 對 32 這種差一的讀數，最容易被讀成「工具太敏感」然後放過；它其實準確地指出一個掉出 commit 的檔，只是它的說明文字只會說「疑似跨 session 污染」，而真正的原因是自己的產生器跟自己的格式化器意見不同。病根在源頭那一行，殘影清理工具管不到掉出 commit 的檔，所以修在產生器比修在清理工具便宜，也不會碰到「工作樹等於 HEAD 但暫存區不同」這種該不該清的判斷。

🧬

---

_v1.0 | 2026-10-13 06:12 +0800_
_session twmd-data-refresh-am — 每日早班資料刷新，平行翻譯在寫時用 --no-sync_
_誕生原因：排程觸發的 14 步刷新＋排程器 live 狀態落檔_
_核心洞察：範圍驗證差一個檔時，先問那個檔為什麼不在 commit 裡；產生器與格式化器對結尾換行意見不同，會讓檔案每天假修改又掉出 commit_
_LESSONS-INBOX 候選：無（修補已落在產生器）_
