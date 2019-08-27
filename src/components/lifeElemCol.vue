<template>
  <div class="div">
    <v-circle
      v-for="row in lifeRows"
      :key="row"
      :config="lifeElem[col-1][row-1].config"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    col: Number
  },
  computed: {
    ...mapGetters([
      'lifeElem',
      'lifeRows'
    ])
  }
}
</script>
