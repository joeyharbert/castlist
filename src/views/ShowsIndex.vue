<template>
  <div class="home">
    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ message }}<span>.</span></h1>

            <p>All of the shows in our database. Feel free to add to the library.</p>
         </div>

      </div>

   </div>

    <section id="journal">

      <div class="blog-entries">

         <!-- Entry -->
         <article class="row entry" v-for="show in shows">

            <div class="entry-header">

               <div class="ten columns entry-title pull-right">
                  <h3><a :href="'/shows/' + show.id">{{ show.name }}</a></h3>
               </div>
            </div>
         </article> <!-- Entry End -->

      </div> <!-- Entries End -->

   </section> <!-- Journal Section End-->
  </div>
</template>

<style>
</style>

<script>
  import axios from "axios"

  export default {
    data: function() {
      return {
        message: "Show list",
        shows: []
      };
    },
    created: function() {
      axios.get("/api/shows").then(response=> {
        this.shows = response.data;
      });
    },
    methods: {}
  };
</script>