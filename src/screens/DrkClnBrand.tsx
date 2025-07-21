import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MatrixCodeBackground } from '../components/drkcln/MatrixCodeBackground';
import { HeroSection } from '../components/drkcln/HeroSection';
import { ProductsSection } from '../components/drkcln/ProductsSection';
import { AboutSection } from '../components/drkcln/AboutSection';
import { PhilosophySection } from '../components/drkcln/PhilosophySection';
import { CollectionsSection } from '../components/drkcln/CollectionsSection';
import { StoreLocationsSection } from '../components/drkcln/StoreLocationsSection';
import { NewsletterSection } from '../components/drkcln/NewsletterSection';
import { ContactSection } from '../components/drkcln/ContactSection';
import { Footer } from '../components/drkcln/Footer';
// @ts-ignore
import appleModelUrl from '../assets/w.glb';
// import appleModelUrl from '../assets/snes_pal_controller.glb'
// import appleModelUrl from '../assets/apple.glb'
import '../drkcln.scss';

const DrkClnBrand: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number>(0);
  const modelRef = useRef<THREE.Object3D | null>(null);

  // Setup and animate 3D scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Add ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ff00, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load and position a 3D model
    const loader = new GLTFLoader();
    loader.load(
      appleModelUrl,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );

    // Add a particle system for a digital rain effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation function
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }

      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);

      if (rendererRef.current) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="drkcln-page relative min-h-screen overflow-x-hidden bg-black font-mono text-green-400">
      <div className="z-50 p-4">
        <a
          href="https://niemo.io"
          className="rounded bg-green-800 px-4 py-2 text-green-400 hover:bg-green-700"
        >
          niemo.io
        </a>
      </div>
      {/* Matrix code background */}
      <MatrixCodeBackground />

      {/* 3D scene container */}
      <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <PhilosophySection />
        <ProductsSection />
        <CollectionsSection />
        <StoreLocationsSection />
        <NewsletterSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default DrkClnBrand;
