import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.withCredentials = true

const state = {
  currentLocation: [],
  disks: [],
  files: [],
  dirs: [],
  loginState: 0,
  currentUser: ''
}

const baseURL = 'https://api.xuguorui.xyz'

const mutations = {
  updateDisks(state) {
    if (state.loginState) {
      axios({
        method: 'get',
        url: '/disk/',
        baseURL: baseURL,
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' }
      }).then(function (response) {
        state.disks = response.data
        console.log(response)
      })
    }
  },
  updateFiles(state, locStr) {
    if (state.loginState) {
      axios.get(baseURL + '/file/?location=' + locStr).then(function (response) {
        state.files = response.data.files
      })
    }
  },
  updateDirs(state, locStr) {
    if (state.loginState) {
      axios.get(baseURL + '/file/?location=' + locStr).then(function (response) {
        state.dirs = response.data.dirs
      })
    }
  },
  updateLoc(state, locStr) {
    state.currentLocation = locStr.split('/')
    state.currentLocation[0] = 'root'
  },
  login_request(state, form) {
    var qs = require('qs')
    axios({
      method: 'post',
      url: '/extra/login/',
      baseURL: baseURL,
      data: qs.stringify({
        'username': form.username,
        'password': form.password
      })
    })
      .then(function (response) {
        if (response.data[0].status) {
          state.loginState = 1
          state.currentUser = form.username
        } else {
          state.loginState = 0
          state.currentUser = ''
        }
        console.log(state.loginState)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

const getters = {
  // dirs: state => state.dirs
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
