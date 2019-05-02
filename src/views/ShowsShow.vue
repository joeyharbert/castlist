<template>
  <div class="home">
    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ show.name }}<span>.</span></h1>

            <p>{{show.description}}</p>
            <p><a v-if="isDirector" v-on:click="destroyShow()">Delete Show</a></p>
         </div>

      </div>

   </div>

   <section id="journal">

      <div class="blog-entries">

         <!-- Entry -->
         <article class="row entry" v-for="role in show.roles">

            <div class="entry-header">

               <div class="ten columns entry-title pull-right">
                  <h3><a>{{ role.name }}</a></h3>
               </div>

               <div class="two columns post-meta end">
                  <p>
                  <span class="dauthor">Voice Part</span>
                  <span class="dauthor">Age Range</span>
                  </p>
               </div>

            </div>

            <div class="ten columns offset-2 post-content">
               <p>{{ role.description }}</p>
            </div>

         </article> <!-- Entry End -->

      </div> <!-- Entries End -->

   </section>
    
  </div>
</template>

<style>
</style>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
        show: {},
        isDirector: false,
        loading: false
      };
    },
    created: function() {
      axios.get("/api/shows/" + this.$route.params.id).then(response => {
      this.show = response.data;
      axios.get("/api/users/current").then(response => {
        if(response.data.type === "Director") {
          this.isDirector = true;
        }
      });
    });
    },
    methods: {
      destroyShow: function() {
        axios.delete("/api/shows/" + this.$route.params.id).then(response => {
          this.$router.push("/shows/");
        });
      }
    }
  };
</script>