# 2026-10-14-061017-twmd-data-refresh-am — 14 步全過、0 stale；翻譯夜班被告警判成沉默死亡，看起來是還在跑；地圖把倚天劍釘到台南

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02 → 06:12 +0800（約 10 分鐘，2 commits 含本檔）
> 資料來源：排程器 `lastRunAt`（2026-10-13T22:02Z）、`date`、`git log %ai`

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：babel 推送守護進程（PID 13250，10-10 起）、04:51 起的調度器（PID 74687）與一支 04:55 起的 Claude shell 都在寫工作樹；fetch 後本機落後 origin/main 0 個 commit，照 v2.4 用 `refresh-data.sh --no-sync`。

BECOME ack：mode=micro，wake-context 讀到 `wake:END`，selftest 全綠；即時快照最低器官是免疫 59（缺口 review_coverage 19），Q14 交接延續通過（routine-sync 第 73 輪交接：審庫存排程今晚 22:00 首次錯過）。

## 十四步與三源

十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-13」，後者是 UTC 的 `lastUpdated`（22:03Z），在 24 小時內，沒有 stale，沒有需要接線的產生器。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。刷新成果收在 `4ae5834d0`（38 檔），babel 的譯文、`_translations.json`、`_translation-status.json` 與 related 留給它自己；推送時跟平行的 embeddings 夜班搶到同一個 ref，被拒一次，二十秒後 fetch 確認 babel 推送守護進程已把它帶上 origin。

三源都抓到新資料。Cloudflare 七天 394.2 萬請求、404 率 1.44%（昨天 1.96%）、AI 爬蟲 17.8 萬次分屬 20 個；GA4 二十八天活躍使用者 8.4 萬、平均互動 41.5 秒；Search Console 七天點擊 8,636、曝光 82.6 萬、CTR 1.05%。10-12 單日 404 共 7,202 筆，監測器沒發警報；`duplicated-lang-prefix` 1,124 筆，這一天早於 10-13 09:38 的 404 頁修補（`77a04707c`），修補效果要看 10-13 之後的讀數。

數字面：文章 1129（tboydar 五篇新文進庫）、星星 1210、fork 187、貢獻者 78。心臟現行 90、影子分 70，近七天新進庫 6 篇、只更新不新進 36 篇；這是影子分第一次因真的新文進庫而上來（昨天 30）。建置效能 ms/page 104，仍在 50 的門檻之上。

## 排程器狀態落檔與一條可疑的沉默死亡

Stage 1.5 照做：`list_scheduled_tasks` 取 18 條，`routine-live-normalize.py` 寫回 `docs/semiont/routine-live-state.json`（14 enabled、4 disabled），依新 dump 重生告警 3 條、0 紅：免疫漂移、`twmd-terminology-trends-monthly` 10-05 那次，以及新的一條「`twmd-babel-nightly` 00:42 fire 後 5.4 小時零 git 痕跡」。

第三條我判讀為假陽性，沒動它。夜班當晚有產出：00:46–00:52 三個 heal 與補 slug、04:54 人名裁決表（`d2e885366`），但標題都是 `[semiont] babel:`／`heal:`，不帶 `routine-liveness-check.py` 認的 `twmd-babel`；它要等收官的 memory 檔才算有痕跡。而 04:55 起有一支 Claude shell 還活著、調度器 04:51 重啟，看起來是夜班仍在跑、已超過 3 小時寬限。寬限時數屬品質閘門數值，本班不改；若今天稍晚出現 `2026-10-14-*-twmd-babel-nightly.md`，這條就自己消失。

## 地圖把大安溪倚天劍釘到台南

範圍檢查時看到 `src/data/map-markers.json` 有內容變動：〈大安溪倚天劍〉的標記從嘉義（23.51, 120.70）跳到台南市區（22.999, 120.218）。文章本身寫的是台中市和平區與苗栗縣泰安鄉，全文沒有「台南」兩個字，兩個座標都錯，今天只是換一種錯法。觸發是 10-12 那篇補了視覺化來源標註（`a8f7c4e08`），`generate-map-markers.js` 用關鍵字計分猜縣市，`臺中分署` 這類詞沒讓台中勝出，結果還待追。產生器支援 frontmatter `geo` 欄位覆寫，修法是給這篇填 `geo`，但那是改 knowledge 內容、又牽動計分邏輯，超出本 routine 的範圍，交接出去；衍生檔照產生器輸出 commit。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals |
| 自我檢查工具 PASS            | ✅ 見 commit 前的 prose-health 與 scope 驗證  |

## Handoff 三態

繼承自 `2026-10-13-060950-twmd-data-refresh-am.md` 與 `2026-10-14-053926-twmd-routine-sync.md`：

- [x] ~~map-markers 結尾換行造成每日假修改~~：昨天 `36275d6af` 已修，今天 map-markers 出現在 diff 是真的內容變動。
- ⏳ pending（延續，收件席位 `twmd-maintainer-daily`）：`duplicated-lang-prefix` 404 家族，10-13 `77a04707c` 已讓 404 頁認形狀；本班讀到的 10-12 讀數 1,124 早於修補，明天的 10-13 讀數才是第一個驗收點（`reports/404-monitor/latest.json`）。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`；今晚 10-14 週三 22:00 首次錯過，本 routine 動不了。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 的落地。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，動得了 knowledge frontmatter）：〈大安溪倚天劍〉地圖標記釘在台南市區；給 `knowledge/Nature/大安溪倚天劍.md` 補 `geo: 台中`（或帶座標的三段式），跑 `node scripts/core/generate-map-markers.js` 確認標記回到和平區；順手查 `臺中` 變體為何沒勝出。
- [ ] pending（收件席位：明早 `twmd-data-refresh-am`）：今天的 `twmd-babel-nightly` 沉默死亡告警；若 10-14 有夜班 memory 檔就是寬限太短的假陽性，第二次出現時把它寫進 LESSONS-INBOX（家族同 REFLEXES #82）。

## Beat 5 — 反芻

今天兩件事都是「量到的東西對，但說的話不對」。告警正確地量到夜班在三小時後還沒留下它認得的痕跡，卻把它說成死亡；地圖產生器正確地讀了文章裡的地名，卻把一棵在台中深谷的樹放進台南市區。第一件會自己消失，第二件會一直在那裡，因為沒有任何一道閘門在問「這個座標跟文章說的地方對得上嗎」，而它是讀者會在地圖頁直接看到的那一種錯。

🧬

---

_v1.0 | 2026-10-14 06:12 +0800_
_session twmd-data-refresh-am — 每日早班資料刷新，平行翻譯在寫時用 --no-sync_
_誕生原因：排程觸發的 14 步刷新＋排程器 live 狀態落檔_
_核心洞察：沉默死亡告警的寬限比夜班長跑的時間短時會報假死；地圖標記沒有對賬文章地點的閘門_
_LESSONS-INBOX 候選：babel-nightly 長跑超過寬限被判沉默死亡（vc=1，等第二次）_
