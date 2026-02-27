import type { Project } from '../types';
import styles from './Hero.module.css';

interface HeroProps {
  projects: Project[];
}

export default function Hero({ projects }: HeroProps) {
  const activeCount = projects.filter((p) => p.status === 'active').length;
  const categoryCount = new Set(projects.map((p) => p.category)).size;
  const techCount = new Set(projects.flatMap((p) => p.tech)).size;

  return (
    <header className={styles.hero}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <p className={`${styles.label} fade-up`}>PORTFOLIO · 作品集</p>
        <h1 className={`${styles.title} fade-up`} style={{ animationDelay: '0.1s' }}>
          <span className="gradient-text" style={{ fontStyle: 'italic' }}>
            MiuMiu
          </span>
          <br />
          Dev Works
        </h1>
        <p className={`${styles.subtitle} fade-up`} style={{ animationDelay: '0.2s' }}>
          {projects.length} 個專案 · 涵蓋企業管理、工程工具、AI、
          <br />
          開發者工具與更多領域
        </p>

        <div className={`${styles.stats} fade-up`} style={{ animationDelay: '0.35s' }}>
          {[
            { n: activeCount, l: '運行中' },
            { n: categoryCount, l: '領域' },
            { n: techCount, l: '技術' },
          ].map((s) => (
            <div key={s.l} className={styles.stat}>
              <span className={styles.statNum}>{s.n}</span>
              <span className={styles.statLabel}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.divider} />
    </header>
  );
}
