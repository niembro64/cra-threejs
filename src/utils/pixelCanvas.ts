export interface SnappedCellBounds {
  start: number;
  end: number;
}

export const getSnappedCellBounds = (index: number, cellCount: number, canvasSize: number): SnappedCellBounds => ({
  start: Math.round((index / cellCount) * canvasSize),
  end: Math.round(((index + 1) / cellCount) * canvasSize),
});
