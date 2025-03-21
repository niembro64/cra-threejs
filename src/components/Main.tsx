// Main.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import ContactSection from './ContactSection'
import ReactGA from 'react-ga4'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Resume } from './Resume'
import AudioSpectrogram from './Spectrogram'
import { Tooltip } from 'react-tooltip'
// @ts-ignore
import appleModelUrl from '../assets/w.glb'
// @ts-ignore
// import appleModelUrl from '../assets/snes_pal_controller.glb'
// // @ts-ignore
// import appleModelUrl from '../assets/apple.glb'
import { ProjectStore } from '../store/ProjectStore'
import {
  showKirbyGame,
  showSmashedGif,
  tooltipDelay,
  toolTipStyle,
} from '../data/myData'
import PixelArtText from './PixelArtText'

export const phoneNumber = '618-616-3380'
export const email = 'niemeyer.eric@gmail.com'
export const isThin: boolean = window.innerWidth < 1200
export const isMobile: boolean =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )

export const __DEV__ = process.env.NODE_ENV === 'development'

const Main: React.FC = () => {
  const { setConnectionQuality } = ProjectStore()

  const refContainer = useRef<HTMLDivElement | null>(null)

  const backgroundShapeRef = { current: null as THREE.Object3D | null }

  const mousePositionCurr = useRef(new THREE.Vector3())
  const mousePositionPrev = useRef(new THREE.Vector3())
  const scrollPosition = useRef(0)
  const scrollPositionAverage = useRef(0)
  const [pageHeight, setPageHeight] = useState(0)
  const topElementRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  const highFreqPowerRef = useRef<number>(0)
  const lowFreqPowerRef = useRef<number>(0)

  const lowerPowerAccumulatedRef = useRef<number>(0)
  const upperPowerAccumulatedRef = useRef<number>(0)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [urlStateCurr, setUrlStateCurr] = useState<URL | null>(null)
  const [urlStatePrev, setUrlStatePrev] = useState<URL | null>(null)

  const [showDemoNavigationGame, setShowDemoNavigationGame] =
    useState<boolean>(false)

  const bounceDuration = 1000

  const scrollToBottom = () => {
    const bottom = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    )
    window.scrollTo({ top: bottom, behavior: 'smooth' })
  }

  const [animateKirby, setAnimateKirby] = useState(false)

  const handleKirbyClick = async () => {
    scrollToBottom()

    setAnimateKirby(true)
    setTimeout(() => {
      setShowDemoNavigationGame(true)
    }, bounceDuration)
  }

  const [showEmail, setShowEmail] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      __DEV__ && console.log('Email copied to clipboard')
    } catch (err) {
      __DEV__ && console.error('Failed to copy email: ', err)
    }
  }, [email])

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event?.data?.url) {
        console.log('Received message from iframe:', event)
        setUrlStateCurr(event.data.url)
      }
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])

  useEffect(() => {
    if (urlStateCurr !== urlStatePrev && urlStateCurr !== null) {
      __DEV__ && console.log('NAVIGATING TO URL', urlStateCurr)
      const httpToHttps = (url: string) => url.replace('http://', 'https://')
      const urlStateCurrHttps = httpToHttps(urlStateCurr.toString())
      window.location.href = urlStateCurrHttps
      setUrlStatePrev(urlStateCurr)
    }
  }, [urlStateCurr, urlStatePrev])

  useEffect(() => {
    const updatePageHeight = () => {
      const documentHeight =
        document.documentElement.getBoundingClientRect().height
      setPageHeight(documentHeight)
    }
    updatePageHeight()
    window.addEventListener('resize', updatePageHeight)
    return () => {
      window.removeEventListener('resize', updatePageHeight)
    }
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (topElementRef.current) {
        setHeight(topElementRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  useEffect(() => {
    if (height === 0 || pageHeight === 0) return

    const scene: THREE.Scene = new THREE.Scene()

    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      750,
      window.innerWidth / window.innerHeight,
      0.2,
      10000,
    )
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      failIfMajorPerformanceCaveat: false,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const screenWidth = window.innerWidth

    const globalX: number = isThin ? 0 : -screenWidth / 30

    const loader = new GLTFLoader()
    loader.load(
      appleModelUrl,
      (gltf) => {
        const apple = gltf.scene

        // Apply scaling to match the size of the previous icosahedron

        const scale = 60

        apple.scale.set(scale, scale, scale)
        // apple.scale.set(90, 90, 90)

        // Set position
        apple.position.x = globalX

        // Add the model to the scene
        scene.add(apple)

        // Store reference to the model for animations
        backgroundShapeRef.current = apple
      },
      // Progress and error handlers...
    )

    camera.position.z = 150

    const intensity = isThin ? 0.7 : 0.4

    const intensityLights = intensity
    const intensityAmbient = intensity

    const pointLightRed = new THREE.PointLight(0xff0000)
    pointLightRed.position.set(500 + globalX, 1000, -5)
    pointLightRed.intensity = intensityLights
    scene.add(pointLightRed)

    const pointLightGreen = new THREE.PointLight(0x00ff00)
    pointLightGreen.position.set(550 + globalX, 1000, -150)
    pointLightGreen.intensity = intensityLights
    scene.add(pointLightGreen)

    const pointLightBlue = new THREE.PointLight(0x0000ff)
    pointLightBlue.position.set(600 + globalX, 1000, -5)
    pointLightBlue.intensity = intensityLights
    scene.add(pointLightBlue)

    const ambientLightThree = new THREE.AmbientLight(0xffffff)
    ambientLightThree.intensity = intensityAmbient

    scene.add(ambientLightThree)

    const getScenePositionFromScreen = (
      x: number,
      y: number,
    ): THREE.Vector3 => {
      const vec = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        (-y / window.innerHeight) * 2 + 1,
        0.5,
      )
      vec.unproject(camera)
      const dir = vec.sub(camera.position).normalize()
      const distance = -camera.position.z / dir.z
      return camera.position.clone().add(dir.multiplyScalar(distance))
    }

    const onMouseMove = (event: MouseEvent) => {
      const scenePosition = getScenePositionFromScreen(
        event.clientX,
        event.clientY,
      )
      mousePositionCurr.current = scenePosition
    }
    window.addEventListener('mousemove', onMouseMove)

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0]
      const scenePosition = getScenePositionFromScreen(
        touch.clientX,
        touch.clientY,
      )
      mousePositionCurr.current = scenePosition
      const distanceTravelled = mousePositionCurr.current.distanceTo(
        mousePositionPrev.current,
      )
      scrollPosition.current += distanceTravelled * 0.2
    }
    window.addEventListener('touchmove', onTouchMove)

    const onWheel = (event: WheelEvent) => {
      const wheelDelta = event.deltaY * 0.1
      scrollPosition.current += wheelDelta
    }
    window.addEventListener('wheel', onWheel)

    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement)
    }

    const x = 0.0093
    const y = 0.007
    const z = 0.001
    const percentKeep = 0.99995
    const percentKeepMouse = 0.95
    let animationFrame = -1

    const animate = () => {
      animationFrame += 1
      requestAnimationFrame(animate)

      scrollPositionAverage.current =
        percentKeepMouse * scrollPositionAverage.current +
        (1 - percentKeepMouse) * scrollPosition.current

      if (!backgroundShapeRef.current) {
        return
      }

      backgroundShapeRef.current.rotation.z =
        (percentKeepMouse * backgroundShapeRef.current.position.z +
          (1 - percentKeepMouse) * scrollPositionAverage.current) *
        0.1

      mousePositionPrev.current.x =
        percentKeepMouse * mousePositionPrev.current.x +
        (1 - percentKeepMouse) * mousePositionCurr.current.x
      mousePositionPrev.current.y =
        percentKeepMouse * mousePositionPrev.current.y +
        (1 - percentKeepMouse) * mousePositionCurr.current.y
      mousePositionPrev.current.z =
        percentKeepMouse * mousePositionPrev.current.z +
        (1 - percentKeepMouse) * mousePositionCurr.current.z

      if (isMobile || isThin || !audioRef.current || audioRef.current.paused) {
        backgroundShapeRef.current.rotation.x =
          percentKeep * backgroundShapeRef.current.rotation.x +
          (1 - percentKeep) *
            (20 * Math.sin(animationFrame * x) + mousePositionPrev.current.x)
        backgroundShapeRef.current.rotation.y =
          percentKeep * backgroundShapeRef.current.rotation.y +
          (1 - percentKeep) *
            (20 * Math.sin(animationFrame * y) + mousePositionPrev.current.y)
        backgroundShapeRef.current.rotation.z =
          percentKeep * backgroundShapeRef.current.rotation.z +
          (1 - percentKeep) * (20 * Math.sin(animationFrame * z))
      } else {
        lowerPowerAccumulatedRef.current =
          (lowerPowerAccumulatedRef.current +
            Math.pow(highFreqPowerRef.current, 2) * 0.0005) %
          360
        upperPowerAccumulatedRef.current =
          (upperPowerAccumulatedRef.current +
            Math.pow(lowFreqPowerRef.current, 3) * 0.002) %
          360
        // lowerPowerAccumulatedRef.current =
        //   (lowerPowerAccumulatedRef.current +
        //     Math.pow(highFreqPowerRef.current, 1) * 0.002) %
        //   360
        // upperPowerAccumulatedRef.current =
        //   (upperPowerAccumulatedRef.current +
        //     Math.pow(lowFreqPowerRef.current, 3) * 0.001) %
        //   360

        const percentKeepPowerShort = 0.5
        const percentKeepPowerLong = 0.5

        backgroundShapeRef.current.rotation.x =
          backgroundShapeRef.current.rotation.x * percentKeepPowerShort +
          lowerPowerAccumulatedRef.current * (1 - percentKeepPowerShort)

        backgroundShapeRef.current.rotation.y =
          backgroundShapeRef.current.rotation.y * percentKeepPowerShort +
          upperPowerAccumulatedRef.current * (1 - percentKeepPowerShort)

        pointLightRed.intensity =
          pointLightRed.intensity * percentKeepPowerLong +
          (0.5 + highFreqPowerRef.current * 0.2) * (1 - percentKeepPowerLong)
        pointLightBlue.intensity =
          pointLightBlue.intensity * percentKeepPowerLong +
          (0.5 + lowFreqPowerRef.current * 0.2) * (1 - percentKeepPowerLong)
        pointLightGreen.intensity =
          (pointLightBlue.intensity + pointLightRed.intensity) / 2
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('wheel', onWheel)
    }
  }, [height, pageHeight])

  const setDefaultHighQuality = () => {
    if (isThin) {
      setConnectionQuality('medium')
    } else {
      setConnectionQuality('high')
    }
  }

  useEffect(() => {
    // @ts-ignore
    const connection =
      // @ts-ignore
      navigator.connection ||
      // @ts-ignore
      navigator.webkitConnection ||
      // @ts-ignore
      navigator.mozConnection
    if (connection) {
      // If downlink is available, use it to decide
      if (connection.downlink) {
        const downlinkMbps = connection.downlink
        console.log('Downlink (Mbps):', downlinkMbps)
        if (downlinkMbps < 1) {
          setConnectionQuality('low')
        } else if (downlinkMbps < 2) {
          setConnectionQuality('medium')
        } else {
          setDefaultHighQuality()
        }
      } else if (connection.effectiveType) {
        const effectiveType = connection.effectiveType
        console.log('Effective type:', effectiveType)
        if (effectiveType.includes('2g')) {
          setConnectionQuality('low')
        } else if (effectiveType === '3g') {
          setConnectionQuality('medium')
        } else {
          setDefaultHighQuality()
        }
      } else {
        setDefaultHighQuality()
      }
    } else {
      setDefaultHighQuality()
    }
  }, [])

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      ref={topElementRef}
    >
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full"></div>

      {!isThin && (
        // overflow is totally visible
        <div className="fixed top-0 -z-10 h-full" ref={refContainer} />
      )}
      {isThin && (
        <div
          className="fixed left-0 top-0 -z-10 h-full w-full"
          ref={refContainer}
        />
      )}

      {/* Desktop Resume & AudioSpectrogram */}
      {!isThin && (
        <div className="fixed left-0 z-10 flex w-[30%] flex-col items-center px-4">
          <div className="h-40" />
          <h1 className="pixel-font mb-4 text-6xl font-bold uppercase">
            Eric Niemeyer
          </h1>

          <button
            type="button"
            className={`active:bg-blue-500/ w-full rounded-full px-4 py-2 text-2xl uppercase transition-all transition-none hover:bg-blue-500 active:bg-blue-500/50 ${showEmail ? 'font-bold' : ''}`}
            onMouseEnter={() => {
              ReactGA.event({
                category: 'User',
                action: 'Hover Email',
                label: email,
              })
              setShowEmail(true)
            }}
            onMouseLeave={() => setShowEmail(false)}
            onClick={copyToClipboard}
          >
            {showEmail ? 'Copy Email' : email}
          </button>
          {showSmashedGif ? (
            <img
              data-tooltip-content={'His 2017 gif spawned a 2022 game'}
              className="pixel-art tooltip mb-4 w-[70%] object-cover"
              src="/smashed_small.gif"
              alt="gif"
            />
          ) : (
            <div className="mb-20" />
          )}
          <h1 className="text-2xl uppercase">Stamford, Connecticut</h1>
          <h1 className="mb-4 text-2xl">618-616-338O</h1>
          <AudioSpectrogram
            highFreqPowerRef={highFreqPowerRef}
            lowFreqPowerRef={lowFreqPowerRef}
            audioRef={audioRef}
          />
        </div>
      )}

      <>
        <div className="left-0 top-0 z-0 flex h-full w-full flex-col items-end">
          <div className={`relative ${isThin ? 'w-full' : 'w-[70%]'} h-full`}>
            <div className="h-auto w-full">
              <Resume />
            </div>

            <div className="h-40" />

            <div className={!isThin ? '' : 'border border-black/0 bg-black/80'}>
              <div className="mb-4 mt-16">
                <PixelArtText
                  scrollContainerSelector=".pixel-text-contact"
                  pixelColor="#fff"
                  text=" CONTACT "
                />
              </div>
              <ContactSection
                animateKirby={animateKirby}
                onPhoneClick={() => window.open('tel:618-616-3380')}
                handleKirbyClick={handleKirbyClick}
              />

              <section
                className={`${
                  isThin
                    ? showDemoNavigationGame
                      ? 'h-[500px]'
                      : 'h-[200px]'
                    : showDemoNavigationGame
                      ? 'h-[700px]'
                      : 'h-[300px]'
                } relative z-30 flex flex-col items-center justify-end`}
              >
                {showDemoNavigationGame ? (
                  <>
                    <iframe
                      className={`${isThin ? 'h-[400px] w-full' : 'h-[800px] w-full'} justify-self-center shadow-xl transition-all`}
                      src="https://projects.niemo.io"
                      title="Projects"
                      allowFullScreen
                    ></iframe>
                    <img
                      className={`absolute right-2 z-40 h-12 w-12 cursor-pointer transition-all hover:scale-105 hover:opacity-100 active:opacity-50 ${isThin ? 'top-28' : 'top-2 opacity-50'}`}
                      src="/remove.png"
                      alt="Close"
                      onClick={() => setShowDemoNavigationGame(false)}
                    />
                  </>
                ) : (
                  <>
                    {showKirbyGame && (
                      <div
                        className={`${isThin ? 'h-[400px] w-full' : 'h-[800px] w-full'} flex flex-col items-center justify-center justify-self-center shadow-xl transition-all`}
                      >
                        <img
                          className="pixel-art mt-4 h-full origin-center transform cursor-pointer justify-self-center opacity-10 transition-all hover:scale-105 hover:opacity-50 active:scale-95 active:opacity-100"
                          src="/qwhite_hardpixels_transbg.png"
                          alt="Question Mark"
                          onClick={handleKirbyClick}
                        />
                      </div>
                    )}
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
        <Tooltip
          opacity={1}
          anchorSelect=".tooltip"
          place="top"
          delayHide={tooltipDelay}
          delayShow={tooltipDelay}
          style={toolTipStyle}
        />
      </>
    </div>
  )
}

export default Main
