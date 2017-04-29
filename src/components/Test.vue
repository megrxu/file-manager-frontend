<template>
  <div>
    {{ count }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapState([
      'demo',
      'disks'
    ]),
    ...mapMutations([
      'updateDisks'
    ])
  },
  computed: {
    count() {
      this.updateDisks()
      return this.disks()
    }
  },
  created: function () {
  }
}
</script>


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
