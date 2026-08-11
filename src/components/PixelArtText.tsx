import React, { useEffect, useMemo, useRef } from 'react';
import { LETTERS_NICE } from '../data/textMappers';
import { getSnappedCellBounds } from '../utils/pixelCanvas';
import { isThin } from './Main';

interface PixelArtTextProps {
  text: string;
  pixelColor?: string;
  scrollContainerSelector?: string;
  totalHorzPixels?: number;
  colorOptions?: string[];
}

interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

interface PixelDescriptor {
  column: number;
  row: number;
  color: RgbColor;
  delay: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_COLORS = ['#3B82F6', '#D946EF', '#06B6D4'];
const LETTER_HEIGHT = LETTERS_NICE.A.length;
const PIXEL_ANIMATION_DURATION = 500;
const MAX_PIXEL_DELAY = 700;
const MAX_DEVICE_PIXEL_RATIO = 2;

const parseHexColor = (color: string): RgbColor => {
  const compactHex = color.replace('#', '');
  const hex =
    compactHex.length === 3
      ? Array.from(compactHex)
          .map((character) => character + character)
          .join('')
      : compactHex;
  const value = Number.parseInt(hex, 16);

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
};

const mixColors = (from: RgbColor, to: RgbColor, amount: number): string => {
  const mixChannel = (start: number, end: number) => Math.round(start + (end - start) * amount);

  return `rgb(${mixChannel(from.red, to.red)}, ${mixChannel(from.green, to.green)}, ${mixChannel(from.blue, to.blue)})`;
};

const PixelArtText: React.FC<PixelArtTextProps> = ({
  text,
  pixelColor = '#000',
  scrollContainerSelector,
  totalHorzPixels = 100,
  colorOptions = DEFAULT_COLORS,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalColor = useMemo(() => parseHexColor(pixelColor), [pixelColor]);

  const { columns, pixels } = useMemo(() => {
    const characters = Array.from(text);
    const rows = Array<string>(LETTER_HEIGHT).fill('');

    characters.forEach((character, characterIndex) => {
      const pattern = LETTERS_NICE[character];
      if (!pattern) throw new Error(`Unsupported character: "${character}".`);

      for (let row = 0; row < LETTER_HEIGHT; row += 1) {
        rows[row] += pattern[row] + (characterIndex === characters.length - 1 ? '' : ' ');
      }
    });

    const contentWidth = rows[0].length;
    const columnsToUse = isThin ? contentWidth : Math.max(totalHorzPixels, contentWidth);
    const leftPadding = Math.floor((columnsToUse - contentWidth) / 2);
    const descriptors: PixelDescriptor[] = [];

    rows.forEach((row, rowIndex) => {
      Array.from(row).forEach((value, columnIndex) => {
        if (value !== '#') return;

        const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)] ?? pixelColor;
        descriptors.push({
          column: columnIndex + leftPadding,
          row: rowIndex,
          color: parseHexColor(randomColor),
          delay: Math.random() * MAX_PIXEL_DELAY,
          offsetX: Math.random() * 160 - 80,
          offsetY: Math.random() * 160 - 80,
        });
      });
    });

    return { columns: columnsToUse, pixels: descriptors };
  }, [colorOptions, pixelColor, text, totalHorzPixels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let animationFrame = 0;
    let animationStartTime: number | null = null;
    let lastElapsedTime = 0;
    let deviceScale = 1;
    let hasStarted = false;
    let isDisposed = false;
    const totalAnimationTime =
      pixels.reduce((latest, pixel) => Math.max(latest, pixel.delay), 0) + PIXEL_ANIMATION_DURATION;

    const draw = (elapsedTime: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;

      pixels.forEach((pixel) => {
        const rawProgress = (elapsedTime - pixel.delay) / PIXEL_ANIMATION_DURATION;
        if (rawProgress <= 0) return;

        const progress = Math.min(rawProgress, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const horizontalBounds = getSnappedCellBounds(pixel.column, columns, canvas.width);
        const verticalBounds = getSnappedCellBounds(pixel.row, LETTER_HEIGHT, canvas.height);
        const offsetX = Math.round(pixel.offsetX * (1 - easedProgress) * deviceScale);
        const offsetY = Math.round(pixel.offsetY * (1 - easedProgress) * deviceScale);
        const colorProgress = Math.max(0, (progress - 0.55) / 0.45);

        context.globalAlpha = Math.min(progress / 0.55, 1);
        context.fillStyle = mixColors(pixel.color, finalColor, colorProgress);
        context.fillRect(
          horizontalBounds.start + offsetX,
          verticalBounds.start + offsetY,
          horizontalBounds.end - horizontalBounds.start,
          verticalBounds.end - verticalBounds.start
        );
      });

      context.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      if (isDisposed) return;
      if (animationStartTime === null) animationStartTime = timestamp;

      lastElapsedTime = timestamp - animationStartTime;
      draw(lastElapsedTime);

      if (lastElapsedTime < totalAnimationTime) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        lastElapsedTime = totalAnimationTime;
        draw(totalAnimationTime);
      }
    };

    const startAnimation = (skipAnimation = false) => {
      if (hasStarted) return;
      hasStarted = true;

      if (skipAnimation) {
        lastElapsedTime = totalAnimationTime;
        draw(totalAnimationTime);
      } else {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      deviceScale = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      const width = Math.max(1, Math.round(bounds.width * deviceScale));
      const height = Math.max(1, Math.round(bounds.height * deviceScale));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      draw(lastElapsedTime);
    };

    resizeCanvas();
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(resizeCanvas) : null;
    resizeObserver?.observe(canvas);
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let intersectionObserver: IntersectionObserver | null = null;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      startAnimation(true);
    } else {
      const requestedRoot = scrollContainerSelector ? document.querySelector(scrollContainerSelector) : null;
      const root = requestedRoot?.contains(canvas) ? requestedRoot : null;
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          startAnimation();
          intersectionObserver?.disconnect();
        },
        { root, rootMargin: '100px 0px', threshold: 0.05 }
      );
      intersectionObserver.observe(canvas);
    }

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [columns, finalColor, pixels, scrollContainerSelector]);

  return (
    <div className="pixel-art-text" style={{ aspectRatio: `${columns} / ${LETTER_HEIGHT}` }}>
      <canvas ref={canvasRef} className="pixel-art-text__canvas" role="img" aria-label={text.trim()}>
        {text.trim()}
      </canvas>
    </div>
  );
};

export default React.memo(PixelArtText);
