<template>
  <div id="app">
    <header>

        <div class="row">

           <div class="twelve columns">

              <div class="logo">
                <router-link to="/"><img alt="" src="images/logo.png"></router-link>
              </div>

              <nav id="nav-wrap">

                 <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>

                 <ul id="nav" class="nav">

                   <li><router-link to="/">Home</router-link></li>
                   <li><router-link to="/auditions">Auditions</router-link>
                       <ul v-if="isDirector">
                          <li><router-link to="/auditions/new">New Audition</router-link></li>
                       </ul>
                    </li>
                    <li><router-link to="/login">User</router-link>
                       <ul>
                          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                          <li v-if="isLoggedIn"><router-link to="/logout">Logout</router-link></li>
                          <li v-if="!isLoggedIn"><router-link to="/signup">Signup</router-link></li>
                       </ul>
                    </li>
                    <li><router-link to="/shows">Shows</router-link>
                      <ul v-if="isDirector">
                          <li><router-link to="/shows/new">New Show</router-link></li>
                       </ul>
                    </li>
                 </ul> <!-- end #nav -->

              </nav> <!-- end #nav-wrap -->

           </div>

        </div>

      </header>
    <router-view/>

    <footer>

      <div class="row">

         <div class="twelve columns">

            <ul class="footer-nav">
          <li class="current"><router-link to="/">Home</router-link></li>
                   <li><router-link to="/auditions">Auditions</router-link>
                    </li>
                    <li><router-link to="/shows">Shows</router-link></li>
                    <li v-if="!isLoggedIn"><router-link v-on:click="loggedInToggle()" to="/login">Login</router-link></li>
                    <li v-if="isLoggedIn" v-on:click="loggedInToggle()"><router-link to="/logout">Logout</router-link></li>
                    <li v-if="!isLoggedIn" v-on:click="loggedInToggle()"><router-link to="/signup">Signup</router-link></li>
         </ul>

            <ul class="footer-social">
               <li><a href="#"><i class="fa fa-facebook"></i></a></li>
               <li><a href="#"><i class="fa fa-twitter"></i></a></li>
               <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
               <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
               <li><a href="#"><i class="fa fa-skype"></i></a></li>
               <li><a href="#"><i class="fa fa-rss"></i></a></li>
            </ul>

            <ul class="copyright">
               <li>Copyright &copy; 2014 Sparrow</li>
               <li>Design by <a title="Styleshout" href="http://www.styleshout.com/">Styleshout</a></li>
            </ul>

         </div>

         <div id="go-top" style="display: block;"><a title="Back to Top" href="#">Go To Top</a></div>

      </div>

   </footer>
  </div>
</template>


<script>
  import axios from "axios"
  export default {
  data: function() {
    return {
      isLoggedIn: false,
      isDirector: false
    }; 
  },
  created: function() {
    this.isLoggedIn = !!localStorage.getItem("jwt");
    axios.get("/api/users/current").then(response => {
        if(response.data.type === "Director") {
          this.isDirector = true;
        }
    });
  },
  methods: {
    logInToggle: function() {
      this.isLoggedIn = !!localStorage.getItem("jwt");
    }
  }
};
</script>