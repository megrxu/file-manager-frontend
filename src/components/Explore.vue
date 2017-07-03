<template>
  <el-row class="main">
    <el-col :span="4" :offset="2">
      <h3>Your Disks</h3>
      <div v-for="disk in this.disks()" v-if="disk.is_shown" v-bind:key="disk.id">
        <el-button type="text" @click="toDisk(disk.mount_point)" style="margin-bottom:8px">{{disk.device}}</el-button>
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
      <el-table :data="this.dirs().concat(this.files())" style="width: 100%" @row-click="lookDir" :row-class-name="tableRowClassName" empty-text='No Data' class="margin-bottom">
        <el-table-column prop="name" label="Name" sortable :filters="[{ text: 'Donnot hide hidden files', value: '1' }]" :filter-method="filterTag">
        </el-table-column>
        <el-table-column prop="size" label="Size or amount" sortable>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title='View File' :visible.sync="dialogFormVisible" size="large">
      <div style="font-weight:900;line-height:24px;">Filename: {{ this.file().name}}</div>
      <div style="font-weight:900;line-height:24px;">Type: {{ this.file().type}}</div>
      <hr>
      <div style="font-weight:900;line-height:24px;margin-top: 24px;margin-bottom: 8px">Content: </div>
      <div style="">
        <img v-if="showimage" v-bind:src="imgsrc" class="image" style="max-width: 240px">
        <el-input :readonly="!editable" type="textarea" autosize placeholder="Enter" v-model="content_edit" v-if="!showimage">
        </el-input>
      </div>
      <div style="margin-top: 24px;padding-bottom: 24px;">
        <el-button style="float: left;" type="primary" @click="edit" size="small">Edit</el-button>
        <el-button style="float: left;" type="primary" @click="save" size="small" v-if="editable">Save</el-button>
        <el-button style="float: left;" type="default" @click="download" size="small">Download</el-button>
        <el-button style="float: left;" type="danger" @click="deletefile" size="small">Delete</el-button>
        <el-button style="float: left;" type="default" @click="cancel" size="small">Cancel</el-button>
      </div>
    </el-dialog>
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
import axios from 'axios'
export default {
  methods: {
    ...mapState([
      'disks',
      'files',
      'dirs',
      'currentLocation',
      'file',
      'file_content'
    ]),
    ...mapMutations([
      'updateDisks',
      'updateFiles',
      'updateDirs',
      'updateLoc',
      'updateFile',
      'updateFileContent'
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
        this.viewFile(row)
      }
      this.refresh()
    },
    viewFile: function (row) {
      this.showimage = false
      this.editable = false
      this.updateFile(this.input + '/' + row.name)
      this.updateFileContent(this.input + '/' + row.name)
      console.log(this.file_content())
      this.imgsrc = 'https://api.xuguorui.xyz/file/?location=' + this.input + '/' + row.name + '&action=view'
      this.downsrc = '/file/?location=' + this.input + '/' + row.name + '&action=download'
      this.dialogFormVisible = true
    },
    toDir: function (item) {
      // console.log(this.currentLocation()[3] === item)
      // console.log(this.currentLocation().indexOf(item))
      // this.$router.push(loc)
      // this.refresh
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
    },
    cancel: function () {
      this.dialogFormVisible = false
      this.editable = false
    },
    save: function () {
      this.dialogFormVisible = true
      this.editable = false
      this.$confirm('Would you like to save the change?', 'Be careful', {
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
            'location': this.file().name,
            'action': 'edit',
            'content': this.content_edit
          })
        })
        console.log(this.content)
        this.$message({
          type: 'success',
          message: 'Change Saved~'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled.'
        })
      })
    },
    edit: function () {
      this.editable = !this.editable
    },
    download: function () {
      this.dialogFormVisible = true
      this.editable = false
      let file = this.file()
      axios({
        method: 'get',
        url: this.downsrc,
        baseURL: this.baseURL
      }).then(function (response) {
        let element = document.createElement('a')
        element.setAttribute('href', 'data:' + file.type + ';charset=utf-8,' +
          encodeURIComponent(response.data))
        element.setAttribute('download', file.name.split('/').reverse()[0])
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
      })
    },
    deletefile: function () {
      this.$confirm('Would you like to delete the file?', 'Be careful', {
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
            'location': this.file().name,
            'action': 'delete'
          })
        })
        this.$message({
          type: 'success',
          message: 'Moved to Recycle Bin~'
        })
        this.dialogFormVisible = true
        this.editable = false
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
      input: '',
      dialogFormVisible: false,
      editable: false,
      imgsrc: '',
      downsrc: '',
      content_edit: this.content,
      baseURL: 'https://api.xuguorui.xyz'
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
  },
  computed: {
    content: function () {
      let type = this.file().type.split('/')[0]
      if (type === 'text') {
        return this.file_content().data
      } else if (type === 'image') {
        this.showimage = true
        return ''
      } else {
        return 'No Preview'
      }
    },
    showimage: function () {
      this.content_edit = this.content
      let type = this.file().type.split('/')[0]
      return (type === 'image')
    }
  }
}
</script>
