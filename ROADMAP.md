# ROADMAP & TODO

> 最後更新：2026-03-15

---

## 🔴 P0 — 必須先完成（上線前）

- [x] ~~校對 projects.json 內容~~ ✅ 已完成
  - 移除 9 個非展示專案（C5、Ed、SmartG、Sort_Photos、TriageHR.old、Working、Release、Tools、EXCEL、MyAddrBookPlus V2）
  - 新增 Icon Generator 專案
  - 最終保留 18 個專案，分為 7 類
  - 加入 9 個專案的版本號
  - 修正 Bridgify Mobile 技術棧（React Native → Flutter/Dart）

- [ ] ~~設定 Firebase 專案~~ （改用 GitHub Pages 部署，此項不再需要）

- [x] ~~執行 `npm install` 並驗證本地開發~~ ✅ 已完成

---

## 🟡 P1 — 上線後優先改善

- [ ] **加入專案截圖**
  - 為主要專案（至少 SmartGantt、StoreMate）擷取截圖
  - 放入 `public/screenshots/`
  - 更新 `projects.json` 的 `screenshot` 欄位
  - 建議尺寸：1200×675（16:9）

- [ ] **補充專案連結**
  - 為已部署的專案加入 Demo 連結（`links.demo`）
  - 為有 GitHub repo 的專案加入連結（`links.github`）

- [x] ~~RWD 響應式優化~~ ✅ 已完成
  - 桌面版加大所有元素尺寸（卡片、字體、間距）
  - 新增 `@media (max-width: 768px)` 行動裝置斷點
  - Hero、FilterBar、ProjectCard、Footer 皆有 mobile 樣式
  - Grid 改為 `minmax(400px, 1fr)`，mobile 下單欄

- [ ] **SEO 基礎設定**
  - 加入 Open Graph meta tags（og:title, og:description, og:image）
  - 加入 favicon（目前用 emoji SVG 暫代）
  - 確認 `<title>` 和 `<meta description>` 內容

---

## 🟢 P2 — 功能增強

- [ ] **搜尋功能**
  - 在 FilterBar 旁加入搜尋框
  - 搜尋範圍：name、tagline、description、tech
  - 即時過濾卡片

- [ ] **專案詳情頁**
  - 目前是展開式卡片，可考慮改為獨立路由頁面
  - 加入 React Router
  - 每個專案有完整頁面，包含多張截圖、完整說明、技術架構圖

- [ ] **深色/淺色主題切換**
  - 目前只有深色主題
  - 加入 toggle 按鈕
  - 利用 CSS 變數切換 `:root` 值

- [ ] **技術標籤篩選**
  - 除了分類篩選，加入依技術標籤過濾
  - 例如：點擊「React」標籤 → 顯示所有使用 React 的專案

- [ ] **排序功能**
  - 依名稱排序（A-Z）
  - 依狀態排序（active → draft → archived）
  - 依分類分組顯示

- [ ] **動態載入 projects.json**
  - 目前是 build-time import，改為 runtime fetch
  - 好處：改 JSON 不用重新 build，適合搭配 CMS

---

## 🔵 P3 — 進階功能（未來）

- [ ] **i18n 多語系支援**
  - 繁體中文 / English 切換
  - 可用 `projects.zh.json` + `projects.en.json` 分開管理

- [ ] **專案統計儀表板**
  - 自動掃描 `C:\My Source` 各專案的 `package.json`
  - 顯示：總程式行數、commit 數量、最後更新日期
  - 可搭配 GitHub API

- [ ] **自動截圖產生**
  - 用 Playwright/Puppeteer 自動開啟各專案的 dev server
  - 截取首頁畫面存入 `public/screenshots/`

- [x] ~~部署 CI/CD~~ ✅ 已完成
  - GitHub Actions：push 到 master 自動 build + deploy 到 GitHub Pages
  - Workflow: `.github/workflows/deploy.yml`
  - 網址：https://miumiubaby-hub.github.io/portfolio-site/

- [ ] **Analytics 追蹤**
  - 加入 Google Analytics 或 Plausible
  - 追蹤哪些專案最多人點擊

- [ ] **CMS 後台**
  - 使用 Netlify CMS 或 Tina CMS
  - 不用直接編輯 JSON，透過 GUI 管理專案內容

---

## 📋 已完成

- [x] 需求確認與方案選擇（單頁 React + Firebase Hosting）
- [x] 盤點 C:\My Source 下 27 個專案
- [x] 分類為 8 大領域
- [x] 建立初版單檔 JSX 作品集
- [x] 重構為 Vite + React + TypeScript 完整專案
- [x] 資料與 UI 分離（projects.json）
- [x] CSS Modules 元件化
- [x] TypeScript 型別定義
- [x] Firebase Hosting 設定檔
- [x] README 維護指南
- [x] CLAUDE.md 對話記錄與架構文件
- [x] ROADMAP.md（本文件）
- [x] 桌面版視覺加大（卡片、字體、間距全面提升）
- [x] 行動裝置響應式設計（768px 斷點）
- [x] 精簡專案清單：27 → 18 個（移除非展示項目）
- [x] 新增 Icon Generator 專案
- [x] 加入 9 個專案版本號（從 package.json 掃描）
- [x] 修正 Bridgify Mobile 技術棧為 Flutter/Dart
- [x] GitHub Pages 部署（GitHub Actions CI/CD）
- [x] Port Registry 確認（portfolio-site → 3001）
- [x] 更新 Multi Firebase Admin 專案資訊（根據實際原始碼校正 tagline、description、tech、version）
- [x] 更新 TWNCrypto 專案資訊（原誤為加密貨幣追蹤，實為注音聲母縮寫轉換器，校正 tagline、description、tech、category、version、icon）
- [x] 更新 Bridgify 專案資訊（原誤為跨平台橋接，實為雲端聯絡人管理系統，校正 tagline、description、tech、category、icon）
- [x] 更新 YProtocol 專案資訊（原誤為通訊協議框架，實為 Web-based Debug 分享工具，校正 tagline、description、tech、category、version、links）
- [x] 在 YProtocol README 加入 Claude Code Skill — Fetch Channel 段落（連結至 GitHub repo）
- [x] 新增 StateGrid AI 專案（AI 驅動專案狀態管理系統，v0.4.0，企業管理分類）

---

## 🗓️ 版本規劃

| 版本 | 里程碑 | 狀態 |
|------|--------|------|
| v1.0 | 基本作品集上線（校對內容 + 部署） | ✅ 已完成 |
| v1.1 | 加入截圖與連結 | 🟡 規劃中 |
| v1.2 | SEO 優化 | 🟡 規劃中 |
| v2.0 | 搜尋 + 專案詳情頁 + 主題切換 | 🟢 未來 |
| v3.0 | i18n + 統計儀表板 + CMS | 🔵 遠期 |
