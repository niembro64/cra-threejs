import React, { useEffect, useRef } from 'react';
import Meyda, { MeydaFeaturesObject } from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

const AudioSpectrogram: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
              // @ts-ignore
              if (features && features.melBands && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.fillStyle = 'black';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  // Draw each mel band on the canvas in white
                  // @ts-ignore
                  features.melBands.forEach((melValue, index) => {
                    const normalizedValue = melValue / 10; // Normalize based on expected max value
                    const height = normalizedValue * canvas.height;
                    // @ts-ignore
                    const width = canvas.width / features.melBands.length;
                    ctx.fillStyle = 'white'; // Set fill color to white
                    ctx.fillRect(
                      index * width,
                      canvas.height - height,
                      width,
                      height
                    );
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
    <div>
      <audio ref={audioRef} loop>
        <source src="song.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <h1>Mel-Frequency Spectrogram</h1>
      {/* @ts-ignore */}
      <canvas
        className="canvas-spectrogram"
        ref={canvasRef}
        width="1024"
        height="100"
        // style={{ background: 'black' }}
      ></canvas>
    </div>
  );
};

export default AudioSpectrogram;
