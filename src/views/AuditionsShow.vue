<template>
  <div class="home" v-if="!loading">
    <h1>{{ audition.name }}</h1>
    <div class="container">
      <p>Show: {{ audition.show.name }}</p>
      <p>Company: {{ audition.company.name }}</p>
      <p>Audition Date: {{ audition.time_slots[0].start_time.substring(0, 10)}}</p>
      <p>
        <div>
          Directing team:
          <div v-for="director in audition.directors"> 
            <p>{{ director.first_name }} {{ director.last_name }}</p>
            <div v-if="director.phone">
            <p>Phone number: {{ director.phone }}</p>
            <p>Email: {{ director.email }}</p>
            </div>
          </div>
        </div>
      </p>
      <p>Requirements: {{ audition.requirements }}</p> <hr>

      <div class="timeSlots" v-for="timeSlot in audition.time_slots">
        <p>Start: {{ timeSlot.start_time.substring(11, 16) }}</p>
        <p>End: {{ timeSlot.end_time.substring(11, 16) }}</p>
        <p v-if="timeSlot.actor">Filled by: {{ timeSlot.actor.first_name }} {{ timeSlot.actor.last_name }} </p>
        <p v-if="!timeSlot.actor"> Open </p>
        <hr>
      </div>

      <div v-if="audition.directors[0].phone">
        <button v-on:click="destroyAudition(audition)">Delete Audition</button>
        <button v-on:click="goLive(audition)">Go to Live View</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      audition: {},
      loading: false
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
      this.audition = response.data;
      this.loading = false;
    });
  },
  methods: {
    destroyAudition: function(audition) {
      axios.delete("/api/auditions/" + this.$route.params.id)
           .then(response => {
            console.log(response.data);
            this.$router.push("/auditions/");
           })
           .catch(error => {
              this.errors = error.response.data.errors;
            });
    },
    goLive: function(audition) {
      var params = {active: true};
      axios.patch("/api/auditions/" + audition.id, params)
      .then(response => {
        console.log(response.data);
        })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
      this.$router.push("/auditions/" + audition.id + "/live");
    }
  }
};
</script>