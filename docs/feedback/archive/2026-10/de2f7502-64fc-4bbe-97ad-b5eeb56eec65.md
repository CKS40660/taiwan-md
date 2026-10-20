---
feedback_id: 'de2f7502-64fc-4bbe-97ad-b5eeb56eec65'
created_at: '2026-10-14T08:13:33.658713+00:00'
contributor: 'Yuping Chen'
type: 'content'
status: 'filed'
page_kind: 'article'
article_slug: 'taiwan-environmental-movement-history'
lang: 'en'
source_url: 'https://taiwan.md/en/nature/taiwan-environmental-movement-history'
issue_url: 'https://github.com/frank890417/taiwan-md/issues/1851'
issue_number: 1851
---

# Feedback — content · A History of Environmental Movements in Taiwan

**回報者**：Yuping Chen
**時間**：2026-10-14T08:13:33.658713+00:00

**回報內容**
Taiwan Environmental Planning Association

**正確資訊 + 來源**
Taiwan Environment and Planning Association

**系統初判**
已收到你的勘誤，自動初判分類為「內容勘誤」，已轉維護者查核（人工會再看）。

**GitHub issue**：https://github.com/frank890417/taiwan-md/issues/1851

## 溝通紀錄

<!-- issue 留言由 twmd-feedback-triage 定期 sync 到這裡 -->

<!-- comment:frank890417-2026-10-15T01:00:21Z -->

**frank890417** · 2026-10-15 01:00

已修正，commit `635cbbeef`。謝謝 Yuping Chen 的回報 🙏

**查證結果**：你指的方向對，而官方名稱再往前一步。協會自己的網站（[tep.org.tw](https://tep.org.tw/)）寫的是 **Taiwan Environment & Planning Association**——用的是 `&` 不是 `and`，而我們原本寫錯的地方是把 `Environment` 寫成了 `Environmental`。協會成立於 2020 年，中文名「台灣環境規劃協會」本來就是對的，所以中文母稿不需要改。

**改動範圍比你看到的那一頁大**。沿著這個名字掃完十三個語言版本後：

- `en`、`de` — 直接寫了錯的英文名，已改
- `hi` — 把錯的英文名音譯成天城體，已改，並補上括號原名
- 其餘十個語言（es / fr / id / ja / ko / pt / ru / vi / ar）各自把名字譯成自己的語言（例如西文 `Asociación de Planificación Ambiental`、越南文 `Hiệp hội Quy hoạch Môi trường Đài Loan`）。那是翻譯，不是對官方英文名的主張，所以這一輪沒有動它們
- `zh-TW` 母稿 — 本來就正確

**改動摘要**：

- 3 個語言版本的 knowledge 檔，各 1 處組織名
- 兩道閘門都跑過（`--profile=ci-deploy` 與 `--profile=pre-commit`），hard=0

一句題外話：這次掃描是用 Python 逐檔比對做的，因為一開始用 grep 的正則撞到複雜度上限、對十三個語言全部回報「找不到」——那個「找不到」是工具壞掉，不是真的沒有。差一點就只改了你回報的那一頁。

🧬
