import React, { useEffect, useRef, useState } from 'react';
import { mediaBasePath } from '../data/myData';
import { getProjectMediaKind } from '../utils/projectMedia';

interface ProjectMediaProps {
  source: string;
  poster: string | null;
  title: string;
  isMuted: boolean;
  isVisible: boolean;
  viewTransitionName?: string;
  initialVideoTime?: number;
  onVideoElement?: (video: HTMLVideoElement | null) => void;
}

const mediaFrameClassName = 'relative aspect-video w-full overflow-hidden rounded-3xl bg-black/20 shadow-lg';
const mediaFillClassName = 'absolute inset-0 h-full w-full object-cover';

const ProjectMedia: React.FC<ProjectMediaProps> = ({
  source,
  poster,
  title,
  isMuted,
  isVisible,
  viewTransitionName,
  initialVideoTime,
  onVideoElement,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaKind = getProjectMediaKind(source);
  const sourceUrl = mediaBasePath + source;
  const posterUrl = poster ? mediaBasePath + poster : null;
  const [isVideoReady, setIsVideoReady] = useState(mediaKind !== 'video');
  const viewTransitionStyle = viewTransitionName
    ? ({ viewTransitionName } as React.CSSProperties & { viewTransitionName: string })
    : undefined;

  useEffect(() => {
    setIsVideoReady(mediaKind !== 'video');
  }, [mediaKind, source]);

  useEffect(() => {
    if (mediaKind !== 'video') {
      onVideoElement?.(null);
      return;
    }

    const video = videoRef.current;
    onVideoElement?.(video);

    return () => onVideoElement?.(null);
  }, [mediaKind, onVideoElement, source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.defaultMuted = isMuted;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    if (isMuted) {
      video.setAttribute('muted', '');
    } else {
      video.removeAttribute('muted');
    }
  }, [isMuted, source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!initialVideoTime || initialVideoTime <= 0) return;

    let isCanceled = false;
    const applyInitialTime = () => {
      if (isCanceled) return;

      const targetTime =
        Number.isFinite(video.duration) && video.duration > 0 ? initialVideoTime % video.duration : initialVideoTime;

      if (Math.abs(video.currentTime - targetTime) > 0.2) {
        try {
          video.currentTime = targetTime;
        } catch {
          // Mobile browsers can reject early seeks before the file is seekable.
        }
      }
    };

    if (video.readyState >= 1) {
      applyInitialTime();
    } else {
      video.addEventListener('loadedmetadata', applyInitialTime, { once: true });
    }

    return () => {
      isCanceled = true;
      video.removeEventListener('loadedmetadata', applyInitialTime);
    };
  }, [initialVideoTime, source]);

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
      <div className={mediaFrameClassName} style={viewTransitionStyle}>
        {posterUrl && (
          <img
            className={`${mediaFillClassName} transition-opacity duration-200 ${isVideoReady ? 'opacity-0' : 'opacity-100'}`}
            src={posterUrl}
            alt=""
            loading="eager"
            decoding="async"
            width={1280}
            height={720}
            draggable={false}
            aria-hidden="true"
          />
        )}
        <video
          ref={videoRef}
          className={`${mediaFillClassName} transition-opacity duration-200 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
          src={sourceUrl}
          poster={posterUrl ?? undefined}
          muted={isMuted}
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          width={1280}
          height={720}
          aria-label={`${title} video preview`}
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
        />
      </div>
    );
  }

  if (mediaKind === 'image') {
    // Mounting is already controlled by IntersectionObserver, so eager loading
    // here means "eager within the prefetch window," not page-wide.
    return (
      <img
        className={`${mediaFrameClassName} object-cover`}
        style={viewTransitionStyle}
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
