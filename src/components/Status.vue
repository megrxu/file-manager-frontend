<template>
  <el-row class="main">
    <el-col :span="20" :offset="2">
      <h3>Mounted Disks</h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="disk in this.disks()" v-bind:key="disk.id" v-if="disk.is_shown">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{ disk.device }}</span>
              </div>
              <el-col :span="14">
                <el-progress type="circle" :percentage="disk.percent"></el-progress>
              </el-col>
              <el-col :span="10" class="info">
                <p>{{ convertSize(disk.size - disk.used_size) }} Available</p>
                <p>{{ convertSize(disk.size) }} Total</p>
                <el-button style="margin-top:16px" type="default" @click="toDisk(disk.mount_point)">Explore</el-button>
              </el-col>
              <div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <h3>System Status</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">CPU Percent</span>
              </div>
              <el-col :span="14">
                <el-progress type="circle" :percentage="system().cpu"></el-progress>
              </el-col>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">RAM Percent</span>
              </div>
              <el-col :span="14">
                <el-progress type="circle" :percentage="system().ram"></el-progress>
              </el-col>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

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
  margin-bottom: 24px;
  padding-bottom: 24px;
}

.info {
  line-height: 24px;
  font-size: 0.8rem;
  color: #444444;
  text-align: right;
}

.main {
  margin-top: 24px
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapState([
      'disks',
      'system'
    ]),
    ...mapMutations([
      'updateDisks',
      'updateSystem'
    ]),
    getPercent: function () {
      return 28
    },
    convertSize: function (size) {
      let n = 0
      while (size / 1024 > 1) {
        size = size / 1024
        n++
      }
      size = size.toFixed(2)
      switch (n) {
        case 0: return String(size) + ' B'
        case 1: return String(size) + ' KB'
        case 2: return String(size) + ' MB'
        case 3: return String(size) + ' GB'
        case 4: return String(size) + ' TB'
        case 5: return String(size) + ' PB'
      }
    },
    toDisk: function (location) {
      this.$router.push('explore/?location=' + location)
    }
  },
  created: function () {
    this.updateDisks()
    this.updateSystem()
    console.log(this.system())
  },
  computed: {
  }
}
</script>
