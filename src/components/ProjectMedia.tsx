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

    if (isVisible) {
      void video.play().catch(() => {
        // Autoplay may be denied until the user interacts with the page.
      });
    } else {
      video.pause();
    }
  }, [isVisible, source]);

  if (mediaKind === 'video') {
    return (
      <video
        ref={videoRef}
        className={mediaClassName}
        src={sourceUrl}
        poster={poster ? mediaBasePath + poster : undefined}
        autoPlay={isVisible}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} video preview`}
      />
    );
  }

  if (mediaKind === 'gif' || mediaKind === 'image') {
    return (
      <img
        className={mediaClassName}
        src={sourceUrl}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  }

  return null;
};

export default ProjectMedia;
