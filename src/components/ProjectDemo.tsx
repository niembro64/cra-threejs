import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ProjectStore } from '../store/ProjectStore'
import { isMobile, isThin } from './Main'
import ReactGA from 'react-ga4'
import { extraTimeLazyLoad, mediaBasePath, Project } from '../data/myData'

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
  const { connectionQuality } = ProjectStore()

  const mediaRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [mediaSrc, setMediaSrc] = useState<string | null>(null)

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

  useEffect(() => {
    console.log('connectionQuality:', connectionQuality)
    switch (connectionQuality) {
      case 'low':
        setMediaSrc(project.image)
        break
      case 'medium':
      case 'high':
        if (isMobile) {
          setMediaSrc(project.gif)
        } else {
          setMediaSrc(project.video)
        }
        break
      default:
        setMediaSrc(project.image)
        break
    }
  }, [connectionQuality, project])

  useEffect(() => {
    const fullPath: string = mediaBasePath + mediaSrc || ''

    console.log('fullPath:', fullPath)
  }, [mediaSrc])

  const handleProjectClick = () => {
    window.location.href = project.url
  }

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
            className="mb-2 mr-3 h-12 w-auto"
          />
        )}
        <div className="pixel-font mb-2 text-5xl uppercase">
          <strong>{project.title}</strong>
        </div>
      </div>

      {isThin ? (
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
      {project.projectStatus === 'ok' &&
      ((isThin && project.supportsMobile) ||
        (!isThin && project.supportsDesktop)) ? (
        <button
          type="button"
          className="mb-4 w-full rounded-3xl bg-blue-500 px-4 py-2 text-2xl capitalize text-white transition-all hover:bg-blue-600"
          onClick={() => {
            handleProjectClick()

            ReactGA.event({
              category: 'User',
              action: 'Visit Project',
              label: project.title,
            })
          }}
        >
          <strong>
            {project.buttonStartText.toUpperCase()}{' '}
            {project.title.toUpperCase()}
          </strong>
        </button>
      ) : (
        <button
          type="button"
          className="mb-4 w-full rounded-3xl bg-gray-500/50 px-4 py-2 text-2xl uppercase text-white/50 transition-all hover:bg-gray-700 hover:text-white"
          disabled
        >
          {project.projectStatus !== 'ok'
            ? 'Project Offline'
            : isThin
              ? 'Desktop Only'
              : 'Mobile Only'}
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
        {project.hasSound &&
          !isMobile &&
          connectionQuality !== 'low' &&
          inView && (
            <button
              type="button"
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
