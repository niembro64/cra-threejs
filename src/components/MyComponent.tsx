import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useEffect, useRef } from 'react';
import React from 'react';

export interface MyThreeProps {}

const MyThree: React.FC<MyThreeProps> = () => {
  const refContainer = useRef<any>(null);
  const boyRef = useRef<any>(null);
  const mousePositionCurr = useRef(new THREE.Vector3());
  const mousePositionPrev = useRef(new THREE.Vector3());
  const scrollPosition = useRef(0);

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
    // const geometry = new THREE.BoxGeometry(150, 100, 128, 128, Math.PI * 2);
    // const geometry = new THREE.TorusGeometry(150, 100, 128, 128, Math.PI * 2);
    // const geometry = new THREE.TorusKnotGeometry(90, 50, 1280, 1280, Math.PI * 2);
    // const geometry = new THREE.SphereGeometry(90, 50, 1280, 1280, Math.PI * 2);
    // const geometry = new THREE.CylinderGeometry(90, 90, 1280, 1280, Math.PI * 2);
    // const geometry = new THREE.ConeGeometry(90, 1280, 1280, 1280, Math.PI * 2);
    const geometry = new THREE.IcosahedronGeometry(90, 1);

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    camera.position.z = 150;

    const pointLight = new THREE.PointLight(0x00ffff);
    pointLight.position.set(0, 400, -100);
    const pointLight2 = new THREE.PointLight(0xff00ff);
    pointLight2.position.set(0, -400, -100);

    // const pointLight = new THREE.PointLight(0x00ffff);
    // pointLight.position.set(-600, 100, -300);
    // const pointLight2 = new THREE.PointLight(0xff00ff);
    // pointLight2.position.set(-200, -200, -100);
    // const pointLight3 = new THREE.PointLight(0xffff00);
    // pointLight2.position.set(0, 0, -1000);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0;
    pointLight.intensity = 1;
    // pointLight3.intensity = 1;
    scene.add(pointLight);
    scene.add(pointLight2);
    // scene.add(pointLight3);
    scene.add(ambientLight);

    // Create a function to convert screen coordinates to 3D scene coordinates
    const getScenePositionFromScreen = (
      x: number,
      y: number
    ): THREE.Vector3 => {
      const vec = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        (-y / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(distance));
    };

    // Add mousemove event listener
    const onMouseMove = (event: MouseEvent) => {
      const scenePosition = getScenePositionFromScreen(
        event.clientX,
        event.clientY
      );
      mousePositionCurr.current = scenePosition;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add wheel event listener
    const onWheel = (event: WheelEvent) => {
      // Normalize wheel movement (inverted)
      const wheelDelta = -event.deltaY * 0.01;

      // Accumulate wheel movement to control the Z position
      scrollPosition.current += wheelDelta;

      // Clamp the scrollPosition to a range suitable for controlling the Z position
      const scrollRange = { min: -6000, max: 0 };
      scrollPosition.current = Math.max(
        Math.min(scrollPosition.current, scrollRange.max),
        scrollRange.min
      );

      boyRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
    };

    window.addEventListener('wheel', onWheel);

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    let x = 0.000093;
    let y = 0.00007;
    let z = 0.0001;

    const percentKeep = 0.99995;
    const percentKeepMouse = 0.99;

    var animate = function () {
      requestAnimationFrame(animate);
      // torus.rotation.x += x;
      // torus.rotation.y += y;
      // torus.rotation.z += z;

      mousePositionPrev.current.x =
        percentKeepMouse * mousePositionPrev.current.x +
        (1 - percentKeepMouse) * mousePositionCurr.current.x;
      mousePositionPrev.current.y =
        percentKeepMouse * mousePositionPrev.current.y +
        (1 - percentKeepMouse) * mousePositionCurr.current.y;
      mousePositionPrev.current.z =
        percentKeepMouse * mousePositionPrev.current.z +
        (1 - percentKeepMouse) * mousePositionCurr.current.z;

      // torus.position.z = mousePositionPrev.current.z;

      const date = Date.now();

      // pointLight.position.x += 10 * Math.sin(date * y);
      // pointLight.position.y += 10 * Math.sin(date * x);
      // // pointLight.position.z += 10 * Math.sin(date * z);

      // pointLight2.position.x += 10 * Math.sin(date * x);
      // pointLight2.position.y += 10 * Math.sin(date * y);
      // pointLight2.position.z += 10 * Math.sin(date * z);

      // pointLight3.position.x += 10 * Math.sin(date * z);
      // pointLight3.position.y += 10 * Math.sin(date * x);
      // pointLight3.position.z += 10 * Math.sin(date * y);

      torus.rotation.x =
        percentKeep * torus.rotation.x +
        (1 - percentKeep) *
          (20 * Math.sin(date * x) + mousePositionPrev.current.x);
      torus.rotation.y =
        percentKeep * torus.rotation.y +
        (1 - percentKeep) *
          (20 * Math.sin(date * y) + mousePositionPrev.current.y);
      torus.rotation.z =
        percentKeep * torus.rotation.z +
        (1 - percentKeep) * (20 * Math.sin(date * z));
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <>
      <div className="three" ref={refContainer}/>
      <div ref={boyRef} className="boy"></div>
    </>
  );
};

export default MyThree;
