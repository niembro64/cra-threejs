import React, { useEffect, useRef, useState } from 'react';
import Meyda, { MeydaFeaturesObject } from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

interface AudioSpectrogramProps {
  lowerPowerRef: React.MutableRefObject<number>;
  upperPowerRef: React.MutableRefObject<number>;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioSpectrogram: React.FC<AudioSpectrogramProps> = ({
  lowerPowerRef,
  upperPowerRef,
  audioRef,
}) => {
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasFlippedRef = useRef<HTMLCanvasElement | null>(null);

  const previousMelBandsRef = useRef<number[]>([]);

  const startAudio = () => {
    if (audioStarted) return;
    setAudioStarted(true);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!audioStarted) return;

    const setupMeyda = async (): Promise<void> => {
      if (audioRef.current && !audioContextRef.current) {
        try {
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;

          const source = audioContext.createMediaElementSource(
            audioRef.current
          );
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
                canvasRef.current &&
                canvasFlippedRef.current
              ) {
                const canvas = canvasRef.current;
                const flippedCanvas = canvasFlippedRef.current;
                const ctx = canvas.getContext('2d');
                const flippedCtx = flippedCanvas.getContext('2d');

                if (ctx && flippedCtx) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  flippedCtx.clearRect(
                    0,
                    0,
                    flippedCanvas.width,
                    flippedCanvas.height
                  );

                  const decayFactor = 0.5;
                  const currentMelBands = (features as any).melBands;

                  if (previousMelBandsRef.current.length === 0) {
                    previousMelBandsRef.current = currentMelBands;
                  } else {
                    previousMelBandsRef.current =
                      previousMelBandsRef.current.map((prevValue, index) => {
                        const currentValue = currentMelBands[index];
                        return Math.max(currentValue, prevValue * decayFactor);
                      });
                  }

                  const bandWidth = (canvas.width / currentMelBands.length) * 1;

                  // Draw mel bands
                  previousMelBandsRef.current.forEach((melValue, index) => {
                    const normalizedValue = melValue / 15;
                    const height = normalizedValue * canvas.height;

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    flippedCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';

                    // Original canvas
                    ctx.fillRect(
                      index * bandWidth,
                      canvas.height - height,
                      bandWidth,
                      height
                    );
                    // Flipped canvas
                    flippedCtx.fillRect(
                      index * bandWidth,
                      0,
                      bandWidth,
                      height
                    );
                  });

                  // Update references
                  lowerPowerRef.current = currentMelBands
                    .slice(0, 1)
                    // @ts-ignore
                    .reduce((sum, value) => sum + value, 0);
                  upperPowerRef.current =
                    currentMelBands
                      .slice(18, 26)
                      // @ts-ignore
                      .reduce((sum, value) => sum + value, 0) / 2;
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
  }, [audioRef, audioStarted, lowerPowerRef, upperPowerRef]);

  useEffect(() => {
    if (audioStarted && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef, audioStarted]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {!audioStarted ? (
        <img
          className="cursor-pointer opacity-40 hover:opacity-100 transition-all w-[130px] h-[130px]"
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

          <div className="absolute ">
            <canvas className="w-full h-[200px]" ref={canvasRef}></canvas>
            <div
              className="flex flex-row justify-start items-center bg-white/50 cursor-pointer  px-4 py-2  w-full"
              onClick={() => {
                startAudio();
                toggleAudio();
              }}
            >
              <div className="mr-2">
                <img
                  className="h-[50px] object-contain"
                  src="/NA_white_on_trans.png"
                  alt="Niemo Audio Logo"
                />
              </div>
              <h4 className="text-5xl font-bold text-white">
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </h4>
            </div>
            <canvas
              className="w-full h-[200px]"
              ref={canvasFlippedRef}
            ></canvas>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioSpectrogram;
