const PROJECTS = [
  {
    tag: 'Red social',
    title: 'Claexy',
    desc: 'Red social de hobbies: perfiles, comunidades e intereses compartidos. Diseño, arquitectura y desarrollo completo.',
    stack: ['React', 'Node.js', 'MongoDB'],
    url: 'claexy.com',
    href: 'https://claexy.com',
  },
  {
    tag: 'Turismo',
    title: 'Sorbac',
    desc: 'Sitio corporativo para empresa de turismo: catálogo de servicios, contacto y presencia de marca.',
    stack: ['React', 'Vite'],
    url: 'sorbac.cl',
    href: 'https://sorbac.cl',
  },
  {
    tag: 'Educación',
    title: 'Trupam',
    desc: 'Web de colegio y jardín infantil: información institucional, admisión y comunicación con apoderados. Mantención continua desde 2022.',
    stack: ['React', 'Vite', 'Freelance'],
    url: 'trupam.cl',
    href: 'https://trupam.cl',
  },
  {
    tag: 'Marketing',
    title: 'Serendipia MKT',
    desc: 'Plataforma web para agencia de marketing: servicios, portafolio de campañas y captación de leads.',
    stack: ['Next.js', 'TypeScript'],
    url: 'tu.serendipiamkt.com',
    href: 'https://tu.serendipiamkt.com',
  },
];

export default function Proyectos() {
  return (
    <section className="section">
      <span className="section-eyebrow">04 — Proyectos</span>
      <div className="projects-head">
        <h2 className="section-heading">Productos propios</h2>
        <span className="projects-count">4 en línea</span>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener"
            className="project-card"
            style={{ animationDelay: `${0.04 + i * 0.08}s` }}
          >
            <div className="project-top">
              <span className="project-tag">{p.tag}</span>
              <span className="project-arrow">↗</span>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-stack">
              {p.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <span className="project-url">{p.url}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
