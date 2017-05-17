import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  currentLocation: [],
  disks: [],
  files: [],
  dirs: []
}

const mutations = {
  updateDisks(state) {
    let baseURL = 'http://localhost:8000'
    axios.get(baseURL + '/disk/').then(function (response) {
      state.disks = response.data
    })
  },
  updateFiles(state, locStr) {
    let baseURL = 'http://localhost:8000'
    axios.get(baseURL + '/file/?location=' + locStr).then(function (response) {
      state.files = response.data.files
    })
  },
  updateDirs(state, locStr) {
    let baseURL = 'http://localhost:8000'
    axios.get(baseURL + '/file/?location=' + locStr).then(function (response) {
      state.dirs = response.data.dirs
    })
  },
  updateLoc(state, locStr) {
    state.currentLocation = locStr.split('/')
    state.currentLocation[0] = 'root'
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
