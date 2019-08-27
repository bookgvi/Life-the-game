import Vue from 'vue'
import * as types from './mutations-types'
/* eslint-disable */
export const mutations = {
  [types.CONCIEVE]: (state) => {
    let radius = 15
    let offsetX = 20
    let offsetY = 20
    let rowsCount = Math.floor((state.stage.config.height - state.stage.config.y) / (2 * radius + offsetY))
    let colsCount = Math.floor((state.stage.config.width - state.stage.config.x) / (2 * radius + offsetX))
    state.lifeElemCols = colsCount
    state.lifeElemRows = rowsCount
    for (let c = 0; c < colsCount; c++) {
      Vue.set(state.lifeElem, c, [])
      for (let r = 0; r < rowsCount; r++) {
        let x = 2 * radius * c + offsetX
        let y = 2 * radius * r + offsetY
        Vue.set(state.lifeElem[c], r, {
          config: {
            x,
            y,
            radius,
            stroke: '#333333',
            strokeWidth: 1
          },
          offsetX,
          offsetY,
          isAlive: false,
          aliveHeighbors: 0
        })
      }
    }
  },
  [types.BORN]: (state, num) => {
    Vue.set(state.lifeElem[num.col][num.row].config, 'fill', '#0095ee')
    Vue.set(state.lifeElem[num.col][num.row], 'isAlive', true)
    state.aliveCount++
    // Neighbors section
    if (num.col > 0) {
      state.lifeElem[num.col - 1][num.row].aliveHeighbors++
      if (num.row > 0) { state.lifeElem[num.col - 1][num.row - 1].aliveHeighbors++ }
      if (num.row < state.lifeElemRows) { state.lifeElem[num.col - 1][num.row + 1].aliveHeighbors++ }
    }
    if (num.row > 0) { state.lifeElem[num.col][num.row - 1].aliveHeighbors++ }
    if (num.row < state.lifeElemRows) { state.lifeElem[num.col][num.row + 1].aliveHeighbors++ }

    if (num.col < state.lifeElemCols) {
      state.lifeElem[num.col + 1][num.row].aliveHeighbors++
      if (num.row > 0) { state.lifeElem[num.col + 1][num.row -1].aliveHeighbors++ }
      if (num.row < state.lifeElemRows) { state.lifeElem[num.col + 1][num.row + 1].aliveHeighbors++ }
    }
  },
  [types.DIE]: (state, num) => {
    Vue.set(state.lifeElem[num.col][num.row].config, 'fill', '#ffffff')
    Vue.set(state.lifeElem[num.col][num.row], 'isAlive', false)
    state.aliveCount--
    // NeighBors section
    if (num.col > 0) {
      state.lifeElem[num.col - 1][num.row].aliveHeighbors--
      if (num.row > 0) { state.lifeElem[num.col - 1][num.row - 1].aliveHeighbors-- }
      if (num.row < state.lifeElemRows) { state.lifeElem[num.col - 1][num.row + 1].aliveHeighbors-- }
    }
    if (num.row > 0) { state.lifeElem[num.col][num.row - 1].aliveHeighbors-- }
    if (num.row < state.lifeElemRows) { state.lifeElem[num.col][num.row + 1].aliveHeighbors-- }
    if (num.col < state.lifeElemCols) {
      state.lifeElem[num.col + 1][num.row].aliveHeighbors--
      if (num.row > 0) { state.lifeElem[num.col + 1][num.row -1].aliveHeighbors-- }
      if (num.row < state.lifeElemRows) { state.lifeElem[num.col + 1][num.row + 1].aliveHeighbors-- }
    }
  }
}
