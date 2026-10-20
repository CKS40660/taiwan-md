# 2026-10-19-005518-twmd-babel-nightly — 續命班：接住兩篇印地文長文，量到產線剩下的全是人翻的檔

> session twmd-babel-nightly — cron 排程（00:30 觸發）
> Session span: 約 00:30 → 00:56 +0800（約 26 分鐘，1 個 commit `0323f58d4` ＋ push-every 合併 `c203b55f4`）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261018-232006-92134/report.jsonl`、`babel-preflight.py`

## 觸發

每晚的巴別塔班。依殼的 Stage 0.5，這班先確認 launchd 持有的 dispatcher 還在不在產、再接它接不住的部分。BECOME ack：mode=write／器官最低＝免疫 59（快照齡 66 小時，讀的是舊鏡子）／Q14 PASS。

## 算力與產線狀態

`babel-preflight.py` 判 healthy，四層都在：OpenRouter 七把 key、本機 ollama（gemma4:26b）、fleet 一台 mac-m4max、codex。入池門檻那行照舊提示名單外的 8.1B 還裝在本機但沒被核發。弱適配表裡 gemma4:26b 在 ar／de／es／hi／id／ru 六語近兩日通過率 0–6%。

dispatcher（PID 92134，10-18 23:20 由 keepalive 重生）活著，report 近 45 分鐘有一筆記錄，但開跑以來四筆全部失敗。所以這班是**續命**，沒有重啟、沒有另開一輪。十二語 status：en／vi／ar／ru 全 fresh，其餘每語只剩 1 到 8 格。

把剩下的 19 格逐一對 report 與 `human-translation-stale.tsv` 拆開後，形狀很清楚：16 格是投稿者人翻的譯文（台北吸菸室四語、de 七篇人物、id 三篇、pt 滷肉飯、hi 颱風假、de 藍鵲），依 OBSERVER-QUEUE #67（已決）產線刻意不覆蓋，這是政策不是故障。機器範圍內真正卡住的只有兩篇印地文：〈台灣少子化危機〉試了 34 次、〈跨黨派的好政策〉試了 28 次，兩篇都已記成 cascade-exhausted。

## 兩篇印地文長文

兩篇都是 44KB／73 腳註與 57KB／57 腳註，正好落在 SQUEEZE §第五層說的「免費池對這種篇幅是負產能」。失敗理由幾乎全是 `magnitude[N]`，跨 gemma4 與 nemotron 兩種模型。先驗尺：把隔離樣本餵 `numeral-magnitude-check.py`，報的九處全是真錯，模型把「萬／億」原樣接上 लाख／अरब，8,824.9 億寫成 8,824.9 अरब，差十倍。閘門是對的，這次不是閘門缺陷。

隔離樣本除了量級以外五道閘全過，於是在獨立 worktree（`.worktrees/20261019-babel-hi-heal`，避開 dispatcher 正在寫的同一個檔）逐處對照中文改正九個數字。腳註 50、53 本來就寫對（882.49 बिलियन、450 बिलियन），改完正文跟腳註第一次一致。

人眼抽讀時在少子化那篇撞見閘門看不到的東西：第 61 到 73 條腳註整段留在中文，第 61 條還融合成「पाल犬貓」。書目區豁免（OBSERVER-QUEUE #23，已決）放行的是正體來源標題，這裡連描述散文都沒翻，照樣過了。依中文原文補成印地文，勵馨基金會正文寫成拼音「Lixin Foundation」，改用官方英文名 Garden of Hope Foundation。補譯時我自己在第 65 條順手寫進一句「與婦女新知相關」，原文沒有，當場刪掉。改完六道閘、換算檢查、漢字黏著檢查全綠；commit 後再對落地檔重跑一次閘門（REFLEXES #100），scope 2 檔。`0323f58d4` 推上 origin，再用 `babel-push-every.py --sync` 在共用鎖底下把它合進主工作樹，讓 dispatcher 不再對這兩篇燒下一輪。合併前那班 gemma4 又跑了 816 秒、敗在 `magnitude[4]` 並還原，沒有撞檔。

## 存量量測：腳註描述整段沒翻

順著少子化那篇的形狀掃全庫（ja 排除，日文本來就用漢字）：腳註「—」之後的描述含 12 字以上漢字的，11 語 306 檔、1,508 條。抽兩篇看是兩種東西混在一起：en 那類多半是簡短的中文出處描述，接近 #23 允許的範圍；ko〈宏碁〉則是整個 56 條腳註區連同圖片出處都是簡體中文，現行 `cjk-leak-check` 會擋（書目區簡體殘留），屬於閘門上線前的舊存量，status 仍標 fresh。

這屬於 OBSERVER-QUEUE #52（已決）的同一族，決定是「存量隨重譯清」。但十二語 stale 近零時沒有重譯會發生，這條決定靠自己清不掉任何一筆，跟 v1.98 對 #56 的觀察同形。批次降級三百多檔超出本班邊界，記進交接不動手。

中途我一度把 ko〈宏碁〉量成「正文 100% 是中文」並據此判 `target-language-check.py` 有大洞。重量才發現第一次切檔切到檔尾 `---` 之後的出處區，正文其實是韓文（5,770 個諺文）。全庫重掃也確認沒有任何譯文正文以中文為主。那支檢查器確實沒把中文列進候選語言，整篇未翻的拉丁語系檔會被判「太短不判」，但產線另有 cjk-leak 守著，這個盲點目前只是理論上的。

## 交接項核對與 Stage D

上一班指名本席位的「haiku 每夜篇數用去重後的不重複文章數核對」：10-13／14／15 三夜分別 64／36／55 篇不重複 .md，10-16 起為零，都在 `--tier6-nightly-cap 100` 之內。Stage D 日記五語各 416／416，`diary-translation-audit.py` 0 critical、900 warning-only。

## 收官 checklist

| 檢查項                       | 狀態                                                    |
| ---------------------------- | ------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                      |
| Timestamp 精確               | ⚠️ 起點取排程時刻約 00:30，wake-context 檔 mtime 被覆寫 |
| Handoff 三態已審視           | ✅                                                      |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班未動（快照齡 66h 屬 data-refresh 席位）          |
| 自我檢查工具 PASS            | 見 commit 前 prose-health                               |

## Handoff 三態

繼承 `2026-10-18-210928-twmd-routine-audit-weekly`：

- [x] ~~pending（`twmd-babel-nightly`）：haiku 每夜篇數用去重後的不重複文章數核對~~ retired by 本班：64／36／55／0，皆低於上限 100。
- ⏳ blocked（哲宇在 app）：`twmd-review-stock` 排程註冊（OBSERVER-QUEUE #86 已決，issue #1861），下個時點 10-21。原樣。
- ⏳ blocked（哲宇）：OBSERVER-QUEUE #103／#104／#105（待決）。原樣。
- [ ] pending（`twmd-maintainer-daily`）：issue #1831、PR #1857、#1829。原樣。
- [ ] pending（`twmd-terminology-trends-monthly`，11-05）：月報第一段註明 10 月缺口。原樣。
- [ ] pending（哲宇或 `/twmd-routine`）：四個疑似孤兒工作樹。原樣。本班自建的 `20261019-babel-hi-heal` 已由 ship 自毀，不在其中。
- ⏳ blocked（哲宇）：OBSERVER-QUEUE #109（待決）D1–D6。原樣。
- [ ] pending（任何班）：設計報告 §九七處兩把尺不一致。原樣。
- [ ] pending（寫設計報告的席位，等 #109）：§6.6 考古題表依第一手紀錄改寫。原樣。
- ⏳ blocked（哲宇）：worktree 分支 `claude/modest-ritchie-2506cb`，`b322fcf02` 已在 main，可核對後 retire。原樣。
- ⏳ blocked（哲宇在營運機 app）：OBSERVER-QUEUE #110（待決）排程模型逐條設。原樣。
- [ ] pending（`twmd-distill-weekly`，10-25）：`config-declared-in-ssot-absent-from-the-file-the-runner-reads`。原樣。
- [ ] pending（`twmd-self-evolve-weekly`，10-25）：`routine-sync-check.py` 比 Model 欄。原樣。
- [ ] pending（`twmd-weekly-report-sun`，10-25）：W42 週報窗口涵蓋兩週。原樣。

本 session 新 handoff：

- [x] ~~hi〈台灣少子化危機〉〈跨黨派的好政策〉cascade-exhausted~~ 本班手動接住，`0323f58d4`。
- [ ] pending（`twmd-maintainer-daily`，動得了 `knowledge/`）：`reports/babel/human-translation-stale.tsv` 列的 16 格人翻譯文 stale（OBSERVER-QUEUE #67 已決 B），產線依政策不碰，要請投稿者更新或由維護班改。這是十二語剩下的全部缺口。
- ⏳ blocked（哲宇）：腳註描述整段未翻的存量 306 檔／1,508 條，屬 OBSERVER-QUEUE #52（已決「隨重譯清」）。stale≈0 時這條路徑不會發生；要不要另開批次降級或專清腳註區，需要一個新決定。量測腳本在本檔正文描述，可重跑。
- [ ] pending（`twmd-self-evolve-weekly`）：`target-language-check.py` 的候選語言沒有 zh，整篇未翻的拉丁語系檔會落進 `skip-too-short`。產線有 cjk-leak 補位，屬低優先；該席位動得了 `scripts/tools/lang-sync/`。

## Beat 5 — 反芻

這班最該記住的是兩次「尺先驗再用」都要走完：第一次驗量級閘門，結論是閘門對、模型錯，於是修譯文不修閘門；第二次是我自己的量測切錯了檔，差點把一個不存在的大洞寫進交接。兩次用的是同一個動作，回到原檔重量一次，結果一次保住了閘門，一次保住了交接。

另一件事是補譯腳註時，我在一條註腳裡加了一個原文沒有的機構關聯，順手得自己都沒察覺，是重讀那一行才看見。逐句翻的時候，模型的「補充背景」反射跟我是同一個。這次抓得到是因為改完逐條對回中文，下次也只能靠這個。

🧬

---

_v1.0 | 2026-10-19 00:56 +0800_
_session twmd-babel-nightly — 每晚巴別塔班，續命型_
_誕生原因：dispatcher 活著但開跑後四筆全敗，剩餘缺口拆開後只有兩篇是機器範圍_
_核心洞察：(1) 十二語剩下的缺口全是人翻譯文，產線依 #67 不碰 (2) 量級閘門擋對了，錯在模型，手動對照中文接住 (3) #52「隨重譯清」在 stale≈0 時不會發生_
_LESSONS-INBOX 候選：存量決定綁在「隨重譯清」時，要附上重譯量歸零後的備案_
