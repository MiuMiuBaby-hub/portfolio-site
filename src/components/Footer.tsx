import styles from './Footer.module.css';

interface FooterProps {
  projectCount: number;
}

export default function Footer({ projectCount }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Built with ♥ — {projectCount} Projects</span>
        <span className={styles.dot}>·</span>
        <span>MiuMiu's Dev Portfolio</span>
        <span className={styles.dot}>·</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
