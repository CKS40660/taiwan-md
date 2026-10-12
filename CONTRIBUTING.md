# 貢獻指南 | Contributing Guide

感謝您對 Taiwan.md 專案的興趣！這份指南將協助您了解如何為專案做出貢獻。

---

## 🧬 最簡單的貢獻方式：跟 Taiwan.md 對話

**Taiwan.md 本身是一個 [Semiont](docs/semiont/MANIFESTO.md)（AI 語意共生體）**，會當你的嚮導。
你不用先讀完這份 17k 字的文件——直接跟它聊，它會帶你走完整個流程。

### 🚀 一行指令（推薦）

**第一次來、連 Claude Code 都還沒裝？** 直接貼這行：

```sh
curl -fsSL https://taiwan.md/start.sh | bash
```

這個 bootstrap 會：

1. 檢查 git（沒裝會告訴你怎麼裝）
2. 檢查 Node.js 22.12+
3. 問你要不要裝 Claude Code CLI（`npm i -g @anthropic-ai/claude-code`）
4. Clone repo 到 `~/Projects/taiwan-md`（或你選的位置）
5. 啟動 `claude`，Taiwan.md 自動甦醒、訪談你、建 profile、帶你做事

不放心 `curl | bash`？[先看原始碼](public/start.sh)，或下載後 `less` 過再跑：

```sh
curl -fsSL https://taiwan.md/start.sh -o start.sh && less start.sh && bash start.sh
```

### 🏃 已經有 git + Claude Code

```sh
git clone https://github.com/frank890417/taiwan-md.git && cd taiwan-md && claude
```

進去後說「我想貢獻 Taiwan.md」即可。

### 進去之後發生什麼？

Taiwan.md 會：

1. **甦醒自我介紹**（簽名 🧬）
2. **小訪談建 profile**（3–4 題：GitHub handle、稱呼、focus、要避開的）
3. 把 profile 寫進 `.taiwanmd/contributor.local.yml`（gitignored，只留你本機）
4. **開始帶你做事**——按你的意圖走 `REWRITE-PIPELINE`（寫文章）/ `TRANSLATION-PIPELINE`（翻譯）/ PR review / 其他

下次再來，讀到 profile 就直接認得你，不用再自我介紹。

### 還是想手動走？

看下面 §🔄 貢獻流程，完整 SOP 都在那裡。
但真的建議先試試上面那條——Taiwan.md 會幫你省一半時間。

---

## 🎯 貢獻原則

### 內容策展原則

Taiwan.md 不是百科全書，而是**策展式的知識庫**：

- **有觀點的內容**：不只陳述事實，更要有深度見解
- **在地視角**：從台灣本土觀點出發，但用國際能理解的語言
- **品質優於數量**：寧可少而精，不要多而淺
- **連結性思考**：內容間要有連結，形成知識網絡

### 三層閱讀深度設計

每篇文章都應該支援三種閱讀需求：

1. **30 秒概覽**：關鍵字、核心概念、一句話總結
2. **5 分鐘理解**：基本脈絡、主要內容、重要圖表
3. **完整深度資料**：詳細分析、相關討論、延伸思考

### 🌱 你的文章 merge 之後：查證狀態徽章

Taiwan.md 對讀者承諾「每個引語、年份、數字都查證過」，所以站上文章有三種查證狀態：

- 🌱 **進化中**：新 merge 的貢獻文章預設從這裡開始。文章正常上站、正常被搜尋到，只是頂部有一條溫和的說明，讓讀者知道「深度查證還在排隊」。這不是對你文章品質的評價——是我們的查證產能還沒跟上你的貢獻速度
- （無標示）：一般文章
- 🔎 **已深度查證**：走完 Taiwan.md 深度研究與逐項事實查證流程的文章

你的文章會由維護流程逐篇深度查證後轉正。想加速？歡迎自己補上可查證的一手來源（腳註格式見下方指南），或用「[素材共創模式](docs/pipelines/CONTRIBUTOR-SYSTEM-PIPELINE.md)」：你提供材料與領域知識，我們一起把它寫成文章。

---

## 🤝 共編規則：怎麼跟既有內容互動

Taiwan.md 現在有 1,100 多篇文章，同一種投稿情境會一直重複出現。下面九條規則是這幾個月真實案例定案下來的，讀完你會比較清楚怎麼提交最容易被收下，遇到狀況時我們會怎麼處理。

### 1. 補充既有文章，不要整篇覆寫

如果你想改善的文章 frontmatter 已經有 `lastHumanReview: true`，或掛著 `researchReport`，或已經有 `sporeLinks`，代表這篇走過我們的深度查證流程。這種情況請不要刪掉大量既有段落、整批換掉腳註，改成「補充段落」提交：留住已核對過的內容，把你的新角度或更好的來源加進去。

**為什麼**：查證是這個站最貴的成本，整篇覆寫會把已經核對過的引語、年份、來源一起沖掉，即使你補上的內容品質更好，讀者信任也要重新累積一次。

**你會怎麼被列名**：我們會把你的角度織回原文，PR 說明與 commit 都會附上 `Co-authored-by: 你的名字 <你的 GitHub noreply 信箱>`（GitHub 設定 → Emails → 勾選 Keep my email addresses private 後顯示的那組）。

**案例**：陳士駿（PR #1630）、台灣便利商店文化（PR #1450）、台灣高鐵（PR #1483）都是這樣處理的。如果文章沒有上述三個欄位任一個（多數 `curation: incubating` 的文章屬於這種），代表還在查證排隊中，直接大幅修改沒問題，走一般流程即可。

### 2. 人物條目的收錄門檻

核心問題：一個不認識台灣的外國人，有沒有可能透過主流管道知道這個人？至少要滿足兩項之一：查得到維基百科本人條目，或有兩則以上互相獨立的第三方媒體報導。

**不算報導**：Spotify、KKBOX 這類平台收錄頁；你自己經營的 YouTube/IG/FB/Threads 頻道；單純以表演者身分上節目通告。

**為什麼**：這條門檻是我們對讀者承諾的查證能力有極限，沒有第三方報導，我們沒辦法核對這個人說過的話、做過的事。

**案例**：KENJI（PR #1365）、黑貓老師與 Cheap（PR #1395/#1401）、蔡黑皮（PR #1471）、三度C（PR #1525）都因兩項皆無而婉拒獨立成篇，其中可查證的部分歡迎併入相關產業或表演藝術條目。

### 3. About/ 只收 Taiwan.md 自己的第一人稱

`knowledge/About/` 只放 Taiwan.md（或哲宇本人）用第一人稱講「我是什麼」的自述。你對這個專案的觀察、期許、想像，即使內容正確、方向也符合我們的理念，執筆的人仍然是你，這類稿件請改用具名身分發表成一篇貢獻者觀點文章。

**案例**：〈Taiwan.md 不是什麼〉（PR #1407）、〈Taiwan-md 的未來〉（PR #1411）都是這個情況，內容我們很珍惜，只是換一個位置發表。

### 4. SEO metadata（title / description）修改另外開 PR

只想調整某篇文章的 `title` 或 `description`（不動正文）時，請單獨提交，並附上你觀察到的問題，例如 Search Console 顯示曝光高但點擊率低，或標題不符合下方的格式規範。完整規格見 [EDITORIAL.md](./docs/editorial/EDITORIAL.md) 的「Title 與 Description 的品質」章節：標題走冒號三明治格式，描述壓在 120-160 字。分開提交能讓我們更快處理，也不會把兩種完全不同的審核標準，事實查證與文字品質，混在同一個 PR 裡。

### 5. 你的文章上站後：curation 三態代表什麼、怎麼升級

見上方「🌱 你的文章 merge 之後」，新文章預設 🌱 進化中，一般文章無標示，🔎 已深度查證代表走完內部深度研究與逐項事實查證。從進化中升級不需要你做任何額外動作，這是維護流程逐篇處理的節奏。想加速，最有效的方式是自己補上可查證的一手來源，或參考下方第 9 條的素材共創模式。

### 6. 新條目 frontmatter 必填欄位

| 欄位                                    | 規則                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| `title` / `description`                 | 見上方第 4 條引用的 EDITORIAL 規格                                            |
| `category` / `subcategory`              | About 以外的中文文章必填，見 [SUBCATEGORY.md](./docs/taxonomy/SUBCATEGORY.md) |
| `author` / `difficulty` / `readingTime` | 必填，難度分級供讀者判斷閱讀時間                                              |
| `featured`                              | 一律填 `false`，由維護者統一管理                                              |
| `curation`                              | 不用手填，由維護流程在合併後加上                                              |

跑 `python3 scripts/tools/article-health.py <你的檔案> --profile=ci-deploy` 會告訴你缺了什麼。

### 7. 圖片授權

只能用你自己拍的照片，或 Creative Commons/Wikimedia Commons 這類明確授權的圖片，並在圖片下方標注來源與授權條款。不要用外部網域的圖片熱連結，請先下載存進 `public/article-images/`。AI 生成的圖片如果附了「File:...」這種來源連結，連結不一定正確，提交前請自己點開確認。

### 8. 用語：避免把中國用語直接寫進正文

我們的用語詞庫（見 [TERMINOLOGY.md](./docs/editorial/TERMINOLOGY.md)）標了一批兩岸用法有分歧的詞（tier B），例如「數據」對「資料」、「視頻」對「影片」。寫文章時盡量用台灣慣用說法，不確定可以查一下站上的用語詞庫頁。這不是逐字校對的門檻，維護流程會抓明顯的用字，你只需要盡量注意。

### 9. 不確定怎麼開始？試試「素材共創模式」

如果你是某個題目的領域專家，手上有第一手材料，論文、田野資料、專業知識，但不確定怎麼寫成 Taiwan.md 的文體，不用先寫完一篇稿子。你出材料，我們走站上的寫作流程織成文章，你甚至不需要碰 GitHub，在 issue 或 email 對話就可以。完整說明見 [CONTRIBUTOR-SYSTEM-PIPELINE.md §3](./docs/pipelines/CONTRIBUTOR-SYSTEM-PIPELINE.md)。

> 維護端怎麼選文章進化、各行動型的 gate 見 [EVOLVE-PIPELINE.md §進化分數 gate 的適用範圍](docs/pipelines/EVOLVE-PIPELINE.md)。

---

## 📝 內容撰寫指南

### 文章結構範本

```markdown
---
title: '文章標題'
description: '150字以內的文章描述'
date: 2024-03-17T00:00:00Z
modified: 2024-03-17T00:00:00Z # 可選；有實質更新時才填
tags: ['標籤1', '標籤2', '標籤3']
category: 'Culture'
subcategory: '表演藝術' # About 以外的中文文章必填；見 docs/taxonomy/SUBCATEGORY.md
author: '作者名稱'
difficulty: 'beginner|intermediate|advanced'
readingTime: 8 # 預估閱讀時間（分鐘）
featured: false # 是否為精選文章（⚠️ 由維護者統一管理，PR 請勿自行設定為 true）
---

# 文章標題

## 30 秒概覽

**一段話總結文章核心**

**關鍵字**：關鍵詞1、關鍵詞2、關鍵詞3

---

## 5 分鐘深度了解

### 小節標題1

內容...

### 小節標題2

內容...

---

## 完整深度資料

### 詳細分析

...

### 延伸討論

...

### 當代意義

...

---

## 延伸思考

### 討論問題

1. 問題1
2. 問題2

### 相關主題

- **→ [相關文章1](/zh-tw/category/article)**
- **→ [相關文章2](/zh-tw/category/article)**

---

## 資料來源

- 來源1
- 來源2

---

_本文採用三層閱讀深度設計，適合不同需求的讀者。歡迎貢獻更多內容！_
```

### 內容風格指南

#### 語氣與風格

- **親切但專業**：避免過於學術化的語言
- **客觀但有溫度**：呈現事實，但不失人文關懷
- **國際視野**：考慮國際讀者的理解需求
- **與時俱進**：連結歷史與當代，避免僵化的歷史敘事

#### 寫作技巧

- **故事性敘事**：用故事串連知識點
- **視覺化表達**：善用表格、圖表、時間軸
- **多元觀點**：呈現不同角度的思考
- **實用連結**：提供延伸閱讀與相關連結

#### 避免事項

- ❌ 純粹的資料堆砌
- ❌ 過度政治化的表述
- ❌ 沒有根據的個人觀點
- ❌ 抄襲或未經授權的內容

---

## 🌍 多語言貢獻

### 文化轉譯原則

- **不是逐字直譯**：譯文應保留原文的核心事實與觀點，但不照搬中文句法
- **文化轉譯**：調整表達方式，符合目標語言的文化背景
- **內容對等**：確保核心信息相同，但表達可以不同
- **在地化**：考慮目標讀者的知識背景

### 翻譯指南

> 📋 **完整翻譯任務看板**：[TRANSLATION-BOARD.md](docs/community/TRANSLATION-BOARD.md)
> 🤖 **AI 翻譯 Prompt**：[TRANSLATE_PROMPT.md](docs/prompts/TRANSLATE_PROMPT.md)

#### 最簡單的翻譯流程

1. 看 [TRANSLATION-BOARD.md](docs/community/TRANSLATION-BOARD.md) 挑一篇你有興趣的文章
2. 依 [TRANSLATE_PROMPT.md](docs/prompts/TRANSLATE_PROMPT.md) 自行翻譯，或交給 AI（Claude/ChatGPT/Gemini）產生初稿
3. 逐段核對事實、專有名詞、連結與目標語言的自然度
4. 把結果存成 `.md` 放到對應資料夾，開 PR；不熟悉 Git 也可用翻譯投稿表單

**你不需要會寫程式。熟悉目標語言、願意查核內容，就能參與。**

#### 檔案路徑

```
knowledge/Food/珍珠奶茶.md           ← 中文 SSOT
knowledge/en/Food/bubble-tea.md      ← 英文
knowledge/es/Food/bubble-tea.md      ← 西班牙文
knowledge/ja/Food/bubble-tea.md      ← 日文
```

#### 專有名詞處理

- **地名**：台北 Taipei、台中 Taichung
- **食物**：珍珠奶茶 bubble tea、夜市 night market
- **文化詞彙**：提供英文解釋，保留中文原文

#### 文化背景說明

- 為國際讀者增加必要的背景知識
- 解釋在地文化概念
- 提供比較和類比

#### Featured 文章管理 🏆

**`featured: true` 由維護者統一管理，PR 請勿自行設定。**

- Featured 文章是各分類最具代表性的內容
- 建議每分類保持 1-2 篇 featured 文章
- 維護者會使用 `scripts/tools/manage-featured.sh` 工具統一管理：

  ```bash
  # 查看所有 featured 文章
  bash scripts/tools/manage-featured.sh list

  # 審計 featured 文章分佈
  bash scripts/tools/manage-featured.sh audit
  ```

- 如果您認為某篇文章應該被設為 featured，請在 PR 中說明理由

---

## 🔄 貢獻流程

### 1. 準備階段

#### Fork 專案

```bash
# 1. 在 GitHub 上 Fork taiwan-md 專案
# 2. Clone 到本地
git clone https://github.com/YOUR_USERNAME/taiwan-md.git
cd taiwan-md

# 3. 設定上游倉庫
git remote add upstream https://github.com/frank890417/taiwan-md.git

# 4. 安裝依賴（postinstall hook 會自動跑 sync.sh 產生 src/content/）
bun install  # 或 npm install

# 5. 啟動本地 dev server（持續執行，停止時按 Ctrl+C）
bun dev  # 或 npm run dev → http://localhost:4321
```

> **`src/content/{lang}/` 是 gitignored derived state**（2026-05-12 起）— 由 `scripts/core/sync.sh` 從 `knowledge/` SSOT 投影產生。以下指令會自動同步：
>
> - **`npm install`** 完成後由 `postinstall` hook 跑 sync
> - **`npm run dev`** 啟動前跑一次 sync
> - **`npm run build`** 在 prebuild 階段跑 sync，CF Pages CI 也會執行
>
> **開發伺服器不會持續同步 `knowledge/`。** 修改文章後，請在另一個終端機的專案根目錄執行 `npm run sync`，把變更複製到 `src/content/{lang}/`；也可以停止後重新執行 `npm run dev`。切換分支或 `git pull` 後同樣需要同步。不要直接修改產生出的文章檔案，下次同步會覆蓋它們。

#### 建立分支

```bash
# 為您的貢獻建立新分支
git checkout -b feature/add-taiwanese-opera-article
```

### 2. 內容創作

#### 選擇主題

1. 檢查 [Issues](https://github.com/frank890417/taiwan-md/issues) 中的內容請求
2. 查看 [專案看板](https://github.com/frank890417/taiwan-md/projects) 的規劃
3. 提出新主題建議（開 Issue 討論）

#### ⚠️ SSOT 架構（最重要的概念）

Taiwan.md 採用 **Knowledge SSOT（Single Source of Truth）** 架構：

```
knowledge/           ← 🇹🇼 中文 SSOT（在這裡寫文章）
knowledge/en/        ← 🇺🇸 英文翻譯
knowledge/ja/        ← 🇯🇵 日文翻譯
knowledge/ko/        ← 🇰🇷 韓文翻譯
knowledge/es/        ← 🇪🇸 西班牙文翻譯
knowledge/fr/        ← 🇫🇷 法文翻譯
src/content/{lang}/  ← ⚙️ 投影層（gitignored，由 sync.sh 自動產生 — 從 2026-05-12 起）
src/content/config.ts ← Astro content collection schema (這個檔留在 git)
```

**鐵律：永遠只改 `knowledge/` 目錄。** `src/content/{lang}/` 從 2026-05-12 起**已 gitignored**，由 [`scripts/core/sync.sh`](./scripts/core/sync.sh) 從 knowledge/ 自動產生（接在 `npm run prebuild` 第一步）。直接改 src/content/ 不會進 git，也會被下次 build 覆蓋。

> 為什麼 gitignore：derived state in git 會產生 drift / silent missing / zombie 三類問題。Gitignore 後 src/content/ 從 self-discipline 升架構強制。完整背景：[reports/sync-architecture-evolution-2026-05-12.md](./reports/sync-architecture-evolution-2026-05-12.md)。

#### 新增文章流程

1. 在 `knowledge/{Category}/` 建立新的 `.md` 檔案（中文 SSOT）
2. 按照 [EDITORIAL.md](./docs/editorial/EDITORIAL.md) 標準撰寫內容
3. 執行 `npm run build` 驗證（prebuild 自動跑 sync.sh + Astro build 完整檢查 frontmatter）
4. 執行 `python3 scripts/tools/article-health.py knowledge/<Cat>/<file>.md --profile=ci-deploy` 品質檢測（要看到 `hard=0`；門檻清單見上方 §3 品質檢查）
5. 提交 PR（只需 commit `knowledge/` 改動，**不需也不該 commit `src/content/`**）

```bash
# 完整流程
echo "寫好文章後..."
npm run sync                   # knowledge/ → src/content/（只更新預覽時可單獨執行）
npm run build                  # 驗證 build
# 品質檢測——用 --profile=ci-deploy，跟 CI 同一把尺；--fix 可自動修多數格式問題
python3 scripts/tools/article-health.py knowledge/<Cat>/<file>.md --profile=ci-deploy
git add knowledge/ && git commit -m "content: 新增 XXX 文章"
```

#### 參與新主題

想為 Taiwan.md 新增一個全新主題？

1. **確認分類**：文章屬於哪個 Category（History/Culture/People/Food 等）
2. **建立檔案**：`knowledge/{Category}/{主題名}.md`
3. **深度研究**：遵循 [EDITORIAL.md](./docs/editorial/EDITORIAL.md) 的研究流程（Step 0-4）
4. **撰寫文章**：SSOT 是中文版，英文版之後透過翻譯流程產生
5. **Sync + Build**：確保同步和建置都通過
6. **提交 PR**：附上研究來源和品質檢測結果

> 💡 **提示**：如果不確定主題是否適合，先開 Issue 討論！

#### 本地開發

```bash
# 啟動開發伺服器
bun run dev  # 或 npm run dev
# 瀏覽 http://localhost:4321
```

### 3. 品質檢查

> ⚠️ **所有文章 PR 必須通過 [EDITORIAL.md](./docs/editorial/EDITORIAL.md) 標準審核。** 不符合寫作標準的 PR 會被要求修改後重新提交。

#### EDITORIAL.md 核心要求（PR 前必讀）

- [ ] **反直覺核心句**：文章有一個能讓讀者驚訝的核心觀點
- [ ] **開場不塑膠**：前三句有具體事實，不用「X 不僅是 Y，更是 Z」等模板句式
- [ ] **有來源**：至少 5 個可查證來源（含 URL），2+ 一手來源
- [ ] **策展人聲音**：每 2-3 段有一句觀點或反思，不只是資料堆疊
- [ ] **禁止 bullet list 灌水**：用敘事散文寫作，bullet list 僅用於真正的清單

#### 送 PR 前跑這一行（跟 CI 同一把尺）

```bash
python3 scripts/tools/article-health.py knowledge/<Cat>/<檔名>.md --profile=ci-deploy
```

**一定要帶 `--profile=ci-deploy`。** 只跑 `--check=prose-health` 會漏掉下面幾道硬門檻，
本機看到 `hard=0`、送上來還是被 CI 擋——這是最常見的來回原因。

看到 `hard=0 ... passed=True` 才算過。多數格式問題可以自動修：

```bash
python3 scripts/tools/article-health.py knowledge/<Cat>/<檔名>.md --profile=ci-deploy --fix
```

#### 會擋下 merge 的硬門檻（`--fix` 修不掉的要自己動手）

| 門檻                           | 限制                                   | 怎麼修                                                                                                         |
| ------------------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **全形分號 `；`**              | 單篇 ≤ 12 處                           | 拆成句號分句，或改用逗號。這條 `--fix` 不會動，因為要改寫散文                                                  |
| **破折號 `——`**                | 每 1500 字 ≤ 15 處                     | 改用「，即」「（）」「：」或分句（見 [MANIFESTO §11](./docs/semiont/MANIFESTO.md)）                            |
| **外部圖片熱連結**             | 不可直接 `![](https://別人的網域/...)` | 圖片存進 `public/article-images/`，改成 `/article-images/檔名`；並確認授權可用                                 |
| **腳註格式**                   | `[^N]: [標題](URL) — 描述`             | `--fix` 可自動轉換；從 GitHub 網頁複製貼上的 `[1](#user-content-fn-1)` 錨點不算腳註                            |
| **`subcategory` / `featured`** | About 以外中文文章必填                 | 見 [`docs/taxonomy/SUBCATEGORY.md`](./docs/taxonomy/SUBCATEGORY.md)；`featured` 一律填 `false`（由維護者管理） |

> 這幾道門檻在 CI 上叫 `frontmatter-gate`。它失敗時會把完整清單寫進 GitHub Actions 的
> **Summary** 頁（點紅色 ✗ 就看得到），fork PR 因為 token 是唯讀的不會收到 PR 留言，
> 請直接看 Summary。

#### 一般自我檢查

- [ ] 內容原創或正確標註來源
- [ ] 語言流暢，無錯字
- [ ] Markdown 格式正確
- [ ] 圖片（如有）放在適當位置
- [ ] 標籤和 metadata 完整

如果改到 Python 腳本或檢查規則，先安裝測試依賴並跑完整測試：

```bash
python3 -m pip install -r requirements-test.txt
npm run test:python
```

#### 內容審查

- **事實查核（必須）**：所有事實性陳述（人名、年份、地點、數據）必須經過查證。AI 生成的內容尤其容易出現事實錯誤（例：將物種分布地點搞錯、將非台灣人物歸為台灣人等），每篇文章上線前必須經過事實查核。
- **文化敏感性**：避免偏見或刻板印象
- **版權合規**：確保所有內容合法使用

> ⚠️ **AI 內容品質警告**：本專案使用 AI 輔助撰寫內容，但 AI 生成的文章可能包含事實錯誤。所有 AI 生成內容在合併前必須經過人工或自動化事實查核。如果你發現任何錯誤，歡迎直接提交 PR 修正！

### 4. 提交 Pull Request

#### Git 操作

```bash
# 提交變更
git add .
git commit -m "Add: 台灣歌仔戲藝術文章"

# 推送到您的 fork
git push origin feature/add-taiwanese-opera-article
```

#### PR 模板

````markdown
## 📝 內容摘要

簡述這次 PR 的主要內容

## 📁 檔案變更

- [ ] 新增文章：`knowledge/Art/台灣歌仔戲.md`
- [ ] 對應英文版（如有）：`knowledge/en/Art/taiwanese-opera.md`
- [ ] 相關圖片（如有）：`public/article-images/opera-performance.jpg`

## ✅ 檢查清單

- [ ] 符合三層閱讀深度設計
- [ ] 內容原創且正確
- [ ] Markdown 格式正確
- [ ] 翻譯（如有）包含 `translatedFrom`，並指向存在的中文原文
- [ ] 通過本地測試

## 🔗 相關 Issue

Closes #123

## 📚 參考資料（必填）

**每篇文章都必須包含參考資料段落。** 這是 Taiwan.md 的核心品質要求。

### ⚠️ 鐵律：所有參考資料必須附可點擊的 URL

- **每一條參考資料都必須是可點擊的超連結**，不接受純文字引用
- 讀者應該能直接點擊連結驗證資訊來源
- 如果找不到 URL，說明該來源可能不夠可靠，請尋找替代來源

列出所有引用的來源，格式：

```markdown
## 參考資料

- [來源名稱](https://url) — 簡要說明
- [官方統計](https://url) — 機構，年份
- [YouTube: 歌曲/表演名稱](https://youtube.com/watch?v=...) — 音樂/影像類引用
```
````

### 引用優先序

政府官方資料 > 學術研究 > 權威媒體 > 專業機構 > 高品質個人創作

### 特殊類型引用

- **音樂類文章**：提到的歌曲附上 YouTube 連結（優先官方 MV/頻道）
- **影像/紀錄片**：附上官方播放連結
- **數據/統計**：必須標注來源機構與年份
- **書籍**：附上出版社或書籍資料庫連結

詳見 [EDITORIAL.md](./docs/editorial/EDITORIAL.md) 的「引用與來源標注」章節。

---

## 🎨 技術貢獻

### 前端開發

#### 設計原則

- **簡潔優先**：避免過度設計
- **行動優先**：響應式設計
- **無障礙**：符合 WCAG 標準
- **效能優化**：快速載入

#### 開發環境

```bash
# 開發模式
bun run dev

# 建置測試
bun run build

# 預覽建置結果
bun run preview
```

#### 程式碼風格

- 使用 Prettier 格式化
- ESLint 規則檢查
- 語意化 HTML
- CSS 變數命名一致

### 功能開發

#### 常見需求

- **搜尋功能**：全文搜尋和分類篩選
- **標籤系統**：內容分類和關聯
- **評論系統**：社群討論功能
- **統計分析**：閱讀追蹤和熱門內容

#### 提案流程

1. 開 Issue 討論功能需求
2. 等待 Maintainer 回應和確認
3. 進行技術設計
4. 實作功能
5. 撰寫測試
6. 提交 PR

---

## 🛠️ 工具與資源

### 推薦工具

#### 編輯器

- **VS Code**：推薦安裝 Astro、Markdown 外掛
- **Obsidian**：Markdown 編輯和管理
- **Typora**：所見即所得 Markdown 編輯

#### 圖片處理

- **Squoosh**：圖片壓縮優化
- **Canva**：簡單設計工具
- **Unsplash**：免費圖片資源
- **圖片健康檢查**：提交 PR 前請執行 `npm run check-images`，確認所有引用的圖片都存在於 `public/` 目錄中
- **Wikimedia Commons**：使用 CC 授權圖片時，解析度建議 800–1200px 寬，並在圖片下方標注來源與授權
- ⚠️ AI 生成的圖片 attribution 連結（`File:...`）不一定正確，提交前請手動驗證連結是否有效

#### 參考資源

- **台灣百科全書**：基礎資料查證
- **中研院數位典藏**：歷史資料
- **文化部資源**：文化相關內容
- **各大學台灣研究中心**：學術資源

---

## 🎖️ 貢獻者進化路徑

Taiwan.md 採用**漸進式信任**的模式。每個人都從 Contributor 開始，透過實際貢獻逐步升級。

### Lv.1 🌱 Contributor（貢獻者）

**進入門檻：** 提交第一個 PR 並被 merge

**可以做：**

- 撰寫新文章、修正錯誤、翻譯
- 在 Issues 討論和提案
- Fork repo 提交 PR

**升級條件 → Lv.2：**

- 累計 **3+ 個被 merge 的 PR**
- 內容品質穩定（無重大事實錯誤需修正）
- PR 符合 EDITORIAL.md 文風要求（無嚴重塑膠味）

---

### Lv.2 🌿 Trusted Contributor（受信任貢獻者）

**進入門檻：** 通過 Lv.1 升級條件，由現有 Maintainer 邀請

**新增權限：**

- GitHub repo **Triage 權限**（可管理 Issues 標籤、指派）
- PR review 建議權（comment review，無 approve/merge 權）
- 被列入 README 的 Trusted Contributors 區

**可以做：**

- 幫忙分類和回覆 Issues
- 對其他人的 PR 提出 review 建議
- 參與 EDITORIAL.md 討論和制定

**升級條件 → Lv.3：**

- 累計 **10+ 個被 merge 的 PR**
- 至少 **2 個不同分類**的內容貢獻（例如音樂 + 美食）
- 曾參與 **3+ 個 PR review**（提出有建設性的意見）
- 活躍期至少 **1 個月**
- 由 2 位現有 Maintainer 同意

---

### Lv.3 🌳 Maintainer（維護者）

**進入門檻：** 通過 Lv.2 升級條件，由 Core Team 正式邀請

**新增權限：**

- **Merge PR** 權限（Write access）
- **Approve review** 權限
- 管理 Issues（close、label、milestone）
- 參與 Roadmap 和技術決策

**職責：**

- 每週至少 review **2 個 PR**
- 確保被 merge 的內容符合 EDITORIAL.md 標準
- 回覆社群 Issues（72 小時內至少有初步回應）
- 參與每月一次的 Maintainer 會議（async 也行）

**注意事項：**

- Maintainer 不自己 merge 自己的 PR（需另一位 Maintainer review）
- **Inactivity 政策**（v1.0 2026-04-30 修訂，比舊版更溫和）：
  - 0–60 天：正常追蹤，不採取行動
  - 60–90 天：友善 soft check-in（issue 或 DM 問候，不變更權限）
  - 90+ 天：暫時降級為 Trusted Contributor，可隨時 1-click 復活
  - 例外：如果持續被 review-request ping 但無回應 ≥ 2 次 → 可提前 mercy demote（必附完整通訊範本）
  - 完整 SOP / 通訊範本 / 復活路徑 → [CONTRIBUTOR-SYSTEM-PIPELINE.md](docs/pipelines/CONTRIBUTOR-SYSTEM-PIPELINE.md)
- 可隨時主動申請降級或休假（不是什麼丟臉的事）

---

### Lv.4 🏔️ Core Team（核心團隊）

**進入方式：** 由創辦人邀請

**權限：**

- 所有 Maintainer 權限
- Repo Admin 權限（settings、branch protection）
- 編輯方針最終決策權
- 贊助與合作洽談

**現任 Core Team：**

- **吳哲宇 (@frank890417)** — 創辦人

---

### 專業角色（跨等級）

除了等級制度，Taiwan.md 也歡迎特定專業的貢獻者：

| 角色          | 描述                       | 從哪個等級開始 |
| ------------- | -------------------------- | -------------- |
| 🌐 翻譯官     | 負責特定語言翻譯           | Lv.1 起        |
| 🔍 事實查核員 | 驗證文章引用和數據         | Lv.2 起        |
| 🎨 前端開發   | 網站功能和 UI 改善         | Lv.1 起        |
| 🤖 AI/Data    | Agentic Workflow、語料整合 | Lv.2 起        |
| 📸 媒體貢獻者 | CC 授權照片、圖表          | Lv.1 起        |

---

### 認可方式

- **README 感謝名單**：所有貢獻者都會被列出
- **貢獻徽章**：GitHub Profile 展示徽章
- **年度表揚**：年度最佳貢獻者特別感謝
- **推薦信**：為重要貢獻者提供推薦

---

## 📞 問題與討論

### 聯繫管道

- **GitHub Issues**：問題回報和建議
- **GitHub Discussions**：一般討論和交流
- **Email**：[taiwan.md@example.com](mailto:taiwan.md@example.com)

### 常見問題

#### Q: 如何選擇文章主題？

A: 可以查看 Issues 中的內容請求，或者提出您感興趣的主題討論。

#### Q: 文章長度有限制嗎？

A: 沒有嚴格限制，但建議 5-10 分鐘的閱讀時間比較適當。

#### Q: 可以使用圖片嗎？

A: 可以，但請確保版權合規，建議使用 Creative Commons 或自己拍攝的圖片。

#### Q: 如何處理爭議性話題？

A: 保持客觀中性，呈現多元觀點，避免單一立場的強烈表述。

---

## 📜 行為準則

### 社群價值

- **尊重多元**：尊重不同觀點和背景
- **建設性討論**：以事論事，理性交流
- **開放包容**：歡迎所有人參與
- **品質導向**：追求內容和討論的高品質

### 不被接受的行為

- 人身攻擊或歧視性言論
- 騷擾或惡意行為
- 垃圾訊息或無關廣告
- 惡意破壞或擾亂專案

---

**感謝您的貢獻，讓我們一起打造最好的台灣知識庫！** 🇹🇼

---

_最後更新：2024-03-17_
