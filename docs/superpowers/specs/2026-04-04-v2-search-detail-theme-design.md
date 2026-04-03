# v2.0 設計規格：搜尋 + 專案詳情頁 + 主題切換

> 日期：2026-04-04
> 版本：v2.0
> 狀態：設計完成，待實作

---

## 1. 總覽

為 portfolio-site 加入三大功能：

1. **搜尋功能** — 即時過濾專案
2. **專案詳情頁** — 獨立路由頁面，含滑入動畫
3. **深色/淺色主題切換** — 右上角 toggle，localStorage 記住偏好

### 架構方案

採用 **React Context 全域狀態管理**，統一管理 theme、searchQuery、activeCategory。

### 新增依賴

- `react-router-dom` v7（HashRouter）

---

## 2. 路由結構

```
HashRouter
├── #/                    ← 列表頁（HomePage）
│   ├── Hero
│   ├── ThemeToggle       ← 右上角固定
│   ├── SearchBar         ← FilterBar 上方，獨立一行
│   ├── FilterBar
│   └── ProjectCard[]     ← 點擊展開摘要 + 「查看詳情 →」按鈕跳轉
│
└── #/project/:id         ← 詳情頁（ProjectDetail）
    ├── 返回按鈕
    ├── 專案名稱 + icon + 版本 + 狀態
    ├── 截圖區域（如有）
    ├── 完整描述
    ├── 技術棧 tags
    └── 連結按鈕（Demo / GitHub / Docs / Skill）
```

- 使用 `HashRouter`（GitHub Pages 相容，不需後端設定）
- 詳情頁滑入動畫：`translateX(100%) → translateX(0)`，返回時反向
- 找不到 id 時顯示 404 提示 + 返回按鈕

---

## 3. Context 全域狀態

### AppContext

```typescript
// src/contexts/AppContext.tsx

interface AppState {
  theme: 'dark' | 'light';
  searchQuery: string;
  activeCategory: string;
}

// 提供的 Hooks
useTheme()   → { theme, toggleTheme }
useSearch()  → { searchQuery, setSearchQuery }
useFilter()  → { activeCategory, setActiveCategory }
```

### 初始化邏輯

- **theme**：localStorage → `prefers-color-scheme` → 預設 `'dark'`
- **searchQuery**：預設 `''`
- **activeCategory**：預設 `'全部'`

### Provider 位置

```tsx
// App.tsx
<AppProvider>
  <HashRouter>
    <Routes>...</Routes>
  </HashRouter>
</AppProvider>
```

---

## 4. 搜尋功能

### 元件

- `SearchBar.tsx` + `SearchBar.module.css`
- 位置：FilterBar 上方，獨立一行，全寬

### 行為

- 即時過濾（onChange）
- 搜尋範圍：`name`、`tagline`、`description`、`tech[]`（不分大小寫）
- 搜尋與分類同時生效（交集）
- 有輸入時右側顯示 ✕ 清除按鈕
- 無結果時顯示「找不到符合的專案」提示

### 過濾邏輯

```typescript
const filtered = projects
  .filter(p => activeCategory === '全部' || p.category === activeCategory)
  .filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some(t => t.toLowerCase().includes(q))
    );
  });
```

---

## 5. 專案詳情頁

### 元件

- `ProjectDetail.tsx` + `ProjectDetail.module.css`

### 佈局

```
┌──────────────────────────────────────┐
│ ← 返回作品集          🌙 ThemeToggle │
├──────────────────────────────────────┤
│ 📊 SmartGantt              v2.51.0  │
│ 企業級 AI 專案管理工具      ● 運行中  │
├──────────────────────────────────────┤
│ [截圖區域（如有）]                    │
├──────────────────────────────────────┤
│ 完整描述文字...                       │
├──────────────────────────────────────┤
│ 技術棧                               │
│ [React 19] [TypeScript] [Firebase]   │
├──────────────────────────────────────┤
│ 連結                                 │
│ [🔗 Demo] [📂 GitHub] [📄 Docs]     │
└──────────────────────────────────────┘
```

### 資料來源

- 從 `projects.json` 用 URL param `:id` 查找
- 找不到時顯示 404 + 返回按鈕

### 動畫

- 進場：`translateX(100%) → translateX(0)`，CSS transition
- 離場（返回）：反向滑出
- 不使用額外動畫庫

### 卡片行為（列表頁）

- 保留現有展開/收合功能
- 展開區域內新增「查看詳情 →」按鈕，點擊 `navigate(#/project/${id})`

### RWD

- 手機版（≤768px）：單欄排列，與現有斷點一致

---

## 6. 主題切換

### 元件

- `ThemeToggle.tsx` + `ThemeToggle.module.css`
- 位置：右上角 `position: fixed`，🌙 ↔ ☀️ icon 按鈕

### 切換機制

- 在 `<html>` 設定 `data-theme="light"` 屬性
- CSS 變數透過 `[data-theme="light"]` 覆寫
- 過場動畫：`transition: background-color 0.3s, color 0.3s`

### 偏好記憶

- `localStorage.setItem('theme', 'light' | 'dark')`
- 載入時讀取 localStorage → 偵測 `prefers-color-scheme` → 預設 dark

### 亮色 CSS 變數

```css
[data-theme="light"] {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-hover: rgba(241, 245, 249, 0.9);
  --color-border: #e2e8f0;
  --color-border-light: #f1f5f9;
  --color-text: #334155;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-text-dim: #cbd5e1;
  --color-accent: #a78bfa;
  --color-accent-light: #6d28d9;
  --color-accent-mid: #7c3aed;
  --color-blue: #3b82f6;
  --color-cyan: #06b6d4;
}
```

### 亮色元件調整

- 卡片：白底 + 淺陰影 `box-shadow: 0 1px 3px rgba(0,0,0,0.05)`
- Tech tag：背景 `#f1f0ff`、文字 `#6d28d9`
- 搜尋框/FilterBar：跟隨 CSS 變數自動切換

---

## 7. 檔案變更清單

### 新增

| 檔案 | 用途 |
|------|------|
| `src/contexts/AppContext.tsx` | 全域狀態（theme / search / filter） |
| `src/components/SearchBar.tsx` | 搜尋框元件 |
| `src/components/SearchBar.module.css` | 搜尋框樣式 |
| `src/components/ThemeToggle.tsx` | 主題切換按鈕 |
| `src/components/ThemeToggle.module.css` | 主題切換樣式 |
| `src/components/ProjectDetail.tsx` | 專案詳情頁 |
| `src/components/ProjectDetail.module.css` | 詳情頁樣式 |

### 修改

| 檔案 | 變更內容 |
|------|---------|
| `src/App.tsx` | 加入 HashRouter + Routes + AppProvider，移除本地狀態 |
| `src/components/ProjectCard.tsx` | 展開區加「查看詳情 →」按鈕 |
| `src/components/ProjectCard.module.css` | 新增詳情按鈕樣式 |
| `src/components/FilterBar.tsx` | 改用 useFilter hook |
| `src/components/Hero.tsx` | 改用 context（如需） |
| `src/styles/global.css` | 新增 `[data-theme="light"]` CSS 變數 |
| `package.json` | 新增 `react-router-dom` 依賴 |

---

## 8. 不在範圍內

- 技術標籤篩選（P2 其他項目）
- 排序功能（P2 其他項目）
- i18n 多語系（P3）
- 動態載入 projects.json（P2 其他項目）
- SEO meta tags（P1 獨立項目）
