import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

type DeferredImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading' | 'decoding'> & {
  src: string;
};

const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

const DeferredImage: React.FC<DeferredImageProps> = ({ src, alt = '', ...imageProps }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || shouldLoad) return;

    const scrollRoot = image.closest<HTMLElement>('.App');
    let prefetchFrame = 0;

    const checkPrefetchWindow = () => {
      prefetchFrame = 0;
      const imageBounds = image.getBoundingClientRect();
      const rootBounds = scrollRoot?.getBoundingClientRect();
      const rootTop = rootBounds?.top ?? 0;
      const rootBottom = rootBounds?.bottom ?? window.innerHeight;

      if (imageBounds.bottom >= rootTop - 600 && imageBounds.top <= rootBottom + 1600) {
        setShouldLoad(true);
      }
    };

    const schedulePrefetchCheck = () => {
      if (prefetchFrame) return;
      prefetchFrame = window.requestAnimationFrame(checkPrefetchWindow);
    };

    checkPrefetchWindow();
    (scrollRoot ?? window).addEventListener('scroll', schedulePrefetchCheck, { passive: true });
    window.addEventListener('resize', schedulePrefetchCheck, { passive: true });

    return () => {
      window.cancelAnimationFrame(prefetchFrame);
      (scrollRoot ?? window).removeEventListener('scroll', schedulePrefetchCheck);
      window.removeEventListener('resize', schedulePrefetchCheck);
    };
  }, [shouldLoad]);

  // The custom observer is the loading boundary; native lazy loading would
  // otherwise be free to postpone the real source until it is visible.
  return (
    <img
      {...imageProps}
      ref={imageRef}
      src={shouldLoad ? src : transparentPixel}
      alt={alt}
      loading="eager"
      decoding="async"
    />
  );
};

export default React.memo(DeferredImage);
