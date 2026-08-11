import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LETTERS_NICE } from '../data/textMappers';
import { isThin } from './Main';

interface PixelArtTextProps {
  text: string;
  pixelColor?: string;
  scrollContainerSelector?: string;
  totalHorzPixels?: number;
  colorOptions?: string[];
}

interface PixelDescriptor {
  column: number;
  row: number;
  color: string;
  delay: string;
  transform: string;
}

const DEFAULT_COLORS = ['#3B82F6', '#D946EF', '#06B6D4'];
const LETTER_HEIGHT = LETTERS_NICE.A.length;

const PixelArtText: React.FC<PixelArtTextProps> = ({
  text,
  pixelColor = '#000',
  scrollContainerSelector,
  totalHorzPixels = 100,
  colorOptions = DEFAULT_COLORS,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const { columns, pixels } = useMemo(() => {
    const rows = Array<string>(LETTER_HEIGHT).fill('');

    for (const [characterIndex, character] of Array.from(text).entries()) {
      const pattern = LETTERS_NICE[character];
      if (!pattern) throw new Error(`Unsupported character: "${character}". Only capital letters A-Z are allowed.`);

      for (let row = 0; row < LETTER_HEIGHT; row += 1) {
        rows[row] += pattern[row] + (characterIndex === text.length - 1 ? '' : ' ');
      }
    }

    const contentWidth = rows[0].length;
    const columnsToUse = isThin ? contentWidth : Math.max(totalHorzPixels, contentWidth);
    const leftPadding = Math.floor((columnsToUse - contentWidth) / 2);
    const descriptors: PixelDescriptor[] = [];

    rows.forEach((row, rowIndex) => {
      Array.from(row).forEach((value, columnIndex) => {
        if (value !== '#') return;

        descriptors.push({
          column: columnIndex + leftPadding + 1,
          row: rowIndex + 1,
          color: colorOptions[Math.floor(Math.random() * colorOptions.length)] ?? pixelColor,
          delay: `${(Math.random() * 0.7).toFixed(2)}s`,
          transform: `translate(${Math.round(Math.random() * 160 - 80)}px, ${Math.round(Math.random() * 160 - 80)}px)`,
        });
      });
    });

    return { columns: columnsToUse, pixels: descriptors };
  }, [colorOptions, pixelColor, text, totalHorzPixels]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element || hasAnimated) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setHasAnimated(true);
      return;
    }

    const root = scrollContainerSelector ? document.querySelector(scrollContainerSelector) : null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        observer.disconnect();
      },
      { root, rootMargin: '100px 0px', threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated, scrollContainerSelector]);

  return (
    <div
      ref={wrapperRef}
      className="pixel-art-text"
      style={{ aspectRatio: `${columns} / ${LETTER_HEIGHT}` }}
      role="img"
      aria-label={text.trim()}
    >
      <div
        className="pixel-art-text__grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${LETTER_HEIGHT}, 1fr)`,
        }}
      >
        {pixels.map((pixel) => (
          <span
            key={`${pixel.row}-${pixel.column}`}
            className={`pixel-art-text__pixel ${hasAnimated ? 'pixel-art-text__pixel--visible' : ''}`}
            style={
              {
                gridColumn: pixel.column,
                gridRow: pixel.row,
                '--pixel-delay': pixel.delay,
                '--pixel-start-transform': pixel.transform,
                '--pixel-random-color': pixel.color,
                '--pixel-final-color': pixelColor,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(PixelArtText);
