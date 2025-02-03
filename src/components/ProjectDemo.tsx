import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { extraTimeLazyLoad, Project } from '../data/projects'
import { isMobile } from './Main'

const isVideo = (mediaSource: string | null) => {
  if (mediaSource === null) return false
  return mediaSource.endsWith('.mp4')
}

const isGif = (mediaSource: string) => {
  if (mediaSource === null) return false
  return mediaSource.endsWith('.gif')
}

const isImage = (mediaSource: string) => {
  if (mediaSource === null) return false
  return mediaSource.endsWith('.png') || mediaSource.endsWith('.jpg')
}

interface ProjectDemoProps {
  project: Project
  setIsMuted: Dispatch<SetStateAction<boolean>>
  isMuted: boolean
  hasTouchedAMuteButton: boolean
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({
  project,
  setIsMuted,
  isMuted,
  hasTouchedAMuteButton,
}) => {
  // State to track if the element is in view
  const [inView, setInView] = useState(false)
  // State to track media type based on bandwidth
  const [connectionQuality, setConnectionQuality] = useState<
    'low' | 'medium' | 'high'
  >('low')

  const setDefaultHighQuality = () => {
    if (isMobile) {
      setConnectionQuality('medium')
    } else {
      setConnectionQuality('high')
    }
  }

  // Ref to attach to the lazy-load container
  const mediaRef = useRef<HTMLDivElement>(null)
  // 1. Detect the user's bandwidth using the NetworkInformation API
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
  // 2. Use Intersection Observer for lazy loading
  useEffect(() => {
    if (!mediaRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true)
          }, extraTimeLazyLoad)
          observer.disconnect()
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% is visible
      },
    )
    observer.observe(mediaRef.current)
    return () => {
      if (mediaRef.current) {
        observer.unobserve(mediaRef.current)
      }
    }
  }, [])
  // 3. Construct the path for different media types
  const mediaBasePath = process.env.PUBLIC_URL + '/videos2/'

  const [mediaSrc, setMediaSrc] = useState<string | null>(null)

  useEffect(() => {
    if (connectionQuality === 'low') {
      setMediaSrc(project.image)
    } else if (connectionQuality === 'medium') {
      setMediaSrc(project.gif)
    } else {
      setMediaSrc(project.video)
    }
  }, [connectionQuality, project])

  useEffect(() => {
    console.log('mediaSrc:', mediaSrc)
  }, [mediaSrc])

  // Handle navigating to project page
  const handleProjectClick = () => {
    window.location.href = project.url
  }
  // Handle mute toggling
  const toggleMute = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    setIsMuted(!isMuted)
  }
  return (
    <div className={`relative w-full rounded-2xl`}>
      <div className="flex flex-row items-center">
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt={`${project.title}-icon`}
            className="mb-2 mr-2 h-10 w-auto"
          />
        )}
        <div className="pixel-font mb-2 text-5xl uppercase">
          <strong>{project.title}</strong>
        </div>
      </div>

      {isMobile ? (
        <>
          {project.type && (
            <div className="pixel-font mb-2 text-3xl uppercase text-blue-300">
              <strong>{project.type}</strong>
            </div>
          )}

          {project.description && (
            <div className="mb-2 text-xl text-blue-100">
              {project.description}
            </div>
          )}

          {project.stack && (
            <>
              <div className="pixel-font text-3xl text-fuchsia-300">
                <strong>STACK</strong>
              </div>
              <div className="mb-2 text-xl text-fuchsia-100">
                {project.stack.join(', ')}
              </div>
            </>
          )}

          {project.bullets && (
            <>
              <div className="pixel-font text-3xl text-green-300">
                <strong>FEATURES</strong>
              </div>
              <ul className="list-inside list-disc text-xl text-green-100">
                {project.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-row">
          {/* Desktop Layout */}
          <div className="w-1/2 pr-4">
            {project.type && (
              <div className="mb-2 text-xl text-blue-300">
                <strong>{project.type.toUpperCase()}</strong>
              </div>
            )}

            {project.description && (
              <div className="mb-2 text-xl text-white">
                {project.description}
              </div>
            )}
          </div>
          <div className="w-1/2 pl-4">
            {project.stack && (
              <div className="mb-2 text-xl text-fuchsia-300">
                <strong>{project.stack.join(', ').toUpperCase()}</strong>
              </div>
            )}

            <div className="text-xl text-green-300">
              <strong>FEATURES</strong>
            </div>
            {project.bullets && (
              <ul className="list-inside list-disc text-xl text-green-100">
                {project.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="h-6" />

      {/* BUTTON TO VISIT THE PROJECT */}
      {(isMobile && project.supportsMobile) ||
      (!isMobile && project.supportsDesktop) ? (
        <button
          className="mb-4 w-full rounded-3xl bg-blue-500 px-4 py-2 text-2xl capitalize text-white transition-all hover:bg-blue-600"
          onClick={handleProjectClick}
        >
          <strong>
            {project.buttonStartText.toUpperCase()}{' '}
            {project.title.toUpperCase()}
          </strong>
        </button>
      ) : (
        <button
          className="mb-4 w-full rounded-3xl bg-gray-500/50 px-4 py-2 text-2xl uppercase text-white/50 transition-all hover:bg-gray-700 hover:text-white"
          onClick={handleProjectClick}
          disabled
        >
          {isMobile ? 'Desktop Only' : 'Mobile Only'}
        </button>
      )}

      {/* LAZY LOADED MEDIA */}
      <div ref={mediaRef} className="relative">
        {inView && mediaSrc && (
          <>
            {isVideo(mediaSrc) && (
              <video
                className="h-auto w-full rounded-3xl"
                src={mediaBasePath + mediaSrc}
                autoPlay
                muted={isMuted}
                loop
              />
            )}
            {isGif(mediaSrc) && (
              <img
                className="w-full rounded-md object-cover"
                src={mediaBasePath + mediaSrc}
                alt="gif"
              />
            )}
            {isImage(mediaSrc) && (
              <img
                className="w-full rounded-md object-cover"
                src={mediaBasePath + mediaSrc}
                alt="static fallback"
              />
            )}
          </>
        )}

        {/* MUTE BUTTON for video with sound */}
        {project.hasSound && connectionQuality === 'high' && inView && (
          <button
            data-tooltip-content={isMuted ? 'Unmute' : 'Mute'}
            className="tooltip absolute bottom-2 right-2 z-10 rounded-full bg-transparent p-2 text-white shadow-xl transition-all hover:bg-white/50"
            onClick={toggleMute}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                '/' +
                (isMuted ? 'no-sound.png' : 'sound.png')
              }
              alt={isMuted ? 'Unmute' : 'Mute'}
              className="h-12 w-12"
            />
            {!hasTouchedAMuteButton && (
              <div className="animation-delay-2000 absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-white opacity-50"></div>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
export default ProjectDemo
