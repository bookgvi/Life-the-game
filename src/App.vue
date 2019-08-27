<template>
  <div id="app">
    Поколение: {{ cicleNum }}
    <button @click="isEvolution.start()">Start</button>
    <button @click="isEvolution.stop()">Stop</button>
    <button @click="window.location.reload()">Restart</button>
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
    lifeTimer: 0,
    isEndOfCicle: true,
    bornOrDie: false,
    cicleNum: 0,
    pregnant: [],
    dead: []
  }),
  created () {
    this.concieve()
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.isEvolution = new Konva.Animation(frame => {
      if (frame.time - this.lifeTimer > 4000) {
        this.lifeTimer = Math.max(this.lifeTimer, frame.time)
        this.isEndOfCicle = !this.isEndOfCicle
        this.bornOrDie = !this.bornOrDie
        this.cicleNum++
      }
      let c = 0
      let r = 0
      if (!this.isEndOfCicle) {
        while (c < this.lifeCols) {
          this.lifeCicle(c, r)
          c++
        }
        this.isEndOfCicle = true
      }
      c = 0
      r = 0
      if (this.bornOrDie) {
        while (c < this.lifeCols) {
          this.bornOrDieM(c, r)
          c++
        }
        this.bornOrDie = false
      }
    })
    this.$refs.edem.getNode().on('click', (e) => {
      let col = Math.floor((e.target.index) / this.lifeRows)
      let row = (e.target.index) % this.lifeRows
      if (this.lifeElem[col][row].isAlive) {
        this.die({ col, row })
      } else {
        this.born({ col, row })
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
    lifeCicle (c, r) {
      if (r >= this.lifeRows) { return }
      // ...
      if ((this.lifeElem[c][r].isAlive && this.lifeElem[c][r].aliveHeighbors < 2) || (this.lifeElem[c][r].isAlive && this.lifeElem[c][r].aliveHeighbors > 3)) {
        this.dead.push({ col: c, row: r })
      }
      if (!this.lifeElem[c][r].isAlive && this.lifeElem[c][r].aliveHeighbors === 3) {
        this.pregnant.push({ col: c, row: r })
      }
      r++
      this.lifeCicle(c, r)
    },
    bornOrDieM (c, r) {
      if (r >= this.lifeRows) { return }
      // ...
      while (this.dead.length) {
        this.die(this.dead.pop())
      }
      while (this.pregnant.length) {
        this.born(this.pregnant.pop())
      }
      r++
      this.bornOrDieM(c, r)
    },
  }
}
</script>
