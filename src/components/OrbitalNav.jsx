import { SECTIONS } from '../theme';

export default function OrbitalNav({ section, onSelectSection }) {
  const activeIndex = SECTIONS.findIndex((s) => s.id === section);
  const active = SECTIONS[activeIndex];

  return (
    <nav className="dot-nav">
      <div className="dot-nav-arc">
        {SECTIONS.map((sec, i) => {
          const p = i / (SECTIONS.length - 1);
          const x = 8 + p * 84;
          const y = 50 - Math.sin(p * Math.PI) * 36;
          const isActive = sec.id === section;
          return (
            <button
              key={sec.id}
              className="dot-nav-btn"
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={sec.label}
              onClick={() => onSelectSection(sec.id)}
            >
              <span className={`dot-nav-dot${isActive ? ' is-active' : ''}`} />
            </button>
          );
        })}
      </div>
      <div className="dot-nav-status">
        <span className="dot-nav-index">{String(activeIndex + 1).padStart(2, '0')} / 06</span>
        <span className="dot-nav-sep" />
        <span className="dot-nav-label">{active.label}</span>
      </div>
    </nav>
  );
}
