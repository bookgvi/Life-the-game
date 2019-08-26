<template>
  <div id="app">
    <v-stage :config="stage">
      <v-layer>
        <life-elem-col
          v-for="i in lifeCols"
          :key="i"
          :col="i"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import lifeElemCol from './components/lifeElemCol'
export default {
  created () {
    this.concieve()
  },
  components: {
    'life-elem-col': lifeElemCol
  },
  computed: {
    ...mapGetters([
      'stage',
      'lifeCols'
    ])
  },
  methods: {
    ...mapActions([
      'concieve'
    ])
  }
}
</script>
