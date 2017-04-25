<template>
  <div>
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

