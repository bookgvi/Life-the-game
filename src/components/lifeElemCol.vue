<template>
  <div class="div">
    <life-elem-row
      v-for="row in lifeRows"
      :key="row"
      :row="row"
      :col="col"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LifeElemRow from '@/components/LifeElemRow'
export default {
  props: {
    col: Number
  },
  components: {
    LifeElemRow
  },
  computed: {
    ...mapGetters([
      'lifeElem',
      'lifeRows'
    ])
  }
}
</script>
