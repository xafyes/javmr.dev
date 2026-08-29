const GROUPS = [
  { label: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'C++'] },
  { label: 'Backend & API', items: ['Node.js', '.NET Framework', 'REST APIs', 'Django', 'FastAPI', 'Nest.js'] },
  { label: 'Cloud & datos', items: ['Azure', 'AWS', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Aurora RDS'] },
  {
    label: 'Frameworks & herramientas',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'Git', 'GitHub Actions', 'Azure DevOps', 'Claude · Codex'],
  },
];

export default function Skills() {
  return (
    <section className="section">
      <span className="section-eyebrow">05 — Skills</span>
      <h2 className="section-heading">Stack técnico</h2>
      <div className="skills-grid">
        {GROUPS.map((g, i) => (
          <div className="skill-card" key={g.label} style={{ animationDelay: `${0.04 + i * 0.08}s` }}>
            <div className="skill-label">{g.label}</div>
            <div className="skill-tags">
              {g.items.map((item) => (
                <span className="skill-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
