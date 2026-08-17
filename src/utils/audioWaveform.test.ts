import { decodePcm16Base64, drawWaveformLine, drawWaveformPeaks } from './audioWaveform';

test('decodes little-endian PCM16 audio into normalized waveform samples', () => {
  const pcmBytes = String.fromCharCode(0x00, 0x00, 0xff, 0x7f, 0x00, 0x80);
  const samples = decodePcm16Base64(btoa(pcmBytes), 3);

  expect(Array.from(samples)).toEqual([0, 32767 / 32768, -1]);
});

test('preserves every PCM sample when no display sample limit is requested', () => {
  const pcmBytes = String.fromCharCode(0x00, 0x40, 0x00, 0xc0, 0x00, 0x20, 0x00, 0xe0);

  expect(Array.from(decodePcm16Base64(btoa(pcmBytes)))).toEqual([0.5, -0.5, 0.25, -0.25]);
});

test('draws a continuous waveform line and clamps it to the canvas height', () => {
  const context = {
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    strokeStyle: '',
    lineWidth: 0,
    lineJoin: '',
    lineCap: '',
  } as unknown as CanvasRenderingContext2D;

  drawWaveformLine(context, new Float32Array([-2, 0, 2]), 100, 40, '#fff', 2);

  expect(context.moveTo).toHaveBeenCalledWith(0, 0);
  expect(context.lineTo).toHaveBeenNthCalledWith(1, 50, 20);
  expect(context.lineTo).toHaveBeenNthCalledWith(2, 100, 40);
  expect(context.stroke).toHaveBeenCalledTimes(1);
});

test('draws and clamps waveform peaks to the canvas height', () => {
  const context = {
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    strokeStyle: '',
    lineWidth: 0,
  } as unknown as CanvasRenderingContext2D;

  drawWaveformPeaks(context, [{ min: -2, max: 2 }], 100, 40, '#fff', 2);

  expect(context.moveTo).toHaveBeenCalledWith(0, 0);
  expect(context.lineTo).toHaveBeenCalledWith(0, 40);
  expect(context.stroke).toHaveBeenCalledTimes(1);
});
