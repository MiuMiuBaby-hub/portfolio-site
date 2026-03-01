# CHANGELOG

本檔案記錄專案的所有變更歷史。

---

## [1.0.2] — 2026-03-01

### 專案資料更新
- 更新 TWNCrypto 專案資訊（根據實際原始碼校正）
  - tagline：台灣加密貨幣資訊追蹤 → 注音聲母縮寫轉換器
  - description：完整改寫為 Gemini AI 注音聲母轉換、自動轉換、歷史紀錄、Token 追蹤、CSV 匯出、Google Sheets 同步
  - tech：React, Crypto API, Charts → React 19, TypeScript, Vite, Google Gemini AI, Tailwind CSS
  - category：個人與實用 → AI 與數據
  - version：新增 v1.1.0
  - icon：₿ → ㄅ
- 更新 Bridgify 專案資訊（根據實際原始碼校正）
  - tagline：跨平台資料橋接服務 → 雲端聯絡人管理與團隊協作平台
  - description：完整改寫為企業級聯絡人管理系統，含 RBAC、Typesense 搜尋、AES-256 加密、2FA、匯入匯出、AI 名片解析
  - tech：React, API, WebSocket → React 19, TypeScript, Vite, Tailwind CSS, Firebase, Cloud Functions, Google Gemini AI, Typesense
  - category：連接與通訊 → 企業管理
  - icon：🌉 → 📇

---

## [1.0.1] — 2026-02-28

### 專案資料更新
- 更新 Multi Firebase Admin 專案資訊（根據實際原始碼校正）
  - tagline：多 Firebase 專案管理面板 → 多 Firebase 專案統一使用者管理後台
  - description：補充跨專案搜尋、帳號操作、Custom Claims、稽核紀錄、RBAC、Google OAuth、Cloud Run 等實際功能
  - tech：更新為 React 18、TypeScript、Tailwind CSS、Express.js、Firebase Admin SDK、Cloud Run
  - version：v0.5.0 → v0.9.0

---

## [1.0.0] — 2026-02-28

### 視覺優化
- 桌面版全面加大尺寸：卡片 padding 24→32px、標題 17→21px、icon 28→36px、tech tag 10→12px
- Grid 最小卡片寬度 320→400px、容器寬度 1200→1400px、gap 20→28px
- Hero 區統計數字 32→40px、副標題 15→18px
- FilterBar 按鈕 13→15px

### 響應式設計
- 新增 `@media (max-width: 768px)` 行動裝置斷點
- 所有元件（Hero、FilterBar、ProjectCard）皆有 mobile 縮小樣式
- Mobile 下卡片單欄排列

### 專案資料調整
- 移除 9 個非展示專案：C5、Ed、SmartG、Sort_Photos、TriageHR.old、Working、Release、Tools、EXCEL、MyAddrBookPlus V2
- 新增 Icon Generator 專案（開發者工具類）
- 最終保留 18 個專案，7 個分類
- 加入 9 個專案版本號（掃描自各專案 package.json）
- 修正 Bridgify Mobile 技術棧：React Native → Flutter/Dart

### 部署
- 建立 GitHub repo：MiuMiuBaby-hub/portfolio-site
- 新增 GitHub Actions CI/CD workflow（push master → 自動部署 GitHub Pages）
- 設定 vite `base: '/portfolio-site/'`
- 網址：https://miumiubaby-hub.github.io/portfolio-site/

---

## [1.0.0-beta] — 2026-02-27

### 建立專案

- 初始化 Vite + React 19 + TypeScript 專案
- 建立 `src/data/projects.json`，包含 27 個專案資料（基於名稱猜測）
- 建立 4 個元件：Hero、FilterBar、ProjectCard、Footer
- 使用 CSS Modules + CSS 變數管理樣式
- 深色主題設計：Instrument Serif + DM Sans + JetBrains Mono
- 分類篩選功能（8 類，自動從資料推導）
- 卡片點擊展開詳情
- 狀態燈號（active/draft/archived）
- fadeUp 入場動畫、卡片懸浮效果
- Firebase Hosting 設定（`firebase.json` + `.firebaserc`）
- 完整 README 維護指南
- CLAUDE.md 交接文件
- ROADMAP.md 開發路線圖

### 來源

由 Claude.ai 對話產出，對話包含：
1. 需求確認（網站形式、部署平台、專案範圍）
2. C:\My Source 目錄盤點（27 個資料夾）
3. 初版 JSX 單檔製作
4. 用戶要求重構為完整可維護專案
5. 建立 Claude Code 交接文件
