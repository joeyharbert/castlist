<template>
  <div class="content-outer" v-if="!loading">

      <div id="page-content" class="row page">

         <div id="primary" class="eight columns">

            <div class="ten columns centered text-center" v-if="message">
                <h1>Unauthorized<span>.</span></h1>
                <p>{{ message }}</p>
           </div>

            <section v-if="!message">

              <h1>Editing {{ audition.name }}</h1>

              <p class="lead">Update audition information</p>

              <p>The show must go on...</p>

              <div id="contact-form">

                  <!-- form -->
                  <form name="contactForm" id="contactForm" method="post" action="" v-on:submit.prevent="updateAudition(audition)">
                <fieldset>

                        <div><span>
                         <label for="contactSubject">Audition Name</label>
                         <input name="contactSubject" type="text" id="contactSubject" size="35" value="" v-model="audition.name"/>
                        </span></div>

                        <div class="half"><span>
                          <label for="company"> Company <span class="required">*</span></label>
                          <select name="company" v-model="audition.company.id">
                            <option v-for="company in companies" v-if="company.name !== audition.company.name" :value="company.id">{{ company.name }}</option>
                            <option :value="audition.company.id" selected="true">{{ audition.company.name }}</option>
                          </select>
                        </span></div>

                        <div class="half pull-right"><span>
                          <label for="show"> Show <span class="required">*</span></label>
                            <select name="show" v-model="audition.show.id">
                              <option v-for="show in shows" v-if="show.name !== audition.show.name" :value="show.id">{{ show.name }}</option>
                              <option :value="audition.show.id" selected="true">{{ audition.show.name }}</option>
                            </select>
                        </span></div>

                        <div class="half"><span>
                          <label for="start"> Start Time: <span class="required">*</span></label>
                          <datetime name="start" type="datetime" v-model="startTime" :auto="true"></datetime>
                        </span></div>

                        <div class="half pull-right"><span>
                          <label for="end"> End Time: <span class="required">*</span></label>
                          <datetime name="end" type="datetime" v-model="endTime" :auto="true"></datetime>
                        </span></div>

                        <div><span>
                           <label  for="contactMessage">Requirements <span class="required">*</span></label>
                           <textarea name="contactMessage"  id="contactMessage" rows="15" cols="50" v-model="audition.requirements"></textarea>
                        </span></div>

                        <div><span>
                           <button class="submit">Update</button>
                           <span id="image-loader">
                              <img src="images/loader.gif" alt="" />
                           </span>
                        </span></div>

                </fieldset>
              </form> <!-- Form End -->

                  <!-- contact-warning -->
                  <div v-if="errors.length > 0" id="message-warning">
                    Please fix the following errors:
                    <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                  </div>
                  <!-- contact-success --> 

               </div>

            </section> <!-- section end -->

         </div> 
       </div>



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
      loading: false,
      startTime: "",
      endTime: "",
      message: ""
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
        if(response.data.directors[0].phone) {
        this.audition = response.data;
        this.audition.start_time = new Date(this.audition.start_time);
        this.audition.end_time = new Date(this.audition.end_time);
        this.startTime = this.audition.start_time.toJSON()
        this.endTime = this.audition.end_time.toJSON();

        axios.get("/api/shows/").then(response => {
        this.shows = response.data;
        });
        axios.get("/api/companies/").then(response => {
          this.companies = response.data;
        });
      } else {
          this.message = "Please log into the proper director account to see this data."
        }
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