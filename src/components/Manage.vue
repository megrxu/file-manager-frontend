<template>
  <el-row class="main">
    <el-col :span="20" :offset="2">
      <h3>Recycle Bin</h3>
      <el-row :gutter="20">
        <el-col :span="24">
          <div>
            <el-card class="box-card-big" style="overflow-y: scroll">
              <el-row :gutter="20" v-for="file in this.deletedFiles()" class="text item" v-bind:key="file.id">
                <el-col :span="18">
                  <div>
                    <div style="font-weight:900;">{{ file.filename }}</div>
                    <div style="font-weight:100; color:#aaa;line-height:1.5rem">{{ file.date }}</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-button style="float: right;margin-right:24px" type="danger" @click="deletefile(file.filename)" size="small">Delete</el-button>
                    <el-button style="float: right;margin-right:24px" type="default" @click="restore(file.filename)" size="small">Restore</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <h3>System Status</h3>
      <el-row :gutter="20">
        <el-col :span="8">
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<<style>
  .box-card-big{
    height: 300px
  }
</style>


<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapState([
      'recentFiles',
      'deletedFiles',
      'file'
    ]),
    ...mapMutations([
      'updateFileContent',
      'updateRecentFiles',
      'updateDeletedFiles'
    ]),
    deletefile: function (filename) {
      this.$confirm('Would you like to permanently delete the file?', 'Be careful', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var qs = require('qs')
        axios({
          method: 'post',
          url: '/file/',
          baseURL: this.baseURL,
          data: qs.stringify({
            'location': filename,
            'action': 'restore'
          })
        })
        this.$message({
          type: 'success',
          message: 'Deleted.'
        })
        this.updateDeletedFiles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled.'
        })
      })
    },
    restore: function (filename) {
      this.$confirm('Would you like to restore the file?', 'Be careful', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        var qs = require('qs')
        axios({
          method: 'post',
          url: '/file/',
          baseURL: this.baseURL,
          data: qs.stringify({
            'location': filename,
            'action': 'restore'
          })
        })
        this.$message({
          type: 'success',
          message: 'Restored.'
        })
        this.updateDeletedFiles()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled.'
        })
      })
    }
  },
  data() {
    return {
      baseURL: 'https://api.xuguorui.xyz'
    }
  }
}
</script>
