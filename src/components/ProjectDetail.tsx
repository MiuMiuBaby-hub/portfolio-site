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
