# CHANGELOG

本檔案記錄專案的所有變更歷史。

---

## [2.0.0] — 2026-04-04

### 新功能
- 搜尋功能：全寬搜尋框，即時過濾專案（搜尋 name/tagline/description/tech），支援清除按鈕
- 專案詳情頁：HashRouter 路由 `#/project/:id`，滑入動畫，完整專案資訊頁面，404 處理
- 深色/淺色主題切換：右上角固定 toggle 按鈕，localStorage 記住偏好，支援系統偏好偵測

### 架構變更
- 新增 React Context（AppContext）統一管理 theme / searchQuery / activeCategory
- 新增 react-router-dom v7（HashRouter，GitHub Pages 相容）
- FilterBar 改用 useFilter context hook（移除 props drilling）

### 樣式調整
- 新增 `[data-theme="light"]` CSS 變數覆寫（淺灰底 + 柔和紫 accent）
- 修正多個元件硬編碼顏色為 CSS 變數
- 亮色模式：卡片白底淺陰影、tech tag 淡紫底色、scrollbar 顏色適配
- 「查看詳情 →」按鈕：低調 pill 外框風格，位置在描述與 tech tags 之間，展開時才顯示

---

## [1.0.8] — 2026-04-04

### 新增專案
- 新增 SkillTracker 專案至 portfolio
  - tagline：Claude Code Skill 使用追蹤與分析平台
  - description：本機 MCP Server，記錄 Skill 調用次數，SQLite 儲存，瀏覽器 Dashboard 視覺化，支援 Skill 掃描、版本備份 Hook 與 AI Skill 管理
  - tech：Python, FastMCP, SQLite, JavaScript, HTML/CSS
  - category：開發者工具
  - version：v1.4.1
  - icon：📈

### 專案版本更新
- SmartGantt 版本更新：v2.46.0 → v2.51.0

---

## [1.0.7] — 2026-03-29

### 連結更新
- 為 HRCalc 新增 demo 連結：https://hrcalc-25a05.web.app

---

## [1.0.6] — 2026-03-29

### 連結更新
- 為 BOM Review Assistant 新增 demo 連結：https://bom-review-assistant.pages.dev/
- 在 README.md 頂部新增 Live Demo 連結：https://miumiubaby-hub.github.io/portfolio-site/

---

## [1.0.5] — 2026-03-29

### 新增專案
- 新增 S1-S6 Check List 專案至 portfolio
  - tagline：產品開發階段文件合規性稽核工具
  - description：驗證 S1~S6 各開發階段必存文件是否齊全，自動比對主機種/衍生機種規則，輸出三色標記 Excel 稽核報表（綠/粉紫/黃）
  - tech：React, TypeScript, Excel Processing, Web App
  - category：工程工具
  - icon：✅

---

## [1.0.4] — 2026-03-18

### 新增專案
- 新增 HRCalc 專案至 portfolio
  - tagline：彈性班出勤計算器
  - description：互動式出勤計算工具，可拖曳時間軸設定上下班與請假時段，自動計算假勤時數（含午休扣除邏輯），支援上午/下午請假模式切換
  - tech：React 19, TypeScript, Vite, Tailwind CSS
  - category：個人與實用
  - icon：⏰

---

## [1.0.3] — 2026-03-03

### 專案資料更新
- 更新 YProtocol 專案資訊（根據實際原始碼校正）
  - tagline：自訂通訊協議框架 → Web-based 開發者 Debug 分享工具
  - description：完整改寫為即時分享截圖/Console 訊息/檔案的 Debug 協作工具，含 E2E 加密、截圖標註、PWA、CLI、Claude Code Skill 整合
  - tech：TypeScript, Protocol, Networking → HTML5, ES6+, Vite, Firebase, AES-256-GCM, Fabric.js, CLI
  - category：連接與通訊 → 開發者工具
  - version：v1.0.0 → v3.0.3
  - links：新增 demo 連結 https://y-protocol.web.app

### YProtocol README 更新
- 在 YProtocol 的 README.md 加入「Claude Code Skill — Fetch Channel」段落
  - 連結至 GitHub repo: MiuMiuBaby-hub/claude-skill-fetch-channel
  - 說明 Skill 功能、使用方式（含 autofix、私人/加密頻道參數）與安裝方式

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
