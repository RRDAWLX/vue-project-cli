import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,

  state: {
    testCount: 1
  },

  getters,
  mutations,
  actions
}