# v2.0 Implementation Plan: Search + Detail Page + Theme Toggle

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add search, project detail pages with slide animation, and light/dark theme toggle to portfolio-site.

**Architecture:** React Context for global state (theme/search/filter). HashRouter for routing (GitHub Pages compatible). CSS variable overrides for light theme. All new components use CSS Modules.

**Tech Stack:** React 19, TypeScript, react-router-dom v7, CSS Modules, CSS Variables

**Spec:** `docs/superpowers/specs/2026-04-04-v2-search-detail-theme-design.md`

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `src/contexts/AppContext.tsx` | Global state: theme, searchQuery, activeCategory. Provides `useTheme`, `useSearch`, `useFilter` hooks |
| `src/components/SearchBar.tsx` | Full-width search input above FilterBar |
| `src/components/SearchBar.module.css` | SearchBar styles (dark + light via CSS vars) |
| `src/components/ThemeToggle.tsx` | Fixed top-right moon/sun toggle button |
| `src/components/ThemeToggle.module.css` | ThemeToggle styles |
| `src/components/ProjectDetail.tsx` | Full project detail page at `#/project/:id` |
| `src/components/ProjectDetail.module.css` | Detail page styles |

### Modified Files

| File | Changes |
|------|---------|
| `package.json` | Add `react-router-dom` dependency |
| `src/styles/global.css` | Add `[data-theme="light"]` CSS variable overrides, page transition keyframes |
| `src/App.tsx` | Wrap in AppProvider + HashRouter, add Routes, move filtering to use context hooks |
| `src/components/FilterBar.tsx` | Replace props with `useFilter` hook |
| `src/components/Hero.tsx` | Use CSS vars for hardcoded colors (#f8fafc) |
| `src/components/ProjectCard.tsx` | Add "查看詳情 →" button in expanded area |
| `src/components/ProjectCard.module.css` | Add detailLink style |
| `src/components/FilterBar.module.css` | Replace hardcoded bg color with CSS var |

---

## Task 1: Install react-router-dom

- [ ] **Step 1: Install dependency**

```bash
cd "C:/My Source/portfolio-site" && npm install react-router-dom
```

- [ ] **Step 2: Verify installation**

```bash
cd "C:/My Source/portfolio-site" && node -e "console.log(require('./node_modules/react-router-dom/package.json').version)"
```

Expected: version 7.x.x

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add package.json package-lock.json
git commit -m "chore: Add react-router-dom dependency"
```

---

## Task 2: Create AppContext (Global State)

**Files:**
- Create: `src/contexts/AppContext.tsx`

- [ ] **Step 1: Create contexts directory and AppContext**

Create `src/contexts/AppContext.tsx` with this content:

```tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AppContextValue {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getInitialTheme(): 'dark' | 'light' {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, searchQuery, setSearchQuery, activeCategory, setActiveCategory }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export function useTheme() {
  const { theme, toggleTheme } = useAppContext();
  return { theme, toggleTheme };
}

export function useSearch() {
  const { searchQuery, setSearchQuery } = useAppContext();
  return { searchQuery, setSearchQuery };
}

export function useFilter() {
  const { activeCategory, setActiveCategory } = useAppContext();
  return { activeCategory, setActiveCategory };
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd "C:/My Source/portfolio-site" && npx tsc --noEmit src/contexts/AppContext.tsx 2>&1 | head -5
```

Expected: no errors (or only errors about missing module resolution config, which is OK since Vite handles that)

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/contexts/AppContext.tsx
git commit -m "feat: Add AppContext for global state (theme/search/filter)"
```

---

## Task 3: Add Light Theme CSS Variables

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add light theme variables after the `:root` block**

In `src/styles/global.css`, add the following block immediately after the closing `}` of `:root` (after line 21):

```css
[data-theme="light"] {
  --color-bg: #f8fafc;
  --color-surface: rgba(255, 255, 255, 0.95);
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

[data-theme="light"] body {
  -webkit-font-smoothing: auto;
}

[data-theme="light"] ::-webkit-scrollbar-thumb {
  background: #cbd5e1;
}

[data-theme="light"] ::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

- [ ] **Step 2: Add page transition keyframe**

In `src/styles/global.css`, add after the existing `@keyframes float` block (after line 51):

```css
@keyframes slideInFromRight {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideOutToRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(60px); }
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/styles/global.css
git commit -m "feat: Add light theme CSS variables and page transition keyframes"
```

---

## Task 4: Fix Hardcoded Colors in Existing Components

Some components use hardcoded color values instead of CSS variables. These need to be updated so the light theme works.

**Files:**
- Modify: `src/components/Hero.module.css`
- Modify: `src/components/ProjectCard.module.css`
- Modify: `src/components/FilterBar.module.css`
- Modify: `src/components/Footer.module.css`

- [ ] **Step 1: Fix Hero.module.css**

In `src/components/Hero.module.css`:

Replace `.title` color `#f8fafc` (line 44) with `var(--color-text)`:
```css
color: var(--color-text);
```

Replace `.statNum` color `#f8fafc` (line 72) with `var(--color-text)`:
```css
color: var(--color-text);
```

- [ ] **Step 2: Fix ProjectCard.module.css**

In `src/components/ProjectCard.module.css`:

Replace `.title` color `#f1f5f9` (line 57) with `var(--color-text)`:
```css
color: var(--color-text);
```

Replace `.card:hover` box-shadow hardcoded rgba (line 15) — add a light-theme-friendly version. Change to:
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(139, 92, 246, 0.15);
}
```

Replace `.version` background `rgba(139, 92, 246, 0.15)` and border `rgba(139, 92, 246, 0.2)` — these are OK as-is since they're accent-based and work in both themes.

Replace `.link` background `rgba(139, 92, 246, 0.1)` and border — these are OK as-is.

Replace `.tag` background `rgba(51, 65, 85, 0.3)` (line 160). Add after the existing mobile block at the end of the file:
```css
/* ── Light theme adjustments ── */
:global([data-theme="light"]) .card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

:global([data-theme="light"]) .tag {
  background: #f1f0ff;
  color: #6d28d9;
  border-color: #e2dff8;
}

:global([data-theme="light"]) .tag:hover {
  background: rgba(139, 92, 246, 0.2);
  color: #5b21b6;
}
```

- [ ] **Step 3: Fix FilterBar.module.css**

In `src/components/FilterBar.module.css`:

Replace `.bar` background `rgba(10, 14, 26, 0.85)` (line 5). Add at the end of the file (before mobile block, or after it):
```css
/* ── Light theme ── */
:global([data-theme="light"]) .bar {
  background: rgba(248, 250, 252, 0.9);
  border-bottom-color: #e2e8f0;
}
```

- [ ] **Step 4: Fix Footer.module.css**

In `src/components/Footer.module.css`:

Replace `.dot` color `#334155` (line 15). Add at the end:
```css
/* ── Light theme ── */
:global([data-theme="light"]) .dot {
  color: #cbd5e1;
}
```

- [ ] **Step 5: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/Hero.module.css src/components/ProjectCard.module.css src/components/FilterBar.module.css src/components/Footer.module.css
git commit -m "fix: Replace hardcoded colors with CSS vars for theme support"
```

---

## Task 5: Create ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/ThemeToggle.module.css`

- [ ] **Step 1: Create ThemeToggle.module.css**

Create `src/components/ThemeToggle.module.css`:

```css
.toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
}

.toggle:hover {
  border-color: var(--color-accent);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .toggle {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}
```

- [ ] **Step 2: Create ThemeToggle.tsx**

Create `src/components/ThemeToggle.tsx`:

```tsx
import { useTheme } from '../contexts/AppContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '切換至亮色模式' : '切換至深色模式'}
      title={theme === 'dark' ? '切換至亮色模式' : '切換至深色模式'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/ThemeToggle.tsx src/components/ThemeToggle.module.css
git commit -m "feat: Add ThemeToggle component (fixed top-right, sun/moon icon)"
```

---

## Task 6: Create SearchBar Component

**Files:**
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/SearchBar.module.css`

- [ ] **Step 1: Create SearchBar.module.css**

Create `src/components/SearchBar.module.css`:

```css
.wrapper {
  padding: 20px 40px 0;
  max-width: 1100px;
  margin: 0 auto;
}

.inputWrap {
  position: relative;
  width: 100%;
}

.icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  color: var(--color-text-muted);
}

.input {
  width: 100%;
  padding: 12px 44px;
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input::placeholder {
  color: var(--color-text-muted);
}

.input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear:hover {
  background: var(--color-border);
  color: var(--color-text);
}

.noResults {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-muted);
  font-size: 15px;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .wrapper {
    padding: 12px 16px 0;
  }

  .input {
    padding: 10px 40px;
    font-size: 14px;
    border-radius: 10px;
  }

  .icon {
    font-size: 14px;
    left: 14px;
  }

  .clear {
    right: 10px;
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
}
```

- [ ] **Step 2: Create SearchBar.tsx**

Create `src/components/SearchBar.tsx`:

```tsx
import { useSearch } from '../contexts/AppContext';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <span className={styles.icon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="搜尋專案名稱、技術、描述..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className={styles.clear}
            onClick={() => setSearchQuery('')}
            aria-label="清除搜尋"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export function NoResults() {
  return <div className={styles.noResults}>找不到符合的專案</div>;
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/SearchBar.tsx src/components/SearchBar.module.css
git commit -m "feat: Add SearchBar component with clear button"
```

---

## Task 7: Create ProjectDetail Component

**Files:**
- Create: `src/components/ProjectDetail.tsx`
- Create: `src/components/ProjectDetail.module.css`

- [ ] **Step 1: Create ProjectDetail.module.css**

Create `src/components/ProjectDetail.module.css`:

```css
.page {
  min-height: 100vh;
  animation: slideInFromRight 0.35s ease both;
}

.backBar {
  padding: 20px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.backBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-family: var(--font-sans);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.backBtn:hover {
  border-color: var(--color-accent);
  color: var(--color-text);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 40px 100px;
}

.header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.iconLarge {
  font-size: 52px;
}

.titleArea {
  flex: 1;
}

.titleRow {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.name {
  font-family: var(--font-sans);
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
}

.version {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(139, 92, 246, 0.15);
  color: var(--color-accent-mid);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.tagline {
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.statusRow {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.statusText {
  font-family: var(--font-mono);
  font-size: 13px;
}

.folder {
  margin-left: 16px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-dim);
}

.screenshot {
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  margin-bottom: 32px;
}

.section {
  margin-bottom: 32px;
}

.sectionTitle {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.techRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 100px;
  background: rgba(51, 65, 85, 0.3);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.tag:hover {
  background: rgba(139, 92, 246, 0.2);
  color: var(--color-accent-light);
}

.linksRow {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link {
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 10px 24px;
  border-radius: 100px;
  background: rgba(139, 92, 246, 0.1);
  color: var(--color-accent-light);
  text-decoration: none;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.2s ease;
}

.link:hover {
  background: rgba(139, 92, 246, 0.25);
}

.notFound {
  text-align: center;
  padding: 100px 20px;
}

.notFoundTitle {
  font-size: 48px;
  margin-bottom: 16px;
}

.notFoundText {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

/* ── Light theme ── */
:global([data-theme="light"]) .tag {
  background: #f1f0ff;
  color: #6d28d9;
  border-color: #e2dff8;
}

:global([data-theme="light"]) .tag:hover {
  background: rgba(139, 92, 246, 0.2);
  color: #5b21b6;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .backBar {
    padding: 12px 16px;
  }

  .container {
    padding: 0 16px 60px;
  }

  .iconLarge {
    font-size: 36px;
  }

  .name {
    font-size: 24px;
  }

  .tagline {
    font-size: 15px;
  }

  .description {
    font-size: 14px;
  }

  .link {
    font-size: 12px;
    padding: 8px 18px;
  }
}
```

- [ ] **Step 2: Create ProjectDetail.tsx**

Create `src/components/ProjectDetail.tsx`:

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import projectsData from '../data/projects.json';
import type { Project } from '../types';
import { STATUS_CONFIG } from '../types';
import styles from './ProjectDetail.module.css';

const projects = projectsData as Project[];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.backBar}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ← 返回作品集
          </button>
        </div>
        <div className={styles.notFound}>
          <div className={styles.notFoundTitle}>404</div>
          <p className={styles.notFoundText}>找不到這個專案</p>
        </div>
      </div>
    );
  }

  const status = STATUS_CONFIG[project.status];
  const hasLinks = project.links && Object.values(project.links).some(Boolean);

  return (
    <div className={styles.page}>
      <div className={styles.backBar}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← 返回作品集
        </button>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.iconLarge}>{project.icon}</span>
          <div className={styles.titleArea}>
            <div className={styles.titleRow}>
              <h1 className={styles.name}>{project.name}</h1>
              {project.version && <span className={styles.version}>{project.version}</span>}
            </div>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
        </div>

        {/* Status */}
        <div className={styles.statusRow}>
          <span
            className={styles.dot}
            style={{ background: status.color, boxShadow: `0 0 8px ${status.color}50` }}
          />
          <span className={styles.statusText} style={{ color: status.color }}>
            {status.label}
          </span>
          <span className={styles.folder}>📁 {project.folder}</span>
        </div>

        {/* Screenshot */}
        {project.screenshot && (
          <img
            src={`${import.meta.env.BASE_URL}screenshots/${project.screenshot}`}
            alt={project.name}
            className={styles.screenshot}
          />
        )}

        {/* Description */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>描述</div>
          <p className={styles.description}>{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>技術棧</div>
          <div className={styles.techRow}>
            {project.tech.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        {hasLinks && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>連結</div>
            <div className={styles.linksRow}>
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener" className={styles.link}>
                  🔗 Demo
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener" className={styles.link}>
                  💻 GitHub
                </a>
              )}
              {project.links.docs && (
                <a href={project.links.docs} target="_blank" rel="noopener" className={styles.link}>
                  📖 Docs
                </a>
              )}
              {project.links.skill && (
                <a href={project.links.skill} target="_blank" rel="noopener" className={styles.link}>
                  🧩 Skill
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/ProjectDetail.tsx src/components/ProjectDetail.module.css
git commit -m "feat: Add ProjectDetail page with slide-in animation"
```

---

## Task 8: Update ProjectCard — Add "查看詳情" Button

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/ProjectCard.module.css`

- [ ] **Step 1: Add detailLink style to ProjectCard.module.css**

In `src/components/ProjectCard.module.css`, add before the `/* ── Light theme adjustments ── */` comment (added in Task 4):

```css
.detailLink {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 8px 20px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-accent-light);
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.detailLink:hover {
  background: rgba(139, 92, 246, 0.2);
  transform: translateX(4px);
}
```

- [ ] **Step 2: Update ProjectCard.tsx to add the detail button**

In `src/components/ProjectCard.tsx`:

Add import at top:
```tsx
import { useNavigate } from 'react-router-dom';
```

Inside the component function, add after the `const hasLinks = ...` line:
```tsx
const navigate = useNavigate();
```

In the expanded content area, after the links row `</div>` (after line 98) and before the closing `</div>` of `.expandContent`, add:
```tsx
        {/* Detail page link */}
        <button
          className={styles.detailLink}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/project/${project.id}`);
          }}
        >
          查看詳情 →
        </button>
```

- [ ] **Step 3: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/ProjectCard.tsx src/components/ProjectCard.module.css
git commit -m "feat: Add detail page link button to ProjectCard expanded area"
```

---

## Task 9: Update FilterBar to Use Context

**Files:**
- Modify: `src/components/FilterBar.tsx`

- [ ] **Step 1: Refactor FilterBar to use useFilter hook**

Replace entire `src/components/FilterBar.tsx` with:

```tsx
import type { Project } from '../types';
import { useFilter } from '../contexts/AppContext';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  projects: Project[];
}

export default function FilterBar({ categories, projects }: FilterBarProps) {
  const { activeCategory, setActiveCategory } = useFilter();

  const count = (cat: string) =>
    cat === '全部' ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <nav className={styles.bar}>
      <div className={styles.inner}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              className={`${styles.btn} ${isActive ? styles.btnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <span className={`${styles.count} ${isActive ? styles.countActive : ''}`}>
                {count(cat)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
```

Note: `FilterBarProps` simplified — removed `activeCategory` and `onSelect` props since they now come from context.

- [ ] **Step 2: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/components/FilterBar.tsx
git commit -m "refactor: FilterBar uses useFilter context hook"
```

---

## Task 10: Rewire App.tsx with Router + Context + Search

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Rewrite App.tsx**

Replace entire `src/App.tsx` with:

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import projectsData from './data/projects.json';
import type { Project } from './types';
import { AppProvider, useFilter, useSearch } from './contexts/AppContext';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import SearchBar, { NoResults } from './components/SearchBar';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import './styles/global.css';

const projects = projectsData as Project[];
const categories = ['全部', ...Array.from(new Set(projects.map((p) => p.category)))];

function HomePage() {
  const { activeCategory } = useFilter();
  const { searchQuery } = useSearch();

  const filtered = projects
    .filter((p) => activeCategory === '全部' || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <div>
      <Hero projects={projects} />
      <SearchBar />
      <FilterBar categories={categories} projects={projects} />
      <main className="portfolio-main" style={{ padding: '48px 40px 100px', maxWidth: 1400, margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: 28,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </main>
      <Footer projectCount={projects.length} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
```

- [ ] **Step 2: Verify dev server starts**

```bash
cd "C:/My Source/portfolio-site" && npm run dev -- --host 2>&1 | head -10
```

Expected: Vite dev server starts on port 3001 with no errors

- [ ] **Step 3: Verify build succeeds**

```bash
cd "C:/My Source/portfolio-site" && npm run build 2>&1 | tail -10
```

Expected: Build completes with no errors

- [ ] **Step 4: Commit**

```bash
cd "C:/My Source/portfolio-site"
git add src/App.tsx
git commit -m "feat: Rewire App with HashRouter, AppContext, SearchBar integration"
```

---

## Task 11: Manual Verification Checklist

- [ ] **Step 1: Start dev server and verify all features**

```bash
cd "C:/My Source/portfolio-site" && npm run dev
```

Open http://localhost:3001/portfolio-site/ and verify:

1. **Home page loads** — Hero, SearchBar, FilterBar, ProjectCards all visible
2. **Search** — Type "react" → only React projects shown. Type nonsense → "找不到符合的專案". Click ✕ → clears search
3. **Filter + Search combo** — Select "企業管理" then search "smart" → only SmartGantt
4. **Card expand** — Click a card → expands with description + "查看詳情 →" button
5. **Detail page** — Click "查看詳情 →" → slides to detail page with project info. Click "← 返回作品集" → back to list
6. **Theme toggle** — Click ☀️ button → light theme (淺灰底, 柔和紫 accent). Click 🌙 → back to dark. Refresh → theme persists
7. **404** — Navigate to `#/project/nonexistent` → shows 404 + back button
8. **Mobile** — Resize to ≤768px → single column, all elements responsive

- [ ] **Step 2: Verify build**

```bash
cd "C:/My Source/portfolio-site" && npm run build && npm run preview
```

Open preview URL and verify same features work in production build.

- [ ] **Step 3: Final commit (if any fixes needed)**

```bash
cd "C:/My Source/portfolio-site"
git add -A
git commit -m "fix: Address verification issues"
```

---

## Task 12: Update Docs and Push

**Files:**
- Modify: `CHANGELOG.md`
- Modify: `ROADMAP.md`
- Modify: `package.json` (version bump to 2.0.0)

- [ ] **Step 1: Bump version in package.json**

Change `"version": "1.0.0"` to `"version": "2.0.0"` in `package.json`.

- [ ] **Step 2: Update CHANGELOG.md**

Add new entry at top (after header):

```markdown
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
```

- [ ] **Step 3: Update ROADMAP.md**

Mark v2.0 features as completed:
- `[x] 搜尋功能`
- `[x] 專案詳情頁`
- `[x] 深色/淺色主題切換`

Update version table: `v2.0` status → `✅ 已完成`

- [ ] **Step 4: Commit and push**

```bash
cd "C:/My Source/portfolio-site"
git add package.json CHANGELOG.md ROADMAP.md
git commit -m "docs: Update CHANGELOG, ROADMAP, bump version to 2.0.0"
git push origin master
```
