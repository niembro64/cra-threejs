import { getSnappedCellBounds } from './pixelCanvas';

describe('pixel canvas geometry', () => {
  it('shares exact boundaries without gaps or overlap at fractional cell sizes', () => {
    const canvasSize = 1003;
    const cellCount = 100;
    const bounds = Array.from({ length: cellCount }, (_, index) => getSnappedCellBounds(index, cellCount, canvasSize));

    expect(bounds[0].start).toBe(0);
    expect(bounds[bounds.length - 1].end).toBe(canvasSize);

    bounds.slice(1).forEach((cell, index) => {
      expect(cell.start).toBe(bounds[index].end);
    });

    expect(bounds.reduce((width, cell) => width + cell.end - cell.start, 0)).toBe(canvasSize);
  });
});
