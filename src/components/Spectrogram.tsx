// Spectrogram.tsx

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
          // Connect the source to the speakers
          source.connect(audioContext.destination);

          meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext: audioContext,
            source: source,
            bufferSize: 512,
            featureExtractors: ['melBands'],
            melBands: 64,
            callback: (features: MeydaFeaturesObject) => {
              if (
                features &&
                // @ts-ignore
                features.melBands &&
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

                  const decayFactor = 0.85;
                  // @ts-ignore
                  const currentMelBands = features.melBands;
                  if (previousMelBandsRef.current.length === 0) {
                    previousMelBandsRef.current = currentMelBands;
                  } else {
                    previousMelBandsRef.current =
                      previousMelBandsRef.current.map((prevValue, index) => {
                        const currentValue = currentMelBands[index];
                        return Math.max(currentValue, prevValue * decayFactor);
                      });
                  }

                  // Draw mel bands
                  previousMelBandsRef.current.forEach((melValue, index) => {
                    const normalizedValue = melValue / 10;
                    const height = normalizedValue * canvas.height;

                    // @ts-ignore
                    const width = canvas.width / (features.melBands.length - 1);

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    flippedCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';

                    // Original canvas
                    ctx.fillRect(
                      index * width,
                      canvas.height - height,
                      width,
                      height
                    );
                    // Flipped
                    flippedCtx.fillRect(index * width, 0, width, height);
                  });

                  // Update references
                  lowerPowerRef.current = currentMelBands[0];
                  upperPowerRef.current = currentMelBands
                    .slice(18, 26)
                    // @ts-ignore
                    .reduce((sum, value) => sum + value, 0);
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
    <div className="spectrogram-container">
      {!audioStarted ? (
        <img
          className="button-music"
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

          <canvas className="spectrogram" ref={canvasRef}></canvas>
          <div
            className="spectrogram-mid"
            onClick={() => {
              startAudio();
              toggleAudio();
            }}
          >
            <div className="spectrogram-image-wrapper">
              <img
                className="spectrogram-image"
                src="/NA_white_on_trans.png"
                alt="Niemo Audio Logo"
              />
            </div>
            <h4 className="spectrogram-text">{isPlaying ? 'Pause' : 'Play'}</h4>
          </div>
          <canvas className="spectrogram" ref={canvasFlippedRef}></canvas>
        </>
      )}
    </div>
  );
};

export default AudioSpectrogram;
