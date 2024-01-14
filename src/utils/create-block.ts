import {Bodies} from "matter-js";
import {blocks, lineColor} from "../pages/play/setting.ts";

export const createBlock = (index: number, x:number, y:number, isStatic:boolean=false) => {
    const block = blocks[index]
    const circle = Bodies.circle(x, y, block.size/2, {
        isStatic,
        label: String(index),
        render: {
            fillStyle: block.color,
            lineWidth: 2.5,
            strokeStyle: lineColor,
        }
    })
    return circle
}
