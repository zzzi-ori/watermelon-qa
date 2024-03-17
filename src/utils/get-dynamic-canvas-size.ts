const RATIO = 560 / 360

export const getDynamicCanvasHeight = (width: number) => {
  return width * RATIO
}
