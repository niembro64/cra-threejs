import React, { useEffect, useRef } from 'react';
import { mediaBasePath } from '../data/myData';
import { getProjectMediaKind } from '../utils/projectMedia';

interface ProjectMediaProps {
  source: string;
  poster: string | null;
  title: string;
  isMuted: boolean;
  isVisible: boolean;
}

const mediaClassName = 'aspect-video w-full rounded-3xl object-cover shadow-lg';

const ProjectMedia: React.FC<ProjectMediaProps> = ({ source, poster, title, isMuted, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaKind = getProjectMediaKind(source);
  const sourceUrl = mediaBasePath + source;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // This component is only mounted inside the bounded prefetch window, so
    // explicitly start buffering rather than waiting for viewport visibility.
    video.load();
  }, [source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updatePlayback = () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isVisible && !document.hidden && !reduceMotion) {
        void video.play().catch(() => {
          // Autoplay may be denied until the user interacts with the page.
        });
      } else {
        video.pause();
      }
    };

    updatePlayback();
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, [isVisible, source]);

  if (mediaKind === 'video') {
    return (
      <video
        ref={videoRef}
        className={mediaClassName}
        src={sourceUrl}
        poster={poster ? mediaBasePath + poster : undefined}
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        width={1280}
        height={720}
        aria-label={`${title} video preview`}
      />
    );
  }

  if (mediaKind === 'image') {
    // Mounting is already controlled by IntersectionObserver, so eager loading
    // here means "eager within the prefetch window," not page-wide.
    return (
      <img
        className={mediaClassName}
        src={sourceUrl}
        alt={`${title} preview`}
        loading="eager"
        decoding="async"
        width={1280}
        height={720}
        draggable={false}
      />
    );
  }

  return null;
};

export default ProjectMedia;
