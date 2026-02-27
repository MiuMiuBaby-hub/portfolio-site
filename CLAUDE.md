# CLAUDE.md — MiuMiu Dev Portfolio

> 本文件供 Claude Code 接手開發時閱讀，包含專案背景、架構決策與完整對話記錄。

---

## 📌 專案概述

**用途**：個人作品集網站，展示 `C:\My Source` 下的所有開發專案。  
**技術棧**：Vite + React 19 + TypeScript + CSS Modules  
**部署目標**：Firebase Hosting  
**專案位置**：`C:\My Source\portfolio-site`

---

## 🏗️ 架構設計

```
portfolio-site/
├── public/
│   └── screenshots/            ← 專案截圖（PNG/JPG，建議 1200×675）
├── src/
│   ├── data/
│   │   └── projects.json       ← ★ 核心資料檔（唯一需要維護的檔案）
│   ├── components/
│   │   ├── Hero.tsx + .module.css        ← 頂部標題區（含統計數字）
│   │   ├── FilterBar.tsx + .module.css   ← 分類篩選列（sticky）
│   │   ├── ProjectCard.tsx + .module.css ← 專案卡片（可展開）
│   │   └── Footer.tsx + .module.css      ← 頁尾
│   ├── styles/
│   │   └── global.css          ← 全域樣式、CSS 變數、動畫、字體載入
│   ├── types.ts                ← Project 型別定義、STATUS_CONFIG
│   ├── App.tsx                 ← 主程式（狀態管理、篩選邏輯）
│   ├── main.tsx                ← React 入口點
│   └── vite-env.d.ts           ← Vite + CSS Modules 型別宣告
├── firebase.json               ← Firebase Hosting 設定（SPA rewrite）
├── .firebaserc                 ← Firebase 專案 ID（需用戶填入）
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 設計原則

- **資料驅動**：所有內容由 `projects.json` 控制，UI 自動反映
- **分類自動化**：`category` 欄位的唯一值自動產生篩選按鈕，無需改 code
- **元件化**：每個區塊獨立 component + CSS Module，互不干擾
- **CSS 變數**：顏色主題集中在 `global.css` 的 `:root`，方便全局調整

### 設計風格

- **深色主題**：`#0a0e1a` 背景 + 紫藍漸層 accent
- **三字體組合**：
  - Instrument Serif — 標題（優雅 serif）
  - DM Sans — 內文（現代 sans）
  - JetBrains Mono — 標籤/代碼/狀態（monospace）
- **動畫**：fadeUp 入場、卡片懸浮上移、icon 浮動、漸層流動
- **互動**：卡片點擊展開詳情、tech tag hover 變色

---

## 📊 專案清單（共 27 個，來自 C:\My Source）

### 確認的正式作品（21 個）

| 分類 | 專案 | 說明 |
|------|------|------|
| 企業管理 | SmartGantt | 企業級 AI 專案管理（v2.46.0，最完整的專案） |
| 企業管理 | StoreMate 店管家 | 多門市庫存與銷售管理 |
| 企業管理 | TenantFlow | 租戶與物業管理 |
| 企業管理 | TriageHR | HR 智慧篩選與招聘 |
| 工程工具 | BOM Review Assistant | BOM 物料清單審查 |
| 工程工具 | BOMSphere | BOM 物料管理平台 |
| 工程工具 | PCB RFQ | PCB 報價請求與比價 |
| AI 與數據 | NETB AIWeb | AI 驅動的網頁平台 |
| AI 與數據 | Synapse | AI 工作流程自動化 |
| AI 與數據 | Sort Photos | 照片智慧分類 |
| 連接與通訊 | Bridgify | 跨平台資料橋接 |
| 連接與通訊 | Bridgify Mobile | Bridgify 行動版 |
| 連接與通訊 | NexLink Canvas | 視覺化節點連接畫布 |
| 連接與通訊 | YProtocol | 自訂通訊協議框架 |
| 開發者工具 | OmniRepo Architect | 多倉庫架構管理 |
| 開發者工具 | Multi Firebase Admin | 多 Firebase 專案管理 |
| 開發者工具 | Tools | 開發者工具集 |
| 文件與辦公 | AuraPDF | PDF 智慧處理 |
| 文件與辦公 | EXCEL | Excel 自動化工具 |
| 個人與實用 | MyAddrBookPlus V2 | 進階通訊錄 App |
| 個人與實用 | TWNCrypto | 台灣加密貨幣追蹤 |

### 其他/待確認（6 個）

| 專案 | 推測用途 | 狀態 |
|------|---------|------|
| C5 | 不明，待用戶補充 | draft |
| Ed | 不明，待用戶補充 | draft |
| SmartG | SmartGantt 早期原型 | archived |
| TriageHR.old | TriageHR 舊版 | archived |
| Release | 發佈管理腳本 | active |
| Working | 實驗性工作區 | draft |

> ⚠️ **所有簡介都是根據專案名稱猜測的**，用戶尚未逐一確認。需要用戶校對 `projects.json` 中每個專案的 tagline 和 description。

---

## 💬 完整對話記錄與決策

### 對話 1：需求確認

**用戶需求**：為 `C:\My Source` 下的所有作品做一個簡介與連結的網站。

**Claude 建議了三種方案：**
1. 單頁 React/HTML 作品集 ✅ 用戶選擇
2. Astro/Next.js 靜態網站
3. 純 HTML/CSS 輕量頁面

**部署方案建議：**
1. GitHub Pages（免費）
2. Firebase Hosting ✅ 最終推薦（用戶已有 Firebase 環境）
3. Vercel / Netlify

**用戶決策**：全部交由 Claude 建議 → Claude 推薦「單頁 React + Firebase Hosting」。

### 對話 2：專案盤點

**用戶提供了 `dir` 輸出**，共 27 個資料夾：
```
AuraPDF, bom-review-assistant, BOMSphere, Bridgify, bridgify_mobile, C5, Ed, EXCEL,
multi-firebase-admin, MyAddrBookPlusV2, NETB AIWeb, NexLink-Canvas, OmniRepo-Architect,
PCB RFQ, Release, SmartG, SmartGantt, Sort_Photos, StoreMate, Synapse, TenantFlow,
tools, TriageHR, TriageHR.old, TWNCrypto, Working, YProtocol
```

**Claude 分類**：將 27 個分為 21 個正式作品 + 6 個可能不需展示。

**用戶決策**：
- 「全部都放，讓我自己決定」
- 簡介：「你先根據猜測做，我再改」

### 對話 3：初版製作

Claude 製作了單檔 React JSX 作品集（`portfolio.jsx`），包含：
- 全部 27 個專案
- 8 個分類篩選
- 點擊展開詳情
- 狀態燈號（active/draft/archived）
- 深色主題 + 紫藍漸層設計

**用戶回饋**：「很好，後續要怎麼維護？可改成一個專案，讓我方便管理？」

### 對話 4：專案化重構

Claude 將單檔重構為完整的 Vite + React + TypeScript 專案：
- 資料與 UI 分離（`projects.json` 獨立）
- CSS Modules 元件化
- TypeScript 型別定義
- Firebase Hosting 設定
- 完整 README 維護指南

**核心設計決策**：
- 日常維護只需編輯 `src/data/projects.json`
- 分類自動從資料推導，不需改 code
- 截圖放 `public/screenshots/`，JSON 填檔名即可

### 對話 5：Claude Code 交接（本次）

用戶要求將所有討論記錄下來，建立 ROADMAP/TODO，以便 Claude Code 接管。

---

## ⚙️ 開發指令

```bash
npm install          # 安裝依賴
npm run dev          # 開發模式 → http://localhost:5173
npm run build        # 建置到 dist/
npm run preview      # 預覽建置結果
npm run deploy       # 建置 + Firebase 部署
```

---

## 🔧 待完成的設定

1. `.firebaserc` 中的 `your-firebase-project-id` 需替換為實際的 Firebase 專案 ID
2. 若要初次部署，需先執行 `firebase init hosting` 並選擇 `dist` 作為 public directory

---

## 📝 開發注意事項

- 本專案使用 CSS Modules（`*.module.css`），不要使用全域 class name
- `global.css` 中的 CSS 變數以 `--color-` 和 `--font-` 開頭
- `projects.json` 的 `category` 新值會自動建立篩選按鈕
- `status` 只允許 `active` | `draft` | `archived`（對應 `types.ts` 中的 `STATUS_CONFIG`）
- 截圖建議尺寸 1200×675（16:9）或 1200×900（4:3）
