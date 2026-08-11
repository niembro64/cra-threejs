import { RefObject, useEffect, useRef, useState } from 'react';

interface MediaVisibility<T extends HTMLElement> {
  mediaRef: RefObject<T>;
  shouldLoadMedia: boolean;
  isVisible: boolean;
}

export const useMediaVisibility = <T extends HTMLElement>(): MediaVisibility<T> => {
  const mediaRef = useRef<T>(null);
  const [shouldLoadMedia, setShouldLoadMedia] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadMedia(true);
      setIsVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(([entry]) => setShouldLoadMedia(entry.isIntersecting), {
      root: null,
      rootMargin: '400px 0px',
      threshold: 0,
    });
    const playbackObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1),
      { root: null, rootMargin: '0px', threshold: [0, 0.1] }
    );

    preloadObserver.observe(mediaElement);
    playbackObserver.observe(mediaElement);
    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, []);

  return { mediaRef, shouldLoadMedia, isVisible };
};
