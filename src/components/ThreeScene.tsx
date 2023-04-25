// ThreeScene.tsx
import React, { useEffect, useRef } from 'react';
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface ThreeSceneProps {}

const ThreeScene: React.FC<ThreeSceneProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    // ... (all other code snippets except the animation loop and event listeners)

    // Scroll Animation
    const onScroll = () => {
      // ... (moveCamera function body)
    };

    document.body.addEventListener('scroll', onScroll);

    // Animation Loop
    const animate = () => {
      // ... (animate function body)

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas id="bg" ref={canvasRef} />;
};

export default ThreeScene;
