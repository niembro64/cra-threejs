import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useEffect, useRef, useState } from 'react';
import React from 'react';
import { Title, projects } from '../data/projects';

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

    const globalX = 0;
    const geometry = new THREE.IcosahedronGeometry(90, 1);

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(geometry, material);

    scene.add(ball);
    ball.position.x = 0 + globalX;

    camera.position.z = 150;

    const pointLight = new THREE.PointLight(0x00ffff);
    pointLight.position.set(0 + globalX, 400, -100);
    const pointLight2 = new THREE.PointLight(0xff00ff);
    pointLight2.position.set(0 + globalX, -400, -100);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0;
    pointLight.intensity = 1;
    scene.add(pointLight);
    scene.add(pointLight2);
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

      mousePositionPrev.current.x =
        percentKeepMouse * mousePositionPrev.current.x +
        (1 - percentKeepMouse) * mousePositionCurr.current.x;
      mousePositionPrev.current.y =
        percentKeepMouse * mousePositionPrev.current.y +
        (1 - percentKeepMouse) * mousePositionCurr.current.y;
      mousePositionPrev.current.z =
        percentKeepMouse * mousePositionPrev.current.z +
        (1 - percentKeepMouse) * mousePositionCurr.current.z;

      const date = Date.now();

      ball.rotation.x =
        percentKeep * ball.rotation.x +
        (1 - percentKeep) *
          (20 * Math.sin(date * x) + mousePositionPrev.current.x);
      ball.rotation.y =
        percentKeep * ball.rotation.y +
        (1 - percentKeep) *
          (20 * Math.sin(date * y) + mousePositionPrev.current.y);
      ball.rotation.z =
        percentKeep * ball.rotation.z +
        (1 - percentKeep) * (20 * Math.sin(date * z));
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  const [hoverCurr, setHoverCurr] = useState<Title | null>(null);

  return (
    <div className="top">
      <div className="three" ref={refContainer} />
      <div className="projects-top">
        <div className="projects-scroller">
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                id={hoverCurr === project.title ? 'project-hover' : ''}
                className={'project'}
              >
                <div
                  className="project-overlay"
                  onMouseEnter={(element) => {
                    setHoverCurr(project.title);
                  }}
                  onMouseLeave={(element) => {
                    setHoverCurr(null);
                  }}
                ></div>
                <div className={'project-title'} id={project.title}>
                  {project.title.toUpperCase()}
                </div>
                <div className="project-description">{project.description}</div>
                <video
                  className="project-video"
                  src={
                    process.env.PUBLIC_URL +
                    '/videos2/' +
                    project.title +
                    '.mp4'
                  }
                  autoPlay
                  muted
                  loop
                ></video>
                <div className="project-bullet-container">
                  {project.bullets?.map((bullet, index) => {
                    return (
                      <div key={index} className="project-bullet">
                        {bullet}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyThree;
