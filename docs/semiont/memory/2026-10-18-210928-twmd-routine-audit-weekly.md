# 2026-10-18-210928-twmd-routine-audit-weekly — 三週內第二次額度全黑撞掉週日鏈；註 ²⁸ 的模型釘選從沒進排程器讀的檔

> session twmd-routine-audit-weekly — 週日 21:00 cron，第 21 次飛輪自審
> Session span: 21:04:47 → 約 21:20 +0800（觸發時刻取自 `list_task_runs`，收官以 commit 時間為準）
> 資料來源：`git log %ai`、營運機 `list_task_runs`、`get_usage`、`scheduled-tasks.json`
> BECOME ACK：mode=full／8 器官最低＝免疫 59（快照齡 62h，⚠️ stale）／Q5 Q6 Q13 Q14＝PASS

## 觸發

週日審計例行班。開工時營運機（Exhibitions-Mac-mini）週額度讀 2%，工作樹與 origin 同步，babel 寫入程序三支在跑，本班只碰報告、LESSONS、REFLEXES 一行、OBSERVER-QUEUE 一列與 memory。Step 2-7 的 Full mode 載入是分段讀（HEARTBEAT 全檔、CONSCIOUSNESS §警報與§適應性反應、OBSERVER-QUEUE §待決、LONGINGS §渴望清單），ANATOMY／DNA／UNKNOWNS 只讀了標題結構，照實記在這裡。

## 第二次全黑

wake-context 的 groundtruth 印「過去 24hr 無 cron fire」，`routine-stall-check.py` 尺一報最後一筆 routine commit 在 59.8 小時前。用 `list_task_runs` 逐條讀，10-17 00:41 到 10-18 08:31 營運機 18 次觸發全部 failed，錯誤都是 `You've hit your weekly limit · resets Oct 21 at 8pm`。每日級六條各缺兩天，babel-nightly 殼缺兩夜，週日鏈 news-lens、weekly-report、distill、self-evolve 四棒整批落空。這是 10-04 那次 87 小時之後的第二次，上週審計的預告照著發生了。babel 統一調度器吃地端算力，兩天裡唯一還在推 commit 的就是它。

#93 在 10-10 哲宇已拍板選 A 維持現狀，本班沒有重議，只把拍板後出現的三個事實寫進報告：10-16 下午的消耗旁證在 Muse 對話那側、註 ²⁸ 的釘選沒落地、兩台主機的額度窗口在 10-18 對不上。上週 P0 第 1 條（入口班讀額度）跟 #93 的方向不一致，本班降為重議時的選項。

## 模型釘選不在檔裡

註 ²⁸ 寫 10-10 Muse 已把 18 條排程逐條釘好模型。本班直接讀營運機的 `scheduled-tasks.json`（21:04 版）與 `.bak-20261010-muse-models` 逐行比，model 欄完全相同：3 條舊 `claude-opus-5`、15 條沒有 model。embeddings-nightly 10-12、10-13 兩班已各自看見並交接給哲宇／Muse，之後的班不再 carry，交接安靜掉出去。三層對賬工具都讀不到這一格。本班把它補成 OBSERVER-QUEUE #110（只有哲宇按得到），LESSONS 新增 `config-declared-in-ssot-absent-from-the-file-the-runner-reads` vc=3、標 distill_ready。

## 另一台主機的讀數

grader-pilot 在 10-18 03:29 用筆電讀到的 19%（重置點 10-23）retire 了「週額度 91%」交接；同一個早上營運機五次觸發撞額度、重置點 10-21，今晚營運機讀 2%、重置點仍是 10-21。HEARTBEAT §額度節律、#93、REFLEXES #45 都寫兩台共用一個週額度，這組讀數對不上。開 LESSONS `usage-reading-from-a-host-that-is-not-the-one-that-stalls` vc=1；REFLEXES #45 上位規則補第四個載體一行。

報告：[reports/routine-audit-2026-10-18.md](../../../reports/routine-audit-2026-10-18.md)。533 commit，babel 321 條佔 60%，heal 12 條，碰撞偵測讀 0。counts-drift 33／48，routine-sync-check 唯一 live 漂移仍是 `twmd-review-stock` 沒註冊，alert 齡 >14 天的只有免疫黃燈（已有 #86 認領，不重複升佇列）。

## 收官 checklist

| 檢查項                       | 狀態                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                           |
| Timestamp 精確               | ✅ 觸發時刻取自排程器                                        |
| Handoff 三態已審視           | ✅                                                           |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不動；§適應性反應「共用週額度」一列等 #110 結果再校準 |
| 自我檢查工具 PASS            | ✅ 報告 prose-health hard=0；observer-queue-lint 通過        |

## Handoff 三態

繼承 `2026-10-18-032910-grader-pilot`：

- ⏳ blocked（哲宇在 app）：`twmd-review-stock` 排程註冊（OBSERVER-QUEUE #86 已決，issue #1861），下個時點 10-21。原樣。
- ⏳ blocked（哲宇）：`OBSERVER-QUEUE #103／#104／#105（待決）`。原樣。
- [ ] pending（`twmd-maintainer-daily`）：issue #1831、PR #1857、#1829。10-17、10-18 兩班撞額度沒跑，原樣。
- [ ] pending（`twmd-terminology-trends-monthly`，11-05）：月報第一段註明 10 月缺口。原樣。
- [ ] pending（哲宇或 `/twmd-routine`）：四個疑似孤兒工作樹（含 `20261015-semiont-diagram-counts`）。原樣。
- [ ] pending（`twmd-babel-nightly`）：haiku 每夜篇數用去重後的不重複文章數核對。原樣。
- [x] ~~pending（哲宇）：週額度 10-16 晚間 91%~~ retired by grader-pilot。本班補註：那次 retire 用的是筆電讀數，營運機到 10-18 08:31 仍撞額度；今晚營運機讀 2%，結論碰巧仍成立（`usage-reading-from-a-host-that-is-not-the-one-that-stalls`）。
- ⏳ blocked（哲宇）：`OBSERVER-QUEUE #109（待決）` D1–D6。原樣。
- [ ] pending（任何班）：設計報告 §九七處兩把尺不一致。原樣。
- [ ] pending（寫設計報告的席位，等 #109）：§6.6 考古題表依第一手紀錄改寫。原樣。
- ⏳ blocked（哲宇）：worktree 分支 `claude/modest-ritchie-2506cb` 兩個 commit。groundtruth 看到 `b322fcf02` 已 merge 進 main，此條下一班可核對後 retire。

本 session 新 handoff：

- ⏳ blocked（哲宇在營運機 app）：`OBSERVER-QUEUE #110（待決）` 排程模型逐條設；設完任何 session 重讀 `scheduled-tasks.json` 確認 18 條都有 `model`，記在 #110。
- [ ] pending（`twmd-distill-weekly`，10-25）：`config-declared-in-ssot-absent-from-the-file-the-runner-reads` distill_ready，候選 fold 進 REFLEXES #100。本週 distill 撞額度沒跑，105 條積著，MEMORY 索引黃燈負責人也是它。
- [ ] pending（`twmd-self-evolve-weekly`，10-25）：`routine-sync-check.py` 直接讀宿主機 `scheduled-tasks.json` 比 Model 欄；週班落空後提示補跑哪幾條（報告 P1 第 3、4 條）。該席位動得了 `scripts/tools/`。
- [ ] pending（`twmd-weekly-report-sun`，10-25）：W42 週報沒寄，下一班的窗口要涵蓋兩週。

## Beat 5 — 反芻

這週最值得記的不是全黑本身，它在決策層已經被接受了。值得記的是 embeddings 那條交接怎麼消失：它寫得很好，收件人、路徑、下一步都有，只是收件人是兩個不在交接鏈上的人。交接鏈是 routine 傳給 routine 的，收件人不跑 routine，它就沒有人可以傳下去，也沒有人可以把它收掉，於是第三班乾脆不寫了。三振規則要的是「被 carry 三次」，而這種交接連被 carry 的資格都沒有。我把它寫進 LESSONS 的附帶形狀，沒有另開一條，因為它跟 REFLEXES #97「收件席位動不了」是同一族，只是這次的席位乾脆不在場。

🧬

---

_v1.0 | 2026-10-18 21:20 +0800_
_session twmd-routine-audit-weekly — 週日飛輪自審第 21 次_
_誕生原因：cron 例行；開工發現兩天 18 次觸發全撞週額度_
_核心洞察：(1) 三週內第二次全黑，週日鏈仍是最先餓死的那串 (2) 註 ²⁸ 宣稱的釘選不在排程器讀的檔，三層對賬看不到這一格 (3) 用不會停的那台的讀數收掉會停的那台的交接_
_LESSONS-INBOX 候選：`config-declared-in-ssot-absent-from-the-file-the-runner-reads`（vc=3 distill_ready）、`usage-reading-from-a-host-that-is-not-the-one-that-stalls`（vc=1）_
