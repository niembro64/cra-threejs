// MyThree.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Title, projects } from '../data/projects';
import { Resume } from './Resume';
import AudioSpectrogram from './Spectrogram';
import ProjectDemo from './ProjectDemo'; // <-- import new component

export interface MyThreeProps {}

export const isMobile: boolean = window.innerWidth < 900;
export const __DEV__ = process.env.NODE_ENV === 'development';

const MyThree: React.FC<MyThreeProps> = () => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const mousePositionCurr = useRef(new THREE.Vector3());
  const mousePositionPrev = useRef(new THREE.Vector3());
  const scrollPosition = useRef(0);
  const scrollPositionAverage = useRef(0);
  const [pageHeight, setPageHeight] = useState(0);
  const topElementRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  const lowerPowerRawRef = useRef<number>(0);
  const upperPowerRawRef = useRef<number>(0);

  const lowerPowerAccumulatedRef = useRef<number>(0);
  const upperPowerAccumulatedRef = useRef<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [urlStateCurr, setUrlStateCurr] = useState<URL | null>(null);
  const [urlStatePrev, setUrlStatePrev] = useState<URL | null>(null);

  // For copying email
  const email = 'niemeyer.eric@gmail.com';
  const [showEmail, setShowEmail] = useState(false);

  // Copy email helper
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      __DEV__ && console.log('Email copied to clipboard');
    } catch (err) {
      __DEV__ && console.error('Failed to copy email: ', err);
    }
  }, [email]);

  // Listen for posted messages from child iframes
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event?.data?.url) {
        console.log('Received message from iframe:', event);
        setUrlStateCurr(event.data.url);
      }
    }
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  useEffect(() => {
    if (urlStateCurr !== urlStatePrev && urlStateCurr !== null) {
      __DEV__ && console.log('NAVIGATING TO URL', urlStateCurr);
      const httpToHttps = (url: string) => url.replace('http://', 'https://');
      const urlStateCurrHttps = httpToHttps(urlStateCurr.toString());
      window.location.href = urlStateCurrHttps;
      setUrlStatePrev(urlStateCurr);
    }
  }, [urlStateCurr, urlStatePrev]);

  // Track page height
  useEffect(() => {
    const updatePageHeight = () => {
      const documentHeight =
        document.documentElement.getBoundingClientRect().height;
      setPageHeight(documentHeight);
    };
    updatePageHeight();
    window.addEventListener('resize', updatePageHeight);
    return () => {
      window.removeEventListener('resize', updatePageHeight);
    };
  }, []);

  // Set container height
  useEffect(() => {
    const updateHeight = () => {
      if (topElementRef.current) {
        setHeight(topElementRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  ////////////////////////////////
  // 3D Setup
  ////////////////////////////////
  useEffect(() => {
    if (height === 0 || pageHeight === 0) return;

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

    // On mobile, we’ll adjust the x offset a bit
    const globalX = isMobile ? -50 : 0;

    // Simple geometry for demonstration
    const geometry = new THREE.IcosahedronGeometry(90, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 300,
      flatShading: true,
      wireframe: false,
      shadowSide: THREE.DoubleSide,
      side: THREE.DoubleSide,
    });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);
    ball.position.x = 0 + globalX;

    camera.position.z = 150;

    // Lights
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

    const ambientLightThree = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLightThree);
    ambientLightThree.intensity = 0;

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

    // Mouse move
    const onMouseMove = (event: MouseEvent) => {
      const scenePosition = getScenePositionFromScreen(
        event.clientX,
        event.clientY
      );
      mousePositionCurr.current = scenePosition;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch move
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
    window.addEventListener('touchmove', onTouchMove);

    // Wheel
    const onWheel = (event: WheelEvent) => {
      const wheelDelta = event.deltaY * 0.1;
      scrollPosition.current += wheelDelta;
    };
    window.addEventListener('wheel', onWheel);

    // Append the renderer
    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    // Animation
    const x = 0.0093;
    const y = 0.007;
    const z = 0.001;
    const percentKeep = 0.99995;
    const percentKeepMouse = 0.95;
    let animationFrame = -1;

    const animate = () => {
      animationFrame += 1;
      requestAnimationFrame(animate);

      // SCROLL
      scrollPositionAverage.current =
        percentKeepMouse * scrollPositionAverage.current +
        (1 - percentKeepMouse) * scrollPosition.current;

      ball.rotation.z =
        (percentKeepMouse * ball.position.z +
          (1 - percentKeepMouse) * scrollPositionAverage.current) *
        0.1;

      // Mouse
      mousePositionPrev.current.x =
        percentKeepMouse * mousePositionPrev.current.x +
        (1 - percentKeepMouse) * mousePositionCurr.current.x;
      mousePositionPrev.current.y =
        percentKeepMouse * mousePositionPrev.current.y +
        (1 - percentKeepMouse) * mousePositionCurr.current.y;
      mousePositionPrev.current.z =
        percentKeepMouse * mousePositionPrev.current.z +
        (1 - percentKeepMouse) * mousePositionCurr.current.z;

      if (isMobile || !audioRef.current || audioRef.current.paused) {
        // Normal ball motion
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
      } else {
        // Animate from audio
        lowerPowerAccumulatedRef.current =
          (lowerPowerAccumulatedRef.current +
            Math.pow(lowerPowerRawRef.current, 1) * 0.0008) %
          360;
        upperPowerAccumulatedRef.current =
          (upperPowerAccumulatedRef.current +
            Math.pow(upperPowerRawRef.current, 3) * 0.00003) %
          360;

        const percentKeepPowerShort = 0.1;
        const percentKeepPowerLong = 0.92;

        ball.rotation.x =
          ball.rotation.x * percentKeepPowerShort +
          lowerPowerAccumulatedRef.current * (1 - percentKeepPowerShort);

        ball.rotation.y =
          ball.rotation.y * percentKeepPowerShort +
          upperPowerAccumulatedRef.current * (1 - percentKeepPowerShort);

        // Example: color intensities
        pointLightRed.intensity =
          pointLightRed.intensity * percentKeepPowerLong +
          (0.5 + lowerPowerRawRef.current * 0.2) * (1 - percentKeepPowerLong);
        pointLightBlue.intensity =
          pointLightBlue.intensity * percentKeepPowerLong +
          (0.5 + upperPowerRawRef.current * 0.2) * (1 - percentKeepPowerLong);
        pointLightGreen.intensity =
          (pointLightBlue.intensity + pointLightRed.intensity) / 2;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('wheel', onWheel);
    };
  }, [height, pageHeight]);

  return (
    <div className="top" ref={topElementRef}>
      <div className="black-boy"></div>
      {!isMobile && <div className="three" ref={refContainer} />}
      {isMobile && <div className="three-mobile" ref={refContainer} />}

      {/* Desktop Resume & AudioSpectrogram */}
      {!isMobile && (
        <div className="resume">
          <h1 className="resume-name">Eric Niemeyer</h1>
          <button
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
            onClick={copyToClipboard}
          >
            {showEmail ? email : 'Copy Email'}
          </button>
          <img className="gif" src="/videos2/smashed_small.gif" alt="asdf" />
          <h1>Stamford, Connecticut</h1>
          <h1>618-616-338O</h1>
          <AudioSpectrogram
            lowerPowerRef={lowerPowerRawRef}
            upperPowerRef={upperPowerRawRef}
            audioRef={audioRef}
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
            </div>
          </div>

          {/* Render each project via new ProjectDemo */}
          {projects.map((project, index) => (
            <ProjectDemo key={index} project={project} />
          ))}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyThree;
