# 2026-10-15-005541-twmd-babel-nightly — 修復後續跑：GPU 停在場外十三小時，因為退場的工人回不來

> session twmd-babel-nightly — cron 00:30 夜班（Stage 0.5 判定：活著但產能只剩一條線 → 修復後續跑）
> Session span: 00:41 → 01:12 +0800（約 31 分鐘，本班 3 commits：`9397769e0`、`74a774def`、本 memory）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261014-045124-74687/{report.jsonl,master.log}`

## 觸發與甦醒

✅ BECOME ack: mode=write / 8 organ 最低=🛡️ 免疫 59（review_coverage 18.8）/ Q14 cross-session continuity=PASS。wake-context 讀到 `wake:END`，selftest 全綠；本機 HEAD 比 origin 多 3 個 dispatcher commit，push-every 照節律在推，不是落後。昨晚 babel 班的交接第三條點名的正是今晚撞上的這個缺陷。

## Stage 0：算力 healthy，四層都在

`babel-preflight.py` 判 healthy：OpenRouter 7/7 把 key、本機 ollama gemma4:26b、fleet 一台 mac-m4max、codex 在。入池門檻那行照舊：名單外的 gemma4:e4b-nvfp4（8.1B）裝在本機但 fleet 沒核發，產線沒用它。preflight 同時報兩篇新母稿缺 slug（〈看不見的台灣〉〈台灣與亞運〉，10-14 08:50 合併），十二語都排不進佇列。

## 三重巡檢：活著、有產出，但只剩一條線在產

dispatcher PID 74687 從 10-14 04:51 活到現在，launchd keepalive 拉著，report 近 45 分鐘有新列，表面三項都過。拆 report 才看出問題：10-14 11:21 之後的每一筆成功全是 nemo（OpenRouter 免費 nemotron，heavy 文章每篇二十到五十分鐘）。地端 gemma 08:4x 補貨撲空、印「退出等輪次結束」離場；三小時後 PR 合併造出十二語各十來篇 stale，nemo 空手時的 top-up 把它們補進同一個佇列，此後 nemo 每次空手都還補得到貨，輪次永遠不結束，退場的 gemma 執行緒也永遠回不來。Haiku 付費槽是 Tier 6 受限 worker，資格只在輪首重算，同樣被卡在輪外，〈勇鷹高教機〉vi／ru 兩格從 07:43 起沒再被試。

這是 09-21 top-up 修補的鏡像：那次修的是「空手先補貨」，沒想到「補不到之後別人補到了」。修法 `9397769e0`：一般 worker 補不到貨時，只要別的 worker 還有在做的篇數，就停在場邊每十分鐘回來看一次佇列與 backlog，所有人都空手才收工；停在場邊時撲空的 top-up 不再重複印 💤。Tier 6/7 照舊不等。`tests/test_babel_dispatch_topup.py` 加四條測試（停邊後回場接到後補的貨、沒人在做就直接收工、受限層不等、quiet 不印），lang-sync 相關 144 條全過。同一個 commit 補上兩篇新文的 slug（`invisible-taiwan`、`taiwan-asian-games`，git ls-files 查過不撞）。

## 重啟

照「修完收尾重啟一次」的規則，等 nemo 手上那篇 vi〈台灣廣告史〉（00:16 起跑）做完才 `launchctl kickstart -k`。那篇 01:02 做完卻被 magnitude 閘門擋下、還原成舊版（閘門照常運作）；接著等 ja、ko 零頭 flush，01:06 重啟，新 PID 53769，run 目錄 `babel-unified-20261015-010649-53769`。es〈大安溪倚天劍〉、fr〈台灣人小時候的英文名字〉兩份已過閘但還在等 90 分鐘零頭 flush，重啟會讓它們成為孤兒，重跑逐條對照 19/19 與 pre-commit 健檢 hard=0 後手動精確路徑提交（`74a774def`）。重啟後三分鐘內四種槽位全動：地端 gemma、三個 Haiku 都有成功列，Haiku 第一批就接了剛補 slug 的〈台灣與亞運〉。

## 閘門盤點：沒有三模型同理由的閘門缺陷

近三個 run 的 report 322 筆，失敗集中在長文 heavy 路徑的 Phase N（腳註批次）：OpenRouter 240 秒逾時、腳註數量對不上、JSON 回成單一物件。這些是模型與通道的失敗，分散在兩個 backend、理由各異，不符合「同一篇跨三種以上模型敗在同一個理由」的閘門缺陷判準。〈勇鷹高教機〉ru 兩次被擋在 frontmatter，打開隔離樣本看是 description 裡真的留了「董事長」三個漢字，閘門判對了。

Z6 抽檢：過去 26 小時落地的 85 份譯文 `audit-quality.py` 85/85 healthy；以日期為種子抽 10 份看開頭、中段、結尾，10/10 正常，殘留漢字都在原樣保留的編輯藍圖 frontmatter 與書目區。

## 進度 delta 與 backend

起班（00:43）各語 stale 14–17、missing 2–3（missing 全是兩篇缺 slug 新文加〈勇鷹高教機〉vi／ru）。收官（01:09）ko／es／de missing 降到 1，en 與 vi 各 fresh +1，其餘持平；stale 總量幾乎沒動，因為 10-14 一天的 PR 合併讓各語新長出十來篇 stale，而這一班的主要產出是讓產線恢復四條線。前一個 run（74687，10-14 04:51 起）report 123 筆：macm4max 與 Haiku 的成功集中在 11:21 以前，之後只剩 nemo。新 run 由 dispatcher 繼續跑到 stale=0 或 cascade exhausted。cascade exhausted 名單：近三個 run 有 4 筆事件（ar〈台灣的公車系統〉、id〈國宅與居住正義〉等，都已有 Haiku 受限槽在接）。

## 收官 checklist

| 檢查項                       | 狀態                |
| ---------------------------- | ------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                  |
| Timestamp 精確               | ✅                  |
| Handoff 三態已審視           | ✅                  |
| CONSCIOUSNESS 反映最新狀態   | ⏭️ 本班不動         |
| 自我檢查工具 PASS            | 見下方 prose-health |

## Handoff 三態

繼承 `2026-10-14-060929-twmd-babel-nightly`：

- [x] ~~pending（席位：渦流班，`babel-dispatch.py`）一輪的結束被最慢的 worker 決定，退出的 worker 不會再補貨~~ — retired by 本班 `9397769e0`：停在場邊、每十分鐘回看。slug-map 本來就每輪重讀，不靠這條
- [ ] pending（席位 `twmd-babel-nightly` 下一班）〈勇鷹高教機〉vi、ru 仍是缺口（ru 第二次被擋是 description 留了「董事長」），重啟後 Haiku 槽重新取得資格，看有沒有接住
- [ ] pending（席位：渦流班，OBSERVER-QUEUE #63 已決）`name-authority.json` 還沒接進翻譯引擎的 Phase F／B 提示，原樣傳
- [ ] pending（席位：哲宇，OBSERVER-QUEUE #101 待決 🔒）換算錯量級存量約 3,600 處，原樣傳
- [ ] pending（席位：OBSERVER-QUEUE #84／#91 已決存量重譯）138 篇存量批次降級，原樣傳
- [ ] pending（席位 `twmd-maintainer-daily`，#67 已決提議列）hi〈颱風假〉人翻譯文 bump，原樣傳

本 session 新交接：

- [ ] pending（席位 `twmd-babel-nightly` 下一班）看 master.log 有沒有出現「⏸ 先停在場邊」與「▶️ 回場」，以及地端 gemma 在別人補貨後是否真的接到 stale；沒出現就代表新的停邊邏輯沒被走到

## Beat 5 — 反芻

三重巡檢的三項今晚粗看全過，病卻就在裡面。BABEL-VORTEX §三重巡檢寫的其實是「各 worker 近 45 分鐘的記錄數」，我一開始讀的是 report 尾巴有沒有新列，把逐 worker 的問題縮成了整體有沒有。一條線在產跟四條線在產，在「有沒有產出」這個問題上答案相同，只有照規格逐 worker 數才分得開。昨天的交接已經把這個缺陷描述得很準，只是把它寫成「新 slug、新程式碼要等輪次結束」，症狀落在部署延遲；今晚量到的是它的另一張臉：產能。同一個結構，兩班各自看見它咬到的那個位置。

🧬

---

_v1.0 | 2026-10-15_
_session twmd-babel-nightly — 修復後續跑_
_誕生原因：地端 worker 補貨撲空退場後，別人補進的貨它再也拿不到，十三小時只有一個慢速雲端 worker 在產_
_核心洞察：巡檢規格寫逐 worker，執行時容易縮成整體有沒有新列；同一個結構缺陷被兩班從部署延遲與產能兩個位置各看見一次_
