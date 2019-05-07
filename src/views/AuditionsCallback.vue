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

           <a :href="'/auditions/' + this.$route.params.id" class="title-heading">{{title}}</a>

           <p class="lead add-bottom">{{show}}
           </p>

           <div>
            <a class="more-link" :href="'/auditions/' + this.$route.params.id + '/live'"><i class="fa fa-arrow-circle-o-left"></i> Live View</a>
          </div>

        </div>

     </div>

     <div class="row">
      <div class="pull-right">
        <label for="sort">Sort</label>
        <select name="sort" @change="sort">
          <option selected="true" value="0">Called Back</option>
          <option value="1">Starred</option>
          <!-- <option value="2">Cast</option> -->
          <option value="none">None</option>
          <option value="all">All</option>
        </select>
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

            <div class="three columns">
               <h3 class="half-bottom">Sort</h3>
            </div>
            <hr>
         </div>

         <div class="row" v-for="timeSlot in sortedSlots">
          <div class="three columns">
               <p>{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</p>
            </div>

            <div class="six columns">
               <div>Phone: {{ timeSlot.actor.phone }}</div>
               <div>Email: {{ timeSlot.actor.email }}</div>
               <div>Union Status: {{ timeSlot.actor.union_status }}</div>
            </div>
            <div class="three columns">
               <p>{{ timeSlot.sort }}</p>
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
        timeSlots: [],
        sortedSlots: []
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
            this.timeSlots = response.data.time_slots.filter(ts => ts.actor);
            this.loading = false;

            this.sortedSlots = this.timeSlots.filter(ts => ts.sort === "callback");
          });
      });
    },
    methods: {
      sort: function(e) {
        var value = e.target.value;

        if(value === "0") {
          //callback
          this.sortedSlots = this.timeSlots.filter(ts => ts.sort === "callback");
        } else if(value === "1") {
          //starred
          this.sortedSlots = this.timeSlots.filter(ts => ts.sort === "starred");
        } else if(value === "2") {
          //cast
          this.sortedSlots = this.timeSlots.filter(ts => ts.sort === "cast");
        } else if(value === "none") {
          //no sort
          this.sortedSlots = this.timeSlots.filter(ts => ts.sort === null);
        } else if(value === "all") {
          //all timeslots
          this.sortedSlots = this.timeSlots;
        }
      }
    }
  };
</script>