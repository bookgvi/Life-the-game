import Vue from 'vue'
import * as types from './mutations-types'
/* eslint-disable */
export const mutations = {
  [types.CONCIEVE]: (state) => {
    let radius = 15
    let offsetX = 20
    let offsetY = 20
    let rowsCount = Math.floor((state.stage.config.height - state.stage.config.y - offsetY) / (2 * radius))
    let colsCount = Math.floor((state.stage.config.width - state.stage.config.x - offsetX) / (2 * radius))
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
            stroke: '#cccccc',
            strokeWidth: 1,
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
    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row - 1)].aliveHeighbors++
    state.lifeElem[hasCol(num.col)][hasRow(num.row - 1)].aliveHeighbors++
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row - 1)].aliveHeighbors++

    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row)].aliveHeighbors++
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row)].aliveHeighbors++

    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row + 1)].aliveHeighbors++
    state.lifeElem[hasCol(num.col)][hasRow(num.row + 1)].aliveHeighbors++
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row + 1)].aliveHeighbors++

    function hasRow (value) {
      switch (value) {
        case -1:
          return state.lifeElemRows - 1
          break
        case state.lifeElemRows:
          return 0
          break
        default:
          return value
      }
    }
    function hasCol (value) {
      switch (value) {
        case -1:
          return state.lifeElemCols - 1
          break
        case state.lifeElemCols:
          return 0
          break
        default:
          return value
      }
    }
  },
  [types.DIE]: (state, num) => {
    Vue.set(state.lifeElem[num.col][num.row].config, 'fill', '#ffffff')
    Vue.set(state.lifeElem[num.col][num.row], 'isAlive', false)
    state.aliveCount--
    // NeighBors section
    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row - 1)].aliveHeighbors--
    state.lifeElem[hasCol(num.col)][hasRow(num.row - 1)].aliveHeighbors--
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row - 1)].aliveHeighbors--

    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row)].aliveHeighbors--
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row)].aliveHeighbors--

    state.lifeElem[hasCol(num.col - 1)][hasRow(num.row + 1)].aliveHeighbors--
    state.lifeElem[hasCol(num.col)][hasRow(num.row + 1)].aliveHeighbors--
    state.lifeElem[hasCol(num.col + 1)][hasRow(num.row + 1)].aliveHeighbors--

    function hasRow (value) {
      switch (value) {
        case -1:
          return state.lifeElemRows - 1
          break
        case state.lifeElemRows:
          return 0
          break
        default:
          return value
      }
    }
    function hasCol (value) {
      switch (value) {
        case -1:
          return state.lifeElemCols - 1
          break
        case state.lifeElemCols:
          return 0
          break
        default:
          return value
      }
    }
  }
}
