<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-menu theme="light" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="toHome">Home</el-menu-item>
            <el-menu-item index="2" @click="toExplore">Explore</el-menu-item>
            <el-menu-item index="3" @click="toStatus">Status</el-menu-item>
            <el-menu-item index="4" @click="toManage">Manage</el-menu-item>
            <el-menu-item index="5" style="float: right; margin-right:24px" @click="showLoginDialog">{{ login_text }}</el-menu-item>
            <!--<el-submenu index="2">
                                                                  <template slot="title">Test</template>
                                                                  <el-menu-item index="2-1">选项</el-menu-item>
                                                                </el-submenu>-->
          </el-menu>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="Login" :visible.sync="dialogFormVisible" size="tiny">
      <el-form v-model="form">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">Log In</el-button>
      </div>
    </el-dialog>
    <router-view style="height:100%"></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      formLabelWidth: '80px',
      form: {
        'username': '',
        'password': ''
      },
      username: '',
      dialogFormVisible: false
    }
  },
  computed: {
    activeIndex: function () {
      return this.$route.path === ''
    },
    login_text: function () {
      if (this.currentUser() !== ' ') {
        return this.currentUser().toUpperCase()
      } else {
        return 'Login'
      }
    }
  },
  methods: {
    ...mapState([
      'disks',
      'currentUser',
      'loginState'
    ]),
    ...mapMutations([
      'updateDisks',
      'login_request',
      'updateLoginState',
      'updateRecentFiles',
      'updateDeletedFiles'
    ]),
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    toExplore: function () {
      this.$router.push('/explore')
    },
    toManage: function () {
      this.$router.push('/manage')
    },
    toStatus: function () {
      this.$router.push('/status')
    },
    toHome: function () {
      this.$router.push('/')
    },
    login: function () {
      this.login_request(this.form)
      if (this.loginState() === 1) {
        this.dialogFormVisible = false
        this.updateDisks()
        this.updateRecentFiles()
        this.updateDeletedFiles()
      }
    },
    showLoginDialog: function () {
      this.dialogFormVisible = true
    },
    checkLoginState: function () {
      if (this.loginState() !== 1) {
        this.dialogFormVisible = true
      } else {
        this.updateDisks()
      }
    }
  },
  created: function () {
    this.updateLoginState()
    this.checkLoginState()
  }
}
</script>

<style>
.el-menu {
  width: 100%;
}
</style>
