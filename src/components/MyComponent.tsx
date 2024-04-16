import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Title, projects } from '../data/projects';
import { Resume } from './Resume';

export interface MyThreeProps {}

export const mobile: boolean = window.innerWidth < 1200;

export const __DEV__ = process.env.NODE_ENV === 'development';

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
    __DEV__ && console.log('window.innerWidth', window.innerWidth);
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
    __DEV__ && console.log('pageHeight', pageHeight);
  }, [pageHeight]);

  // const [ballState, setBallState] = useState<any | null>(null);

  useEffect(() => {
    if (height === 0 || pageHeight === 0) {
      return;
    }

    // === THREE.JS CODE START ===
    const scene = new THREE.Scene();
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

    const camera: any = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true , preserveDrawingBuffer: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const globalX = mobile ? -50 : 0;
    // const geometry = new THREE.IcosahedronGeometry(20, 0);
    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    // const geometry = new THREE.IcosahedronGeometry(90, 0);
    // const geometry = new THREE.SphereGeometry(50, 5, 5);
    const geometry = new THREE.IcosahedronGeometry(90, 1);

    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(geometry, material);

    scene.add(ball);
    ball.position.x = 0 + globalX;

    camera.position.z = 150;

    const pointLightUpper = new THREE.PointLight(0xffffff);
    pointLightUpper.position.set(0 + globalX, 400, -5);
    const pointLightLower = new THREE.PointLight(0x000000);
    pointLightLower.position.set(0 + globalX, -400, -5);

    const ambientLightThree = new THREE.AmbientLight(0xffffff);
    ambientLightThree.intensity = 0;
    pointLightUpper.intensity = 1;
    scene.add(pointLightUpper);
    scene.add(pointLightLower);
    scene.add(ambientLightThree);

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

    // Add touchmove event listener
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const scenePosition = getScenePositionFromScreen(
        touch.clientX,
        touch.clientY
      );

      mousePositionCurr.current = scenePosition;

      const distanceTravelled = mousePositionCurr.current.distanceTo(
        mousePositionPrev.current
      );

      scrollPosition.current += distanceTravelled * 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    // Add wheel event listener
    const onWheel = (event: WheelEvent) => {
      // Normalize wheel movement (inverted)
      const wheelDelta = event.deltaY * 0.1;

      scrollPosition.current += wheelDelta;
      // scrollPosition.current = Math.min(
      //   scrollPosition.current,
      //   height,
      //   pageHeight
      // );
      // scrollPosition.current = Math.max(scrollPosition.current, 0);

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
    const percentKeepMouse = 0.95;

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
    __DEV__ && console.log('height', height);
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
      __DEV__ && console.log('Email copied to clipboard');
    } catch (err) {
      __DEV__ && console.error('Failed to copy email: ', err);
    }
  }, [email]);

  return (
    <div className="top" ref={topElementRef}>
      <div className="black-boy"></div>
      {!mobile && <div className="three" ref={refContainer} />}
      {mobile && <div className="three-mobile" ref={refContainer} />}
      {!mobile && (
        <div className="resume">
          {/* <h3>niemeyer.eric@gmail.com</h3> */}
          <h1 className="resume-name">Eric Niemeyer</h1>
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
          <p>Stamford, Connecticut</p>
          <img className="gif" src="/videos2/smashed_small.gif" alt="asdf" />
          {/* <h2>Computer Engineer, Web Developer, and Game Developer</h2> */}
          {/* <p>Stamford, Connecticut</p> */}
          {/* <p>
            Email:{' '}
            <a href="mailto:niemeyer.eric@gmail.com">niemeyer.eric@gmail.com</a>
          </p> */}
          <p>Phone: +1 (618) 616-3380</p>
          <p>
            <a href="https://niemo.io">https://niemo.io</a>
          </p>
        </div>
      )}
      <div className="projects-top">
        <div
          className={!mobile ? 'projects-scroller' : 'projects-scroller-mobile'}
        >
          <div className="pre">
            <Resume />
            <div className="demo-projects-wrapper">
              <h1 className="demo-projects">Demos</h1>
              <p className="demo-projects-p">
                All Projects, Games, and Music are Original
              </p>
              <p className="demo-projects-p">Click a Demo!</p>
            </div>
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
                    __DEV__ && console.log('hovering', project.title);
                    setHoverCurr(project.title);
                  }}
                  onMouseLeave={(element) => {
                    __DEV__ && console.log('leaving', project.title);
                    setHoverCurr(null);
                  }}
                  onClick={() => {
                    window.open(project.url, '_blank');
                  }}
                ></div>
                <div
                  className={mobile ? 'project-title-mobile' : 'project-title'}
                  id={project.title}
                >
                  {project.title.toUpperCase()}
                </div>
                <div className="project-title-wrapper">
                  <img
                    src={process.env.PUBLIC_URL + '/' + project.icon}
                    id={hoverCurr === project.title ? 'project-icon-hover' : ''}
                    className="project-icon"
                    alt="project-icon"
                  />
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
            <img
              src={process.env.PUBLIC_URL + '/kirby.png'}
              className="kirby"
              alt="project-icon"
            />
            <p className="last">This website was built with:</p>
            <p className="last">ReactTS, THREE.js, and SCSS</p>
          </div>
        </div>
        {/* <div className="sette-wrapper">
          <img
            src={process.env.PUBLIC_URL + '/sette.jpeg'}
            className="sette-icon"
            alt="project-icon"
          />
        </div> */}
      </div>
    </div>
  );
};

export default MyThree;
