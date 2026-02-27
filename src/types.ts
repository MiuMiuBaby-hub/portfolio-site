export interface ProjectLinks {
  demo?: string;
  github?: string;
  docs?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  category: string;
  status: 'active' | 'draft' | 'archived';
  version?: string;
  folder: string;
  icon: string;
  links: ProjectLinks;
  screenshot?: string;  // 檔名，放在 public/screenshots/ 下
}

export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active:   { label: '運行中', color: '#34d399' },
  draft:    { label: '開發中', color: '#fbbf24' },
  archived: { label: '已封存', color: '#94a3b8' },
};
