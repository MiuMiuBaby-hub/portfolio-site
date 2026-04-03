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
