import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Nav from '@/components/Nav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Nav,
      children: [
        {path: '/heo', component: Home}
      ]
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Home
    }
  ]
})
