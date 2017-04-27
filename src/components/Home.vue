<template>
<div>
  <el-row>
  <el-col :span="20" :offset="2">
<h3>Welcome! Ray</h3>
<el-row :gutter="20">
  <el-col :span="8"><div>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">挂载的硬盘</span>
    <el-button style="float: right;" type="primary" @click="toDisk">查看</el-button>
  </div>
  <div v-for="disk in diskData" class="text item">
  {{ disk.device }}
  </div>
</el-card></div></el-col>
  <el-col :span="8"><div><el-card class="box-card">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">近期文件</span>
  </div>
  <div v-for="file in recentFile"  class="text item">
  <div>{{ file.name }}</div><div>{{ file.location }}</div>
  </div>
</el-card>
  </div></el-col>
  <el-col :span="8"><div></div></el-col>
</el-row>
  </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
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
    },
    data () {
      return {
        diskData: [{
          id: 1,
          device: 'dev/sda1',
          percent: 23
        }, {
          id: 2,
          device: 'dev/sda2',
          percent: 23
        }],
        recentFile: [{
          name: 'text.txt',
          location: 'Documents/hexo'
        }, {
          name: 'test.txt',
          location: 'Documents/hexo'
        }]
      }
    },
    created: function () {
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 12px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    height: 240px;
  }

</style>
