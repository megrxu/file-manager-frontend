<template>
  <el-row class="main">
    <el-col :span="4" :offset="2">
      <h3>Your disks</h3>
      <div v-for="disk in this.disks()" v-if="disk.is_shown">
        <el-button type="text" @click="toDisk(disk.mount_point)">{{disk.device}}</el-button>
      </div>
    </el-col>
    <el-col :span="14">
      <h3>Files</h3>
      <el-breadcrumb separator="/" class="margin-top">
        <el-breadcrumb-item v-for="item in this.currentLocation()" v-bind:key="item.id">
        {{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input class="margin-bottom margin-top" placeholder="File Location" icon="search" v-model="input" :on-icon-click="handleIconClick">
      </el-input>
      <el-table :data="this.dirs().concat(this.files())" style="width: 100%" @row-click="lookDir" :row-class-name="tableRowClassName">
        <el-table-column prop="name" label="Name" sortable :filters="[{ text: 'Donnot hide hidden files', value: '1' }]" :filter-method="filterTag">
        </el-table-column>
        <el-table-column prop="size" label="Size or amount" sortable>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>


<style>
.filenav {
  padding-bottom: 24px
}

.el-table .dir-row {
  background: #c9e5f5;
  background: #FAFAFA;
}

.margin-bottom {
  margin-bottom: 20px;
}

.margin-top {
  margin-top: 20px;
}
</style>


<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapState([
      'disks',
      'files',
      'dirs',
      'currentLocation'
    ]),
    ...mapMutations([
      'updateDisks',
      'updateFiles',
      'updateDirs',
      'updateLoc'
    ]),
    getdata: function (str) {
      this.updateFiles(str)
      this.updateDirs(str)
    },
    filterTag(value, row) {
      let str = row.name
      return !(str.substring(0, 1) === '.')
    },
    lookDir: function (row) {
      if (this.dirs().indexOf(row) !== -1) {
        this.$router.push(this.$route.fullPath + '/' + row.name)
      } else {
        this.$router.push(this.$route.fullPath)
      }
      this.refresh()
    },
    viewFile: function (row) {

    },
    toDir: function (item) {
      // console.log(this.currentLocation()[3] === item)
      // console.log(this.currentLocation().indexOf(item))
      // this.$router.push(loc)
      // this.refresh
    },
    back: function () {
      this.$router.go(-1)
      this.refresh()
    },
    forward: function () {
      this.$router.go(1)
      this.refresh()
    },
    refresh: function () {
      this.getdata(this.$route.query.location)
      this.input = this.$route.query.location
      this.updateLoc(this.input)
    },
    toDisk: function (location) {
      this.$router.push('?location=' + location)
      this.refresh()
    },
    handleIconClick(ev) {
      this.getdata(this.input)
      this.$router.push('?location=' + this.input)
      this.$route.query.location = this.input
    },
    tableRowClassName(row, index) {
      if (this.dirs().indexOf(row) !== -1) {
        return 'dir-row'
      }
      return 'file-row'
    }
  },
  data() {
    return {
      input: ''
    }
  },
  created: function () {
    if (this.$route.fullPath === 'explore') {
      this.input = this.$route.query.location
      this.updateDirs(this.input)
      this.updateFiles(this.input)
    }
    this.updateDisks()
    this.updateLoc(this.input)
  }
}
</script>
