<template>
  <div class="home" v-if="!loading">
    <h1>{{ message }}</h1>

    <div class="body">
      <div v-for="timeSlot in timeSlots" class="mid" v-if="(currentTimeSlot === timeSlot)">
        <p>{{timeSlot.actor.first_name}}</p>
        <p>Sort: {{timeSlot.sort}}</p>
      </div>
      <div class="nav">
        <div class="left"><button v-on:click="next()">Next</button></div>
        <div class="up"><button v-on:click="sort(currentTimeSlot, 1)">Starred</button></div>
        <div class="right"><button v-on:click="sort(currentTimeSlot, 0)">Callback</button></div>
        <div class="right"><button v-on:click="sort(currentTimeSlot, 'none')">X</button></div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
        message: "L I V E",
        timeSlots: [],
        currentTimeSlot: {},
        index: 0,
        loading: false
      };
    },
    created: function() {
      this.loading = true;
      axios.get("/api/auditions/" + this.$route.params.id).then(response => {
        this.timeSlots = response.data.time_slots.filter(ts => ts.actor);
        this.currentTimeSlot = this.timeSlots[0]
        this.loading = false;
      });
    },
    methods: {
      next: function() {
        if (this.index < this.timeSlots.length - 1) {
          this.index++;
        }
        else {
          this.index = 0;
        }
        this.currentTimeSlot = this.timeSlots[this.index];
      },
      sort: function(timeSlot, num) {
        var params = {sort: num};
        axios.patch("/api/time_slots/" + timeSlot.id, params)
          .then(response => {
            console.log(response.data);
            timeSlot.sort = response.data.sort
            });
        this.next();
      }
    }
  };
</script>