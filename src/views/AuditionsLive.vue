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

      <div id="page-content">

         <div class="row add-bottom">

            <div class="eight columns" style="padding-top: 24px;" v-for="timeSlot in timeSlots" v-if="(currentTimeSlot === timeSlot)">

               <h1 class="title-heading">{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</h1>

               <p class="lead add-bottom">Sort: {{timeSlot.sort}}
               </p>

            <hr>

            </div>

         </div> <!-- Row End-->

         <nav class="pagination add-bottom">
          <a class="page-numbers prev" v-on:click="sort(currentTimeSlot, 1)">Starred</a>
          <a href="#" class="page-numbers next" v-on:click="sort(currentTimeSlot, 'none')">X</a>
          <a href="#" class="page-numbers next" v-on:click="sort(currentTimeSlot, 0)">Callback</a>
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
      };
    },
    created: function() {
      this.loading = true;
      axios.get("/api/auditions/" + this.$route.params.id).then(response => {
        this.title = response.data.name;
        this.show = response.data.show.name;
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