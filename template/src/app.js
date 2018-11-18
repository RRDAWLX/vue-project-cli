import 'babel-polyfill'
import 'whatwg-fetch'
import Vue from 'vue'
import App from './App'
// import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

const debug = (process.env.NODE_ENV !== 'production')

// sync(store, router)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

if (debug) {
  console.log(app)
}

app.$mount('#app')