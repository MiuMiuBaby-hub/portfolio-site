# MiuMiu Dev Portfolio

> 🔗 **Live Demo**: https://miumiubaby-hub.github.io/portfolio-site/

個人作品集網站，展示 `C:\My Source` 下的所有開發專案。

## 🚀 快速開始

```bash
cd portfolio-site
npm install
npm run dev        # 本地開發 → http://localhost:5173
npm run build      # 建置到 dist/
npm run deploy     # 建置 + 部署到 Firebase Hosting
```

---

## 📁 專案結構

```
portfolio-site/
├── public/
│   └── screenshots/        ← 放專案截圖（PNG/JPG）
├── src/
│   ├── data/
│   │   └── projects.json   ← ★ 唯一需要維護的檔案
│   ├── components/
│   │   ├── Hero.tsx         ← 頂部標題區
│   │   ├── FilterBar.tsx    ← 分類篩選列
│   │   ├── ProjectCard.tsx  ← 專案卡片
│   │   └── Footer.tsx       ← 頁尾
│   ├── styles/
│   │   └── global.css       ← 全域樣式與 CSS 變數
│   ├── types.ts             ← TypeScript 型別定義
│   ├── App.tsx              ← 主程式
│   └── main.tsx             ← 入口點
├── firebase.json            ← Firebase Hosting 設定
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✏️ 日常維護指南

### 所有內容修改都只需要編輯一個檔案：

### `src/data/projects.json`

---

### ➕ 新增專案

在 `projects.json` 的陣列中加入一筆：

```json
{
  "id": "my-new-project",
  "name": "My New Project",
  "tagline": "一句話說明這個專案做什麼",
  "description": "更詳細的說明，展開時會顯示。",
  "tech": ["React", "TypeScript", "Firebase"],
  "category": "企業管理",
  "status": "active",
  "version": "v1.0.0",
  "folder": "MyNewProject",
  "icon": "🆕",
  "links": {
    "demo": "https://my-project.web.app",
    "github": "https://github.com/xxx/my-project",
    "docs": ""
  },
  "screenshot": "my-new-project.png"
}
```

> 截圖放在 `public/screenshots/` 資料夾中。

---

### ✏️ 修改專案資料

直接在 `projects.json` 中找到對應的物件，修改欄位即可。

---

### 🗑️ 移除專案

從 `projects.json` 中刪除該筆資料。

---

### 📂 新增分類

`category` 欄位填入新的分類名稱就會自動出現在篩選列，不需要改任何程式碼。

```json
"category": "我的新分類"
```

---

### 🎨 修改狀態

```json
"status": "active"     // 綠色 · 運行中
"status": "draft"      // 黃色 · 開發中
"status": "archived"   // 灰色 · 已封存
```

如需新增狀態類型，編輯 `src/types.ts` 中的 `STATUS_CONFIG`。

---

### 🖼️ 加入截圖

1. 將截圖放入 `public/screenshots/`
2. 在 `projects.json` 中填入檔名：
   ```json
   "screenshot": "smartgantt-dashboard.png"
   ```
3. 建議尺寸：1200×675（16:9）或 1200×900（4:3）

---

### 🔗 加入連結

```json
"links": {
  "demo": "https://smartgantt.web.app",
  "github": "https://github.com/miumiu/smartgantt",
  "docs": "https://docs.smartgantt.app"
}
```

不需要的連結留空字串 `""` 或直接不填。

---

## 🎨 客製化

### 修改顏色主題

編輯 `src/styles/global.css` 中的 CSS 變數：

```css
:root {
  --color-bg: #0a0e1a;           /* 背景色 */
  --color-accent: #8b5cf6;       /* 主題色（紫） */
  --color-accent-light: #c4b5fd; /* 亮主題色 */
  --color-blue: #3b82f6;         /* 藍色 */
}
```

### 修改個人資訊

- 頁面標題：`Hero.tsx`
- HTML title：`index.html`
- 頁尾：`Footer.tsx`

---

## 🌐 部署

### Firebase Hosting（推薦）

```bash
# 首次設定
firebase init hosting
# 選擇 dist 作為 public directory

# 之後只需要
npm run deploy
```

### 其他平台

建置後的 `dist/` 資料夾可以部署到任何靜態伺服器：
- **Vercel**: `vercel --prod`
- **Netlify**: 拖拉 `dist/` 到 Netlify Dashboard
- **GitHub Pages**: 用 `gh-pages` 套件

---

## 📋 欄位說明

| 欄位 | 必填 | 說明 |
|------|------|------|
| `id` | ✅ | 唯一識別碼（英文小寫 + 連字號） |
| `name` | ✅ | 顯示名稱 |
| `tagline` | ✅ | 一句話簡介 |
| `description` | ✅ | 展開後的詳細說明 |
| `tech` | ✅ | 技術標籤陣列 |
| `category` | ✅ | 分類（自動建立篩選按鈕） |
| `status` | ✅ | `active` / `draft` / `archived` |
| `folder` | ✅ | 對應 `C:\My Source` 中的資料夾名稱 |
| `icon` | ✅ | Emoji 圖示 |
| `version` | ❌ | 版本號（顯示為徽章） |
| `links` | ❌ | `{ demo, github, docs }` 連結 |
| `screenshot` | ❌ | 截圖檔名（放在 `public/screenshots/`） |
