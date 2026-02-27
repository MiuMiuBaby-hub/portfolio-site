# CHANGELOG

本檔案記錄專案的所有變更歷史。

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
