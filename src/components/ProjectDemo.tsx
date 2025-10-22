import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ProjectStore } from '../store/ProjectStore';
import { isMobile, isThin } from './Main';
import ReactGA from 'react-ga4';
import { extraTimeLazyLoad, mediaBasePath, Project } from '../data/myData';
import FancyButton from './FancyButton';

const isVideo = (mediaSource: string | null) => {
  if (mediaSource === null) return false;
  return mediaSource.endsWith('.mp4');
};

const isGif = (mediaSource: string) => {
  if (mediaSource === null) return false;
  return mediaSource.endsWith('.gif');
};

const isImage = (mediaSource: string) => {
  if (mediaSource === null) return false;
  return mediaSource.endsWith('.png') || mediaSource.endsWith('.jpg');
};

interface ProjectDemoProps {
  project: Project;
  index: number;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
  isMuted: boolean;
  hasTouchedAMuteButton: boolean;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project, index, setIsMuted, isMuted, hasTouchedAMuteButton }) => {
  const { connectionQuality, activeProjectIndex, setActiveProjectIndex } = ProjectStore();

  const mediaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!mediaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setInView(true);
          }, extraTimeLazyLoad);
          observer.disconnect();
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% is visible
      }
    );
    observer.observe(mediaRef.current);
    return () => {
      if (mediaRef.current) {
        observer.unobserve(mediaRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log('connectionQuality:', connectionQuality);
    switch (connectionQuality) {
      case 'low':
        setMediaSrc(project.image);
        break;
      case 'medium':
      case 'high':
        if (isMobile) {
          setMediaSrc(project.gif);
        } else {
          setMediaSrc(project.video);
        }
        break;
      default:
        setMediaSrc(project.image);
        break;
    }
  }, [connectionQuality, project]);

  useEffect(() => {
    const fullPath: string = mediaBasePath + mediaSrc || '';

    console.log('fullPath:', fullPath);
  }, [mediaSrc]);

  const handleProjectClick = () => {
    window.location.href = project.url;
  };

  const handleMediaClick = () => {
    setActiveProjectIndex(activeProjectIndex === index ? null : index);
  };

  const toggleMute = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setIsMuted(!isMuted);
  };

  const isActive = activeProjectIndex === index;
  return (
    <div className={`w-full rounded-2xl transition-all duration-300 ${isActive ? '' : ''}`}>
      <div className="mb-4 flex flex-row items-center justify-center text-center">
        {project.icon && (
          <img
            src={process.env.PUBLIC_URL + '/' + project.icon}
            alt={`${project.title}-icon`}
            className="mb-2 mr-3 h-12 w-auto"
          />
        )}
        <div className="pixel-font text-5xl uppercase">
          <strong>{project.title}</strong>
        </div>
      </div>

      {/* LAZY LOADED MEDIA - Clickable to expand */}
      <div
        ref={mediaRef}
        className={`relative flex transform cursor-pointer flex-row justify-center p-4 transition-transform duration-300 ${isThin ? '' : ''}`}
        onClick={handleMediaClick}
      >
        {inView && mediaSrc && isThin && (
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
              <img className="w-full rounded-3xl object-cover" src={mediaBasePath + mediaSrc} alt="gif" />
            )}
            {isImage(mediaSrc) && (
              <img className="w-full rounded-3xl object-cover" src={mediaBasePath + mediaSrc} alt="static fallback" />
            )}
          </>
        )}
        {inView && mediaSrc && !isThin && (
          <>
            {isVideo(mediaSrc) && (
              <video
                className="h-auto w-[70%] rounded-3xl"
                src={mediaBasePath + mediaSrc}
                autoPlay
                muted={isMuted}
                loop
              />
            )}
            {isGif(mediaSrc) && (
              <img className="w-[70%] rounded-3xl object-cover" src={mediaBasePath + mediaSrc} alt="gif" />
            )}
            {isImage(mediaSrc) && (
              <img className="w-[70%] rounded-3xl object-cover" src={mediaBasePath + mediaSrc} alt="static fallback" />
            )}
          </>
        )}

        {/* MUTE BUTTON for video with sound */}
        {project.hasSound && !isMobile && connectionQuality !== 'low' && inView && (
          <button
            type="button"
            data-tooltip-content={isMuted ? 'Unmute' : 'Mute'}
            className="tooltip absolute bottom-2 right-2 z-10 rounded-full bg-black/70 p-2 text-white shadow-xl transition-all hover:bg-white/50"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(e);
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/' + (isMuted ? 'no-sound.png' : 'sound.png')}
              alt={isMuted ? 'Unmute' : 'Mute'}
              className="h-8 w-8"
            />
            {!hasTouchedAMuteButton && (
              <div className="animation-delay-2000 absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-white opacity-50"></div>
            )}
          </button>
        )}

        {/* Click to expand indicator */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur-sm">Click to view details</div>
          </div>
        )}
      </div>

      {isActive && project.dates && <p className={`mt-4 text-center text-xl text-white`}>{project.dates}</p>}

      {/* Project Details - Only shown when active */}
      <div
        className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
          isActive ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isThin ? (
          <div className="px-2 py-4">
            {project.type && (
              <div className="pixel-font mb-2 text-2xl uppercase text-blue-300">
                <strong>{project.type}</strong>
              </div>
            )}

            {project.description && <div className="mb-4 text-xl text-blue-100">{project.description}</div>}

            {project.stack && (
              <>
                <div className="pixel-font text-2xl text-fuchsia-300">
                  <strong>STACK</strong>
                </div>
                <div className="mb-4 text-lg text-fuchsia-100">{project.stack.join(', ')}</div>
              </>
            )}

            {project.bullets && (
              <>
                <div className="pixel-font text-2xl text-green-300">
                  <strong>FEATURES</strong>
                </div>
                <ul className="list-inside list-disc text-lg text-green-100">
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col px-4 py-6 md:flex-row">
            {/* Desktop Layout */}
            <div className="md:w-1/2 md:pr-4">
              {project.type && (
                <div className="mb-2 text-xl text-blue-300">
                  <strong>{project.type.toUpperCase()}</strong>
                </div>
              )}

              {project.description && <div className="mb-4 text-xl text-white">{project.description}</div>}
            </div>
            <div className="mt-4 md:mt-0 md:w-1/2 md:pl-4">
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
                  {project.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {project.projectStatus === 'ok' &&
        ((isThin && project.supportsMobile) || (!isThin && project.supportsDesktop)) ? (
          <div className="px-4 pb-6">
            <FancyButton
              text={project.buttonStartText.toUpperCase() + ' ' + project.title.toUpperCase()}
              onClick={handleProjectClick}
            />
          </div>
        ) : (
          <div className="px-4 pb-6">
            <button
              type="button"
              className={`w-full rounded-3xl bg-white/50 py-2 text-2xl uppercase text-white/50 transition-all hover:bg-gray-700 hover:text-white`}
              disabled
            >
              {project.projectStatus !== 'ok' ? 'Offline' : isThin ? 'Desktop Only' : 'Mobile Only'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectDemo;
