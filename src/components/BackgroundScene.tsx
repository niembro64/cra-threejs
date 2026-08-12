import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import projectAtlasConfig from '../config/projectAtlas.json';
import projectAtlasAssets from '../config/projectAtlasAssets.json';

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

const PROJECT_ATLAS_COLUMNS = projectAtlasConfig.columns;
const PROJECT_ATLAS_ROWS = projectAtlasConfig.rows;
const PROJECT_ATLAS_WIDTH = PROJECT_ATLAS_COLUMNS * projectAtlasConfig.tileWidth;
const PROJECT_ATLAS_HEIGHT = PROJECT_ATLAS_ROWS * projectAtlasConfig.tileHeight;
const PROJECT_ATLAS_LAST_TILE = 20;
const PROJECT_ATLAS_VIDEO = `${process.env.PUBLIC_URL}/project_media/project-atlas.mp4?v=${projectAtlasAssets.version}`;
const PROJECT_ATLAS_POSTER = `${process.env.PUBLIC_URL}/project_media/project-atlas.jpg?v=${projectAtlasAssets.version}`;
const PROJECT_VIDEO_STRENGTH = projectAtlasConfig.surfaceTreatment.videoStrength;
const [PROJECT_PURPLE_RED, PROJECT_PURPLE_GREEN, PROJECT_PURPLE_BLUE] =
  projectAtlasConfig.surfaceTreatment.purpleLinearRgb;
const PROJECT_PURPLE_SHADER_COLOR = [PROJECT_PURPLE_RED, PROJECT_PURPLE_GREEN, PROJECT_PURPLE_BLUE]
  .map((channel) => channel.toFixed(4))
  .join(', ');

const setProjectAtlasUvs = (geometry: THREE.BufferGeometry, firstFaceTile: 0 | 20): void => {
  const uvs = geometry.getAttribute('uv') as THREE.BufferAttribute;
  const faceCount = geometry.getAttribute('position').count / 3;
  const horizontalInset = 1 / PROJECT_ATLAS_WIDTH;
  const verticalInset = 1 / PROJECT_ATLAS_HEIGHT;

  for (let faceIndex = 0; faceIndex < faceCount; faceIndex += 1) {
    // Twenty projects remain fixed while the first face alternates between the
    // remaining two, allowing all 21 projects to appear on a 20-face shape.
    const tileIndex = faceIndex === 0 ? firstFaceTile : faceIndex;
    const column = tileIndex % PROJECT_ATLAS_COLUMNS;
    const row = Math.floor(tileIndex / PROJECT_ATLAS_COLUMNS);
    const uMin = column / PROJECT_ATLAS_COLUMNS + horizontalInset;
    const uMax = (column + 1) / PROJECT_ATLAS_COLUMNS - horizontalInset;
    const vMin = 1 - (row + 1) / PROJECT_ATLAS_ROWS + verticalInset;
    const vMax = 1 - row / PROJECT_ATLAS_ROWS - verticalInset;
    const vertexOffset = faceIndex * 3;

    uvs.setXY(vertexOffset, (uMin + uMax) / 2, vMax);
    uvs.setXY(vertexOffset + 1, uMin, vMin);
    uvs.setXY(vertexOffset + 2, uMax, vMin);
  }

  uvs.needsUpdate = true;
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
        antialias: true,
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
      emissive: new THREE.Color(PROJECT_PURPLE_RED, PROJECT_PURPLE_GREEN, PROJECT_PURPLE_BLUE),
      emissiveIntensity: compact
        ? projectAtlasConfig.surfaceTreatment.emissiveIntensity.compact
        : projectAtlasConfig.surfaceTreatment.emissiveIntensity.default,
    });
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <map_pars_fragment>',
          `#include <map_pars_fragment>
#ifdef USE_MAP
  vec2 containedProjectAtlasUv(vec2 atlasUv) {
    const vec2 atlasGrid = vec2(${PROJECT_ATLAS_COLUMNS.toFixed(1)}, ${PROJECT_ATLAS_ROWS.toFixed(1)});
    const vec2 tileInset = vec2(${(1 / projectAtlasConfig.tileWidth).toFixed(8)}, ${(1 / projectAtlasConfig.tileHeight).toFixed(8)});
    vec2 tile = floor(atlasUv * atlasGrid);
    vec2 triangularUv = (fract(atlasUv * atlasGrid) - tileInset) / (1.0 - 2.0 * tileInset);
    float rowWidth = 1.0 - triangularUv.y;
    float containedU = rowWidth > 0.001
      ? (triangularUv.x - triangularUv.y * 0.5) / rowWidth
      : 0.5;
    vec2 containedUv = vec2(clamp(containedU, 0.0, 1.0), clamp(triangularUv.y, 0.0, 1.0));
    return (tile + tileInset + containedUv * (1.0 - 2.0 * tileInset)) / atlasGrid;
  }
#endif`
        )
        .replace('texture2D( map, vUv )', 'texture2D( map, containedProjectAtlasUv( vUv ) )')
        .replace(
          'diffuseColor *= sampledDiffuseColor;',
          `sampledDiffuseColor.rgb = mix(
  vec3(${PROJECT_PURPLE_SHADER_COLOR}),
  sampledDiffuseColor.rgb,
  ${PROJECT_VIDEO_STRENGTH.toFixed(4)}
);
diffuseColor *= sampledDiffuseColor;`
        )
        .replace('texture2D( emissiveMap, vUv )', 'texture2D( emissiveMap, containedProjectAtlasUv( vUv ) )');
    };
    material.customProgramCacheKey = () =>
      `contained-project-atlas-v2-${PROJECT_VIDEO_STRENGTH}-${PROJECT_PURPLE_SHADER_COLOR}`;
    const shape = new THREE.Mesh(geometry, material);
    shape.position.x = globalX;
    scene.add(shape);
    setProjectAtlasUvs(geometry, 0);

    let atlasPosterTexture: THREE.Texture | null = null;
    let atlasVideoTexture: THREE.VideoTexture | null = null;
    let atlasVideo: HTMLVideoElement | null = null;
    let atlasCycleTimer = 0;
    let atlasVideoIsApplied = false;
    let sceneDisposed = false;

    const configureAtlasTexture = (texture: THREE.Texture) => {
      texture.encoding = THREE.sRGBEncoding;
      const textureFilter = projectAtlasConfig.blur ? THREE.LinearFilter : THREE.NearestFilter;
      texture.minFilter = textureFilter;
      texture.magFilter = textureFilter;
      texture.generateMipmaps = false;
      texture.anisotropy = projectAtlasConfig.blur
        ? Math.min(compact ? 2 : 4, renderer.capabilities.getMaxAnisotropy())
        : 1;
    };

    const applyAtlasTexture = (texture: THREE.Texture) => {
      if (sceneDisposed) {
        texture.dispose();
        return;
      }

      material.map = texture;
      material.emissiveMap = texture;
      material.needsUpdate = true;
      if (prefersReducedMotion) renderer.render(scene, camera);
    };

    const loadingPosterTexture = new THREE.TextureLoader().load(PROJECT_ATLAS_POSTER, (texture) => {
      if (atlasVideoIsApplied) {
        texture.dispose();
        if (atlasPosterTexture === texture) atlasPosterTexture = null;
        return;
      }

      applyAtlasTexture(texture);
    });
    configureAtlasTexture(loadingPosterTexture);
    atlasPosterTexture = loadingPosterTexture;

    if (!prefersReducedMotion && !saveData) {
      const video = document.createElement('video');
      atlasVideo = video;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.disablePictureInPicture = true;
      video.setAttribute('playsinline', '');

      const onAtlasLoaded = () => {
        if (sceneDisposed) return;

        const texture = new THREE.VideoTexture(video);
        configureAtlasTexture(texture);
        atlasVideoTexture = texture;
        atlasVideoIsApplied = true;
        applyAtlasTexture(texture);
        atlasPosterTexture?.dispose();
        atlasPosterTexture = null;
      };

      video.addEventListener('loadeddata', onAtlasLoaded, { once: true });
      video.src = PROJECT_ATLAS_VIDEO;
      video.load();
      void video.play().catch(() => {
        // Muted inline video normally autoplays; the poster remains available
        // if a browser still requires interaction.
      });

      let showLastProject = false;
      atlasCycleTimer = window.setInterval(() => {
        showLastProject = !showLastProject;
        setProjectAtlasUvs(geometry, showLastProject ? PROJECT_ATLAS_LAST_TILE : 0);
      }, 6000);
    }

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
    // A low ambient contribution keeps project footage legible on faces turned
    // away from the colored point lights without flattening the faceted shape.
    scene.add(new THREE.AmbientLight(0xffffff, compact ? 0.2 : 0.12));

    const mouseTarget = new THREE.Vector2();
    const mouseSmoothed = new THREE.Vector2();
    let scrollTarget = 0;
    let scrollSmoothed = 0;
    let lowerPowerAccumulated = 0;
    let upperPowerAccumulated = 0;
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    let audioWasPlaying = false;
    let frameRequest = 0;
    let resizeRequest = 0;
    let lastRenderTime = 0;
    const scrollElement = document.querySelector<HTMLElement>('.App');

    const renderFrame = (time: number) => {
      frameRequest = window.requestAnimationFrame(renderFrame);
      const elapsedMilliseconds = time - lastRenderTime;
      lastRenderTime = time;
      const deltaSeconds = Math.min(elapsedMilliseconds / 1000, 0.05);
      const elapsedFrames = deltaSeconds * 60;
      const motionBlend = 1 - Math.exp(-8 * deltaSeconds);
      const audioBlend = 1 - Math.exp(-42 * deltaSeconds);
      const lightBlend = 1 - Math.exp(-20 * deltaSeconds);

      scrollSmoothed += (scrollTarget - scrollSmoothed) * motionBlend;
      mouseSmoothed.lerp(mouseTarget, motionBlend);

      const audioIsPlaying = Boolean(audioRef.current && !audioRef.current.paused);
      if (!audioIsPlaying) {
        audioWasPlaying = false;
        // Time-based angular velocity keeps the same speed at 30, 60, and
        // higher display refresh rates instead of relying on frame count.
        rotationX += 0.22 * deltaSeconds;
        rotationY += 0.32 * deltaSeconds;
        rotationZ += 0.08 * deltaSeconds;
      } else {
        if (!audioWasPlaying) {
          lowerPowerAccumulated = rotationX;
          upperPowerAccumulated = rotationY;
          audioWasPlaying = true;
        }

        lowerPowerAccumulated += Math.pow(highFreqPowerRef.current, 2) * 0.0005 * elapsedFrames;
        upperPowerAccumulated += Math.pow(lowFreqPowerRef.current, 3) * 0.002 * elapsedFrames;
        rotationX += (lowerPowerAccumulated - rotationX) * audioBlend;
        rotationY += (upperPowerAccumulated - rotationY) * audioBlend;
        rotationZ += 0.08 * deltaSeconds;
      }

      const mouseInfluence = audioIsPlaying ? 0 : 0.035;
      shape.rotation.x = rotationX + mouseSmoothed.x * mouseInfluence;
      shape.rotation.y = rotationY + mouseSmoothed.y * mouseInfluence;
      shape.rotation.z = rotationZ + scrollSmoothed * 0.001;

      const redTarget = audioIsPlaying ? 0.5 + highFreqPowerRef.current * 0.2 : baseIntensity;
      const blueTarget = audioIsPlaying ? 0.5 + lowFreqPowerRef.current * 0.2 : baseIntensity;
      pointLightRed.intensity += (redTarget - pointLightRed.intensity) * lightBlend;
      pointLightBlue.intensity += (blueTarget - pointLightBlue.intensity) * lightBlend;
      pointLightGreen.intensity +=
        ((pointLightBlue.intensity + pointLightRed.intensity) / 2 - pointLightGreen.intensity) * lightBlend;

      renderer.render(scene, camera);
    };

    const startRendering = () => {
      if (frameRequest || document.hidden || prefersReducedMotion) return;
      lastRenderTime = performance.now();
      frameRequest = window.requestAnimationFrame(renderFrame);
    };

    const stopRendering = () => {
      window.cancelAnimationFrame(frameRequest);
      frameRequest = 0;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopRendering();
        atlasVideo?.pause();
      } else {
        startRendering();
        void atlasVideo?.play().catch(() => {
          // The static atlas poster remains visible if autoplay is unavailable.
        });
      }
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
    onScroll();

    if (prefersReducedMotion) renderer.render(scene, camera);
    else startRendering();

    return () => {
      sceneDisposed = true;
      stopRendering();
      window.cancelAnimationFrame(resizeRequest);
      window.clearInterval(atlasCycleTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      (scrollElement ?? window).removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      atlasVideo?.pause();
      atlasVideo?.removeAttribute('src');
      atlasVideo?.load();
      atlasPosterTexture?.dispose();
      atlasVideoTexture?.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [audioRef, compact, highFreqPowerRef, lowFreqPowerRef]);

  return <div className="fixed inset-0 -z-10 h-full w-full" ref={containerRef} />;
};

export default BackgroundScene;
