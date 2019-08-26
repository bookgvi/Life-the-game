const offsetX = 0
const offsetY = 0
export const state = {
  stage: {
    config: {
      x: offsetX,
      y: offsetY,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  },
  cells: {
    line: {
      config: {
        points: [0, 0, 0, 0],
        stroke: '#000000',
        strokeWidth: 1
      }
    }
  },
  lifeElem: [],
  lifeElemCols: 0,
  lifeElemRows: 0
}
