<template>
  <div class="home" v-if="isDirector">
    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ message }}<span>.</span></h1>

            <p>God, I hope I get it.</p>
         </div>

      </div>
    </div>

    <div class="content-outer">

      <div class="row add-bottom">

        <div class="twelve columns" style="padding-top: 24px;">

           <h1 class="title-heading">{{title}}</h1>

           <p class="lead add-bottom">{{show}}
           </p>

        </div>

     </div>

      <div id="page-content">

        <div class="row">

            <div class="three columns">
               <h3 class="half-bottom">Name</h3>
            </div>

            <div class="six columns">
               <h3 class="half-bottom">Info</h3>
            </div>
            <hr>
         </div>

         <div class="row" v-for="timeSlot in timeSlots">
          <div class="three columns">
               <p>{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</p>
            </div>

            <div class="six columns">
               <div>Phone: {{ timeSlot.actor.phone }}</div>
               <div>Email: {{ timeSlot.actor.email }}</div>
               <div>Union Status: {{ timeSlot.actor.union_status }}</div>
            </div>

            <hr>
         </div>

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
        message: "Callbacks",
        isDirector: false,
        loading: false,
        title: "",
        show: "",
        timeSlots: []
      };
    },
    created: function() {
      this.loading = true;
      axios.get("/api/users/current").then(response => {
        if(response.data.type === "Director") {
          this.isDirector = true;
        }
        axios.get("/api/auditions/" + this.$route.params.id).then(response => {
            this.title = response.data.name;
            this.show = response.data.show.name;
            this.timeSlots = response.data.time_slots.filter(ts => ts.sort === "callback");
            console.log(this.timeSlots);
            this.loading = false;
          });
      });
    },
    methods: {}
  };
</script>