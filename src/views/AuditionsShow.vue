<template>
  <div class="home">
    <h1>{{ audition.name }}</h1>
    <div class="container">
      <p>Show: {{ audition.show.name }}</p>
      <p>Company: {{ audition.company.name }}</p>
      <p>Audition Date: {{ audition.time_slots[0].start_time.substring(0, 10)}}</p>
      <p>Requirements: {{ audition.requirements }}</p> <hr>

      <div class="timeSlots" v-for="timeSlot in audition.time_slots">
        <p>Start: {{ timeSlot.start_time.substring(11, 16) }}</p>
        <p>End: {{ timeSlot.end_time.substring(11, 16) }}</p>
        <p v-if="timeSlot.actor">Filled by: {{ timeSlot.actor.first_name }} {{ timeSlot.actor.last_name }} </p>
        <p v-if="!timeSlot.actor"> Open </p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      audition: {}
    };
  },
  created: function() {
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
      this.audition = response.data;
    })
    console.log(this);
  },
  methods: {}
};
</script>