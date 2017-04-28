<template>
<el-row>
  <el-col :span="20" :offset="2">

    <el-row class="table">
      <el-col :span="16" :offset="4">
        <el-row class="filenav">
          <el-button-group>
          <el-button type="primary" icon="arrow-left" @click="back"></el-button>
          <el-button type="primary" @click="forward"><i class="el-icon-arrow-right  el-icon--right"></i></el-button>
          </el-button-group>
          <el-input
          placeholder="File Location"
          icon="search"
          v-model="input"
          :on-icon-click="handleIconClick">
          </el-input>
        </el-row>
      <el-table
        :data="fileData"
        style="width: 100%"
        @row-click="lookDir"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="name"
          label="文件夹"
          sortable
          :filters="[{ text: '不显示隐藏文件夹', value: '1' }]"
          :filter-method="filterTag">
        </el-table-column>
        <el-table-column
          prop="size"
          label="数量"
          sortable>
        </el-table-column>
      </el-table>
      </el-col>
      </el-row>    
      </el-col>
  </el-row>
</template>


  <style>
    .filenav{
      padding-bottom: 24px
    }

    .el-table .dir-row{
      background: #c9e5f5;
      background: #FAFAFA;
    }

  </style>


  <script>
    import axios from 'axios'
    export default {
      methods: {
        getdata: function (str) {
          let self = this
          let baseURL = 'http://localhost:8000'
          let location = str
          axios.get(baseURL + '/file/?location=' + location).then(function (response) {
            self.fileData = response.data.dirs
            self.dirData = self.fileData
            self.fileData = self.fileData.concat(response.data.files)
          })
        },
        filterTag (value, row) {
          let str = row.name
          return !(str.substring(0, 1) === '.')
        },
        lookDir: function (row) {
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
          console.log(this.$route.query.location)
          this.getdata(this.$route.query.location)
          this.input = this.$route.query.location
        },
        handleIconClick (ev) {
          console.log('input:' + this.input)
          this.getdata(this.input)
          this.$router.push('?location=' + this.input)
          this.$route.query.location = this.input
        },
        tableRowClassName (row, index) {
          if (this.dirData.indexOf(row) !== -1) {
            return 'dir-row'
          }
          return 'file-row'
        }
      },
      data () {
        return {
          fileData: [],
          dirData: [],
          input: ''
        }
      },

      created: function () {
        this.getdata(this.$route.query.location)
        this.input = this.$route.query.location
      }
    }
  </script>
