<template>
  <el-row class="main">
    <el-col :span="4" :offset="2">
      <h3>Your disks</h3>
      <div v-for="disk in this.disks()">
        <el-button type="text" @click="toDisk(disk.mount_point)">{{disk.device}}</el-button>
      </div>
    </el-col>
    <el-col :span="14">
      <h3>Files</h3>
      <el-button-group>
        <el-button icon="arrow-left" @click="back"></el-button>
        <el-button icon="arrow-right" @click="forward"></el-button>
      </el-button-group>
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
      'dirs'
    ]),
    ...mapMutations([
      'updateDisks',
      'updateFiles',
      'updateDirs'
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
      console.log(row)
      this.$router.push(this.$route.fullPath + '/' + row.name)
      this.refresh()
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
    this.input = this.$route.query.location
    this.updateDisks()
  }
}
</script>
