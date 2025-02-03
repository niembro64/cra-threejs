// Main.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import ContactSection from './ContactSection'
import { Resume } from './Resume'
import AudioSpectrogram from './Spectrogram'
import { Tooltip } from 'react-tooltip'
import { tooltipDelay, toolTipStyle } from '../data/projects'
import { useResumeStore } from '../store/audioStore'

export const isMobile: boolean = window.innerWidth < 900
export const __DEV__ = process.env.NODE_ENV === 'development'

const Main: React.FC = () => {
  const { setConnectionQuality } = useResumeStore()

  const refContainer = useRef<HTMLDivElement | null>(null)
  const mousePositionCurr = useRef(new THREE.Vector3())
  const mousePositionPrev = useRef(new THREE.Vector3())
  const scrollPosition = useRef(0)
  const scrollPositionAverage = useRef(0)
  const [pageHeight, setPageHeight] = useState(0)
  const topElementRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  const lowerPowerRawRef = useRef<number>(0)
  const upperPowerRawRef = useRef<number>(0)

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

  const email = 'niemeyer.eric@gmail.com'
  const [showEmail, setShowEmail] = useState(false)

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      __DEV__ && console.log('Email copied to clipboard')
    } catch (err) {
      __DEV__ && console.error('Failed to copy email: ', err)
    }
  }, [email])

  // --- NEW STATE & EFFECT FOR PARALLAX ON MOBILE ---
  const [mobileScrollY, setMobileScrollY] = useState(0)

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

  // --- ONLY ON MOBILE, TRACK SCROLL TO ACHIEVE PARALLAX ---
  useEffect(() => {
    if (!isMobile) return
    const handleMobileScroll = () => {
      setMobileScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleMobileScroll)
    return () => {
      window.removeEventListener('scroll', handleMobileScroll)
    }
  }, [])

  // 3D Setup
  useEffect(() => {
    if (height === 0 || pageHeight === 0) return

    const scene = new THREE.Scene()

    const camera: any = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.2,
      10000,
    )
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      failIfMajorPerformanceCaveat: false,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const globalX = isMobile ? -50 : 0

    const geometry = new THREE.IcosahedronGeometry(90, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 300,
      flatShading: true,
      wireframe: false,
      shadowSide: THREE.DoubleSide,
      side: THREE.DoubleSide,
    })
    const ball = new THREE.Mesh(geometry, material)
    scene.add(ball)
    ball.position.x = globalX

    camera.position.z = 150

    const pointLightRed = new THREE.PointLight(0xff0000)
    pointLightRed.position.set(500 + globalX, 1000, -5)
    pointLightRed.intensity = 1
    scene.add(pointLightRed)

    const pointLightGreen = new THREE.PointLight(0x00ff00)
    pointLightGreen.position.set(550 + globalX, 1000, -150)
    pointLightGreen.intensity = 1
    scene.add(pointLightGreen)

    const pointLightBlue = new THREE.PointLight(0x0000ff)
    pointLightBlue.position.set(600 + globalX, 1000, -5)
    pointLightBlue.intensity = 1
    scene.add(pointLightBlue)

    const ambientLightThree = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLightThree)
    ambientLightThree.intensity = 0

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

      ball.rotation.z =
        (percentKeepMouse * ball.position.z +
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

      if (isMobile || !audioRef.current || audioRef.current.paused) {
        ball.rotation.x =
          percentKeep * ball.rotation.x +
          (1 - percentKeep) *
            (20 * Math.sin(animationFrame * x) + mousePositionPrev.current.x)
        ball.rotation.y =
          percentKeep * ball.rotation.y +
          (1 - percentKeep) *
            (20 * Math.sin(animationFrame * y) + mousePositionPrev.current.y)
        ball.rotation.z =
          percentKeep * ball.rotation.z +
          (1 - percentKeep) * (20 * Math.sin(animationFrame * z))
      } else {
        lowerPowerAccumulatedRef.current =
          (lowerPowerAccumulatedRef.current +
            Math.pow(lowerPowerRawRef.current, 1) * 0.0008) %
          360
        upperPowerAccumulatedRef.current =
          (upperPowerAccumulatedRef.current +
            Math.pow(upperPowerRawRef.current, 3) * 0.00003) %
          360

        const percentKeepPowerShort = 0.1
        const percentKeepPowerLong = 0.92

        ball.rotation.x =
          ball.rotation.x * percentKeepPowerShort +
          lowerPowerAccumulatedRef.current * (1 - percentKeepPowerShort)

        ball.rotation.y =
          ball.rotation.y * percentKeepPowerShort +
          upperPowerAccumulatedRef.current * (1 - percentKeepPowerShort)

        pointLightRed.intensity =
          pointLightRed.intensity * percentKeepPowerLong +
          (0.5 + lowerPowerRawRef.current * 0.2) * (1 - percentKeepPowerLong)
        pointLightBlue.intensity =
          pointLightBlue.intensity * percentKeepPowerLong +
          (0.5 + upperPowerRawRef.current * 0.2) * (1 - percentKeepPowerLong)
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
    if (isMobile) {
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
    <div className="relative min-h-screen w-full" ref={topElementRef}>
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full bg-black"></div>

      {!isMobile && (
        <div
          className="fixed left-[-50%] top-0 -z-10 h-full w-full"
          ref={refContainer}
        />
      )}
      {isMobile && (
        <div
          className="fixed left-0 top-0 -z-10 h-full w-full"
          ref={refContainer}
        />
      )}

      {/* Desktop Resume & AudioSpectrogram */}
      {!isMobile && (
        <div className="fixed left-0 z-10 flex w-[30%] flex-col items-center">
          <div className="h-40" />
          <h1 className="pixel-font mb-4 text-6xl font-bold uppercase">
            Eric Niemeyer
          </h1>

          <button
            className="mb-4 w-[90%] rounded px-4 py-2 text-2xl uppercase transition-all hover:bg-fuchsia-500/50 active:bg-fuchsia-500/0"
            onMouseEnter={() => setShowEmail(true)}
            onMouseLeave={() => setShowEmail(false)}
            onClick={copyToClipboard}
          >
            {showEmail ? 'Copy Email' : email}
          </button>
          <img
            data-tooltip-content={'His 2017 gif spawned a 2022 game'}
            className="pixel-art tooltip mb-4 w-[70%] object-cover"
            src="/smashed_small.gif"
            alt="gif"
          />
          <h1 className="text-2xl uppercase">Stamford, Connecticut</h1>
          <h1 className="mb-4 text-2xl">618-616-338O</h1>
          <AudioSpectrogram
            lowerPowerRef={lowerPowerRawRef}
            upperPowerRef={upperPowerRawRef}
            audioRef={audioRef}
          />
        </div>
      )}

      <div className="left-0 top-0 z-0 flex h-full w-full flex-col items-end">
        <div className={`relative ${isMobile ? 'w-full' : 'w-[70%]'} h-full`}>
          <div className="h-auto w-full">
            <Resume />
          </div>

          <div className="h-40" />

          <div className="bg-black/50">
            <ContactSection
              animateKirby={animateKirby}
              onPhoneClick={() => window.open('tel:618-616-3380')}
              email={email}
              handleKirbyClick={handleKirbyClick}
            />
            <section
              className={`${
                isMobile ? 'h-[500px]' : 'h-[700px]'
              } relative z-30 flex flex-col items-center justify-end`}
            >
              {showDemoNavigationGame ? (
                <>
                  <iframe
                    className={`${isMobile ? 'h-[400px] w-full' : 'h-[800px] w-full'} justify-self-center shadow-xl transition-all`}
                    src="https://projects.niemo.io"
                    title="Projects"
                    allowFullScreen
                  ></iframe>
                  <img
                    className={`absolute right-2 z-40 h-12 w-12 cursor-pointer transition-all hover:scale-105 hover:opacity-100 active:opacity-50 ${isMobile ? 'top-28' : 'top-2 opacity-50'}`}
                    src="/remove.png"
                    alt="Close"
                    onClick={() => setShowDemoNavigationGame(false)}
                  />
                </>
              ) : (
                <div
                  className={`${
                    isMobile ? 'h-[400px] w-full' : 'h-[800px] w-full'
                  } flex flex-col items-center justify-center justify-self-center shadow-xl transition-all`}
                >
                  <img
                    className="pixel-art mt-4 h-full origin-center transform cursor-pointer justify-self-center opacity-10 transition-all hover:scale-105 hover:opacity-50 active:scale-95 active:opacity-100"
                    src="/qwhite_hardpixels_transbg.png"
                    alt="Question Mark"
                    onClick={handleKirbyClick}
                  />
                </div>
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
    </div>
  )
}

export default Main
