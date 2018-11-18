import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import test from '../views/test/store'
import viewName from '../views/view-name/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appName: 'vue app',
    globalCount: 0
  },

  getters: {
    globalCount: state => state.globalCount
  },

  mutations: {},

  actions: {},

  modules: {
    user,
    test,
    viewName
  }
})

console.log(store)

export default store
