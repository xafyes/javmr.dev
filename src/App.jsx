import { useCallback, useEffect, useRef, useState } from 'react';
import Cover from './components/Cover';
import Shell from './components/Shell';
import { THEMES, SECTIONS } from './theme';
import { useHeartScene } from './hooks/useHeartScene';
import './App.css';

function App() {
  const [theme, setTheme] = useState('burdeos');
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState('inicio');
  const canvasRef = useRef(null);
  const sceneRef = useHeartScene(canvasRef, theme);

  useEffect(() => {
    sceneRef.current?.setTheme(theme);
  }, [theme, sceneRef]);

  useEffect(() => {
    sceneRef.current?.setEntered(entered);
  }, [entered, sceneRef]);

  useEffect(() => {
    const onKey = (e) => {
      if (!entered) {
        if (e.key === 'Enter' || e.key === ' ') setEntered(true);
        return;
      }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= SECTIONS.length) setSection(SECTIONS[n - 1].id);
      if (e.key === 'Escape') setEntered(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [entered]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'burdeos' ? 'marino' : 'burdeos'));
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sceneRef.current?.setPointerTarget((e.clientX / w) * 2 - 1, (e.clientY / h) * 2 - 1);
    },
    [sceneRef]
  );

  const th = THEMES[theme];

  return (
    <div className="page" data-theme={theme} onMouseMove={handlePointerMove}>
      <div className="scene-wrap">
        <canvas ref={canvasRef} className="scene-canvas" />
        <div className="scene-vignette" />

        {!entered ? (
          <Cover themeLabel={th.label} onToggleTheme={toggleTheme} onEnter={() => setEntered(true)} />
        ) : (
          <Shell
            themeLabel={th.label}
            section={section}
            onSelectSection={setSection}
            onToggleTheme={toggleTheme}
            onBack={() => setEntered(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
