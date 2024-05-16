import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Title, projects } from '../data/projects';
import { Resume } from './Resume';
import AudioSpectrogram from './Spectrogram';

export interface MyThreeProps {}

export const isMobile: boolean = window.innerWidth < 900;

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

  const lowerPowerRef = useRef<number>(0);
  const upperPowerRef = useRef<number>(0);

  const [urlStateCurr, setUrlStateCurr] = useState<URL | null>(null);
  const [urlStatePrev, setUrlStatePrev] = useState<URL | null>(null);

  useEffect(() => {
    __DEV__ && console.log('urlStateCurr', urlStateCurr);
    __DEV__ && console.log('urlStatePrev', urlStatePrev);

    if (urlStateCurr !== urlStatePrev && urlStateCurr !== null) {
      __DEV__ && console.log('NAVIAGTING TO URL', urlStateCurr);

      const httpToHttps = (url: string) => {
        return url.replace('http://', 'https://');
      };

      const urlStateCurrHttps = httpToHttps(urlStateCurr.toString());

      window.location.href = urlStateCurrHttps;
    }

    setUrlStatePrev(urlStateCurr);
  }, [urlStateCurr, urlStatePrev]);

  window.addEventListener('message', function (event) {
    // // It's a good security practice to check the origin of the message
    // if (event.origin !== 'http://example.com') {
    //   // Replace 'http://example.com' with the origin of your iframe
    //   return;
    // }

    // Handling the event
    if (event?.data?.url) {
      console.log('Received message from iframe:', event);

      setUrlStateCurr(event.data.url);
    }
  });

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
      0.2,
      10000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      failIfMajorPerformanceCaveat: false,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const globalX = isMobile ? -50 : 0;
    // const geometry = new THREE.IcosahedronGeometry(20, 0);
    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    // const geometry = new THREE.IcosahedronGeometry(90, 0);
    // const geometry = new THREE.SphereGeometry(50, 5, 5);
    const geometry = new THREE.IcosahedronGeometry(90, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      // emissive: 0x111111,
      // specular: 0x111111,
      // shininess: 100000,
      shininess: 300,
      flatShading: true,
      wireframe: false,
      shadowSide: THREE.DoubleSide,
      side: THREE.DoubleSide,
      // roughness: 0.5,
      reflectivity: 0,
      // refractionRatio: 0,
      envMap: null,
      wireframeLinejoin: 'round',
      wireframeLinecap: 'round',
      wireframeLinewidth: 10,
      colorWrite: true,
    });
    const ball = new THREE.Mesh(geometry, material);

    scene.add(ball);
    ball.position.x = 0 + globalX;

    camera.position.z = 150;

    const pointLightRed = new THREE.PointLight(0xff0000);
    pointLightRed.position.set(500 + globalX, 1000, -5);
    pointLightRed.intensity = 1;
    scene.add(pointLightRed);

    const pointLightGreen = new THREE.PointLight(0x00ff00);
    pointLightGreen.position.set(550 + globalX, 1000, -150);
    pointLightGreen.intensity = 1;
    scene.add(pointLightGreen);

    const pointLightBlue = new THREE.PointLight(0x0000ff);
    pointLightBlue.position.set(600 + globalX, 1000, -5);
    pointLightBlue.intensity = 1;
    scene.add(pointLightBlue);

    // const pointLightYellow = new THREE.PointLight(0xffff00);
    // pointLightYellow.position.set(1200 + globalX, 1000, -150);
    // pointLightYellow.intensity = 0.2;
    // scene.add(pointLightYellow);

    // const pointLightMagenta = new THREE.PointLight(0xff00ff);
    // pointLightMagenta.position.set(1600 + globalX, 1000, -500);
    // pointLightMagenta.intensity = 0.2;
    // scene.add(pointLightMagenta);

    // const pointLightCyan = new THREE.PointLight(0x00ffff);
    // pointLightCyan.position.set(2200 + globalX, 1350, -80);
    // pointLightCyan.intensity = 0.2;
    // scene.add(pointLightCyan);

    // const ambientLightThree = new THREE.AmbientLight(0xffffff);
    // scene.add(ambientLightThree);
    // ambientLightThree.intensity = 0;

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

      scrollPosition.current += distanceTravelled * 0.2;
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

      // boyRef.current.style.transform = `translateX(${scrollPosition.current}px)`;
    };

    window.addEventListener('wheel', onWheel);

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const x = 0.0093;
    const y = 0.007;
    const z = 0.001;

    const percentKeep = 0.99995;
    const percentKeepMouse = 0.95;

    let animationFrame = -1;
    const animate = function () {
      animationFrame += 1;
      requestAnimationFrame(animate);

      ///////////////////////////////////////
      // SCROLL POSITION
      ///////////////////////////////////////
      scrollPositionAverage.current =
        percentKeepMouse * scrollPositionAverage.current +
        (1 - percentKeepMouse) * scrollPosition.current;

      ///////////////////////////////////////
      // MOUSE ADD ROTATION
      ///////////////////////////////////////
      ball.rotation.z =
        (percentKeepMouse * ball.position.z +
          (1 - percentKeepMouse) * scrollPositionAverage.current) *
        0.1;

      ///////////////////////////////////////
      // MOUSE POSITION
      ///////////////////////////////////////
      mousePositionPrev.current.x =
        percentKeepMouse * mousePositionPrev.current.x +
        (1 - percentKeepMouse) * mousePositionCurr.current.x;
      mousePositionPrev.current.y =
        percentKeepMouse * mousePositionPrev.current.y +
        (1 - percentKeepMouse) * mousePositionCurr.current.y;
      mousePositionPrev.current.z =
        percentKeepMouse * mousePositionPrev.current.z +
        (1 - percentKeepMouse) * mousePositionCurr.current.z;

      ///////////////////////////////////////
      // ANIMATION MOOUSE & SCROLL
      ///////////////////////////////////////
      ball.rotation.x =
        percentKeep * ball.rotation.x +
        (1 - percentKeep) *
          (20 * Math.sin(animationFrame * x) + mousePositionPrev.current.x);
      ball.rotation.y =
        percentKeep * ball.rotation.y +
        (1 - percentKeep) *
          (20 * Math.sin(animationFrame * y) + mousePositionPrev.current.y);
      ball.rotation.z =
        percentKeep * ball.rotation.z +
        (1 - percentKeep) * (20 * Math.sin(animationFrame * z));

      ///////////////////////////////////////
      // ANIMATION FROM SPECTRUM
      ///////////////////////////////////////
      ball.rotation.x = lowerPowerRef.current * 0.01;
      ball.rotation.y = 0;
      ball.rotation.z = 0;

      __DEV__ && console.log('spectrumLowerPower', lowerPowerRef.current);

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
      {!isMobile && <div className="three" ref={refContainer} />}
      {isMobile && <div className="three-mobile" ref={refContainer} />}
      {!isMobile && (
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
          <img className="gif" src="/videos2/smashed_small.gif" alt="asdf" />
          {/* <CopyEmail email={email} /> */}
          {/* <h2>Computer Engineer, Web Developer, and Game Developer</h2> */}
          {/* <p>Stamford, Connecticut</p> */}
          {/* <p>
            Email:{' '}
            <a href="mailto:niemeyer.eric@gmail.com">niemeyer.eric@gmail.com</a>
          </p> */}
          <h1>Stamford, Connecticut</h1>
          <h1>618-616-338O</h1>
          {/* <p>
            <a href="https://niemo.io">https://niemo.io</a>
          </p> */}
          <AudioSpectrogram
            lowerPowerRef={lowerPowerRef}
            upperPowerRef={upperPowerRef}
          />
        </div>
      )}

      <div className="projects-top">
        <div
          className={
            !isMobile ? 'projects-scroller' : 'projects-scroller-mobile'
          }
        >
          <div className="pre">
            <Resume />
            <div className="demo-projects-wrapper">
              <h1 className="demo-projects">Demos</h1>
              {/* <p className="demo-projects-p">
                All Projects, Games, and Music are Original
              </p>
              <p className="demo-projects-p">Click a Demo!</p> */}
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
                    window.location.href = project.url;
                  }}
                ></div>
                <div
                  className={
                    isMobile ? 'project-title-mobile' : 'project-title'
                  }
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
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="spacer" />
          <div className="post">
            <img
              src={process.env.PUBLIC_URL + '/kirby.png'}
              className="kirby"
              alt="project-icon"
            />
            <p className="last">Blue Skies</p>
            {/* <p className="last">ReactTS, THREE.js, and SCSS</p> */}
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
