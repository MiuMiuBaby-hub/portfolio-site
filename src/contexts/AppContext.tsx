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
