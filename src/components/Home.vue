<template>
  <div>
    <el-row class="main">
      <el-col :span="20" :offset="2">
        <h3>Welcome! {{ this.currentUser() }}</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">Mounted Disks</span>
                  <el-button style="float: right;" type="default" @click="toStatus">Explore</el-button>
                </div>
                <div v-for="disk in this.disks()" v-if="disk.is_shown">
                  <el-button type="text" @click="toDisk(disk.mount_point)">{{disk.device}}</el-button>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">Recent Files</span>
                </div>
                <div v-for="file in recentFiles" class="text item">
                  <div>{{ file.name }}</div>
                  <div>{{ file.location }}</div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    ...mapState([
      'disks',
      'currentUser'
    ]),
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
    toStatus: function () {
      this.$router.push('/status')
    },
    toHome: function () {
      this.$router.push('/')
    },
    toDisk: function (location) {
      this.$router.push('explore/?location=' + location)
      this.refresh()
    }
  },
  data() {
    return {
      recentFiles: [{
        name: 'haha',
        location: 'awd'
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

.login {
  position: fixed;
}
</style>
