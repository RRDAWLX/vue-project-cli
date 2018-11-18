import Vue from 'vue'
import Router from 'vue-router'
import routeA from './routes/a'

Vue.use(Router)

const routes = [
  {
    path: '/test',
    component: () => import('../views/test/Main')
  },
  ...routeA
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
