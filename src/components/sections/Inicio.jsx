const STATS = [
  { num: '4+', label: 'años construyendo software' },
  { num: '4', label: 'productos propios en línea' },
  { num: '2', label: 'proyectos bajo mi jefatura' },
  { num: 'B2', label: 'inglés profesional' },
];

export default function Inicio({ onGoProy, onGoContacto }) {
  return (
    <section className="section">
      <div className="hero-grid">
        <div className="hero-col">
          <span className="section-eyebrow">01 — Inicio</span>
          <h2 className="hero-heading">
            Diseño sistemas
            <br />
            que se sienten
            <br />
            <em>bien hechos.</em>
          </h2>
          <p className="hero-text">
            Full stack con foco en producto: APIs de alto rendimiento, integraciones cloud y front-ends cuidados
            hasta el último detalle. Hoy lidero dos proyectos en Microsystem SA y mantengo mis propios productos en
            producción.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onGoProy}>
              Ver proyectos
            </button>
            <button className="btn-secondary" onClick={onGoContacto}>
              Contacto
            </button>
          </div>
        </div>
        <div className="stat-grid">
          {STATS.map((s, i) => (
            <div className="stat-card" key={s.label} style={{ animationDelay: `${0.08 * i}s` }}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
