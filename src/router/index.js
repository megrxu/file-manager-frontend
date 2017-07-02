import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test'
import Home from '@/components/Home'
import Nav from '@/components/Nav'
import Explore from '@/components/Explore'
import Status from '@/components/Status'
import Manage from '@/components/Manage'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Nav,
      children: [
        {path: '/', component: Home},
        {path: '/explore', component: Explore},
        {path: '/explore/?location', component: Explore},
        {path: '/manage', component: Manage},
        {path: '/status', component: Status},
        {path: '/test', component: Test},
        {path: '/login', component: Home}
      ],
      redirect: 'file'
    }
  ]
})
