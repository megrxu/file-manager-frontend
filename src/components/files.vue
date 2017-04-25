<template>
    <div @click="getdata('/home/ray/Documents')">
    <el-table
      :data="fileData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="文件名"
        sortable
        :filters="[{ text: '不显示隐藏文件', value: '1' }]"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        prop="size"
        label="大小"
        sortable>
      </el-table-column>
    </el-table>
    <el-table
      :data="dirData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="文件夹"
        sortable
        :filters="[{ text: '不显示隐藏文件夹', value: '1' }]"
        :filter-method="filterTag">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        sortable>
      </el-table-column>
    </el-table>
    </div>
  </template>


  <style>
    

  </style>
  <script>
    import axios from 'axios'
    export default {
      methods: {
        getdata: function(str){
          let self = this;
          let baseURL= 'http://localhost:8000'
          let location = str
          axios.get(baseURL + '/file/?location=' + location).then(function(response){
            self.fileData = response.data.files
            self.dirData = response.data.dirs
          })
        },
        filterTag(value, row) {
          let str = row.name
          return !(str.substring(0,1) === '.');
        },
        toDir: function(value, row){
            console.log('awdww')
            this.getdata('/home/ray/Documents/hexo/' + row.name)
          }
        },
      data() {
        return {
          fileData: [],
          dirData: []
        }
      },

      created: function(){
        this.getdata('/home/ray/Documents/hexo')
      }
    }
  </script>