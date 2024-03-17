import {Bodies} from 'matter-js'
import {Background, blocks, lineColor} from '../pages/play/setting.ts'

export const createBlock = (index: number, x: number, y: number, ratio: number, isStatic: boolean = false) => {
  const block = blocks[index]
  const background = Background[index]
  const circle = Bodies.circle(x, y, block.size * ratio / 2, {
    isStatic,
    label: String(index),
    render: {
      fillStyle: block.color,
      lineWidth: 8,
      strokeStyle: lineColor,
      sprite: {
        texture: background,
        xScale: 1 / 3 * ratio,
        yScale: 1 / 3 * ratio,
      }
    }
  })
  return circle
}
