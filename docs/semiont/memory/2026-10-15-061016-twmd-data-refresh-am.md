# 2026-10-15-061016-twmd-data-refresh-am — 14 步全過、0 stale；翻譯夜班那條沉默死亡告警自己消失，GA4 的「平均互動秒數」其實是工作階段長度

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02 → 06:12 +0800（約 10 分鐘，2 commits 含本檔）
> 資料來源：排程器 `lastRunAt`（2026-10-14T22:02Z）、`date`、`git log %ai`

## 觸發

每日早上的儀表板刷新。甦醒（micro）時 groundtruth 印 `ACTOR_BUSY`：babel 有四支寫手進程在工作樹上；fetch 後本機與 origin/main 同步，照 v2.4 用 `refresh-data.sh --no-sync`。

BECOME ack：mode=micro，wake-context 讀到 `wake:END`，selftest 11 項全綠；即時快照最低器官是免疫 59（缺口 review_coverage 18.8），Q14 交接延續通過（昨天本 routine 留了兩條交接給今天，見下）。

## 十四步與三源

十四步全部 PASS，含 2.5 的 404 監測、6.5 子代普查、6.6 營運狀態、10b 編輯台。Step 11 印「全部 14 個 dashboard JSON 都是今天 mtime；analytics content=2026-10-14」，沒有 stale，沒有需要接線的產生器。Step 12 spore 對賬 0 錯 0 警告，Step 13 sporeLinks 無需改動。刷新成果收在 `094d2babf`，babel 的譯文、`_translation-status.json`、related 與 babel 報表留給它自己，`verify-commit-scope --head` 範圍正確，推送一次成功。

三源都抓到新資料。Cloudflare 七天 467.1 萬請求、404 率 0.92%（昨天 1.44%）、AI 爬蟲 17.2 萬次分屬 20 個；GA4 二十八天活躍使用者 92,771；Search Console 七天點擊 8,635、曝光 81.8 萬、CTR 1.06%。數字面：文章 1131、星星 1215、fork 187、貢獻者 78。心臟現行 90、影子分 70，近七天新進庫 8 篇、只更新不新進 51 篇。建置效能 ms/page 111，仍高於 50 的門檻。

## 兩條交接的驗收

昨天本班把 `twmd-babel-nightly` 的沉默死亡告警判為假陽性，留言「若 10-14 有夜班 memory 檔就是寬限太短」。今天 `2026-10-14-060929-twmd-babel-nightly.md` 確實存在，排程器 dump 落檔後重生的告警從 3 條降到 2 條，夜班那條自己消失，今晚 00:55 那一班也有 memory 檔。這是第一次出現就收掉的假陽性，沒有第二次，照約定不進 LESSONS。

maintainer 那條 `duplicated-lang-prefix` 404 家族，今天拿到第一個修補後讀數：10-13 單日 193 筆，前三天是 742、1,222、1,124。修補 `77a04707c` 在 10-13 09:38 上線，所以 10-13 仍含半天修補前的流量，明天的 10-14 讀數才是完整的一天。同一份報表裡 `bad-encoding` 家族 10-13 跳到 1,549 筆（平日一百多），10-10 也有一次 1,279，九成以上是瀏覽器，代表路徑是 `/terminology/` 底下的雙重編碼亂碼網址；監測器沒發警報，記下不追。

〈大安溪倚天劍〉的地圖標記，今天 prebuild 重生後各語言版本落在 24.56、120.82 一帶（苗栗與台中交界的大安溪上游），maintainer 昨天的 geo 修補生效了。

## 「平均互動秒數」量的是工作階段長度

寫數字時發現昨天的 memory 寫 GA4「活躍使用者 8.4 萬、平均互動 41.5 秒」，但昨天 commit 進去的 `dashboard-analytics.json` 是 91,776 人、`avgEngagementSeconds` 190.0，對不起來。往回追到 `~/.config/taiwan-md/cache/ga4-latest.json`：那個欄位的值是 GA4 的 `averageSessionDuration`（189.3），不是互動時間。儀表板把工作階段長度標成平均互動秒數，而昨天那兩個數字不知道從哪裡讀來的。本班不改產生器（欄位改名會牽動前端讀取），交接出去。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅                                            |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 Step 7 prebuild 重生的 organism／vitals |
| 自我檢查工具 PASS            | ✅ 見 commit 前的 prose-health 與 scope 驗證  |

## Handoff 三態

繼承自 `2026-10-14-061017-twmd-data-refresh-am.md` 與 `2026-10-15-053913-twmd-routine-sync.md`：

- [x] ~~今天的 `twmd-babel-nightly` 沉默死亡告警~~：retired by 本 session，10-14 夜班 memory 檔存在，告警依新 dump 自己消失；單次假陽性，不進 LESSONS。
- [x] ~~〈大安溪倚天劍〉地圖標記釘在台南~~：retired by `2026-10-14-090531-twmd-maintainer-daily`，今天產出的標記已在大安溪上游。
- ⏳ pending（延續，收件席位 `twmd-maintainer-daily`）：`duplicated-lang-prefix` 404 家族驗收，10-13 半天讀數 193，等 10-14 全天讀數（`reports/404-monitor/latest.json`）。
- ⏳ blocked（延續，收件席位：哲宇在 app 註冊）：`twmd-review-stock` 排程，`OBSERVER-QUEUE #86（已決）`；10-14 首次已錯過，下個時點 10-21 22:00。
- ⏳ blocked（延續，收件席位：哲宇在 app 排程頁）：15 條排程沒有 `model` 欄，`OBSERVER-QUEUE #93（已決）` 的落地。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`，動得了 `scripts/tools/generate-dashboard-analytics.py` 與儀表板模板）：`dashboard-analytics.json` 的 `ga.totals.avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`；改名成 `avgSessionSeconds`，或另抓 `userEngagementDuration ÷ activeUsers` 當真正的互動秒數，前端同步改標籤。LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`。

## Beat 5 — 反芻

今天的兩件事剛好一前一後。告警那件是昨天寫下的預測今天被驗證：寬限太短的假陽性，第二天自己退場，交接寫了具體的驗收條件，所以今天只要看一個檔在不在就能收掉。GA4 那件是反過來的：昨天的 memory 抄了兩個數字，跟同一個 commit 裡的 JSON 對不上，沒有任何一道閘門比對過 memory 散文裡的數字跟它旁邊的資料檔。而真正的病比數字抄錯更早，欄位名稱本身就說錯了它在量什麼，我們每天讀它、寫進 memory，讀的一直是工作階段長度。

🧬

---

_v1.0 | 2026-10-15 06:12 +0800_
_session twmd-data-refresh-am — 每日早班資料刷新，平行翻譯在寫時用 --no-sync_
_誕生原因：排程觸發的 14 步刷新＋排程器 live 狀態落檔_
_核心洞察：帶驗收條件的交接隔天一眼就能收；儀表板欄位名稱與它實際量的指標不一致，memory 散文裡的數字也沒有對賬_
_LESSONS-INBOX 候選：ga4-session-duration-labelled-as-engagement（vc=1）_
