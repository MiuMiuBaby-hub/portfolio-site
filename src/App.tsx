import { useState } from 'react';
import projectsData from './data/projects.json';
import type { Project } from './types';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';
import './styles/global.css';

const projects = projectsData as Project[];
const categories = ['全部', ...Array.from(new Set(projects.map((p) => p.category)))];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filtered =
    activeCategory === '全部'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div>
      <Hero projects={projects} />
      <FilterBar
        categories={categories}
        activeCategory={activeCategory}
        projects={projects}
        onSelect={setActiveCategory}
      />
      <main style={{ padding: '40px 24px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </main>
      <Footer projectCount={projects.length} />
    </div>
  );
}
