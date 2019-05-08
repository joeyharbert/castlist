<template>
  <div class="home" v-if="!loading">

    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ title }}<span>.</span></h1>

            <p>{{ show }} </p>
         </div>
         <div>
            <a class="more-link" :href="'/auditions/' + this.$route.params.id"><i class="fa fa-arrow-circle-o-left"></i> Back</a>
          </div>
      </div>

   </div>

      <div class="content-outer">

       <div class="ten columns centered text-center" v-if="message">
            <h1>Unauthorized<span>.</span></h1>
            <p>{{ message }}</p>
       </div>

        <div class="ten columns centered text-center" v-if="(timeSlots.length <= 0) && !message">
            <h1>No Actors<span>.</span></h1>

            <p>Please return when more time slots are filled. </p>
            <div>Or check out the: <button @click="callbackList()">Callback List</button></div>
        </div>

      <div id="page-content" class="live" v-if="timeSlots.length > 0">

        <!-- Background placeholder images to make space -->
         <div class="row add-bottom">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500">
          <img src="http://probablyprogramming.com/wp-content/uploads/2009/03/tinytrans.gif" width="500"> 
          <!--  -->
          <vue-swing
            @throwout="onThrowout"
            :config="config"
            ref="vueswing"
          >
            <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated rollOut">
              <div class="tag" id="callback" v-if="callback" :key="callback">
                  <div>Callback</div>
              </div>
              <div class="tag" id="starred" v-if="starred" :key="starred">
                  <div>Starred</div>
              </div>
              <div class="tag" id="no" v-if="no" :key="no">
                  <div>No</div>
              </div>
            </transition-group>
            <div class="card" style="padding-top: 24px;" v-for="timeSlot in timeSlots" :id="timeSlot.id">

               <img :src="timeSlot.headshot.url">               
               <h1 class="title-heading">{{timeSlot.actor.first_name}} {{timeSlot.actor.last_name}}</h1>

<!--                <p class="lead add-bottom">Sort: {{timeSlot.sort}}
               </p> -->

            </div>
          </vue-swing>
         </div> <!-- Row End-->
         <div class="row">
          <div v-for="note in notebook">
            <div class="three-columns"><h6>{{note.director.first_name}} {{note.director.last_name}}</h6></div>
            <div class="six-columns">{{note.content}}</div>
            <hr style="display: none;">
          </div>
         </div>

         <nav class="pagination add-bottom">
          <a class="page-numbers prev" v-on:click="swing('UP')">Starred</a>
          <a class="page-numbers next" v-on:click="swing('LEFT')">X</a>
          <a class="page-numbers next" v-on:click="swing('RIGHT')">Callback</a>
          <a class="page-numbers next" v-on:click="next()">Next</a>
          <div>Swipe right to callback the actor, up to star them for future productions, and left to skip. Or, if you're not ready to make a call, click next.</div>
          <div>Write any notes you may have below. <b>Press Enter to send</b></div>
          <textarea class="live-textarea" v-model="note"></textarea>
          <div><button @click="callbackList()">Callback List</button></div>
         </nav>
       </div>
     </div>
  </div>
</template>

<style>
</style>

<script>
  import axios from "axios"
  import VueSwing from 'vue-swing'
  export default {
    data: function() {
      return {
        message: "",
        timeSlots: [],
        currentTimeSlot: {},
        index: 0,
        loading: false,
        title: "",
        show: "",
        config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
          ],
          minThrowOutDistance: 250,
          maxThrowOutDistance: 300
        },
        auditionId: "",
        notebook: [],
        note: "",
        callback: false,
        starred: false,
        no: false
      };
    },
    created: function() {
      this.loading = true;
      window.addEventListener('keyup', this.keypress);
      axios.get("/api/auditions/" + this.$route.params.id).then(response => { 
        if(response.data.directors[0].phone) {
          this.title = response.data.name;
          this.show = response.data.show.name;
          this.auditionId = response.data.id;
          this.timeSlots = response.data.time_slots.filter(ts => ts.actor).reverse();
          this.currentTimeSlot = this.timeSlots[this.timeSlots.length - 1];
          if(this.currentTimeSlot) {this.notebook = this.currentTimeSlot.notes;} 
        } else {
          this.title = response.data.name;
          this.show = response.data.show.name;
          this.auditionId = response.data.id;
          this.message = "Please log into the proper director account to see this data."
        }
        this.loading = false;
      });
    },
    methods: {
      next: function() {
        this.timeSlots.pop();
        this.currentTimeSlot = this.timeSlots[this.timeSlots.length - 1];
        this.notebook = this.currentTimeSlot.notes;
        this.callback = false;
        this.starred = false;
        this.no = false;
      },
      sort: function(timeSlot, num) {
        var params = {sort: num};
        axios.patch("/api/time_slots/" + timeSlot.id, params)
          .then(response => {
            console.log(response.data);
            });
      },
      keypress: function(e) {
        if(e.key == "ArrowUp") {
          this.swing('UP');
        } else if(e.key == "ArrowRight") {
          this.swing('RIGHT');
        } else if(e.key == "ArrowLeft") {
          this.swing('LEFT');
        } else if(e.key == "Enter") {
          this.addNote();
        }
      },
      swing (direction) {
        const timeSlots = this.$refs.vueswing.cards
        const directions = {UP: [0, -50], DOWN: [0, 50], RIGHT: [50, 0], LEFT: [-50, 0]}
        timeSlots[timeSlots.length - 1].throwOut(
          directions[direction][0],
          directions[direction][1]
        )
      },
      onThrowout ({ target, throwDirection }) {
        console.log(`Threw ${target.textContent} ${throwDirection.description}!`)
        var index = this.timeSlots.findIndex(x => x.id === parseInt(target.id));
        var timeSlot = this.timeSlots.find(x => x.id === parseInt(target.id));
        if (throwDirection.description === 'RIGHT') {
          this.sort(timeSlot, 0); //0 === callback
          this.callback = true;
        } else if (throwDirection.description === 'UP') {
          this.sort(timeSlot, 1); //1 === starred
          this.starred = true;
        } else if (throwDirection.description === 'LEFT') {
          this.sort(timeSlot, 'none');
          this.no = true;
        }

        setTimeout(() => this.next(), 450);
      },
      callbackList: function() {
        this.$router.push("/auditions/" + this.auditionId + "/callback");
      },
      addNote: function() {
        var params = {notes: [this.note]}

        axios.patch("/api/time_slots/" + this.currentTimeSlot.id, params)
          .then(response => {
            console.log(response.data);
            this.notebook = response.data.notes
          });

        this.note = "";
      }
    }
  };
</script>