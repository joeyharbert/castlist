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
                      <span id="req">Requirements:</span>
                      {{audition.requirements}}
                      <hr>
                     Directing team:
                    <div v-for="director in audition.directors"> 
                      <span>{{ director.first_name }} {{ director.last_name }}</span>
                      <div v-if="isDirector && (currentDirector === director)">
                        <div><i>Phone number: {{ director.phone }}</i></div>
                        <div><i>Email: {{ director.email }}</i></div>
                      </div>
                      <div><span v-if="(currentDirector !== director) && isDirector"><a v-on:click="toggleDirectorInfo(director)">More Info</a></span></div>
                    </div>

                  </div>

                  <ul class="portfolio-meta-list">
                   <li><span>Date: </span>{{ audition.start_time.toLocaleDateString()}}</li>
                   <li><span>Start Time: </span>{{correctTime(audition.start_time)}}</li>
                   <li><span>End Time: </span>{{ correctTime(audition.end_time) }}</li>
                   <li><a v-on:click="editAudition(audition)" v-if="isDirector">Edit Audition</a></li>
                   <li><a v-on:click="destroyAudition(audition)" v-if="isDirector">Delete Audition</a></li>
                   <li><a v-on:click="callback(audition)" v-if="isDirector">Callback List</a></li>
                  </ul>

                  <a class="button" v-on:click="goLive(audition)" v-if="isDirector">Live View</a>


            </div> <!-- secondary End-->

             <div id="primary" class="eight columns">
                <section  id="journal">
                <div class="blog-entries">
                 <!-- Entry -->
                 <article class="row entry" v-for="timeSlot in timeSlots">

                    <div class="entry-header">

                       <div class="nine columns entry-title pull-right">
                          <h3 v-if="!timeSlot.actor">Open</h3>
                          <h3 v-if="timeSlot.actor">Filled by: {{ timeSlot.actor.first_name }} {{ timeSlot.actor.last_name }}</h3>
                          <div>
                              <a v-if="(timeSlot.actor && isDirector) && (currentTimeSlot === timeSlot)" v-on:click="timeSlotDestroy(timeSlot)">Delete Slot</a>
                          </div>
                       </div>

                       <div class="three columns post-meta end">
                          <time datetime="2014-01-31" class="post-date" pubdate="">{{ new Date(timeSlot.start_time).toLocaleDateString()}}</time>
                          <span class="dauthor">Start: {{ correctTime(new Date(timeSlot.start_time)) }}</span>
                          <span class="dauthor">End: {{ correctTime(new Date(timeSlot.end_time)) }}</span>
                       </div>

                    </div>

                    <div class="nine columns pull-right post-content">
                        <div class="actor-info" v-if="(timeSlot.actor && timeSlot.actor === currentActor) && (currentTimeSlot !== timeSlot) && isDirector">
                          <div>Phone: {{ timeSlot.actor.phone }}</div>
                          <div>Email: {{ timeSlot.actor.email }}</div>
                          <div>Union Status: {{ timeSlot.actor.union_status }}</div>
                          <div><a v-if="timeSlot.actor && isDirector" class="more-link pull-left" v-on:click="toggleTimeSlotEdit(timeSlot)">Edit Slot</a>
                          </div>
                        </div>
                        <div class="actor-edit" v-if="(currentTimeSlot === timeSlot) && isDirector">

                          <form v-on:submit.prevent="timeSlotUpdate(timeSlot, timeSlot.actor)">
                            <label for="actor">Actor</label>
                            <select name="actor" v-model="timeSlot.actor">
                              <option v-for="actor in actors" v-if="actor.id !== timeSlot.actor.id" :value="actor">{{actor.first_name}} {{actor.last_name}}</option>
                              <option :value="timeSlot.actor" selected="true">{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</option>
                            </select>
                            <div>
                                <label for="headshot">Headshot</label>
                                <input type="file" id="headshot"ref="headshot" @change="handleFile">
                                <div><small>Please make sure the headshot is cropped to 8x10.</small></div>
                              </div>
                            <div>
                              <a v-if="timeSlot.actor && isDirector" class="more-link pull-left"><button class="submit">Save Changes</button></a>
                            </div>
                          </form>
                          

                        </div>

                        <div v-if="!isDirector && (currentTimeSlot === timeSlot)">
                            <form>
                              <div>
                                <label for="headshot">Headshot</label>
                                <input type="file" id="headshot"ref="headshot" @change="handleFile">
                                <div><small>Please make sure your headshot is cropped to 8x10.</small></div>
                              </div>
                            </form>
                        </div>
                        <a v-if="(!timeSlot.actor && !isDirector) && currentTimeSlot !== timeSlot" class="more-link pull-right" v-on:click="toggleTimeSlotEdit(timeSlot)">Sign Up!<i class="fa fa-arrow-circle-o-right"></i></a>
                        <a v-if="timeSlot.actor && timeSlot.actor.id === currentUserID && currentTimeSlot !== timeSlot" class="more-link pull-left" v-on:click="toggleTimeSlotEdit(timeSlot)">Edit Slot</a>
                        <a v-if="!isDirector && currentTimeSlot === timeSlot" class="more-link pull-right" v-on:click="signUp(timeSlot)">Submit<i class="fa fa-arrow-circle-o-right"></i></a>
                        <a v-if="(timeSlot.actor && isDirector) && currentActor !== timeSlot.actor" class="more-link pull-right" v-on:click="toggleActorInfo(timeSlot.actor)">More Info<i class="fa fa-arrow-circle-o-right"></i></a>
                        <a v-if="(timeSlot.actor && isDirector) && currentActor === timeSlot.actor" class="more-link pull-right" v-on:click="toggleActorInfo(timeSlot.actor)">Less Info<i class="fa fa-arrow-circle-o-left"></i></a>
                    </div>

                 </article> <!-- Entry End -->

                </div> </section>

            </div>  <!-- primary end-->


         </section> <!-- end section -->

         <!-- <ul class="post-nav cf">
           <li class="prev"><a href="#" rel="prev"><strong>Previous Entry</strong> Duis Sed Odio Sit Amet Nibh Vulputate</a></li>
           <li class="next"><a href="#" rel="next"><strong>Next Entry</strong> Morbi Elit Consequat Ipsum</a></li>
         </ul> -->

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
      currentTimeSlot: {},
      actors: [],
      headshot: '',
      currentUserID: 0,
    };
  },
  created: function() {
    this.loading = true;
    axios.get("/api/auditions/" + this.$route.params.id).then(response => {
      this.audition = response.data;
      this.audition.start_time = new Date(this.audition.start_time);
      this.audition.end_time = new Date(this.audition.end_time);
      this.timeSlots = this.audition.time_slots
      this.isDirector = !!(this.audition.directors[0].phone);
      axios.get("/api/users/").then(response => {
          this.actors = response.data.filter(user => user.type === "Actor")
          axios.get("/api/users/current").then(response => {
              this.currentUserID = response.data.id;
          });
          this.loading = false;
        });
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
    editAudition: function(audition) {
      this.$router.push("/auditions/" + audition.id + "/edit");
    },
    signUp: function(timeSlot) {
      var params = new FormData();
      params.append('headshot', this.headshot[0]);
      axios.patch("/api/time_slots/" + timeSlot.id, params,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
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
    handleFile: function(e) {
      this.headshot = e.target.files || e.dataTransfer.files;
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
        this.currentTimeSlot = {};
      } else {
        this.currentActor = actor;
      }
    },
    toggleTimeSlotEdit: function(timeSlot) {
      if(timeSlot === this.currentTimeSlot) {
        this.currentTimeSlot = {};
      } else {
        this.currentTimeSlot = timeSlot;
      }
    },
    timeSlotUpdate: function(timeSlot, actor) {
      var params = new FormData();
      if(this.headshot !== '') {params.append('headshot', this.headshot[0]);}
      params.append('actor_id', actor.id);
      axios.patch("/api/time_slots/" + timeSlot.id, params)
      .then(response => {
        console.log(response.data);
        var index = this.timeSlots.indexOf(timeSlot);
        var newTimeSlot = response.data;
        this.timeSlots.splice(index, 1, newTimeSlot); //replace old ts with new one
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
      this.toggleTimeSlotEdit(timeSlot);
    },
    timeSlotDestroy: function(timeSlot) {
      axios.delete("/api/time_slots/" + timeSlot.id)
      .then(response => {
        console.log(response.data);
        var index = this.timeSlots.indexOf(timeSlot);
        this.timeSlots.splice(index, 1); //replace old ts with new one
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    callback: function(audition) {
      this.$router.push("/auditions/" + audition.id + "/callback");
    },
    correctTime: function(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var pm = hours > 12 ? true : false;
      if(pm) {hours -= 12}
      return hours.toString() + ":" + minutes.toString() + (pm ? " PM" : " AM");
    }
  }
};
</script>