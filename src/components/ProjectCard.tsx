import { useState } from 'react';
import type { Project } from '../types';
import { STATUS_CONFIG } from '../types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[project.status];

  const hasLinks = project.links && Object.values(project.links).some(Boolean);

  return (
    <article
      className={`${styles.card} fade-up`}
      style={{ animationDelay: `${0.05 * index}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent line */}
      <div className={`${styles.accent} ${hovered ? styles.accentVisible : ''}`} />

      {/* Header */}
      <div className={styles.header}>
        <span className={hovered ? `${styles.icon} icon-float` : styles.icon}>
          {project.icon}
        </span>
        <div style={{ flex: 1 }}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.name}</h3>
            {project.version && <span className={styles.version}>{project.version}</span>}
          </div>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>
      </div>

      {/* Status row */}
      <div className={styles.statusRow}>
        <span
          className={styles.dot}
          style={{ background: status.color, boxShadow: `0 0 6px ${status.color}50` }}
        />
        <span className={styles.statusText} style={{ color: status.color }}>
          {status.label}
        </span>
        <span className={styles.folder}>📁 {project.folder}</span>
      </div>

      {/* Expandable description */}
      <div
        className={styles.expandContent}
        style={{ maxHeight: expanded ? '300px' : '0px', opacity: expanded ? 1 : 0 }}
      >
        <p className={styles.desc}>{project.description}</p>

        {/* Screenshot */}
        {project.screenshot && (
          <img
            src={`/screenshots/${project.screenshot}`}
            alt={project.name}
            className={styles.screenshot}
          />
        )}

        {/* Links */}
        {hasLinks && (
          <div className={styles.linksRow}>
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener" className={styles.link}
                onClick={(e) => e.stopPropagation()}>
                🔗 Demo
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener" className={styles.link}
                onClick={(e) => e.stopPropagation()}>
                💻 GitHub
              </a>
            )}
            {project.links.docs && (
              <a href={project.links.docs} target="_blank" rel="noopener" className={styles.link}
                onClick={(e) => e.stopPropagation()}>
                📖 Docs
              </a>
            )}
            {project.links.skill && (
              <a href={project.links.skill} target="_blank" rel="noopener" className={styles.link}
                onClick={(e) => e.stopPropagation()}>
                🧩 Skill
              </a>
            )}
          </div>
        )}
      </div>

      {/* Tech tags */}
      <div className={styles.techRow}>
        {project.tech.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      {/* Expand hint */}
      <div className={`${styles.hint} ${hovered ? styles.hintVisible : ''}`}>
        {expanded ? '▲ 收合' : '▼ 展開詳情'}
      </div>
    </article>
  );
}
