import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/string',
      name: 'string',
      component: () => import('./views/StringUtils.vue')
    },
    {
      path: '/json',
      name: 'json',
      component: () => import('./views/JsonUtils.vue')
    }
  ]
})
