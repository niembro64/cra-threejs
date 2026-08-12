import { RefObject, useEffect, useRef, useState } from 'react';

interface MediaVisibility<T extends HTMLElement> {
  mediaRef: RefObject<T>;
  shouldLoadMedia: boolean;
  isVisible: boolean;
}

const MIN_MEDIA_LOAD_BUFFER_PX = 2400;
const MIN_MEDIA_UNLOAD_BUFFER_PX = 4200;
const MIN_MEDIA_PLAY_BUFFER_PX = 1400;
const MIN_MEDIA_PAUSE_BUFFER_PX = 2200;

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
      const rootHeight = rootBottom - rootTop;
      const loadBufferPx = Math.max(MIN_MEDIA_LOAD_BUFFER_PX, rootHeight * 2);
      const unloadBufferPx = Math.max(MIN_MEDIA_UNLOAD_BUFFER_PX, rootHeight * 3);

      setShouldLoadMedia((current) => {
        const bufferPx = current ? unloadBufferPx : loadBufferPx;
        const shouldBeLoaded = mediaBounds.bottom >= rootTop - bufferPx && mediaBounds.top <= rootBottom + bufferPx;

        return current === shouldBeLoaded ? current : shouldBeLoaded;
      });

      setIsVisible((current) => {
        const bufferPx = current
          ? Math.max(MIN_MEDIA_PAUSE_BUFFER_PX, rootHeight * 2)
          : Math.max(MIN_MEDIA_PLAY_BUFFER_PX, rootHeight * 1.25);
        const shouldBePlaying = mediaBounds.bottom >= rootTop - bufferPx && mediaBounds.top <= rootBottom + bufferPx;

        return current === shouldBePlaying ? current : shouldBePlaying;
      });
    };

    const schedulePrefetchCheck = () => {
      if (prefetchFrame) return;
      prefetchFrame = window.requestAnimationFrame(updatePrefetchState);
    };

    updatePrefetchState();
    (scrollRoot ?? window).addEventListener('scroll', schedulePrefetchCheck, { passive: true });
    window.addEventListener('resize', schedulePrefetchCheck, { passive: true });

    return () => {
      window.cancelAnimationFrame(prefetchFrame);
      (scrollRoot ?? window).removeEventListener('scroll', schedulePrefetchCheck);
      window.removeEventListener('resize', schedulePrefetchCheck);
    };
  }, []);

  return { mediaRef, shouldLoadMedia, isVisible };
};
