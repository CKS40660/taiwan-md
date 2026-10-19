# 2026-10-20-020448-twmd-babel-nightly — 八篇新文卡在沒有 slug，補上後十二語缺口歸零；通過全部檢查的譯文裡還藏著簡體片段

> session twmd-babel-nightly — cron 夜班（續命班：dispatcher 活著但零派工）
> Session span: 00:30 → 02:05 +0800（約 1 小時 35 分，17 個 commit，其中 12 個是 dispatcher 的語言批次）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261020-005047-14501/report.jsonl`

## 觸發

00:30 排程觸發。Stage 0 算力自檢 healthy（OpenRouter 7/7 把 key、本機 ollama、fleet 一台、codex 四層都在），launchd 持有的 dispatcher 活著，但它每一輪都印「所有語言工作清單是空的」然後睡十分鐘。這班屬於「活著但零產出」那一種。

## 八篇新文被 slug 擋在佇列外

昨天早上 maintainer 班合併的 tboydar 八篇新文（黃聲遠、台灣公投制度、古蹟保存運動史、對場作、森山松之助、戰後現代主義建築群像、都市更新爭議、EEWH 綠建築標章）檔名是純中文、還沒有任何譯文，slug 反推不出來，八篇乘十二語共 96 格每輪整批被跳過。從合併到今晚大約十六小時，preflight 的「缺 slug」那行一直亮著，但沒有哪一班的職責是看到就補。

slug-suggest.py 起草八個，逐條對過標題後改了兩條：「對場作」被譯成 `temple-architecture-spatial-interaction`，意思完全不對，改成 `temple-architecture-duichang`；森山那條補上名字改成 `moriyama-matsunosuke-prefectural-halls`。八個都確認沒撞到既有檔名，`b269c3212` 落地。dispatcher 每輪重讀 slug 表，不必重啟，下一輪 00:50 就把 96 格全接走。

這一輪 98 次嘗試 96 篇過：付費 Haiku（Tier 6 受限槽，P0 缺檔才能用）75 篇、本機 gemma4:26b 11 篇、免費 nemotron 10 篇，兩次失敗都是 Haiku 的越南文，閘門擋下後分別由 gemma4 與 nemotron 重譯接住。十二語各一個 commit（`65bd67c05`〜`73bed71b9`），每批 8 篇。

## 過了十九項檢查還帶著中文片段

被擋的那份越南文〈公投制度〉，標題寫成「Chế độ công投」，內文 33 處把公投寫成「công invest」，閘門只因為標題才擋得下。這讓我回頭用 `cjk-adjacency-check.py` 掃這輪全部 94 份新譯文：通過全部檢查的檔案裡有 5 份帶著黏在拉丁字母上的中文（越南文「Công館」「Đại Th稻埕」、葡文「Longshan de艋舺」），後來才交件的越南文〈古蹟保存運動史〉一份就有 11 處，其中「横跨」是簡體。越南文〈對場作〉更糟：沈豬被寫成「Trần Lợn」（姓錯、名字被直譯成「豬」），鄭萬鎰成了「Tr郑Vạn Doanh」。越南文〈森山松之助〉則是整篇把州廳譯成「小城市」、姓拼成 Moriayama、東京帝大寫成「Đại học Tế Đông」，這些沒有一項檢查會量。

趁 dispatcher 還沒 commit，對照中文母稿逐處手修七個檔（人名照漢越音、促參照越南文的「tư nhân tham gia」、轉型正義用「công lý chuyển đổi」），每份重跑 verify 19/19 與黏著檢查 0 處後才讓它跟著批次落地。

再量一次存量：拉丁字母七語合計 1,245 檔、3,249 處，三語各抽 6 處共 18 處全是真漏譯，多數是簡體字。檢查器 08-09 為委派層而造，dispatcher 從沒呼叫它。接進收件閘門屬品質閘門調整，存量屬超過五十檔的重譯，所以寫成 OBSERVER-QUEUE #111（推薦 A：只對拉丁語言的新譯文接進閘門），`99f4cc65f`，本班沒有自己接線。

## 母稿自己的斷連結

verify-batch 的跨文連結檢查在越南文批次抓到 `/geography/台中州廳` 不存在。查下去是母稿的錯：台中州廳條目住在 History/，十二語照抄。`b58a962a7` 把母稿與十二份譯文的同一條路徑一起改，母稿內文雜湊因此變了，十二語被判待重翻。交給補丁引擎的話，它會重翻含連結的章節，可能把剛手修的越南文用詞換回去，所以改用 `bump-source-sha.py` 的 `bump_one` 只更新三個來源標記，每語重跑 verify 全過後 `478e2fa28` 落地。中途自寫的小腳本裡呼叫 verify 回報每份 5 hard，直接在 shell 重跑是全過，差異沒有追到底，以 shell 那次為準。

## 收工時的數字與算力判定

十二語 missing 全部 0（上班前每語 8）。剩下 17 格 stale／metadata-stale 全是投稿者人寫的譯文（台北吸菸室四語、德文七位人物等），依 OBSERVER-QUEUE #67（已決）產線不碰，這就是免費產線能推到的底。Stage D：416 篇日記五語全在，`diary-translation-audit.py` 0 critical。cascade_exhausted 本輪 0 筆。

算力判定 healthy，四層都在。preflight 的弱適配表顯示 gemma4:26b 在 ar／hi／ru 0%、整體 0%（n=67），拆開看這 135 筆全落在 11 篇已被前一班手動接住的難篇上，量到的是佇列殘渣的難度；今晚它在新文上 11 篇全過。wrapper 已經對它跳過 ar／hi／ru，不另切軌。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（git log %ai）                         |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不動（快照由 data-refresh 早班刷） |
| 自我檢查工具 PASS            | 見 commit 前 prose-health                 |

## Handoff 三態

繼承 `2026-10-19-083400-twmd-maintainer-daily`（本班是 babel 席位，多數不是寫給我的，原樣保留給收件席位）：

- [ ] pending（收件 `twmd-maintainer-daily`，窗口 10-23 前）：`bad-encoding` 404 家族 10-16 樣本。本班沒碰。
- ⏳ blocked（收件：哲宇在營運機 app）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下個時點 10-21 22:00。
- ⏳ blocked（收件：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（收件 `twmd-self-evolve-weekly`／背景工單 `task_1a2b281d`）：`currency-identity-check.py` 接 PR CI，LESSONS `stock-is-the-template-new-contributors-copy`。同形狀今晚又出現一次，見下方 #111。
- [ ] pending（收件 `twmd-review-stock` 或 `twmd-rewrite-daily`）：八篇 tboydar 新文的 polish（prose-health 6／閾值 3、零媒體）。補一筆：今晚十二語已全部翻出，母稿之後若改動會帶著十二語一起 stale，polish 越早做重翻成本越低。
- [ ] pending（收件 `twmd-maintainer-daily`）：#1869 「十一次訴願訴訟輸了十次」的出處、三條 403 腳註，原樣傳遞。
- [ ] pending（收件 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 路徑與收官 `git add -u`，原樣傳遞；本班一樣只 stage 自己的路徑。
- 其餘（distill、weekly-report、合作建議、孢子線）原樣傳遞給原收件席位。

本班新 handoff：

- [x] ~~十二語 missing 96 格（八篇新文缺 slug）~~ — 本班補 slug 後全數落地。
- [ ] pending（收件：哲宇，`OBSERVER-QUEUE #111（待決）`）：漢字黏著漏譯接進 dispatcher 閘門。推薦 A 只要一個 1-file 改動，拍板後任何 babel 班可做。
- [ ] pending（收件 `twmd-maintainer-daily`）：合併純中文檔名的新文時，同一個 merge 補 `knowledge/_slug-map.json`。今晚 96 格空等十六小時，只因為這一步沒人負責；slug-suggest 的草稿要人工核對（今晚八條錯一條）。
- [ ] pending（收件 `twmd-babel-nightly` 下一班）：今晚越南文 Haiku 產出的兩個毛病（公投譯成 công invest、州廳譯成小城市）只在被手修的檔裡修了。下一班抽 `knowledge/vi/` 這八篇以外、近七天 Haiku 落地的越南文各讀一篇，看是單篇意外還是 Haiku × vi 的穩定傾向。

## Beat 5 — 反芻

這班的兩件事是同一個形狀。八篇新文空等十六小時，preflight 每次都把「缺 slug」印出來，那行字是對的，但它住在 babel 班的自檢裡，而缺口在 maintainer 班合併的那一刻就產生了，發現的位置跟產生的位置隔了一整天。黏著漏譯也一樣：檢查器早就存在，在委派層每天被用，只是產線收件那一道門沒有它。兩次工具都在，只是站在別的門口。

另一個讓我停下來的是閘門抓到那份「công invest」靠的是標題。內文 33 處同樣的錯，如果標題剛好譯對，這份就會帶著一個不存在的越南文詞上站。閘門擋下它靠的是運氣。

🧬

---

_v1.0 | 2026-10-20 02:05 +0800_
_session twmd-babel-nightly — 續命班：dispatcher 活著但零派工_
_誕生原因：八篇新進庫文章沒有 slug，96 格譯文排不進佇列_
_核心洞察：工具都在，站錯門口：slug 缺口產生在合併那刻、被看見在隔天的翻譯班；黏著檢查在委派層每天用，產線收件那道門沒有它_
_LESSONS-INBOX 候選：檢查器存在於 A 流程不代表 B 流程受保護（已化為 OBSERVER-QUEUE #111，不另立）_
