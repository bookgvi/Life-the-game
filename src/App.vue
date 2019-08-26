<template>
  <div id="app">
    <v-stage :config="stage">
      <v-layer ref="edem">
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
  data: () => ({
    isEvolution: false,
    lifeTimer: 0
  }),
  created () {
    this.concieve()
  },
  mounted () {
    this.$refs.edem.getNode().on('click', (e) => {
      let col = Math.floor((e.target.index) / this.lifeRows)
      let row = (e.target.index) % this.lifeRows
      if (this.lifeElem[col][row].isAlive) {
        this.die({ col, row })
      } else {
        this.born({ col, row })
      }
      this.isEvolution.start()
    })
    this.isEvolution = new Konva.Animation(frame => {
      if (frame.time - this.lifeTimer > 3000) {
        this.lifeTimer = Math.max(this.lifeTimer, frame.time)
        this.lifeCicle()
      }
    })
  },
  components: {
    'life-elem-col': lifeElemCol
  },
  computed: {
    ...mapGetters([
      'stage',
      'lifeElem',
      'lifeCols',
      'lifeRows'
    ])
  },
  methods: {
    ...mapActions([
      'concieve',
      'born',
      'die'
    ]),
    lifeCicle () {
      for (let c = 0; c < this.lifeCols; c++) {
        for (let r = 0; r < this.lifeRows; r++) {
          if (this.lifeElem[c][r].isAlive) {
            this.lifeElem[c][r + 1] ? this.born({ col: c, row: r + 1 }) : ' '
          }
        }
      }
    }
  }
}
</script>
