import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BackgroundSceneProps {
  compact: boolean;
  highFreqPowerRef: React.MutableRefObject<number>;
  lowFreqPowerRef: React.MutableRefObject<number>;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const getSaveDataPreference = (): boolean => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
};

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ compact, highFreqPowerRef, lowFreqPowerRef, audioRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = getSaveDataPreference();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(750, window.innerWidth / window.innerHeight, 0.2, 10000);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !compact && !saveData,
        alpha: true,
        powerPreference: compact || saveData ? 'low-power' : 'high-performance',
        failIfMajorPerformanceCaveat: true,
      });
    } catch {
      return;
    }

    const pixelRatioCap = compact || saveData ? 1 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const globalX = compact ? 0 : -window.innerWidth / 30;
    const geometry = new THREE.IcosahedronGeometry(50, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      metalness: 0.5,
      roughness: 0.5,
    });
    const shape = new THREE.Mesh(geometry, material);
    shape.position.x = globalX;
    scene.add(shape);

    camera.position.set(compact ? 0 : 30, compact ? 0 : 20, 150);

    const baseIntensity = compact ? 0.7 : 0.4;
    const pointLightRed = new THREE.PointLight(0xff0000, baseIntensity);
    pointLightRed.position.set(500 + globalX, 1000, -5);
    scene.add(pointLightRed);

    const pointLightGreen = new THREE.PointLight(0x00ff00, baseIntensity);
    pointLightGreen.position.set(550 + globalX, 1000, -150);
    scene.add(pointLightGreen);

    const pointLightBlue = new THREE.PointLight(0x0000ff, baseIntensity);
    pointLightBlue.position.set(600 + globalX, 1000, -5);
    scene.add(pointLightBlue);
    scene.add(new THREE.AmbientLight(0xffffff, 0));

    const mouseTarget = new THREE.Vector2();
    const mouseSmoothed = new THREE.Vector2();
    let scrollTarget = 0;
    let scrollSmoothed = 0;
    let lowerPowerAccumulated = 0;
    let upperPowerAccumulated = 0;
    let frame = 0;
    let frameRequest = 0;
    let resizeRequest = 0;
    let lastRenderTime = 0;
    const targetFps = compact || saveData ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    const scrollElement = document.querySelector<HTMLElement>('.App');

    const renderFrame = (time: number) => {
      frameRequest = window.requestAnimationFrame(renderFrame);
      if (time - lastRenderTime < frameInterval) return;

      const elapsedFrames = Math.min((time - lastRenderTime) / (1000 / 60), 4);
      lastRenderTime = time;
      frame += elapsedFrames;
      scrollSmoothed += (scrollTarget - scrollSmoothed) * 0.05;
      mouseSmoothed.lerp(mouseTarget, 0.05);
      shape.rotation.z += (scrollSmoothed * 0.001 - shape.rotation.z) * 0.05;

      if (!audioRef.current || audioRef.current.paused) {
        shape.rotation.x += (20 * Math.sin(frame * 0.0093) + mouseSmoothed.x - shape.rotation.x) * 0.00005;
        shape.rotation.y += (20 * Math.sin(frame * 0.007) + mouseSmoothed.y - shape.rotation.y) * 0.00005;
      } else {
        lowerPowerAccumulated = (lowerPowerAccumulated + Math.pow(highFreqPowerRef.current, 2) * 0.0005) % 360;
        upperPowerAccumulated = (upperPowerAccumulated + Math.pow(lowFreqPowerRef.current, 3) * 0.002) % 360;
        shape.rotation.x = shape.rotation.x * 0.5 + lowerPowerAccumulated * 0.5;
        shape.rotation.y = shape.rotation.y * 0.5 + upperPowerAccumulated * 0.5;
        pointLightRed.intensity = pointLightRed.intensity * 0.5 + (0.5 + highFreqPowerRef.current * 0.2) * 0.5;
        pointLightBlue.intensity = pointLightBlue.intensity * 0.5 + (0.5 + lowFreqPowerRef.current * 0.2) * 0.5;
        pointLightGreen.intensity = (pointLightBlue.intensity + pointLightRed.intensity) / 2;
      }

      renderer.render(scene, camera);
    };

    const startRendering = () => {
      if (frameRequest || document.hidden || prefersReducedMotion) return;
      lastRenderTime = performance.now() - frameInterval;
      frameRequest = window.requestAnimationFrame(renderFrame);
    };

    const stopRendering = () => {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stopRendering();
      else startRendering();
    };

    const onResize = () => {
      window.cancelAnimationFrame(resizeRequest);
      resizeRequest = window.requestAnimationFrame(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseTarget.set((event.clientX / window.innerWidth - 0.5) * 20, (0.5 - event.clientY / window.innerHeight) * 20);
    };

    const onScroll = () => {
      scrollTarget = scrollElement?.scrollTop ?? window.scrollY;
    };

    window.addEventListener('resize', onResize, { passive: true });
    if (!compact) window.addEventListener('mousemove', onMouseMove, { passive: true });
    (scrollElement ?? window).addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (prefersReducedMotion) renderer.render(scene, camera);
    else startRendering();

    return () => {
      stopRendering();
      window.cancelAnimationFrame(resizeRequest);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      (scrollElement ?? window).removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [audioRef, compact, highFreqPowerRef, lowFreqPowerRef]);

  return <div className="fixed inset-0 -z-10 h-full w-full" ref={containerRef} />;
};

export default BackgroundScene;
