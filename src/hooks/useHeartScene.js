import { useEffect, useRef } from 'react';
import { HeartScene } from '../three/heartScene';

export function useHeartScene(canvasRef, initialTheme) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new HeartScene(canvas, initialTheme);
    sceneRef.current = scene;

    const onResize = () => scene.resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      scene.destroy();
      sceneRef.current = null;
    };
    // Only rebuild the scene if the canvas element itself changes; theme and
    // entered state are pushed onto the existing instance via setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  return sceneRef;
}
