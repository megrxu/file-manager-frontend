<template>
  <h1>{{ this.disks()}}</h1>
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
