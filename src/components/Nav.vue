<template>
  <div>
  <el-row>
  <el-col :span="24"><div class="grid-content bg-purple">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1" @click="toHome">Filemanager</el-menu-item>
    <el-menu-item index="2" @click="toDisk">Disks</el-menu-item>
    <el-menu-item index="3" @click="toFile">Files</el-menu-item>            
    <el-submenu index="2">
      <template slot="title">Test</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      </el-submenu>
    </el-menu>
    </div></el-col>
  </el-row>
      <router-view style="height:100%"></router-view>
  

  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      toFile: function () {
        this.$router.push('/file')
      },
      toDisk: function () {
        this.$router.push('/disk')
      },
      toHome: function () {
        this.$router.push('/')
      }
    }
  }
</script>

