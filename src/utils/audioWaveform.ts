export type WaveformPeak = {
  min: number;
  max: number;
};

const clampAmplitude = (value: number) => Math.max(-1, Math.min(1, value));

export const decodePcm16Base64 = (base64Audio: string, sampleCount?: number): Float32Array => {
  if (!base64Audio || (sampleCount !== undefined && sampleCount <= 0)) return new Float32Array();

  const binaryAudio = globalThis.atob(base64Audio);
  const sourceSampleCount = Math.floor(binaryAudio.length / 2);
  if (sourceSampleCount === 0) return new Float32Array();

  const outputSampleCount =
    sampleCount === undefined ? sourceSampleCount : Math.min(Math.floor(sampleCount), sourceSampleCount);
  const samples = new Float32Array(outputSampleCount);
  const sourceStep = sourceSampleCount / outputSampleCount;

  for (let index = 0; index < outputSampleCount; index += 1) {
    const sourceIndex = Math.min(sourceSampleCount - 1, Math.floor(index * sourceStep));
    const byteIndex = sourceIndex * 2;
    const unsignedValue = binaryAudio.charCodeAt(byteIndex) | (binaryAudio.charCodeAt(byteIndex + 1) << 8);
    const signedValue = unsignedValue >= 0x8000 ? unsignedValue - 0x10000 : unsignedValue;
    samples[index] = signedValue / 32768;
  }

  return samples;
};

export const drawWaveformLine = (
  context: CanvasRenderingContext2D,
  samples: Float32Array,
  width: number,
  height: number,
  strokeStyle = '#0f0',
  lineWidth = 1
) => {
  if (!samples.length || width <= 0 || height <= 0) return;

  const center = height / 2;
  const xScale = samples.length > 1 ? width / (samples.length - 1) : 0;

  context.save();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.beginPath();
  samples.forEach((sample, index) => {
    const x = index * xScale;
    const y = center + clampAmplitude(sample) * center;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
  context.restore();
};

export const drawWaveformPeaks = (
  context: CanvasRenderingContext2D,
  peaks: WaveformPeak[],
  width: number,
  height: number,
  strokeStyle = '#0f0',
  lineWidth = 1
) => {
  if (!peaks.length || width <= 0 || height <= 0) return;

  const center = height / 2;
  const xScale = peaks.length > 1 ? width / (peaks.length - 1) : 0;

  context.save();
  context.strokeStyle = strokeStyle;
  context.lineWidth = lineWidth;
  context.beginPath();
  peaks.forEach((peak, index) => {
    const x = index * xScale;
    context.moveTo(x, center + clampAmplitude(peak.min) * center);
    context.lineTo(x, center + clampAmplitude(peak.max) * center);
  });
  context.stroke();
  context.restore();
};
