<template>
  <div class="root" v-if="!loading">
    <h2>Make New Audition Day:</h2>
    <div v-if="errors.length > 0">
      Please fix the following errors:
      <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <form v-on:submit.prevent="makeNewAudition()">
      <p>Name:<input type="text" v-model="newName"></p>
      <p>Requirements:<input type="text" v-model="newRequirements"></p>
      <p>Time Slot Length:<input type="text" v-model="newTimeSlotLength"></p>
      <div class="form-group">
          <label for="company">Company: </label>
            <select name="company" v-model="newCompany">
              <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
            </select>
      </div>
      <div class="form-group">
          <label for="show">Show: </label>
            <select name="show" v-model="newShow">
              <option v-for="show in shows" :value="show.id">{{ show.name }}</option>
            </select>
      </div>
      <p>Start Time:<datetime type="datetime" v-model="newStartTime"></datetime :auto="true"></p>
      <p>End Time:<datetime type="datetime" v-model="newEndTime"></datetime :auto="true"></p>
      <input type="submit" value="Create">
    </form>
  </div>
</template>

<script>
  import axios from "axios"

export default {
  data: function() {
    return {
      newName: "",
      newRequirements: "",
      newTimeSlotLength: "",
      newStartTime: "",
      newEndTime: "",
      newCompany: "",
      newShow: "",
      companies: [],
      shows: [],
      errors: [],
      loading: false
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/shows/").then(response => {
      this.shows = response.data;
    })
    axios.get("/api/companies/").then(response => {
      this.companies = response.data;
    })
    this.loading = false;
  },
  methods: {
    makeNewAudition: function() {
      var params = {
        name: this.newName,
        requirements: this.newRequirements,
        time_slot_length: this.newTimeSlotLength,
        company_id: this.newCompany,
        show_id: this.newShow,
        start_time: this.newStartTime,
        end_time: this.newEndTime
      }

      axios.post("/api/auditions", params)
      .then(response => {
        console.log(response.data);
        var audition = response.data;
        this.$router.push("/auditions/" + audition.id);
        })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>