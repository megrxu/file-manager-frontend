<template>
  <el-row class="main">
    <el-col :span="20" :offset="2">
      <h3>Disks Select</h3>
      <el-row :gutter="20">
        <el-col :span="8" v-for="disk in this.disks()" v-bind:key="disk.id" v-if="disk.is_shown">
          
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

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    ...mapState([
      'disks'
    ])
  }
}
</script>
