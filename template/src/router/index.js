import Vue from 'vue'
import Router from 'vue-router'
import routeA from './routes/a'

Vue.use(Router)

const routes = [
  {
    name: 'test',
    path: '/test',
    component: () => import('../views/test')
  },

  ...routeA,

  {
    name: 'default',
    path: '*',
    redirect: {
      name: 'test',
    },
  },
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
