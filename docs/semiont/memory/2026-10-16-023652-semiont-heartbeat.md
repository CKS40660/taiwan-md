# 2026-10-16-023652-semiont-heartbeat — 週額度 45%，本拍輕量，查到一條額度去向的線索

> session semiont-heartbeat，排程每日心跳（Full mode）
> Session span：02:36 起，約十分鐘
> 資料來源：`git log %ai`、wake-context selftest、`get_usage`、`budget-pace.py`

## 觸發與診斷

工作樹落後 51 個 commit，甦醒時先 `git pull --ff-only` 同步，同步後 selftest 全綠。wake 檔重新產生後完整讀到 `wake:END`。

額度：週額度 45%，上一拍（10-15 20:36）是 32%，六小時多了 13 點；本週只過了 18%。`budget-pace.py` 判 🟡 lean，照此速度約 37 小時後用完，比重置（10-21）早 100 小時。這台機器上一拍之後沒有任何班，帳本也沒有新花費，所以這 13 點來自別的班或別台機器。

上一拍留的問題是 6%→32% 的來源。這拍從 commit 的 worker 欄位找到一條線索：近五天標著 haiku1／haiku2／haiku3 的 babel 批次 commit 有 39 筆，集中在 10-11 早上、10-14 06 時、10-15 02 時與 10-16 01～02 時，每一波一次十幾筆。Haiku 是雲端 Claude 模型，吃的是同一個週額度；地端的 macm4max／nemo 不吃。佇列 #18 的拍板是 Tier 6 Haiku 每夜上限 10 篇，這幾波的篇數是否守住上限，本拍沒有逐筆核對，只記為線索，不下結論。

開放 PR 兩個（#1857、#1829）與 issue #1831／#1832 屬 maintainer 班與哲宇，lean 檔位不處理。`observer-queue-lint` 通過，十三列待決都有預設，沒有到期項。

## 做了什麼

- 同步工作樹，讀額度，記帳 start／end。
- 沒有扇出巡邏，沒有內容產出。

## Handoff 三態

繼承 `2026-10-16-010935-twmd-babel-nightly` 並更新：

- ⏳ blocked（哲宇）：`OBSERVER-QUEUE #103／#104／#105`。
- ⏳ blocked（哲宇在 app）：`twmd-review-stock` 排程註冊，下個時點 10-21。
- [ ] pending（`twmd-maintainer-daily`）：issue #1831 選舉專題併值定稿；PR #1857、#1829。
- [ ] pending（`twmd-terminology-trends-monthly`，11-05）：月報第一段註明 10 月缺口。
- [ ] pending（哲宇或 `/twmd-routine`）：三個孤兒工作樹處置。
- [ ] pending（`twmd-babel-nightly` 明晚）：核對 haiku 波次的篇數是否守住 Tier 6 每夜 10 篇上限（`git log --grep haiku`，按夜加總）；若超出，週額度 45% 的主因就在這裡，送佇列。另承接 babel 席位上一班的兩項（metadata-stale 存量確認、dispatcher 補貨自比）。
- ~~週額度 6%→32% 來源~~ retired by 本拍：來源未證實，線索轉給上一條。

本拍判 🟡 lean，下一拍若仍 ≥ 🟡，請哲宇看另一台機器的 session。

## Beat 5 — 反芻

沒有新觀點，不寫 diary。

🧬
