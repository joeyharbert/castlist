<template>
  <div class="root" v-if="!loading">
    <h2>Editing {{ audition.name }}:</h2>
    <div v-if="errors.length > 0">
      Please fix the following errors:
      <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
    </div>
    <form v-on:submit.prevent="updateAudition(audition)">
      <p>Name:<input type="text" v-model="audition.name"></p>
      <p>Requirements:<input type="text" v-model="audition.requirements"></p>
      <div class="form-group">
          <label for="company">Company: </label>
            <select name="company" v-model="audition.company.id">
              <option v-for="company in companies" v-if="company.name !== audition.company.name" :value="company.id">{{ company.name }}</option>
              <option :value="audition.company.id" selected="true">{{ audition.company.name }}</option>
            </select>
      </div>
      <div class="form-group">
          <label for="show">Show: </label>
            <select name="show" v-model="audition.show.id">
              <option v-for="show in shows" v-if="show.name !== audition.show.name" :value="show.id">{{ show.name }}</option>
              <option :value="audition.show.id" selected="true">{{ audition.show.name }}</option>
            </select>
      </div>
      <p>Start Time:<datetime type="datetime" v-model="audition.start_time" :auto="true"></datetime></p>
      <p>End Time:<datetime type="datetime" v-model="audition.end_time" :auto="true"></datetime></p>
      <input type="submit" value="Submit Changes">
    </form>
  </div>
</template>

<script>
  import axios from "axios"

export default {
  data: function() {
    return {
      audition: {},
      companies: [],
      shows: [],
      errors: [],
      loading: false
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
      this.audition = response.data;
      axios.get("/api/shows/").then(response => {
      this.shows = response.data;
      });
      axios.get("/api/companies/").then(response => {
        this.companies = response.data;
      });
      this.loading = false;
    });
  },
  methods: {
    updateAudition: function(audition) {
      var params = {
        name: audition.name,
        requirements: audition.requirements,
        company_id: audition.company.id,
        show_id: audition.show.id,
        start_time: audition.start_time,
        end_time: audition.end_time
      }

      axios.patch("/api/auditions/" + audition.id, params)
      .then(response => {
        console.log(response.data);
        this.$router.push("/auditions/" + audition.id);
        })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>