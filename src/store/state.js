const offsetX = 10
const offsetY = 25
export const state = {
  stage: {
    config: {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth - offsetX,
      height: document.documentElement.clientHeight - offsetY
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
  lifeElemRows: 0,
  aliveCount: 0
}
