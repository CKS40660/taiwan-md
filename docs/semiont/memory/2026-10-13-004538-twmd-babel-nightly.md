# 2026-10-13-004538-twmd-babel-nightly — 續命班：十二語缺口連第二夜為零，佇列空著，把傳了兩班的「run 目錄沒人清」做掉

> session twmd-babel-nightly — cron 00:30 fire，Stage 0.5 判定「有 dispatcher 在跑、佇列空、正常閒置」→ 續命（不重啟、不另開一輪）
> Session span: 00:30 → 00:50 +0800（本班 2 個 commit：`0eca417fc` 加本檔）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261013-*/master.log`、`ps -o lstart`

## 觸發與甦醒

00:30 例行夜班。BECOME write mode：wake-context 1,347 行分頁讀到 `wake:END`，selftest 全綠，工作樹與 origin 同步（`d5471854c`）。groundtruth 兩盞黃燈都不在本席位：免疫 59（review_coverage）跟 terminology-trends 月班沉默死亡。

BECOME ACK：mode=write / 8 organ 最低＝免疫 59 / Q14 cross-session continuity=PASS（昨夜 babel 續命班交接三條、maintainer 修 404 雙重編碼、review-stock 排程仍待哲宇註冊）。

## Stage 0：算力 healthy，四層都在

`babel-preflight.py` 判 healthy 4/4：OpenRouter 7/7 把 key 都已儲值、本機 ollama gemma4:26b、fleet mac-m4max 一台、codex 0.145.0；入池門檻那行只剩 ℹ️（8.1B 的 e4b 裝著沒核發）。沒有缺席層。

`status.py`：十二語 fresh 1126，只有 hi 1125。差的那一篇是 hi〈颱風假〉，aminzai 的人翻譯文 metadata-stale，contributor_guard 照 OBSERVER-QUEUE #67（已決）只提議不 bump，交接已在維護班那邊，本班不動。

## Stage 0.5：三重巡檢加第四問，都過

存活：launchd `com.taiwanmd.babel.nightly` 持有 PID 30276（00:35 起），push-every 13250 從 10-10 活到現在。生產：近兩天 144 個 run 目錄、report.jsonl 合計 0 筆，master.log 全是 `💤 本 run 零派工`，印的 `Translation status @ d5471854c` 等於 origin HEAD，量的是現在。零產出這次是正確的零，佇列真的空了（REFLEXES #38 (g) 的雙義攤開：沒有東西送進來，不是路壞了）。第二訊號源：preflight 的 fleet 可達一台，跟 dispatcher 指令行的 macm4max 對得上。第四問：誰讓它活著是 launchd keepalive，PID 30276 起於 `d9caef9bb` 之後，載入的是新程式碼；兩天內沒有任何 `🔄 程式碼比磁碟舊`，因為 lang-sync 那兩天沒有再改。上一班交接「確認重生後的 dispatcher 在 `d9caef9bb` 之後起」收掉。

Stage D：`diary-translation-audit.py` 2,080 份 0 critical，zh 日記 416 篇五語各 416。

判定：續命班。

## 把傳了兩班的交接做掉：閒置 run 目錄

`/tmp/babel-unified-*` 已經堆到 939 個，758 個是空的。keepalive 在佇列空時每十分鐘開一個新 run、睡十分鐘、退出，一天約 72 個只裝著 master.log 的目錄。容量才 40MB，不急；但 preflight、weak-lanes、progress-snapshot、pulse 每次都 glob 全部，而且這條交接從 10-11 起被原樣傳了兩班（REFLEXES #15 第 16 次說的那種「一碰就做掉的 1-file 改動」）。

`babel-dispatch.py` 新增 `prune_idle_run_dirs()`，在建好本輪 run dir 後順手清（`0eca417fc`）。只清同時滿足這幾項的：report.jsonl 跟 freezes.jsonl 都是空的、沒有子目錄（tasks/ 是有派工的痕跡）、名字裡的 PID 已經不在、超過 48 小時、不是本輪自己。有任何一筆紀錄的 run 一律不動，算力自檢與弱適配表的實績住在那裡。測試 `tests/test_babel_dispatch_prune.py` 正反各有對照：空且死且舊的兩個被清，有 report、有 freezes、有 tasks、太新、PID 活著、本輪自己、名字不對的七個都留著；連同既有 topup／inherited 共 12 passed。

上線驗證沒有等下一夜：00:45:45 launchd 重生 PID 35111，master.log 第三行印 `清掉 360 個超過 48 小時、零紀錄的閒置 run dir`，939 → 580，有紀錄的 181 個一個不少。360 而不是 758，差的是 48 小時內的那些，之後每輪會陸續到期。

## 沒做的與為什麼

OBSERVER-QUEUE #101（換算錯量級存量約 3,600 處）仍在待決 🔒，推薦是委派波次逐篇外科修，屬品質閘門與存量處置，本班不代決。#91 的 138 篇存量批次降級原樣傳。工作樹那七個 babel 報表檔（`_translation-status.json`、`babel-live.json`、`fail-reasons.json` 等）是產線與 push-every 的寫入，不是本班的，沒有 stage。

## 進度 delta 與 backend

十二語 fresh 與昨夜完全相同（各 1126、hi 1125），本班零新譯文。backend 實績近兩天 0 筆（佇列空）。cascade exhausted：無新增。

## Handoff 三態

繼承 `2026-10-12-010413-twmd-babel-nightly`：

- [x] ~~pending（席位：渦流班）`/tmp/babel-unified-*` run 目錄無清理機制~~ — retired by 本班 `0eca417fc`，已在 PID 35111 上線清 360 個
- [x] ~~pending（席位本席下一班）確認 launchd 重生後的 dispatcher 在 `d9caef9bb` 之後起~~ — retired：PID 30276／35111 都在之後起，兩天無 `🔄` 因為 lang-sync 沒再改，等下一次改動才看得到輪間收工那條路徑真的走過
- [ ] pending（席位：哲宇，OBSERVER-QUEUE #101 待決 🔒）換算錯一個量級的存量約 3,600 處，原樣傳
- [ ] pending（席位：OBSERVER-QUEUE #84／#91 已決 存量重譯）138 篇存量批次降級，原樣傳
- [ ] pending（席位 `twmd-maintainer-daily`，#67 已決提議列）hi〈颱風假〉人翻譯文 bump 三個 sha，十二語最後一格非 fresh

本 session 新交接：

- [ ] pending（席位 `twmd-babel-nightly` 下一班，一件事）：`prune_idle_run_dirs` 的 48 小時窗到 10-15 前後會把 10-11、10-12 那兩百多個空目錄也收掉，`ls -d /tmp/babel-unified-2* | wc -l` 應該穩在「有紀錄的 run 數＋兩天份閒置」附近（約 180＋290）。數字一路往上長就是清理沒在跑。

## Beat 5 — 反芻

這條交接被傳了兩班，每一班都準確地寫著「無清理機制，原樣傳」。做掉它花了二十分鐘，大半是在寫那七個不該被清的反例。它難度很低，每一班醒來時卻都有更像正事的東西排在前面：閘門缺陷、數字錯、算力紅燈。今晚佇列空、算力全綠、上一班把大的都收了，這件小事才排到最前面。佇列空的夜晚，適合收小債。

🧬

---

_v1.0 | 2026-10-13 00:50 +0800_
_session twmd-babel-nightly — 續命班：產線健康閒置，收掉 run 目錄清理交接並當班驗證上線_
_LESSONS-INBOX 候選：無新增_
