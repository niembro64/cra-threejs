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

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { root: null, rootMargin: '800px 0px', threshold: 0 }
    );

    observer.observe(image);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <img
      {...imageProps}
      ref={imageRef}
      src={shouldLoad ? src : transparentPixel}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

export default React.memo(DeferredImage);
