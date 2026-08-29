export default function Contacto() {
  return (
    <section className="section">
      <span className="section-eyebrow">06 — Contacto</span>
      <h2 className="contact-heading">
        Conversemos
        <br />
        sobre tu próximo
        <br />
        <em>producto.</em>
      </h2>
      <p className="contact-text">
        Disponible para roles full stack, consultoría y proyectos freelance. Modalidad remota o híbrida desde
        Santiago de Chile.
      </p>
      <div className="contact-grid">
        <a href="mailto:javiera.mirand.riv@gmail.com" className="contact-card contact-card--email">
          <span className="contact-card-label">Email</span>
          <span className="contact-card-value contact-card-value--email">javiera.mirand.riv@gmail.com</span>
        </a>
        <div className="contact-card">
          <span className="contact-card-label">Ubicación</span>
          <span className="contact-card-value">Conchalí, Santiago · Chile</span>
        </div>
      </div>
    </section>
  );
}
