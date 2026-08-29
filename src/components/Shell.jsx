import OrbitalNav from './OrbitalNav';
import Inicio from './sections/Inicio';
import Sobre from './sections/Sobre';
import Experiencia from './sections/Experiencia';
import Proyectos from './sections/Proyectos';
import Skills from './sections/Skills';
import Contacto from './sections/Contacto';

function renderSection(section, onSelectSection) {
  switch (section) {
    case 'inicio':
      return <Inicio onGoProy={() => onSelectSection('proy')} onGoContacto={() => onSelectSection('contacto')} />;
    case 'sobre':
      return <Sobre />;
    case 'exp':
      return <Experiencia />;
    case 'proy':
      return <Proyectos />;
    case 'skills':
      return <Skills />;
    case 'contacto':
      return <Contacto />;
    default:
      return null;
  }
}

export default function Shell({ themeLabel, section, onSelectSection, onToggleTheme, onBack }) {
  return (
    <div className="shell">
      <div className="shell-tint" />

      <header className="shell-header">
        <button className="brand" onClick={onBack}>
          <span className="brand-badge">JM</span>
          Javiera Miranda
        </button>
        <button className="theme-toggle theme-toggle--shell" onClick={onToggleTheme}>
          <span className="theme-dot" />
          {themeLabel}
        </button>
      </header>

      <main className="shell-main" data-scroll="1">
        <div className="shell-content" key={section}>
          {renderSection(section, onSelectSection)}
        </div>
      </main>

      <OrbitalNav section={section} onSelectSection={onSelectSection} />
    </div>
  );
}
