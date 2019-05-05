<template>
  <div id="app">
    <button @click="add">Add timeSlot</button>
    <button @click="remove">Remove timeSlot</button>
    <button @click="swing('UP')">Swing timeSlot</button>
    <vue-swing
      @throwout="onThrowout"
      :config="config"
      ref="vueswing"
    >
      <div
        v-for="timeSlot in timeSlots"
        :key="timeSlot"
        class="card" v-on:keyup.up="swing('UP')"
      >
        <span>{{ timeSlot }}</span>
      </div>
    </vue-swing>
  </div>
</template>

<script>
import VueSwing from 'vue-swing'
export default {
  name: 'app',
  components: { VueSwing },
  data () {
    return {
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      },
      timeSlots: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    }
  },
  created: function () {
    window.addEventListener('keyup', this.keypress)
  },
  methods: {
    keypress: function(e) {
      if(e.key == "ArrowUp") {
        this.swing('UP');
      } else if(e.key == "ArrowRight") {
        this.swing('RIGHT');
      } else if(e.key == "ArrowLeft") {
        this.swing('LEFT');
      }
    },
    add () {
      this.timeSlots.push(`${this.timeSlots.length + 1}`)
    },
    remove () {
      this.swing()
      setTimeout(() => {
        this.timeSlots.pop()
      }, 100)
    },
    swing (direction) {
      const timeSlots = this.$refs.vueswing.cards
      const directions = {UP: [0, -50], DOWN: [0, 50], RIGHT: [50, 0], LEFT: [-50, 0]}
      timeSlots[timeSlots.length - 1].throwOut(
        directions[direction][0],
        directions[direction][1]
      )
    },
    onThrowout ({ target, throwDirection }) {
      console.log(`Threw ${target.textContent} ${throwDirection.description}!`)
      if (throwDirection.description === 'RIGHT') {
        var index = this.timeSlots.indexOf(target.textContent);
        console.log(index);
        this.timeSlots.splice(index, 1);
      }
    }
  }
}
</script>
