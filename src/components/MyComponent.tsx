import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useEffect, useRef } from 'react';
import React from 'react';

export interface MyThreeProps {}

const MyThree: React.FC<MyThreeProps> = () => {
  const refContainer = useRef<any>(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    const loader = new GLTFLoader();

    loader.load(
      './assets/niemblender.glb',
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    var camera: any = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    camera.position.z = 30;

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(50, 10, 15);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.01;
    scene.add(pointLight);
    scene.add(ambientLight);

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    var animate = function () {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.001;
      torus.rotation.z += 0.002;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={refContainer}></div>;
};

export default MyThree;
