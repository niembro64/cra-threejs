import Meyda, { MeydaFeaturesObject } from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ProjectStore } from '../store/ProjectStore';
import ReactGA from 'react-ga4';

export const numMelBands = 40;

export const melBandsHigIndexes = [Math.ceil(numMelBands * (1 / 3)), numMelBands];
export const melBandsLowIndexes = [0, Math.floor(numMelBands * (1 / 10))];

Meyda.melBands = numMelBands;

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
    const { play, setPlay } = ProjectStore();

    const [audioStarted, setAudioStarted] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
    const cUpper = useRef<HTMLCanvasElement | null>(null);
    const cLower = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass = useRef<HTMLCanvasElement | null>(null);
    const cLowerLowpass = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass2 = useRef<HTMLCanvasElement | null>(null);
    const cLowerLowpass2 = useRef<HTMLCanvasElement | null>(null);
    const cUpperLowpass3 = useRef<HTMLCanvasElement | null>(null);
    const cLowerLowpass3 = useRef<HTMLCanvasElement | null>(null);

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
      initializeCanvas(cLower.current);
      initializeCanvas(cUpperLowpass.current);
      initializeCanvas(cLowerLowpass.current);
      initializeCanvas(cUpperLowpass2.current);
      initializeCanvas(cLowerLowpass2.current);
      initializeCanvas(cUpperLowpass3.current);
      initializeCanvas(cLowerLowpass3.current);
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
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }, [play, audioRef, audioStarted]);

    useEffect(() => {
      if (!audioStarted) return;

      const setupMeyda = async (): Promise<void> => {
        if (audioRef.current && !audioContextRef.current) {
          try {
            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaElementSource(audioRef.current);
            source.connect(audioContext.destination);

            meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
              audioContext,
              source,
              bufferSize: 512,
              featureExtractors: ['melBands'],

              callback: (features: MeydaFeaturesObject) => {
                if (
                  features &&
                  (features as any).melBands &&
                  cUpper.current &&
                  cLower.current &&
                  cUpperLowpass.current &&
                  cLowerLowpass.current &&
                  cUpperLowpass2.current &&
                  cLowerLowpass2.current &&
                  cUpperLowpass3.current &&
                  cLowerLowpass3.current
                ) {
                  const cUpperC = cUpper.current;
                  const cLowerC = cLower.current;
                  const cUpperLowpassC = cUpperLowpass.current;
                  const cLowerLowpassC = cLowerLowpass.current;
                  const cUpperLowpass2C = cUpperLowpass2.current;
                  const cLowerLowpass2C = cLowerLowpass2.current;
                  const cUpperLowpass3C = cUpperLowpass3.current;
                  const cLowerLowpass3C = cLowerLowpass3.current;

                  const ctxUpper = cUpperC.getContext('2d', { alpha: true });
                  const ctxLower = cLowerC.getContext('2d', { alpha: true });
                  const ctxUpperLowpass = cUpperLowpassC.getContext('2d', { alpha: true });
                  const ctxLowerLowpass = cLowerLowpassC.getContext('2d', { alpha: true });
                  const ctxUpperLowpass2 = cUpperLowpass2C.getContext('2d', { alpha: true });
                  const ctxLowerLowpass2 = cLowerLowpass2C.getContext('2d', { alpha: true });
                  const ctxUpperLowpass3 = cUpperLowpass3C.getContext('2d', { alpha: true });
                  const ctxLowerLowpass3 = cLowerLowpass3C.getContext('2d', { alpha: true });

                  if (
                    ctxUpper &&
                    ctxLower &&
                    ctxUpperLowpass &&
                    ctxLowerLowpass &&
                    ctxUpperLowpass2 &&
                    ctxLowerLowpass2 &&
                    ctxUpperLowpass3 &&
                    ctxLowerLowpass3
                  ) {
                    ctxUpper.clearRect(0, 0, cUpperC.width, cUpperC.height);
                    ctxLower.clearRect(0, 0, cLowerC.width, cLowerC.height);
                    ctxUpperLowpass.clearRect(0, 0, cUpperLowpassC.width, cUpperLowpassC.height);
                    ctxLowerLowpass.clearRect(0, 0, cLowerLowpassC.width, cLowerLowpassC.height);
                    ctxUpperLowpass2.clearRect(0, 0, cUpperLowpass2C.width, cUpperLowpass2C.height);
                    ctxLowerLowpass2.clearRect(0, 0, cLowerLowpass2C.width, cLowerLowpass2C.height);
                    ctxUpperLowpass3.clearRect(0, 0, cUpperLowpass3C.width, cUpperLowpass3C.height);
                    ctxLowerLowpass3.clearRect(0, 0, cLowerLowpass3C.width, cLowerLowpass3C.height);

                    // Three decay levels with progressively slower decay
                    const decayFactor1 = 0.97; // Fastest decay
                    const decayFactor2 = 0.985; // Slower decay
                    const decayFactor3 = 0.995; // Slowest decay

                    // @ts-ignore
                    const myMelBands: number[] = features.melBands;

                    // First decay layer
                    if (myMelBandsLowPass.current.length === 0) {
                      myMelBandsLowPass.current = myMelBands;
                    } else {
                      myMelBandsLowPass.current = myMelBandsLowPass.current.map(
                        (prevValue, index) => {
                          const currentValue = myMelBands[index];
                          return Math.max(currentValue, prevValue * decayFactor1);
                        }
                      );
                    }

                    // Second decay layer
                    if (myMelBandsLowPass2.current.length === 0) {
                      myMelBandsLowPass2.current = myMelBands;
                    } else {
                      myMelBandsLowPass2.current = myMelBandsLowPass2.current.map(
                        (prevValue, index) => {
                          const currentValue = myMelBands[index];
                          return Math.max(currentValue, prevValue * decayFactor2);
                        }
                      );
                    }

                    // Third decay layer
                    if (myMelBandsLowPass3.current.length === 0) {
                      myMelBandsLowPass3.current = myMelBands;
                    } else {
                      myMelBandsLowPass3.current = myMelBandsLowPass3.current.map(
                        (prevValue, index) => {
                          const currentValue = myMelBands[index];
                          return Math.max(currentValue, prevValue * decayFactor3);
                        }
                      );
                    }

                    const bandWidth = cUpperC.width / myMelBands.length;

                    const colorR: number = 59;
                    const colorG: number = 130;
                    const colorB: number = 246;

                    // All layers use the same blue, but with different transparencies
                    const fillStyleBlue = `rgb(${colorR}, ${colorG}, ${colorB})`;
                    const fillStyleBlueDecay1 = `rgba(${colorR}, ${colorG}, ${colorB}, 0.5)`; // 50% transparent
                    const fillStyleBlueDecay2 = `rgba(${colorR}, ${colorG}, ${colorB}, 0.5)`; // 50% transparent
                    const fillStyleBlueDecay3 = `rgba(${colorR}, ${colorG}, ${colorB}, 0.5)`; // 50% transparent
                    const fillStyleRed = fillStyleBlue;
                    const fillStyleRedDecay1 = fillStyleBlueDecay1;
                    const fillStyleRedDecay2 = fillStyleBlueDecay2;
                    const fillStyleRedDecay3 = fillStyleBlueDecay3;

                    const powerDivisor: number = 30;
                    // Draw instant mel bands (brightest, no decay)
                    myMelBands.forEach((melValue, index) => {
                      const normalizedValue = melValue / powerDivisor;
                      const height = normalizedValue * cUpperC.height;

                      ctxUpper.fillStyle = fillStyleBlue;
                      ctxLower.fillStyle = fillStyleRed;

                      // Calculate bar width and position to prevent overlap
                      const startX: number = index * bandWidth;
                      const bwCurr: number = bandWidth;

                      ctxUpper.fillRect(startX, cUpperC.height - height, bwCurr, height);
                      ctxLower.fillRect(startX, 0, bwCurr, height);
                    });
                    // Draw mel bands lowpass (first decay layer - fastest)
                    myMelBandsLowPass.current.forEach((melValue, index) => {
                      const normalizedValue = melValue / powerDivisor;
                      const height = normalizedValue * cUpperC.height;

                      ctxUpperLowpass.fillStyle = fillStyleBlueDecay1;
                      ctxLowerLowpass.fillStyle = fillStyleRedDecay1;

                      // Calculate bar width and position to prevent overlap
                      const startX: number = index * bandWidth;
                      const bwCurr: number = bandWidth;

                      ctxUpperLowpass.fillRect(
                        startX,
                        cUpperLowpassC.height - height,
                        bwCurr,
                        height
                      );
                      ctxLowerLowpass.fillRect(startX, 0, bwCurr, height);
                    });

                    // Draw mel bands lowpass2 (second decay layer - slower)
                    myMelBandsLowPass2.current.forEach((melValue, index) => {
                      const normalizedValue = melValue / powerDivisor;
                      const height = normalizedValue * cUpperC.height;

                      ctxUpperLowpass2.fillStyle = fillStyleBlueDecay2;
                      ctxLowerLowpass2.fillStyle = fillStyleRedDecay2;

                      // Calculate bar width and position to prevent overlap
                      const startX: number = index * bandWidth;
                      const bwCurr: number = bandWidth;

                      ctxUpperLowpass2.fillRect(
                        startX,
                        cUpperLowpass2C.height - height,
                        bwCurr,
                        height
                      );
                      ctxLowerLowpass2.fillRect(startX, 0, bwCurr, height);
                    });

                    // Draw mel bands lowpass3 (third decay layer - slowest)
                    myMelBandsLowPass3.current.forEach((melValue, index) => {
                      const normalizedValue = melValue / powerDivisor;
                      const height = normalizedValue * cUpperC.height;

                      ctxUpperLowpass3.fillStyle = fillStyleBlueDecay3;
                      ctxLowerLowpass3.fillStyle = fillStyleRedDecay3;

                      // Calculate bar width and position to prevent overlap
                      const startX: number = index * bandWidth;
                      const bwCurr: number = bandWidth;

                      ctxUpperLowpass3.fillRect(
                        startX,
                        cUpperLowpass3C.height - height,
                        bwCurr,
                        height
                      );
                      ctxLowerLowpass3.fillRect(startX, 0, bwCurr, height);
                    });

                    const bandsToUseForPower = myMelBandsLowPass.current;

                    highFreqPowerRef.current =
                      bandsToUseForPower
                        .slice(melBandsLowIndexes[0], melBandsLowIndexes[1])
                        .reduce((sum, value) => sum + value, 0) /
                      (melBandsLowIndexes[1] - melBandsLowIndexes[0]);
                    lowFreqPowerRef.current =
                      bandsToUseForPower
                        .slice(melBandsHigIndexes[0], melBandsHigIndexes[1])
                        .reduce((sum, value) => sum + value, 0) /
                      (melBandsHigIndexes[1] - melBandsHigIndexes[0]);
                  }
                }
              },
            });

            meydaAnalyzerRef.current.start();
          } catch (error) {
            console.error('Error setting up audio:', error);
          }
        }
      };

      const audioElement = audioRef.current;

      if (audioElement) {
        audioElement.addEventListener('canplay', setupMeyda);
      }

      return () => {
        meydaAnalyzerRef.current?.stop();
        audioContextRef.current?.close();
        if (audioElement) {
          audioElement.removeEventListener('canplay', setupMeyda);
        }
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
              <canvas
                className="z-50 h-[200px] w-full"
                ref={cUpper}
                style={{ background: 'transparent' }}
              ></canvas>
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
                className={`tooltip flex w-full cursor-pointer flex-row items-center justify-center bg-blue-500 px-4 py-2 text-2xl font-bold text-white active:text-white/50 ${
                  play ? '' : ''
                }`}
                onClick={() => {
                  startAudio();
                  setPlay(!play);
                }}
              >
                {hoverAudioButton ? (play ? 'PAUSE' : 'PLAY') : 'NIEMO REMIX'}
              </button>

              {/* Lower spectrogram - layered from back to front - HIDDEN */}
              <canvas
                className="z-50 hidden h-[50px] w-full"
                ref={cLower}
                style={{ background: 'transparent' }}
              ></canvas>
              <canvas
                className="absolute bottom-0 left-0 z-40 hidden h-[50px] w-full"
                ref={cLowerLowpass}
                style={{ background: 'transparent' }}
              ></canvas>
              <canvas
                className="absolute bottom-0 left-0 z-30 hidden h-[50px] w-full"
                ref={cLowerLowpass2}
                style={{ background: 'transparent' }}
              ></canvas>
              <canvas
                className="absolute bottom-0 left-0 z-20 hidden h-[50px] w-full"
                ref={cLowerLowpass3}
                style={{ background: 'transparent' }}
              ></canvas>
            </div>
          </>
        )}
      </div>
    );
  }
);

AudioSpectrogram.displayName = 'AudioSpectrogram';

export default AudioSpectrogram;
