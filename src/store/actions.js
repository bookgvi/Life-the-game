import * as types from './mutations-types'

export const actions = {
  concieve: ({ commit }) => commit(types.CONCIEVE),
  born: ({ commit }, num) => commit(types.BORN, num),
  die: ({ commit }, num) => commit(types.DIE, num)
}
