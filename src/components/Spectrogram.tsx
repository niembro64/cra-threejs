import React, { useEffect, useRef } from 'react';
import Meyda, { MeydaFeaturesObject } from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

const AudioSpectrogram: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasFlippedRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const setupMeyda = async (): Promise<void> => {
      if (audioRef.current && !audioContextRef.current) {
        try {
          const audioContext = new AudioContext();
          audioContextRef.current = audioContext;

          const source = audioContext.createMediaElementSource(
            audioRef.current
          );

          // Connect the source to the destination (speakers)
          source.connect(audioContext.destination);

          meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
            audioContext: audioContext,
            source: source,
            bufferSize: 512 * 2,
            featureExtractors: ['melBands'],
            melBands: 64, // Increase the number of mel bands to 64
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
                  // Clear both canvases
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  flippedCtx.clearRect(
                    0,
                    0,
                    flippedCanvas.width,
                    flippedCanvas.height
                  );

                  // Draw each mel band on the canvas in white
                  // @ts-ignore
                  features.melBands.forEach((melValue, index) => {
                    const normalizedValue = melValue / 10; // Normalize based on expected max value
                    const height = normalizedValue * canvas.height;
                    // @ts-ignore
                    const width = canvas.width / features.melBands.length;
                    // @ts-ignore
                    ctx.fillStyle = 'white'; // Set fill color to white
                    flippedCtx.fillStyle = 'white'; // Set fill color to white

                    // Draw on the original canvas
                    ctx.fillRect(
                      index * width,
                      canvas.height - height,
                      width,
                      height
                    );
                    // Draw on the flipped canvas (inverted vertically)
                    flippedCtx.fillRect(index * width, 0, width, height);
                  });
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

    // Set up Meyda when the audio element is loaded
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
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <div className="spectrogram-container">
      <audio ref={audioRef} loop>
        <source src="song.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <canvas
        className="spectrogram"
        ref={canvasRef}
        // width="1024"
        // height="100"
      ></canvas>
      <h4 className="spectrogram-text">Niemo Audio</h4>

      <canvas
        className="spectrogram"
        ref={canvasFlippedRef}
        // width="1024"
        // height="100"
      ></canvas>
    </div>
  );
};

export default AudioSpectrogram;
