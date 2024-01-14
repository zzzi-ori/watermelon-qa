const RATIO = 584/360

export const getDynamicCanvasSize = () => {
    const width = window.innerWidth
    const height = width * RATIO
    return {width, height}
}
