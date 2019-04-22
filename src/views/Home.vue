<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <div class="containter" v-for="audition in auditions">
      <h3>{{ audition.name }}</h3>
      <p>Show: {{ audition.show.name }}</p>
      <p>Company: {{ audition.company.name }}</p>
      <p>Audition Date: {{ audition.time_slots[0].start_time.substring(0, 10)}}</p>
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
        message: "Welcome to Castlist! Audition Index",
        auditions: []
      };
    },
    created: function() {
      axios.get("/api/auditions").then(response=> {
        this.auditions = response.data;
      });
    },
    methods: {}
  };
</script>