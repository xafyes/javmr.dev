export default function Cover({ themeLabel, onToggleTheme, onEnter }) {
  return (
    <div className="cover">
      <div className="cover-glow" />
      <div className="cover-top">
        <div className="cover-loc">Santiago · Chile</div>
        <button className="theme-toggle" onClick={onToggleTheme}>
          <span className="theme-dot" />
          {themeLabel}
        </button>
      </div>

      <div className="cover-center">
        <div className="cover-kicker">Software Engineer · Full Stack</div>
        <h1 className="cover-title">
          Javiera
          <br />
          <em>Miranda</em>
        </h1>
        <p className="cover-desc">
          Ingeniera Civil Informática construyendo productos web de punta a punta: arquitectura, backend, interfaz y
          todo el detalle intermedio.
        </p>
        <button className="enter-btn" onClick={onEnter}>
          <span>Entrar al portafolio</span>
          <span className="enter-btn-icon">
            →<span className="enter-btn-ring" />
          </span>
        </button>
      </div>

      <div className="cover-bottom">
        <div className="cover-tags">
          <span>4+ años</span>
          <span>.NET · Python · React</span>
          <span>AWS · Azure</span>
        </div>
        <div className="cover-hint">Mueve el cursor</div>
      </div>
    </div>
  );
}
