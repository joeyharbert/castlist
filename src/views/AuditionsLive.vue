<template>
  <div class="home" v-if="!loading">

    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ title }}<span>.</span></h1>

            <p>{{ show }} </p>
         </div>

      </div>

   </div>

      <div class="content-outer">

      <div id="page-content" class="live">

        <!-- Background placeholder images to make space -->
         <div class="row add-bottom">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500"> 
          <!--  -->
          <vue-swing
            @throwout="onThrowout"
            :config="config"
            ref="vueswing"
          >
            <div class="card" style="padding-top: 24px;" v-for="timeSlot in timeSlots" :id="timeSlot.id">

               <img :src="timeSlot.headshot.url">               
               <h1 class="title-heading">{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</h1>

<!--                <p class="lead add-bottom">Sort: {{timeSlot.sort}}
               </p> -->

            </div>
          </vue-swing>
         </div> <!-- Row End-->

         <nav class="pagination add-bottom">
          <a class="page-numbers prev" v-on:click="swing('UP')">Starred</a>
          <a class="page-numbers next" v-on:click="swing('LEFT')">X</a>
          <a class="page-numbers next" v-on:click="swing('RIGHT')">Callback</a>
          <a class="page-numbers next" v-on:click="next()">Next</a>
         </nav>
       </div>
     </div>
  </div>
</template>

<style>
</style>

<script>
  import axios from "axios"
  import VueSwing from 'vue-swing'
  export default {
    data: function() {
      return {
        message: "L I V E",
        timeSlots: [],
        currentTimeSlot: {},
        index: 0,
        loading: false,
        title: "",
        show: "",
        config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
          ],
          minThrowOutDistance: 250,
          maxThrowOutDistance: 300
        }
      };
    },
    created: function() {
      this.loading = true;
      window.addEventListener('keyup', this.keypress);
      axios.get("/api/auditions/" + this.$route.params.id).then(response => {
        this.title = response.data.name;
        this.show = response.data.show.name;
        this.timeSlots = response.data.time_slots.filter(ts => ts.actor).reverse();
        this.currentTimeSlot = this.timeSlots[0]
        console.log(this.currentTimeSlot);
        this.loading = false;
      });
    },
    methods: {
      next: function() {
        this.timeSlots.pop();
      },
      sort: function(timeSlot, num) {
        var params = {sort: num};
        axios.patch("/api/time_slots/" + timeSlot.id, params)
          .then(response => {
            console.log(response.data);
            });
      },
      keypress: function(e) {
        if(e.key == "ArrowUp") {
          this.swing('UP');
        } else if(e.key == "ArrowRight") {
          this.swing('RIGHT');
        } else if(e.key == "ArrowLeft") {
          this.swing('LEFT');
        }
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
        var index = this.timeSlots.findIndex(x => x.id === parseInt(target.id));
        var timeSlot = this.timeSlots.find(x => x.id === parseInt(target.id));
        if (throwDirection.description === 'RIGHT') {
          this.sort(timeSlot, 0); //0 === callback
        } else if (throwDirection.description === 'UP') {
          this.sort(timeSlot, 1); //1 === starred
        } else if (throwDirection.description === 'LEFT') {
          this.sort(timeSlot, 'none');
        }

        setTimeout(() => this.timeSlots.splice(index, 1), 250);
      }
    }
  };
</script>