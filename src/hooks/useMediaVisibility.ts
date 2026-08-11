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

    const scrollRoot = mediaElement.closest<HTMLElement>('.App');
    let prefetchFrame = 0;

    // IntersectionObserver margins are clipped by nested overflow containers
    // in some browsers. Compare geometry directly so the look-ahead distance
    // remains reliable inside the app's dedicated scroll root.
    const updatePrefetchState = () => {
      prefetchFrame = 0;
      const mediaBounds = mediaElement.getBoundingClientRect();
      const rootBounds = scrollRoot?.getBoundingClientRect();
      const rootTop = rootBounds?.top ?? 0;
      const rootBottom = rootBounds?.bottom ?? window.innerHeight;
      const isInsidePrefetchWindow = mediaBounds.bottom >= rootTop - 600 && mediaBounds.top <= rootBottom + 1600;

      setShouldLoadMedia((current) => (current === isInsidePrefetchWindow ? current : isInsidePrefetchWindow));
    };

    const schedulePrefetchCheck = () => {
      if (prefetchFrame) return;
      prefetchFrame = window.requestAnimationFrame(updatePrefetchState);
    };

    updatePrefetchState();
    (scrollRoot ?? window).addEventListener('scroll', schedulePrefetchCheck, { passive: true });
    window.addEventListener('resize', schedulePrefetchCheck, { passive: true });

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return () => {
        window.cancelAnimationFrame(prefetchFrame);
        (scrollRoot ?? window).removeEventListener('scroll', schedulePrefetchCheck);
        window.removeEventListener('resize', schedulePrefetchCheck);
      };
    }

    const playbackObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.1),
      { root: scrollRoot, rootMargin: '0px', threshold: [0, 0.1] }
    );

    playbackObserver.observe(mediaElement);
    return () => {
      window.cancelAnimationFrame(prefetchFrame);
      (scrollRoot ?? window).removeEventListener('scroll', schedulePrefetchCheck);
      window.removeEventListener('resize', schedulePrefetchCheck);
      playbackObserver.disconnect();
    };
  }, []);

  return { mediaRef, shouldLoadMedia, isVisible };
};
