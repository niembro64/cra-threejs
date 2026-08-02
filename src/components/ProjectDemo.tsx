import React, { useRef } from 'react';
import { ProjectStore } from '../store/ProjectStore';
import type { Project } from '../data/myData';
import { useMediaVisibility } from '../hooks/useMediaVisibility';
import { getProjectMediaKind, selectProjectMedia } from '../utils/projectMedia';
import { scrollElementToVisualViewportBottom } from '../utils/viewport';
import FancyButton from './FancyButton';
import { isMobile, isThin } from './Main';
import ProjectMedia from './ProjectMedia';

interface ProjectDemoProps {
  project: Project;
  index: number;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project, index }) => {
  const connectionQuality = ProjectStore((state) => state.connectionQuality);
  const isActive = ProjectStore((state) => state.activeProjectIndex === index);
  const setActiveProjectIndex = ProjectStore((state) => state.setActiveProjectIndex);
  const isMuted = ProjectStore((state) => state.mutedArray[index] ?? true);
  const setMuted = ProjectStore((state) => state.setMuted);
  const hasTouchedAudioButton = ProjectStore((state) => state.hasTouchedAudioButton);

  const { mediaRef, hasEnteredViewport, isVisible } = useMediaVisibility<HTMLDivElement>();
  const actionRef = useRef<HTMLDivElement>(null);
  const mediaSource = selectProjectMedia(project, connectionQuality, isMobile);
  const mediaIsVideo = mediaSource ? getProjectMediaKind(mediaSource) === 'video' : false;
  const canLaunch =
    project.projectStatus === 'ok' && ((isThin && project.supportsMobile) || (!isThin && project.supportsDesktop));

  const handleMediaClick = () => {
    setActiveProjectIndex(isActive ? null : index);
  };

  const scrollActionIntoView = () => {
    if (!isThin || !isActive) return;

    const actionButton = actionRef.current?.querySelector('button');
    if (actionButton) scrollElementToVisualViewportBottom(actionButton);
  };

  const handleDetailsTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target || event.propertyName !== 'grid-template-rows' || !isActive) {
      return;
    }

    window.requestAnimationFrame(scrollActionIntoView);
  };

  const unavailableLabel = project.projectStatus !== 'ok' ? 'Offline' : isThin ? 'Desktop Only' : 'Mobile Only';

  return (
    <article className="w-full min-w-0 rounded-2xl transition-all duration-300">
      <div className="mb-4 flex min-h-14 flex-row items-center justify-center text-center">
        {project.icon && (
          <img
            src={`${process.env.PUBLIC_URL}/${project.icon}`}
            alt=""
            className="mb-2 mr-3 h-12 w-auto"
            loading="lazy"
            decoding="async"
          />
        )}
        <h3
          className={`pixel-font uppercase leading-tight ${isThin ? 'text-4xl' : 'text-[clamp(1.75rem,2.4vw,3rem)]'}`}
        >
          <strong>{project.title}</strong>
        </h3>
      </div>

      <div ref={mediaRef} className="relative p-2 sm:p-4">
        <button
          type="button"
          className="group block w-full cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          onClick={handleMediaClick}
          aria-expanded={isActive}
          aria-label={`${isActive ? 'Hide' : 'View'} details for ${project.title}`}
        >
          {hasEnteredViewport && mediaSource && (
            <ProjectMedia
              source={mediaSource}
              poster={project.image}
              title={project.title}
              isMuted={isMuted}
              isVisible={isVisible}
            />
          )}

          {!isActive && hasEnteredViewport && (
            <span
              className={`pointer-events-none absolute inset-2 flex rounded-3xl transition-opacity duration-300 sm:inset-4 ${
                isThin
                  ? 'items-end justify-center opacity-100'
                  : 'items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
              }`}
            >
              <span className="mb-2 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm sm:mb-0 sm:text-base">
                View details
              </span>
            </span>
          )}
        </button>

        {project.hasSound && !isMobile && mediaIsVideo && hasEnteredViewport && (
          <button
            type="button"
            data-tooltip-content={isMuted ? 'Unmute' : 'Mute'}
            className="tooltip absolute bottom-2 right-2 z-10 rounded-full bg-black/70 p-2 text-white shadow-xl transition-all hover:bg-white/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            onClick={() => setMuted(index, !isMuted)}
            aria-label={isMuted ? `Unmute ${project.title}` : `Mute ${project.title}`}
          >
            <img
              src={`${process.env.PUBLIC_URL}/${isMuted ? 'no-sound.png' : 'sound.png'}`}
              alt=""
              className="h-8 w-8"
            />
            {!hasTouchedAudioButton && (
              <span className="animation-delay-2000 absolute left-0 top-0 h-full w-full animate-ping rounded-full bg-white opacity-50" />
            )}
          </button>
        )}
      </div>

      {isActive && project.dates && <p className="mt-4 text-center text-xl text-white">{project.dates}</p>}

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        onTransitionEnd={handleDetailsTransitionEnd}
        aria-hidden={!isActive}
      >
        <div className={`min-h-0 overflow-hidden ${isActive ? 'visible' : 'invisible'}`}>
          <div className="px-2 py-4 sm:px-4">
            {project.type && (
              <div className="pixel-font mb-2 text-2xl uppercase text-blue-300">
                <strong>{project.type}</strong>
              </div>
            )}

            {project.description && <p className="mb-4 text-lg text-blue-100">{project.description}</p>}

            {project.stack && (
              <>
                <div className="pixel-font text-2xl text-fuchsia-300">
                  <strong>STACK</strong>
                </div>
                <p className="mb-4 text-lg text-fuchsia-100">{project.stack.join(', ')}</p>
              </>
            )}

            {project.bullets && (
              <>
                <div className="pixel-font text-2xl text-green-300">
                  <strong>FEATURES</strong>
                </div>
                <ul className="list-inside list-disc text-lg text-green-100">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div ref={actionRef} className="px-4 pb-6">
            {canLaunch ? (
              <FancyButton
                text={`${project.buttonStartText} ${project.title}`.toUpperCase()}
                onClick={() => window.location.assign(project.url)}
              />
            ) : (
              <button
                type="button"
                className="w-full rounded-3xl bg-white/50 py-2 text-2xl uppercase text-white/50"
                disabled
              >
                {unavailableLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(ProjectDemo);
