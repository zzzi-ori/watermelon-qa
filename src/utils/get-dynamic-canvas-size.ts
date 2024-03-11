const RATIO = 540 / 360

export const getDynamicCanvasHeight = (width: number) => {
  return width * RATIO
}
