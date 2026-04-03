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
