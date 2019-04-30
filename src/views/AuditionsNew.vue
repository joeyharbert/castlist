<template>
  <div class="content-outer" v-if="!loading">
    <div id="page-title">

        <div class="row">

           <div class="ten columns centered text-center">
              <h1>Create<span>.</span></h1>

              <p>A bit of the fire that lit up the stars.</p>
           </div>

        </div>

     </div>

      <div id="page-content" class="row page">

         <div id="primary" class="eight columns">

            <section>

              <h1>Create an Audition Day</h1>

              <p class="lead">Use this space to create your audition.</p>

              <p>Make sure you fill out all the information. Break Legs!</p>

              <div id="contact-form">

                  <!-- form -->
                  <form name="contactForm" id="contactForm" method="post" action="" v-on:submit.prevent="makeNewAudition()">
                <fieldset>

                        <div><span>
                         <label for="contactSubject">Audition Name</label>
                         <input name="contactSubject" type="text" id="contactSubject" size="35" value="" v-model="newName"/>
                        </span></div>

                        <div><span>
                           <label for="contactName"> Time Slot Length <span class="required">*</span></label>
                           <input name="contactName" type="text" id="contactName" size="35" value="" v-model="newTimeSlotLength"/>
                        </span></div>

                        <div class="half"><span>
                          <label for="company"> Company <span class="required">*</span></label>
                          <select name="company" v-model="newCompany">
                            <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
                          </select>
                        </span></div>

                        <div class="half pull-right"><span>
                          <label for="show"> Show <span class="required">*</span></label>
                            <select name="show" v-model="newShow">
                              <option v-for="show in shows" :value="show.id">{{ show.name }}</option>
                            </select>
                        </span></div>

                        <div class="half"><span>
                          <label for="start"> Start Time: <span class="required">*</span></label>
                          <datetime name="start" type="datetime" v-model="newStartTime" :auto="true"></datetime>
                        </span></div>

                        <div class="half pull-right"><span>
                          <label for="end"> End Time: <span class="required">*</span></label>
                          <datetime name="end" type="datetime" v-model="newEndTime" :auto="true"></datetime>
                        </span></div>

                        <div><span>
                           <label  for="contactMessage">Requirements <span class="required">*</span></label>
                           <textarea name="contactMessage"  id="contactMessage" rows="15" cols="50" v-model="newRequirements"></textarea>
                        </span></div>

                        <div><span>
                           <button class="submit">Create Audition</button>
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
              <div id="message-success">
                     <i class="icon-ok"></i>Your message was sent, thank you!<br />
              </div>

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