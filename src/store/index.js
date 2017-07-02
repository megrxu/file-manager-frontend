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
  recentFiles: [],
  deletedFiles: [],
  loginState: 0,
  currentUser: ' ',
  system: [],
  file: {
    name: 'filename',
    type: 'filetype',
    size: 'filesize'
  },
  file_content: {}
}

const baseURL = 'https://api.xuguorui.xyz'

const mutations = {
  updateDisks(state) {
    if (state.loginState) {
      axios({
        method: 'get',
        url: '/disk/',
        baseURL: baseURL
      }).then(function (response) {
        state.disks = response.data
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
  updateRecentFiles(state) {
    // /extra/?action=recentfiles
    if (state.loginState) {
      axios.get(baseURL + '/extra/?action=recentfiles').then(function (response) {
        state.recentFiles = response.data
      })
    }
  },
  updateDeletedFiles(state) {
    // /extra/?action=recentfiles
    if (state.loginState) {
      axios.get(baseURL + '/extra/?action=deletedfiles').then(function (response) {
        state.deletedFiles = response.data
      })
    }
  },
  updateFile(state, locStr) {
    if (state.loginState) {
      axios({
        method: 'get',
        url: '/file/?location=' + locStr,
        baseURL: baseURL
      }).then(function (response) {
        state.file.name = response.data.file
        state.file.size = response.data.size
        state.file.type = response.data.type
      })
    }
  },
  updateFileContent(state, locStr) {
    if (state.loginState) {
      axios({
        method: 'get',
        url: '/file/?location=' + locStr + '&action=view',
        baseURL: baseURL
      }).then(function (response) {
        state.file_content = response
      })
    }
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
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  updateSystem(state) {
    if (state.loginState) {
      axios({
        method: 'get',
        url: '/extra/?action=system',
        baseURL: baseURL,
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' }
      }).then(function (response) {
        state.system = response.data
      })
    }
  },
  updateLoginState(state) {
    axios({
      method: 'get',
      url: '/extra/?action=check',
      baseURL: baseURL,
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' }
    }).then(function (response) {
      if (response.data.status === 1) {
        state.loginState = 1
      } else {
        state.loginState = 0
      }
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
