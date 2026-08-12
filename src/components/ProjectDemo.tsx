import React, { useCallback, useRef } from 'react';
import { flushSync } from 'react-dom';
import { ProjectStore } from '../store/ProjectStore';
import { showProjectTitleIcons, type Project } from '../data/myData';
import { useMediaVisibility } from '../hooks/useMediaVisibility';
import { getProjectMediaKind, selectProjectMedia } from '../utils/projectMedia';
import { isMobile, isThin } from './Main';
import ProjectDetailsModal from './ProjectDetailsModal';
import ProjectMedia from './ProjectMedia';

interface ProjectDemoProps {
  project: Project;
  index: number;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

const getVideoTime = (video: HTMLVideoElement | null): number =>
  video && Number.isFinite(video.currentTime) ? video.currentTime : 0;

const ProjectDemo: React.FC<ProjectDemoProps> = ({ project, index }) => {
  const connectionQuality = ProjectStore((state) => state.connectionQuality);
  const isActive = ProjectStore((state) => state.activeProjectIndex === index);
  const setActiveProjectIndex = ProjectStore((state) => state.setActiveProjectIndex);
  const isMuted = ProjectStore((state) => state.mutedArray[index] ?? true);
  const setMuted = ProjectStore((state) => state.setMuted);
  const hasTouchedAudioButton = ProjectStore((state) => state.hasTouchedAudioButton);
  const cardVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const cardInitialVideoTimeRef = useRef(0);
  const modalInitialVideoTimeRef = useRef(0);

  const { mediaRef, shouldLoadMedia, isVisible } = useMediaVisibility<HTMLDivElement>();
  const mediaSource = selectProjectMedia(project, connectionQuality);
  const mediaIsVideo = mediaSource ? getProjectMediaKind(mediaSource) === 'video' : false;
  const viewTransitionName = `project-media-${index}`;
  const canLaunch =
    project.projectStatus === 'ok' && ((isThin && project.supportsMobile) || (!isThin && project.supportsDesktop));

  const startActiveProjectTransition = useCallback(
    (nextIndex: number | null) => {
      const applyUpdate = () => setActiveProjectIndex(nextIndex);
      const transitionDocument = document as ViewTransitionDocument;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!transitionDocument.startViewTransition || reduceMotion) {
        applyUpdate();
        return;
      }

      transitionDocument.startViewTransition(() => {
        flushSync(applyUpdate);
      });
    },
    [setActiveProjectIndex]
  );

  const setCardVideoElement = useCallback((video: HTMLVideoElement | null) => {
    cardVideoRef.current = video;
  }, []);

  const setModalVideoElement = useCallback((video: HTMLVideoElement | null) => {
    modalVideoRef.current = video;
  }, []);

  const openDetails = useCallback(() => {
    modalInitialVideoTimeRef.current = getVideoTime(cardVideoRef.current);
    startActiveProjectTransition(index);
  }, [index, startActiveProjectTransition]);

  const closeDetails = useCallback(() => {
    cardInitialVideoTimeRef.current = getVideoTime(modalVideoRef.current);
    startActiveProjectTransition(null);
  }, [startActiveProjectTransition]);

  const handleMediaClick = useCallback(() => {
    if (isActive) {
      closeDetails();
    } else {
      openDetails();
    }
  }, [closeDetails, isActive, openDetails]);

  const unavailableLabel = project.projectStatus !== 'ok' ? 'Offline' : isThin ? 'Desktop Only' : 'Mobile Only';

  return (
    <article className="w-full min-w-0 rounded-2xl">
      <div className="mb-4 flex min-h-14 flex-row items-center justify-center text-center">
        {showProjectTitleIcons && project.icon && (
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
          className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-3xl bg-black/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          onClick={handleMediaClick}
          aria-expanded={isActive}
          aria-haspopup="dialog"
          aria-label={`View details for ${project.title}`}
        >
          {!isActive && shouldLoadMedia && mediaSource && (
            <ProjectMedia
              source={mediaSource}
              poster={project.image}
              title={project.title}
              isMuted={isMuted}
              isVisible={isVisible && !isActive}
              viewTransitionName={viewTransitionName}
              initialVideoTime={cardInitialVideoTimeRef.current}
              onVideoElement={setCardVideoElement}
            />
          )}

          {!isActive && shouldLoadMedia && (
            <span
              className={`pointer-events-none absolute inset-0 flex rounded-3xl transition-opacity duration-300 ${
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

        {project.hasSound && !isMobile && mediaIsVideo && shouldLoadMedia && !isActive && (
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

      {isActive && (
        <ProjectDetailsModal
          project={project}
          mediaSource={mediaSource}
          isMuted={isMuted}
          canControlSound={project.hasSound && !isMobile && mediaIsVideo}
          showSoundHint={!hasTouchedAudioButton}
          canLaunch={canLaunch}
          unavailableLabel={unavailableLabel}
          viewTransitionName={viewTransitionName}
          initialVideoTime={modalInitialVideoTimeRef.current}
          onVideoElement={setModalVideoElement}
          onToggleMuted={() => setMuted(index, !isMuted)}
          onClose={closeDetails}
        />
      )}
    </article>
  );
};

export default React.memo(ProjectDemo);
