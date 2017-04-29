<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div>
          <el-menu theme="light" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1" @click="toHome">Filemanager</el-menu-item>
            <el-menu-item index="2" @click="toExplore">Explore</el-menu-item>
            <el-menu-item index="3" @click="toStatus">Status</el-menu-item>
            <el-menu-item index="4" @click="toManage">Manage</el-menu-item>
            <el-submenu index="2">
              <template slot="title">Test</template>
              <el-menu-item index="2-1">选项</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
    <router-view style="height:100%"></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    activeIndex: function () {
      return this.$route.path === ''
    }
  },
  methods: {
    ...mapState([
      'disks'
    ]),
    ...mapMutations([
      'updateDisks'
    ]),
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
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
    }
  },
  created: function () {
    this.updateDisks()
  }
}
</script>

<style>
.el-menu {
  width: 100%;
}
</style>
