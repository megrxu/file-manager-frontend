import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import disks from './components/disks.vue'
import frame from './components/frame.vue'
import files from './components/files.vue'
import home from './components/home.vue'
import Hello from './components/Hello.vue'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {
    path: '/',
    component: frame,
    children: [
      { path: '', component: home },
      { path: 'disk', component: disks },
      { path: 'file', component: files },      
    ],
  },
  {
    path: '/files',
    component: home,
  },
  {
    path: '/hello/:id',
    component: Hello,
  },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
}).$mount('#app')
