/* eslint-disable no-case-declarations */
import React, { useState, useRef, useEffect, useMemo } from 'react';

interface AudioRegion {
  start: number;
  end: number;
}

type DragMode = 'none' | 'selecting' | 'start-handle' | 'end-handle' | 'seeking';

const PIXEL_SELECT_THRESHOLD = 4;

const AudioEditor: React.FC = () => {
  /* ────────────────────────── state ────────────────────────── */
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSelection, setPlayingSelection] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<AudioRegion | null>(null);
  const [dragMode, setDragMode] = useState<DragMode>('none');
  const [dragStartTime, setDragStartTime] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  /* precise‑edit inputs */
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [isTypingStart, setIsTypingStart] = useState(false);
  const [isTypingEnd, setIsTypingEnd] = useState(false);

  /* ─────────────────────────── refs ────────────────────────── */
  const audioContext = useRef<AudioContext | null>(null);
  const audioSource = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef(0); // offset for sync
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();

  /* ─────────────────────── helpers ─────────────────────── */
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toFixed(2).padStart(5, '0')}`;

  const rect = () => canvasRef.current!.getBoundingClientRect();
  const timeFromX = (x: number) => Math.max(0, Math.min((x / rect().width) * duration, duration));
  const xFromTime = (t: number) => (t / duration) * rect().width;
  const near = (x: number, t: number, px = 8) => Math.abs(x - xFromTime(t)) <= px;

  /* ─────────────────────────── init ─────────────────────────── */
  useEffect(() => {
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    return () => {
      // Cleanup must be synchronous; don't use async/await here
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  /* ─────────────────── load / decode audio ─────────────────── */
  const loadAudioFile = async (file: File) => {
    if (!audioContext.current) return;
    const buf = await audioContext.current.decodeAudioData(await file.arrayBuffer());
    setAudioFile(file);
    setAudioBuffer(buf);
    setDuration(buf.duration);
    setCurrentTime(0);
    setSelectedRegion(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f?.type.startsWith('audio/')) loadAudioFile(f);
  };
  const onChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) loadAudioFile(f);
  };

  /* ───────────── pre‑compute down‑sampled peaks ───────────── */
  const peaks = useMemo(() => {
    if (!audioBuffer) return null;
    const W = 800;
    const ch = audioBuffer.getChannelData(0);
    const spp = Math.ceil(ch.length / W);
    const out: { min: number; max: number }[] = [];
    for (let i = 0; i < W; i++) {
      let mn = 1,
        mx = -1;
      for (let j = i * spp; j < Math.min((i + 1) * spp, ch.length); j++) {
        const v = ch[j];
        if (v < mn) mn = v;
        if (v > mx) mx = v;
      }
      if (mn === 1 && mx === -1) mn = mx = 0;
      out.push({ min: mn, max: mx });
    }
    return out;
  }, [audioBuffer]);

  /* ───────────── draw static waveform + grid ───────────── */
  useEffect(() => {
    if (!peaks) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const { width, height } = canvasRef.current!;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    if (showGrid) {
      const step = duration > 60 ? 10 : duration > 10 ? 1 : 0.1;
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      for (let t = 0; t <= duration; t += step) {
        const x = (t / duration) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.font = '10px monospace';
        ctx.fillText(formatTime(t), x + 2, 12);
      }
    }

    ctx.strokeStyle = '#0f0';
    ctx.beginPath();
    const amp = height / 2;
    peaks.forEach((p, i) => {
      ctx.moveTo(i, (1 + p.min) * amp);
      ctx.lineTo(i, (1 + p.max) * amp);
    });
    ctx.stroke();
  }, [peaks, showGrid, duration]);

  /* ───────────── overlay (selection / play‑head / hover) ───────────── */
  const drawOverlay = () => {
    if (!audioBuffer) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const { width, height } = canvasRef.current!;
    ctx.clearRect(0, 0, width, height);

    if (selectedRegion) {
      const sx = (selectedRegion.start / duration) * width;
      const ex = (selectedRegion.end / duration) * width;
      ctx.fillStyle = 'rgba(255,255,0,0.2)';
      ctx.fillRect(sx, 0, ex - sx, height);
      ctx.strokeStyle = '#ff0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.moveTo(ex, 0);
      ctx.lineTo(ex, height);
      ctx.stroke();
      const h = 8;
      ctx.fillStyle = '#ff0';
      ctx.fillRect(sx - h / 2, height / 2 - h / 2, h, h);
      ctx.fillRect(ex - h / 2, height / 2 - h / 2, h, h);
    }

    if (hoverTime !== null) {
      const hx = (hoverTime / duration) * width;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(hx, 0);
      ctx.lineTo(hx, height);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const px = (currentTime / duration) * width;
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
    ctx.stroke();
    ctx.fillStyle = '#f00';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px - 6, 12);
    ctx.lineTo(px + 6, 12);
    ctx.lineTo(px, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  useEffect(drawOverlay, [currentTime, hoverTime, selectedRegion, duration]);

  /* ──────────────── audio (play / pause / seek) ─────────────── */
  const stopSource = () => {
    try {
      audioSource.current?.stop();
    } catch {
      // handle potential errors when stopping the source
      console.warn('Error stopping audio source');
    }
    audioSource.current?.disconnect();
    audioSource.current = null;
  };

  const startPlayback = async (offset: number, end?: number, slice = false) => {
    if (!audioBuffer || !audioContext.current) return;
    if (audioContext.current.state === 'suspended') await audioContext.current.resume();
    stopSource();
    const src = audioContext.current.createBufferSource();
    src.buffer = audioBuffer;
    src.connect(audioContext.current.destination);
    const len = (end ?? audioBuffer.duration) - offset;
    if (len <= 0) return;
    src.start(0, offset, len);
    audioSource.current = src;
    setIsPlaying(true);
    setPlayingSelection(slice);
    startTimeRef.current = audioContext.current.currentTime - offset;

    const step = () => {
      if (!audioContext.current) return;
      const now = audioContext.current.currentTime - startTimeRef.current;
      setCurrentTime(Math.min(now, end ?? audioBuffer.duration));
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);

    src.onended = () => {
      cancelAnimationFrame(raf.current!);
      setIsPlaying(false);
      setPlayingSelection(false);
      if (slice && selectedRegion) setCurrentTime(selectedRegion.start);
    };
  };

  const pause = () => {
    stopSource();
    cancelAnimationFrame(raf.current!);
    setIsPlaying(false);
    setPlayingSelection(false);
  };

  const seekTo = (time: number) => {
    const resume = isPlaying;
    const slice = playingSelection;
    pause();
    setCurrentTime(time);
    if (resume) {
      if (slice && selectedRegion && time >= selectedRegion.start && time <= selectedRegion.end)
        startPlayback(time, selectedRegion.end, true);
      else startPlayback(time);
    }
  };

  /* ─────────────── interaction mode helpers ─────────────── */
  const detectMode = (x: number): DragMode => {
    if (selectedRegion) {
      if (near(x, selectedRegion.start)) return 'start-handle';
      if (near(x, selectedRegion.end)) return 'end-handle';
    }
    if (near(x, currentTime, 15)) return 'seeking';
    return 'selecting';
  };
  const cursorFor = (x: number) => {
    if (selectedRegion && (near(x, selectedRegion.start) || near(x, selectedRegion.end)))
      return 'ew-resize';
    if (near(x, currentTime, 15)) return 'grab';
    return 'crosshair';
  };

  /* ─────────────── canvas mouse events ─────────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!audioBuffer) return;
    if (isPlaying) pause();
    const x = e.clientX - rect().left;
    const t = timeFromX(x);
    const mode = detectMode(x);
    setDragMode(mode);
    setDragStartTime(t);
    setDragStartX(x);

    if (mode === 'seeking') {
      // click on play‑head behaves like simple seek
      seekTo(t);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!audioBuffer) return;
    const x = e.clientX - rect().left;
    const t = timeFromX(x);
    setHoverTime(t);
    canvasRef.current!.style.cursor = cursorFor(x);

    switch (dragMode) {
      case 'seeking': {
        const delta = Math.abs(x - dragStartX);
        if (delta > PIXEL_SELECT_THRESHOLD) {
          setDragMode('selecting');
          setSelectedRegion({
            start: Math.min(dragStartTime, t),
            end: Math.max(dragStartTime, t),
          });
        } else {
          setCurrentTime(t);
        }
        break;
      }
      case 'selecting':
        setSelectedRegion({
          start: Math.min(dragStartTime, t),
          end: Math.max(dragStartTime, t),
        });
        break;
      case 'start-handle':
        if (selectedRegion)
          setSelectedRegion({
            start: Math.max(0, Math.min(t, selectedRegion.end - 0.1)),
            end: selectedRegion.end,
          });
        break;
      case 'end-handle':
        if (selectedRegion)
          setSelectedRegion({
            start: selectedRegion.start,
            end: Math.min(duration, Math.max(t, selectedRegion.start + 0.1)),
          });
        break;
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    const x = e.clientX - rect().left;
    const t = timeFromX(x);
    if (dragMode === 'seeking') seekTo(t);
    setDragMode('none');
  };

  const onMouseLeave = () => setHoverTime(null);

  /* ─────────────── precise‑edit inputs ─────────────── */
  const onStartChange = (v: string) => {
    setStartInput(v);
    const num = parseFloat(v);
    if (!isNaN(num) && selectedRegion) {
      setSelectedRegion({
        start: Math.max(0, Math.min(num, selectedRegion.end - 0.1)),
        end: selectedRegion.end,
      });
    }
  };
  const onEndChange = (v: string) => {
    setEndInput(v);
    const num = parseFloat(v);
    if (!isNaN(num) && selectedRegion) {
      setSelectedRegion({
        start: selectedRegion.start,
        end: Math.min(duration, Math.max(num, selectedRegion.start + 0.1)),
      });
    }
  };

  useEffect(() => {
    if (!selectedRegion) {
      setStartInput('');
      setEndInput('');
      return;
    }
    if (!isTypingStart) setStartInput(selectedRegion.start.toFixed(2));
    if (!isTypingEnd) setEndInput(selectedRegion.end.toFixed(2));
  }, [selectedRegion, isTypingStart, isTypingEnd]);

  /* ───────────── keyboard space toggle ───────────── */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Space' && audioBuffer) {
        e.preventDefault();
        isPlaying ? pause() : startPlayback(currentTime);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [audioBuffer, isPlaying, currentTime]);

  /* ────────────────────────── UI ────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-4xl font-bold">Audio Editor</h1>

        {!audioFile ? (
          <div
            className="rounded-lg border-2 border-dashed border-gray-500 p-16 text-center transition-colors hover:border-gray-400"
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
          >
            <p className="mb-4 text-xl">Drag and drop an audio file here</p>
            <p className="mb-4 text-gray-400">or</p>
            <label className="inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              <span>Choose File</span>
              <input type="file" accept="audio/*" className="hidden" onChange={onChoose} />
            </label>
          </div>
        ) : (
          <div className="rounded-lg bg-gray-800 p-6">
            {/* controls */}
            <div className="mb-4 flex flex-wrap gap-3">
              <button
                onClick={isPlaying ? pause : () => startPlayback(currentTime)}
                className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              >
                {isPlaying ? 'Pause' : `Play${playingSelection ? ' (Slice)' : ''}`}
              </button>
              {selectedRegion && (
                <>
                  <button
                    onClick={() => startPlayback(selectedRegion.start, selectedRegion.end, true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    Play Selection
                  </button>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                  >
                    Clear Selection
                  </button>
                </>
              )}
            </div>

            {/* info */}
            <div className="mb-4 flex flex-wrap justify-between gap-3 rounded-lg bg-gray-700 p-3 text-sm">
              <div>
                <span className="text-gray-300">Current: </span>
                <span className="font-mono text-white">{formatTime(currentTime)}</span>
              </div>
              <div>
                <span className="text-gray-300">Duration: </span>
                <span className="font-mono text-white">{formatTime(duration)}</span>
              </div>
              {hoverTime !== null && (
                <div>
                  <span className="text-gray-300">Hover: </span>
                  <span className="font-mono text-yellow-300">{formatTime(hoverTime)}</span>
                </div>
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                />
                <span className="text-xs">Grid</span>
              </label>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full rounded border border-gray-600"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            />

            {selectedRegion && (
              <div className="mt-4 grid gap-4 rounded-lg bg-gray-700 p-4 md:grid-cols-3">
                <div>
                  <label className="text-sm text-gray-300">Start (s)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={startInput}
                    onFocus={() => setIsTypingStart(true)}
                    onBlur={() => setIsTypingStart(false)}
                    onChange={(e) => onStartChange(e.target.value)}
                    className="w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">End (s)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={endInput}
                    onFocus={() => setIsTypingEnd(true)}
                    onBlur={() => setIsTypingEnd(false)}
                    onChange={(e) => onEndChange(e.target.value)}
                    className="w-full rounded bg-gray-600 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="text-sm text-gray-300">Slice Length</label>
                  <div className="rounded bg-gray-600 px-3 py-2 text-gray-200">
                    {formatTime(selectedRegion.end - selectedRegion.start)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioEditor;
