<template>
  <div>
    <el-row class="main">
      <el-col :span="20" :offset="2">
        <h3>Welcome! {{ this.currentUser()[0].toUpperCase() + this.currentUser().slice(1) }}</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">Mounted Disks</span>
                  <el-button style="float: right;" type="default" @click="toStatus">Explore</el-button>
                </div>
                <div v-for="disk in currentDisks" v-if="disk.is_shown" v-bind:key="disk.id">
                  <el-button type="text" @click="toDisk(disk.mount_point)" style="margin-bottom:8px">{{disk.device}}</el-button>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-card class="box-card" style="overflow-y: scroll">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">Recent Files</span>
                </div>
                <div>
                  <div v-for="file in this.recentFiles()" class="text item" v-bind:key="file.id">
                    <div style="font-weight:900;">{{ file.filename }}</div>
                    <div style="font-weight:100; color:#aaa;line-height:1.5rem">{{ file.date }}</div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-card class="box-card" style="overflow-y: scroll">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">Recycle Bin</span>
                </div>
                <div>
                  <div v-for="file in this.deletedFiles()" class="text item" v-bind:key="file.id">
                    <div style="font-weight:900;">{{ file.filename }}</div>
                    <div style="font-weight:100; color:#aaa;line-height:1.5rem">{{ file.date }}</div>
                  </div>
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
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapState([
      'disks',
      'currentUser',
      'loginState',
      'recentFiles',
      'deletedFiles'
    ]),
    ...mapMutations([
      'updateDisks',
      'updateRecentFiles',
      'updateDeletedFiles'
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
    },
    toFile: function (location) {
      this.$router.push('explore/?location=' + location)
      this.refresh()
    }
  },
  data() {
    return {
    }
  },
  created: function () {
    this.updateDisks()
    this.updateRecentFiles()
    this.updateDeletedFiles()
  },
  computed: {
    currentDisks: function () {
      if (this.loginState()) {
        return this.disks()
      } else {
        return []
      }
    }
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
