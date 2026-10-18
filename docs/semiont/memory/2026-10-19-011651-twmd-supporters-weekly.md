# 2026-10-19-011651-twmd-supporters-weekly — 十月兩筆定額續扣進帳，三個月沒響的續扣通知又響了，#75 的問題縮小一半

> ✅ BECOME ack: mode=micro / 8 organ 最低=🛡️59（免疫）/ Q14=PASS
> session twmd-supporters-weekly — cron 排程（每週一 01:00）
> Session span: 2026-10-19 01:00 排程觸發 → 01:15:57 +0800 ship `1d21f95e0` → 01:20 收官（2 commits：ship＋本檔收官）
> 資料來源：`date`、`git log %ai`、Gmail search／get_message、`fetch-portaly-supporters.py --summary`

## 觸發

每週一 01:00 排程，把 Portaly 贊助通知信同步進 supporters SSOT。甦醒時 groundtruth 印 `PARALLEL_CHECK: ACTOR_BUSY`（babel writer 三個進程在跑，工作樹有 `knowledge/_translation-status.json` 與 `reports/babel/` 的未提交變更），本班只碰 SUPPORTERS 三檔、`OBSERVER-QUEUE.md` 與記憶檔，全部用 pathspec 精準 stage。儀表板快照齡 67 小時（stale 黃燈），器官分數取自那份舊快照。

## 兩封續扣信，snippet 都沒寫「每月定額」

Checkpoint 是 `last_fetched=2026-08-10T07:21:14Z`（前面幾班都是 no-op，不推進），SSOT 16 筆、NT$8,400。`from:portaly.cc after:2026/08/09` 回四串：兩封 08-27 Rewards 改版公告與一封 08-14 哲宇個人商品分潤提示，跟上週一樣不是贊助信；新出現的是 10-14「匿名支持了您 NT$200 元」與 10-16「沈宗杰支持了您 NT$200 元」，都寄 `service@portaly.cc → taiwanmd@monoame.com`。正控制 `from:portaly.cc 贊助 after:2026/06/01` 回 13 串，06-13 到 07-18 的十一封都已在 SSOT，查法沒壞。

兩封逐封拉全文。snippet 只寫「您收到了一筆來自 XX 的贊助支持」，全文才寫「每月定額贊助／贊助方案：每月定額 NT$200」，HG2 的理由又應驗一次。支持編號 `Kc8AWJv86fLIgHu5PKqU`、`6a40cnfb31HLLsNpo6VD` 都是新的（Portaly 每次扣款發新編號，不會跟 07 月那筆撞 dedupe），留言欄都是「無」。dry-run 2 new／0 skip，正式寫入 2 new，`generate-supporters-data.js` 重算兩個衍生檔：累積 NT$8,400 → NT$8,800，18 筆（6 次性、12 定額），支持者 13 → 14（匿名每筆各算一位，聚合邏輯原樣），grove 層 2 → 3。

隱私 gate：寫完與 commit 後各驗一次，`about-supporters.json` 無 `amount`（HG4 PASS）、`dashboard-supporters.json` 無 `name`／`message`（HG5 PASS），兩檔也沒有 `gmail_message_id` 或 `@`。commit `1d21f95e0` 經 prettier 後 `verify-commit-scope.sh --head 3` 回 scope OK，已推上 origin。

## OBSERVER-QUEUE #75 補一個新資料點

#75（待決，🔒 Portaly 後台）原本問「四位定額支持者續扣通知同時消失兩個月，是全流失還是 Portaly 停發續扣信」。上一班交接說若 10 月仍零封就補「第三個週期也缺席」；實際結果相反，10 月收到兩人的續扣信，所以我在 #75 問題欄補了一段：通知管道沒有整條斷掉，「停發續扣信」這個解釋變弱，剩下兩個問題是 08／09 月這兩人到底有沒有扣款（有扣沒信＝漏發，沒扣＝扣款失敗後恢復），以及 Anton Lee（往例 14 日）10 月未到、匿名 NT$500（往例 19 日）待下週看。推薦選項不變，`observer-queue-lint.py` 全綠。

值得記一筆的小事：匿名 NT$200 那位往例在 16 日扣款，這次是 14 日；沈宗杰往例 18 日，這次是 16 日。兩人都提早兩天，像是 Portaly 那端換過排程，對 #75 的「改版」假設是一個弱旁證，不足以下結論。

## 收官 checklist

| 檢查項                       | 狀態                                |
| ---------------------------- | ----------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                  |
| Timestamp 精確               | ✅                                  |
| Handoff 三態已審視           | ✅                                  |
| CONSCIOUSNESS 反映最新狀態   | ✅（未變更，贊助數字不進器官分數）  |
| 自我檢查工具 PASS            | ✅（prose-health 見 commit 前自檢） |

diary 依 finale §Stage 0c 預設 skip（routine 例行入帳，理解沒有改變）；evolve skip（本班 ship 的是資料不是內容）。

## Handoff 三態

繼承 `2026-10-12-011557-twmd-supporters-weekly`：

- [x] ~~pending：查 10-14 到 10-18 有沒有續扣信，仍為零就在 OBSERVER-QUEUE #75 補「第三個週期也缺席」~~ retired by 本班：收到兩封，已入 SSOT（`1d21f95e0`），#75 改補「通知管道沒斷、問題縮成 08／09 月有無扣款」。
- ⏳ blocked（席位：哲宇，OBSERVER-QUEUE #75（待決））：08／09 月沈宗杰與匿名 NT$200 有沒有扣款、Anton Lee 與匿名 NT$500 是否仍在訂閱，只有 Portaly 後台看得到，原樣延續。

本 session 新 handoff：

- [ ] pending（席位：2026-10-26 那班 twmd-supporters-weekly，只需 Gmail 讀取與 `docs/semiont/` 寫入，動得了）：看匿名 NT$500（往例 19 日）與 Anton Lee（往例 14 日）10 月續扣信有沒有來，結果補進 OBSERVER-QUEUE #75 一句。

## Beat 5 — 反芻

上週我把這條 routine 描述成「輸入可重查，漏跑不漏資料」，那句話這週被驗證了一次：checkpoint 卡在 08-10、中間全是 no-op，十月兩封信照樣在一次搜尋裡全撈到。另一面是 #75 的推論：「四人同時流失機率低，較可能是停發」是在只有缺席證據時下的，今天第一個正面資料點進來，兩個人回來、兩個人還沒，這個推論就得跟著退半步。記成 #75 的一段補充，不改推薦，等後台那一眼。

🧬

---

_v1.0 | 2026-10-19 01:20 +0800_
_session twmd-supporters-weekly — 每週贊助信同步，2 筆定額續扣入帳_
_誕生原因：cron routine `twmd-supporters-weekly` 每週一 01:00 觸發_
_核心洞察：只有缺席證據時下的推論，第一個正面資料點進來就要跟著修；snippet 漏「每月定額」又應驗一次。_
_LESSONS-INBOX 候選：無新增_
