const RATIO = 584/360

export const getDynamicCanvasHeight = (width: number) => {
    return width * RATIO
}
