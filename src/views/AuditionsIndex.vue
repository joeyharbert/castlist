<template>
  <div class="home">
    <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>{{ message }}<span>.</span></h1>

            <p>Current Audition Postings.</p>
         </div>

      </div>

   </div>

    <section id="journal">

      <div class="blog-entries">

         <!-- Entry -->
         <article class="row entry" v-for="audition in auditions">

            <div class="entry-header">

               <div class="permalink">
                  <a :href="'/auditions/' + audition.id"><i class="fa fa-link"></i></a>
               </div>

               <div class="ten columns entry-title pull-right">
                  <h3><a :href="'/auditions/' + audition.id">{{ audition.name }}</a></h3>
               </div>

               <div class="two columns post-meta end">
                  <p>
                  <time datetime="2014-01-31" class="post-date" pubdate="">{{ audition.start_time.substring(0, 10)}}</time>
                  <span class="dauthor">{{ audition.company.name }}</span>
                  </p>
               </div>

            </div>

            <div class="ten columns offset-2 post-content">
               <p>{{ audition.show.name }}
               <a class="more-link" :href="'/auditions/' + audition.id">Read More<i class="fa fa-arrow-circle-o-right"></i></a></p>
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
        message: "Welcome to Castlist",
        auditions: []
      };
    },
    created: function() {
      axios.get("/api/auditions").then(response=> {
        this.auditions = response.data;
      });
    },
    methods: {}
  };
</script>