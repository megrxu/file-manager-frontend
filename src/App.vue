<template>
  <div>
    <router-view></router-view>
    <hello/>
  </div>

</template>

<script>
  import Hello from './components/Hello.vue'
  import frame from './components/frame.vue'
  
  export default {
    name: 'app',
    components: {
      frame
    }
  }
</script>