import { HashRouter, Routes, Route } from 'react-router-dom';
import projectsData from './data/projects.json';
import type { Project } from './types';
import { AppProvider, useFilter, useSearch } from './contexts/AppContext';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import SearchBar, { NoResults } from './components/SearchBar';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import './styles/global.css';

const projects = projectsData as Project[];
const categories = ['全部', ...Array.from(new Set(projects.map((p) => p.category)))];

function HomePage() {
  const { activeCategory } = useFilter();
  const { searchQuery } = useSearch();

  const filtered = projects
    .filter((p) => activeCategory === '全部' || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      );
    });

  return (
    <div>
      <Hero projects={projects} />
      <SearchBar />
      <FilterBar categories={categories} projects={projects} />
      <main className="portfolio-main" style={{ padding: '48px 40px 100px', maxWidth: 1400, margin: '0 auto' }}>
        {filtered.length > 0 ? (
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: 28,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <NoResults />
        )}
      </main>
      <Footer projectCount={projects.length} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
