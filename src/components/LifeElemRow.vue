<template>
  <div class="">
    <v-circle
      :config="lifeElem[col-1][row-1].config"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    col: Number,
    row: Number
  },
  computed: {
    ...mapGetters([
      'lifeElem'
    ])
  }
}
</script>

<style scoped>

</style>
