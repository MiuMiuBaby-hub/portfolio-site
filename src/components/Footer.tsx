import styles from './Footer.module.css';
import { VERSION_LABEL, APP_VERSION, GIT_COMMIT, BUILD_DATE } from '@/lib/version';

interface FooterProps {
  projectCount: number;
}

export default function Footer({ projectCount }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Built with <span className={styles.heart}>♥</span> — {projectCount} Projects</span>
        <span className={styles.dot}>·</span>
        <span>MiuMiu's Dev Portfolio</span>
        <span className={styles.dot}>·</span>
        <span>{new Date().getFullYear()}</span>
      </div>
      <div
        className={styles.version}
        title={`Version: ${APP_VERSION}\nCommit: ${GIT_COMMIT}\nBuilt: ${new Date(BUILD_DATE).toLocaleString()}`}
      >
        {VERSION_LABEL}
      </div>
    </footer>
  );
}
