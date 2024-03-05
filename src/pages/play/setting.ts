import b1 from '../../assets/block/1.png'
import b2 from '../../assets/block/2.png'
import b3 from '../../assets/block/3.png'
import b4 from '../../assets/block/4.png'
import b5 from '../../assets/block/5.png'
import b6 from '../../assets/block/6.png'
import b7 from '../../assets/block/7.png'
import b8 from '../../assets/block/8.png'
import b9 from '../../assets/block/9.png'
import b10 from '../../assets/block/10.png'

type Block = {
    size: number;
    color: string;
    score: number;
};

const lineColor = '#1E1E1E'

const blocks: { [key: number]: Block } = {
  1: {size: 30, color: '#94E9F6', score: 2},
  2: {size: 40, color: '#97FFC6', score: 4},
  3: {size: 55, color: '#FFB7E7', score: 6},
  4: {size: 70, color: '#FFC8B7', score: 8},
  5: {size: 90, color: '#FFDB98', score: 16},
  6: {size: 110, color: '#60C7FF', score: 32},
  7: {size: 125, color: '#43F091', score: 64},
  8: {size: 140, color: '#FF8FDA', score: 128},
  9: {size: 150, color: '#FF9A7A', score: 256},
  10: {size: 160, color: '#FFC964', score: 512},
}

// const blocks: { [key: number]: Block } = {
//     1: { size: 26, color: '#FFB7E7', score: 2},
//     2: { size: 40, color: '#FFC8B7', score: 4},
//     3: { size: 54, color: '#FFDB98', score: 6},
//     4: { size: 90, color: '#97FFC6', score: 8},
//     5: { size: 100, color: '#94E9F6', score: 16},
//     6: { size: 120, color: '#FF8FDA', score: 32},
//     7: { size: 140, color: '#FF9A7A', score: 64},
//     8: { size: 160, color: '#FFC964', score: 128},
//     9: { size: 160, color: '#43F091', score: 256},
//     10: { size: 200, color: '#60C7FF', score: 512},
// };

export {lineColor, blocks}

export const Background: { [key: number]: any } = {
  1: b1,
  2: b2,
  3: b3,
  4: b4,
  5: b5,
  6: b6,
  7: b7,
  8: b8,
  9: b9,
  10: b10
}
