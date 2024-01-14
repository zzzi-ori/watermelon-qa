type Block = {
    size: number;
    color: string;
};

const lineColor = '#1E1E1E'

const blocks: { [key: number]: Block } = {
    1: { size: 26, color: '#FFB7E7' },
    2: { size: 40, color: '#FFC8B7' },
    3: { size: 54, color: '#FFDB98' },
    4: { size: 90, color: '#97FFC6' },
    5: { size: 100, color: '#94E9F6' },
    6: { size: 120, color: '#FF8FDA' },
    7: { size: 140, color: '#FF9A7A' },
    8: { size: 160, color: '#FFC964' },
    9: { size: 160, color: '#43F091' },
    10: { size: 200, color: '#60C7FF' },
};

export {lineColor, blocks}
