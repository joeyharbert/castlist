<template>
  <div class="home" v-if="!loading">
    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ audition.name }}<span>.</span></h1>

            <p>{{ audition.company.name }}</p>
         </div>

      </div>

    </div>

       <!-- Content
   ================================================== -->
   <div class="content-outer">

      <div id="page-content" class="row portfolio">

         <section class="entry cf">

            <div id="secondary"  class="four columns entry-details">

                  <h1>{{ audition.show.name }}</h1>

                  <div class="entry-description">

                     Directing team:
                    <div v-for="director in audition.directors"> 
                      <span>{{ director.first_name }} {{ director.last_name }}</span>
                      <div v-if="isDirector && (currentDirector === director)">
                        <div><i>Phone number: {{ director.phone }}</i></div>
                        <div><i>Email: {{ director.email }}</i></div>
                      </div>
                      <div><span v-if="currentDirector !== director"><a v-on:click="toggleDirectorInfo(director)">More Info</a></span></div>
                    </div>

                  </div>

                  <ul class="portfolio-meta-list">
                   <li><span>Date: </span>{{ audition.start_time.substring(0, 10)}}</li>
                   <li><span>Start Time: </span>{{ audition.start_time.substring(10, 16)}}</li>
                   <li><span>End Time: </span>{{ audition.end_time.substring(10, 16) }}</li>
                   <li><a v-on:click="destroyAudition(audition)" v-if="isDirector">Delete Audition</a></li>
                  </ul>

                  <a class="button" v-on:click="goLive(audition)" v-if="isDirector">Live View</a>


            </div> <!-- secondary End-->

             <div id="primary" class="eight columns">
                <section  id="journal">
                <div class="blog-entries">
                 <!-- Entry -->
                 <article class="row entry" v-for="timeSlot in timeSlots">

                    <div class="entry-header">

                       <div class="ten columns entry-title pull-right">
                          <h3 v-if="!timeSlot.actor">Open</h3>
                          <h3 v-if="timeSlot.actor">Filled by: {{ timeSlot.actor.first_name }} {{ timeSlot.actor.last_name }}</h3>
                       </div>

                       <div class="two columns post-meta end">
                          <p>
                          <time datetime="2014-01-31" class="post-date" pubdate="">{{ timeSlot.start_time.substring(0, 10)}}</time>
                          <span class="dauthor">Start: {{ timeSlot.start_time.substring(10, 16) }}</span>
                          <span class="dauthor">End: {{ timeSlot.end_time.substring(10, 16) }}</span>
                          </p>
                       </div>

                    </div>

                    <div class="ten columns offset-2 post-content">
                       <p>
                        <div class="actor-info" v-if="timeSlot.actor && timeSlot.actor === currentActor">
                          <p>Phone: {{ timeSlot.actor.phone }}</p>
                          <p>Email: {{ timeSlot.actor.email }}</p>
                          <p>Union Status: {{ timeSlot.actor.union_status }}</p>
                        </div>
                        <a v-if="!timeSlot.actor" class="more-link" v-on:click="signUp(timeSlot)">Sign Up!<i class="fa fa-arrow-circle-o-right"></i></a>
                        <a v-if="timeSlot.actor && isDirector" class="more-link" v-on:click="toggleActorInfo(timeSlot.actor)">More Info<i class="fa fa-arrow-circle-o-right"></i></a>
                       </p>
                    </div>

                 </article> <!-- Entry End -->

                </div> </section>

            </div>  <!-- primary end-->


         </section> <!-- end section -->

         <ul class="post-nav cf">
           <li class="prev"><a href="#" rel="prev"><strong>Previous Entry</strong> Duis Sed Odio Sit Amet Nibh Vulputate</a></li>
           <li class="next"><a href="#" rel="next"><strong>Next Entry</strong> Morbi Elit Consequat Ipsum</a></li>
         </ul>

      </div>

   </div> <!-- content End-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      audition: {},
      timeSlots: [],
      loading: false,
      isDirector: false,
      currentDirector: {},
      currentActor: {},
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
      this.audition = response.data;
      this.timeSlots = this.audition.time_slots;
      this.isDirector = !!(this.audition.directors[0].phone);
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
    },
    signUp: function(timeSlot) {
      axios.patch("/api/time_slots/" + timeSlot.id)
      .then(response => {
        console.log(response);
        var index = this.timeSlots.indexOf(timeSlot);
        var newTimeSlot = response.data;
        this.timeSlots.splice(index, 1, newTimeSlot); //replace old ts with new one
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    toggleDirectorInfo: function(director) {
      if(director === this.currentDirector) {
        this.currentDirector = {};
      } else {
        this.currentDirector = director;
      }
    },
    toggleActorInfo: function(actor) {
      if(actor === this.currentActor) {
        this.currentActor = {};
      } else {
        this.currentActor = actor;
      }
    }
  }
};
</script>