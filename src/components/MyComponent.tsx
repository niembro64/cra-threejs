import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useCallback, useEffect, useRef, useState } from 'react';
import React from 'react';
import { Title, projects } from '../data/projects';
import usePageHeight from './usePageHeight';
import CopyEmail from './CopyEmail';

export interface MyThreeProps {}

const MyThree: React.FC<MyThreeProps> = () => {
  const refContainer = useRef<any>(null);
  const mousePositionCurr = useRef(new THREE.Vector3());
  const mousePositionPrev = useRef(new THREE.Vector3());
  const scrollPosition = useRef(0);
  const scrollPositionAverage = useRef(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [hoverCurr, setHoverCurr] = useState<Title | null>(null);
  const topElementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updatePageHeight = () => {
      const documentHeight =
        document.documentElement.getBoundingClientRect().height;
      setPageHeight(documentHeight);
    };

    // Update the page height initially
    updatePageHeight();

    // Add a listener for window resize events
    window.addEventListener('resize', updatePageHeight);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updatePageHeight);
    };
  }, []);

  useEffect(() => {
    console.log('pageHeight', pageHeight);
  }, [pageHeight]);

  // const [ballState, setBallState] = useState<any | null>(null);

  useEffect(() => {
    if (height === 0 || pageHeight === 0) {
      return;
    }

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
      const wheelDelta = event.deltaY * 0.3;

      scrollPosition.current += wheelDelta;
      // scrollPosition.current = Math.min(
      //   scrollPosition.current,
      //   height,
      //   pageHeight
      // );
      // scrollPosition.current = Math.max(scrollPosition.current, 0);
      console.log('scrollPosition.current', scrollPosition.current);

      // Clamp the scrollPosition to a range suitable for controlling the Z position
      // const scrollRange = { min: -6000, max: 0 };
      // scrollPosition.current = Math.max(
      //   Math.min(scrollPosition.current, scrollRange.max),
      //   scrollRange.min
      // );

      // boyRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
    };

    window.addEventListener('wheel', onWheel);

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    let x = 0.0093;
    let y = 0.007;
    let z = 0.001;

    const percentKeep = 0.99995;
    const percentKeepMouse = 0.9;

    var animate = function () {
      requestAnimationFrame(animate);

      // setBallState(ball.rotation);

      scrollPositionAverage.current =
        percentKeepMouse * scrollPositionAverage.current +
        (1 - percentKeepMouse) * scrollPosition.current;

      // console.log(scrollPositionAverage.current);

      ball.rotation.z =
        (percentKeepMouse * ball.position.z +
          (1 - percentKeepMouse) * scrollPositionAverage.current) *
        0.1;

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
  }, [height, pageHeight]);

  // print height
  useEffect(() => {
    console.log('height', height);
  }, [height]);

  useEffect(() => {
    const updateHeight = () => {
      if (topElementRef.current) {
        setHeight(topElementRef.current.offsetHeight);
      }
    };

    updateHeight(); // Update height initially
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const email = 'niemeyer.eric@gmail.com';
  const [showEmail, setShowEmail] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      console.log('Email copied to clipboard');
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  }, [email]);

  return (
    <div className="top" ref={topElementRef}>
      <div className="three" ref={refContainer} />
      <div className="resume">
        <h1 className="resume-name">Eric Niemeyer</h1>
        {/* <h3>niemeyer.eric@gmail.com</h3> */}
        <button
          onMouseEnter={() => {
            setShowEmail(true);
          }}
          onMouseLeave={() => {
            setShowEmail(false);
          }}
          onClick={copyToClipboard}
        >
          {showEmail ? email : 'Copy Email'}
        </button>
        {/* <CopyEmail email={email} /> */}
        <h3>Stamford, CT</h3>
      </div>
      <div className="projects-top">
        <div className="projects-scroller">
          <div className="pre">
            <h1>PRE STUFF</h1>
          </div>
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
                  onClick={() => {
                    window.open(project.url, '_blank');
                  }}
                ></div>
                <div className={'project-title'} id={project.title}>
                  {project.title.toUpperCase()}
                </div>
                <div
                  id={
                    hoverCurr === project.title
                      ? 'project-description-hover'
                      : ''
                  }
                  className="project-description"
                >
                  {project.description}
                </div>
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
                {hoverCurr !== project.title && (
                  <div className="project-bullet-container">
                    <div className="project-bullet-wrapper">
                      {project.bullets?.map((bullet, index) => {
                        return (
                          <div key={index} className="project-bullet">
                            {'· ' + bullet}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {hoverCurr !== project.title && (
                  <div className="project-stack-container">
                    {project.stack?.map((stack, index) => {
                      return (
                        <div key={index} className="project-stack">
                          {stack}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <div className="post">
            <h1>POST STUFF</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyThree;
