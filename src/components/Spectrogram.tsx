import React, { useEffect, useRef } from 'react';
import Meyda, { MeydaFeaturesObject } from 'meyda';
import { MeydaAnalyzer } from 'meyda/dist/esm/meyda-wa';

const AudioSpectrogram: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const meydaAnalyzerRef = useRef<MeydaAnalyzer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const setupMeyda = async (): Promise<void> => {
      try {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const source = audioContext.createMediaStreamSource(stream);
        microphoneRef.current = source;

        meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
          audioContext: audioContext,
          source: source,
          bufferSize: 512 * 2,
          featureExtractors: ['melBands'],
          melBands: 16, // Number of mel bands
          callback: (features: MeydaFeaturesObject) => {
            // @ts-ignore
            if (features && features.melBands && canvasRef.current) {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // @ts-ignore
                features.melBands.forEach((melValue, index) => {
                  const normalizedValue = melValue / 10; // Normalize based on expected max value
                  const height = normalizedValue * canvas.height;
                  // @ts-ignore
                  const width = canvas.width / features.melBands.length;
                  ctx.fillStyle = `hsl(${
                    // @ts-ignore
                    360 * (index / features.melBands.length)
                  }, 100%, 50%)`;
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
    };

    setupMeyda();

    return () => {
      meydaAnalyzerRef.current?.stop();
      microphoneRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div>
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
