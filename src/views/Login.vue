<template>
  <div class="login">


    <div class="content-outer">

      <div id="page-content" class="row page">

         <div id="primary" class="eight columns">

            <section>

              <h1>Login</h1>

                <div v-if="errors.length > 0">
                    Please fix the following errors:
                    <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                </div>
              <div id="contact-form">

                  <!-- form -->
                  <form name="contactForm" id="contactForm" method="post" action="" v-on:submit.prevent="submit()">
                <fieldset>

                        <div class="half"><span>
                     <label for="contactName">Email</label>
                     <input name="contactName" type="email" class="form-control" v-model="email" size="35" value="" />
                        </span></div>

                        <div class="half pull-right"><span>
                     <label for="contactEmail">Password</label>
                     <input name="contactEmail" type="password" class="form-control" v-model="password" size="35" value="" />
                        </span></div>
                        <input type="submit" class="btn btn-primary" value="Submit">
                </fieldset>
              </form> <!-- Form End -->

               </div>

            </section> <!-- section end -->
          </div>
         </div>
       </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>