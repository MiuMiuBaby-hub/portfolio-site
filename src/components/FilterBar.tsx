import type { Project } from '../types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  projects: Project[];
  onSelect: (cat: string) => void;
}

export default function FilterBar({ categories, activeCategory, projects, onSelect }: FilterBarProps) {
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
              onClick={() => onSelect(cat)}
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
