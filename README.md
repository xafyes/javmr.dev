# Javiera Miranda — Portafolio

Portafolio de Javiera Miranda, Software Engineer full stack. React + Vite, con una portada 3D animada
(three.js: una masa orgánica con forma abstracta de corazón, deformada en tiempo real) y navegación por
un menú orbital de seis secciones (Inicio, Sobre mí, Experiencia, Proyectos, Skills, Contacto).

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estructura

- `src/App.jsx` — estado global (tema, sección activa, portada/entrada) y atajos de teclado (1–6, Esc).
- `src/three/heartScene.js` — escena three.js (geometría deformada, órbitas de satélites, polvo estelar).
- `src/hooks/useHeartScene.js` — hook que monta/limpia la escena en el canvas.
- `src/components/` — portada, header, navegación orbital y las seis secciones de contenido.
- `src/theme.js` — paletas Burdeos / Azul marino y definición de secciones.

El botón de tema en la portada y en el header alterna en vivo entre las paletas **Burdeos** y
**Azul marino**; el color de la escena 3D cambia junto con la interfaz.
