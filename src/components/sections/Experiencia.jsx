const JOBS = [
  {
    title: 'Full Stack Software Engineer',
    company: 'Microsystem SA',
    date: 'Dic 2025 — Actualidad',
    bullets: [
      'Planificación, desarrollo y soporte de aplicaciones web sobre AWS, Next.js, Nest.js y PostgreSQL.',
      'Contacto directo con clientes para toma de requerimientos y soporte.',
      'Jefatura de dos proyectos y relatoría de cursos de IA para la CChC.',
    ],
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'T4G SpA',
    date: 'Jul 2025 — Dic 2025',
    bullets: [
      'Mantención y mejoras en plataforma de gestión de instrumentos mineros (Angular + Python).',
      'Optimización del flujo de soporte y servicios socket en tiempo real.',
      'Migración de servicios de AWS a Azure.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Voultech',
    date: 'Jul 2024 — Jul 2025',
    bullets: [
      'REST API de alto rendimiento para servicios financieros.',
      'Implementación y optimización de Azure Functions, mejorando la ejecución en la nube.',
      'Backend con Python, C# y SQL Server; bases relacionales y no relacionales.',
    ],
  },
  {
    title: 'Software Engineer freelance',
    company: 'Trupam',
    date: 'Ene 2022 — Actualidad',
    bullets: ['Desarrollo de la plataforma web con React.js y Vite.', 'Consultoría y soporte continuo.'],
  },
];

export default function Experiencia() {
  return (
    <section className="section">
      <span className="section-eyebrow">03 — Experiencia</span>
      <h2 className="section-heading">Trayectoria</h2>
      <div className="timeline">
        {JOBS.map((job, i) => (
          <article className="job-card" key={job.company} style={{ animationDelay: `${0.04 + i * 0.08}s` }}>
            <div className="job-head">
              <h3 className="job-title">
                {job.title} <span>· {job.company}</span>
              </h3>
              <span className="job-date">{job.date}</span>
            </div>
            <ul className="job-list">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
