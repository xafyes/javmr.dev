export default function Sobre() {
  return (
    <section className="section">
      <span className="section-eyebrow">02 — Sobre mí</span>
      <div className="about-grid">
        <div className="about-col">
          <h2 className="section-heading">Autónoma, curiosa y obsesiva con el detalle.</h2>
          <p className="about-text">
            Ingeniera Civil Informática con experiencia en desarrollo full stack y gestión de proyectos usando .NET,
            Python, Angular y React. Gestiono proyectos y tareas de forma autónoma, me adapto rápido a nuevas
            tecnologías y entornos, y trabajo orientada a la mejora continua.
          </p>
          <p className="about-text">
            Me muevo cómoda entre la conversación con el cliente y la consola: levanto requerimientos, propongo la
            arquitectura, la implemento y me quedo a sostenerla.
          </p>
        </div>
        <div className="info-col">
          <div className="info-card">
            <div className="info-label">Educación</div>
            <div className="info-title">Ingeniería Civil Informática</div>
            <div className="info-sub">
              Universidad Nacional Andrés Bello
              <br />
              Marzo 2019 — Junio 2024
            </div>
          </div>
          <div className="info-card">
            <div className="info-label">Contexto</div>
            <div className="info-sub info-sub--loose">
              Español nativo · Inglés B2
              <br />
              Conchalí, Santiago de Chile
              <br />
              Disponible para remoto e híbrido
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
