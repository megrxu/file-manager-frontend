<template>
<el-row class="menu-ver">
  <el-col :span="4" class="menu-ver">
    <el-menu mode="vertical">
      <el-menu-item-group title="Disks">
        <el-menu-item index="(o, index) in 2"  v-for="disk in tableData"><i class="el-icon-message"></i>{{  disk.device }}</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组二">
        <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
        <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-col>
  <el-col :span="20">  
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        sortable >
      </el-table-column>
      <el-table-column
        prop="device"
        label="设备"
        sortable >
      </el-table-column>
      <el-table-column
        prop="mount point"
        label="挂载点"
        sortable >
      </el-table-column>
    </el-table>
    </el-col>
  </el-row>
  </template>

  <script>
    import axios from 'axios'
    axios.baseURL= 'http://localhost:8000'

    export default {
      methods: {
        getdata: function(){
          let self = this;
          axios.get('http://localhost:8000/disk/').then(function(response){
            self.tableData = response.data
          })
        }
      },
      data() {
        return {
          tableData: []
        }
      },

      created: function(){
        this.getdata()
      }
    }
  </script>

  <style>
  .menu-ver{
    height:200%;
  }

  
</style>