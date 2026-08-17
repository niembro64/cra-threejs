import React, { useEffect, useRef } from 'react';
import { drawWaveformLine } from '../utils/audioWaveform';

type ResumeAgentWaveformProps = {
  samplesRef: React.MutableRefObject<Float32Array>;
  receivedAtRef: React.MutableRefObject<number>;
};

const MAX_DEVICE_PIXEL_RATIO = 2;
const AUDIO_FRAME_LIFETIME_MS = 50;
const EMPTY_WAVEFORM = new Float32Array([0, 0]);

const ResumeAgentWaveform: React.FC<ResumeAgentWaveformProps> = ({ samplesRef, receivedAtRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let animationFrame = 0;

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resizeCanvas);
    resizeObserver?.observe(canvas);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = (now: number) => {
      animationFrame = window.requestAnimationFrame(draw);
      const samples = now - receivedAtRef.current <= AUDIO_FRAME_LIFETIME_MS ? samplesRef.current : EMPTY_WAVEFORM;

      const bounds = canvas.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);
      drawWaveformLine(context, samples, bounds.width, bounds.height, 'rgba(240, 171, 252, 0.95)', 1.5);
    };

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [receivedAtRef, samplesRef]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-20 w-full sm:h-24"
      role="img"
      aria-label="Live agent voice waveform"
    />
  );
};

export default ResumeAgentWaveform;
