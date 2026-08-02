import { RefObject, useEffect, useRef, useState } from 'react';

interface MediaVisibility<T extends HTMLElement> {
  mediaRef: RefObject<T>;
  hasEnteredViewport: boolean;
  isVisible: boolean;
}

export const useMediaVisibility = <T extends HTMLElement>(): MediaVisibility<T> => {
  const mediaRef = useRef<T>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return;

    if (!('IntersectionObserver' in window)) {
      setHasEnteredViewport(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setHasEnteredViewport(true);
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(mediaElement);
    return () => observer.disconnect();
  }, []);

  return { mediaRef, hasEnteredViewport, isVisible };
};
