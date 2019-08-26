<template>
  <div class="">
    <v-circle
      :config="lifeElem[col-1][row-1].config"
      ref="life"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    col: Number,
    row: Number
  },
  data: () => ({
    evolution: '',
    lifeCicle: 0
  }),
  mounted () {
    const col = this.col - 1
    const row = this.row - 1
    const self = this.lifeElem[col][row]
    // console.log(this.$refs.life[1])
    this.$refs.life.getNode().on('click', () => {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.born({ col, row })
    })
    // eslint-disable-next-line no-undef
    this.evolution = new Konva.Animation((frame) => {
      if (frame.time - this.lifeCicle >= 10000) {
        this.lifeCicle = Math.max(this.lifeCicle, frame.time)
        console.log(self.isAlive)

        if (self.isAlive) {
          this.lifeElem[col + 1][row - 1] ? this.born({ col: col + 1, row: row - 1 }) : this.die({ col: col + 1, row: row - 1 })
          this.lifeElem[col + 1][row] ? this.born({ col: col + 1, row}) : this.die({ col: col + 1, row })
          this.lifeElem[col + 1][row + 1] ? this.born({ col: col + 1, row: row + 1}) : this.die({ col: col + 1, row: row + 1 })
          this.lifeElem[col][row - 1] ? this.born({ col, row: row - 1 }) : this.die({ col, row: row - 1 })
          this.lifeElem[col][row + 1] ? this.born({ col, row: row + 1 }) : this.die({ col, row: row + 1 })
          this.lifeElem[col - 1][row - 1] ? this.born({ col: col - 1, row: row - 1 }) : this.die({ col: col - 1, row: row - 1 })
          this.lifeElem[col - 1][row] ? this.born({ col: col - 1, row: row }) : this.die({ col: col - 1, row: row })
          this.lifeElem[col - 1][row + 1] ? this.born({ col: col - 1, row: row + 1 }) : this.die({ col: col - 1, row: row + 1 })
        }
      }
      this.evolution.start()
    })
  },
  computed: {
    ...mapGetters([
      'lifeElem',
      'stage',
      'lifeRows'
    ])
  },
  methods: {
    ...mapActions([
      'concieve',
      'born',
      'die'
    ])
  }
}
</script>

<style scoped>

</style>
