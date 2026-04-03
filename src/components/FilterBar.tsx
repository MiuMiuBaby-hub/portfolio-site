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
