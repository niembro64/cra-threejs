import type { MeydaFeaturesObject } from 'meyda';
import type { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ProjectStore } from '../store/ProjectStore';
import ReactGA from 'react-ga4';

export const numMelBands = 40;

export const melBandsHigIndexes = [Math.ceil(numMelBands * (1 / 3)), numMelBands];
export const melBandsLowIndexes = [0, Math.floor(numMelBands * (1 / 10))];

interface AudioSpectrogramProps {
  highFreqPowerRef: React.MutableRefObject<number>;
  lowFreqPowerRef: React.MutableRefObject<number>;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export interface AudioSpectrogramRef {
  startAudio: () => void;
}

const AudioSpectrogram = forwardRef<AudioSpectrogramRef, AudioSpectrogramProps>(
  ({ highFreqPowerRef, lowFreqPowerRef, audioRef }, ref) => {
    const play = ProjectStore((state) => state.play);
    const setPlay = ProjectStore((state) => state.setPlay);

    const [audioStarted, setAudioStarted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
    const cUpper = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass2 = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass3 = useRef<HTMLCanvasElement | null>(null);

    const myMelBandsLowPass = useRef<number[]>([]);
    const myMelBandsLowPass2 = useRef<number[]>([]);
    const myMelBandsLowPass3 = useRef<number[]>([]);

    const [hoverAudioButton, setHoverAudioButton] = useState(false);

    // Initialize canvas dimensions for proper rendering
    useEffect(() => {
      const initializeCanvas = (canvas: HTMLCanvasElement | null) => {
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          // Ensure transparent background
          const ctx = canvas.getContext('2d', { alpha: true });
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      };

      initializeCanvas(cUpper.current);
      initializeCanvas(cUpperLowpass.current);
      initializeCanvas(cUpperLowpass2.current);
      initializeCanvas(cUpperLowpass3.current);
    }, [audioStarted]);

    const startAudio = () => {
      if (audioStarted) return;
      setAudioStarted(true);
      setPlay(true);
    };

    useImperativeHandle(ref, () => ({
      startAudio,
    }));

    useEffect(() => {
      if (!audioRef.current) return;

      if (!audioStarted) return;

      if (play) {
        void audioRef.current.play().catch(() => {
          // Playback can still be blocked if browser media policy changes.
        });
      } else {
        audioRef.current.pause();
      }
    }, [play, audioRef, audioStarted]);

    useEffect(() => {
      if (!audioStarted) return;

      const audioElement = audioRef.current;
      if (!audioElement) return;

      let cancelled = false;
      let setupStarted = false;
      let lastDrawTime = 0;

      const setupMeyda = async (): Promise<void> => {
        if (setupStarted || cancelled || audioContextRef.current) return;
        setupStarted = true;

        try {
          const { default: Meyda } = await import('meyda');
          if (cancelled) return;

          Meyda.melBands = numMelBands;
          const canvases = [cUpper.current, cUpperLowpass.current, cUpperLowpass2.current, cUpperLowpass3.current];
          if (canvases.some((canvas) => !canvas)) return;

          const resolvedCanvases = canvases as HTMLCanvasElement[];
          const contexts = resolvedCanvases.map((canvas) => canvas.getContext('2d', { alpha: true }));
          if (contexts.some((context) => !context)) return;

          const resolvedContexts = contexts as CanvasRenderingContext2D[];
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;
          const source = audioContext.createMediaElementSource(audioElement);
          source.connect(audioContext.destination);

          meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext,
            source,
            bufferSize: 1024,
            featureExtractors: ['melBands'],
            callback: (features: MeydaFeaturesObject) => {
              const now = performance.now();
              if (now - lastDrawTime < 1000 / 30) return;
              lastDrawTime = now;

              const melBandValues = (features as MeydaFeaturesObject & { melBands?: ArrayLike<number> }).melBands;
              if (!melBandValues) return;

              const bands = Array.from(melBandValues);
              if (!bands.length) return;

              const decayLayers = [
                [myMelBandsLowPass, 0.97],
                [myMelBandsLowPass2, 0.985],
                [myMelBandsLowPass3, 0.995],
              ] as const;

              decayLayers.forEach(([layerRef, decay]) => {
                if (layerRef.current.length !== bands.length) {
                  layerRef.current = [...bands];
                  return;
                }

                for (let index = 0; index < bands.length; index += 1) {
                  layerRef.current[index] = Math.max(bands[index], layerRef.current[index] * decay);
                }
              });

              const layers: Array<[number[], string]> = [
                [bands, 'rgb(59, 130, 246)'],
                [myMelBandsLowPass.current, 'rgba(59, 130, 246, 0.5)'],
                [myMelBandsLowPass2.current, 'rgba(59, 130, 246, 0.5)'],
                [myMelBandsLowPass3.current, 'rgba(59, 130, 246, 0.5)'],
              ];

              layers.forEach(([values, fillStyle], layerIndex) => {
                const canvas = resolvedCanvases[layerIndex];
                const context = resolvedContexts[layerIndex];
                const bandWidth = canvas.width / values.length;
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.fillStyle = fillStyle;

                values.forEach((value, index) => {
                  const height = (value / 30) * canvas.height;
                  context.fillRect(index * bandWidth, canvas.height - height, bandWidth, height);
                });
              });

              const powerBands = myMelBandsLowPass.current;
              let highPower = 0;
              let lowPower = 0;

              for (let index = melBandsLowIndexes[0]; index < melBandsLowIndexes[1]; index += 1) {
                highPower += powerBands[index];
              }
              for (let index = melBandsHigIndexes[0]; index < melBandsHigIndexes[1]; index += 1) {
                lowPower += powerBands[index];
              }

              highFreqPowerRef.current = highPower / (melBandsLowIndexes[1] - melBandsLowIndexes[0]);
              lowFreqPowerRef.current = lowPower / (melBandsHigIndexes[1] - melBandsHigIndexes[0]);
            },
          });

          meydaAnalyzerRef.current.start();
        } catch (error) {
          setupStarted = false;
          console.error('Error setting up audio:', error);
        }
      };

      if (audioElement.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        void setupMeyda();
      } else {
        audioElement.addEventListener('canplay', setupMeyda, { once: true });
      }

      return () => {
        cancelled = true;
        audioElement.removeEventListener('canplay', setupMeyda);
        meydaAnalyzerRef.current?.stop();
        void audioContextRef.current?.close();
        meydaAnalyzerRef.current = null;
        audioContextRef.current = null;
      };
    }, [audioRef, audioStarted, highFreqPowerRef, lowFreqPowerRef]);

    return (
      <div className="flex w-[100%] flex-col items-center justify-center">
        {!audioStarted ? (
          <img
            data-tooltip-content={'A Remix of a Bohemian Rhapsody by Niemo'}
            className="pixel-art tooltip h-[130px] w-[130px] cursor-pointer opacity-20 transition-all hover:opacity-100"
            src="/qwhite_hardpixels_transbg.png"
            alt="Niemo Audio Logo"
            onClick={startAudio}
          />
        ) : (
          <>
            <audio ref={audioRef} loop>
              <source src="song.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>

            <div className="relative flex w-full flex-col items-center justify-center">
              {/* Upper spectrogram - layered from back to front */}
              <canvas className="z-50 h-[200px] w-full" ref={cUpper} style={{ background: 'transparent' }}></canvas>
              <canvas
                className="absolute left-0 top-0 z-40 h-[200px] w-full"
                ref={cUpperLowpass}
                style={{ background: 'transparent' }}
              ></canvas>
              <canvas
                className="absolute left-0 top-0 z-30 h-[200px] w-full"
                ref={cUpperLowpass2}
                style={{ background: 'transparent' }}
              ></canvas>
              <canvas
                className="absolute left-0 top-0 z-20 h-[200px] w-full"
                ref={cUpperLowpass3}
                style={{ background: 'transparent' }}
              ></canvas>

              <button
                type="button"
                onMouseEnter={() => {
                  ReactGA.event({
                    category: 'User',
                    action: 'Hover Audio Button',
                  });
                  setHoverAudioButton(true);
                }}
                onMouseLeave={() => {
                  setHoverAudioButton(false);
                }}
                data-tooltip-content={'Audio spins the 3D object! 🎵'}
                // bottom right border radius only
                className={`tooltip flex w-full cursor-pointer flex-row items-center justify-center bg-blue-500 px-4 py-2 text-2xl font-bold text-white active:text-white/50 ${
                  play ? '' : ''
                } rounded-br-3xl`}
                onClick={() => {
                  startAudio();
                  setPlay(!play);
                }}
              >
                {hoverAudioButton ? (play ? 'PAUSE' : 'PLAY') : 'NIEMO REMIX'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);

AudioSpectrogram.displayName = 'AudioSpectrogram';

export default AudioSpectrogram;
