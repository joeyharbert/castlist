<template>
  <div class="signup">


   <!-- Page Title
   ================================================== -->
   <div id="page-title">

      <div class="row">

         <div class="ten columns centered text-center">
            <h1>Sign Up<span>.</span></h1>

            <p>Join us! Leave your fields to flower.</p>
         </div>

      </div>

   </div> <!-- Page Title End-->

   <!-- Content
   ================================================== -->
   <div class="content-outer">

      <div id="page-content" class="row page">

         <div id="primary" class="eight columns">

            <section>

              <h1>Sign up below</h1>

              <p class="lead">Break legs</p>

              <div id="contact-form">

                  <!-- form -->
                  <form name="contactForm" id="contactForm" method="post" action="" v-on:submit.prevent="submit()">
                <fieldset>

                        <div class="half">
                         <label for="firstName">First Name <span class="required">*</span></label>
                         <input name="firstName" type="text" id="contactName" size="35" value="" v-model="firstName"/>
                        </div>

                        <div class="half pull-right">
                         <label for="lastName">Last Name <span class="required">*</span></label>
                         <input name="lastName" type="text" id="contactEmail" size="35" value="" v-model="lastName"/>
                        </div>

                        <div class="half">
                         <label for="phone">Phone Number <span class="required">*</span></label>
                         <input name="phone" type="text" id="contactName" size="35" value="" v-model="phone"/>
                        </div>

                        <div class="half pull-right">
                         <label for="contactEmail">Email <span class="required">*</span></label>
                         <input name="contactEmail" type="text" id="contactEmail" size="35" value="" v-model="email"/>
                        </div>

                        <div class="half">
                         <label for="password">Password <span class="required">*</span></label>
                         <input name="password" type="password" id="contactName" size="35" value="" v-model="password"/>
                        </div>

                        <div class="half pull-right">
                         <label for="passwordConfirmation">Re-type Password: <span class="required">*</span></label>
                         <input name="passwordConfirmation" type="password" id="contactEmail" size="35" value="" v-model="passwordConfirmation"/>
                        </div>

                        <div class="half">
                          <div class="form-group">
                            <label for="user-type">User type </label>
                              <select name="user-type" v-model="type">
                                <option>Actor</option>
                                <option>Director</option>
                                <option>Proctor</option>
                              </select>
                          </div>
                        </div>

                        <div class="half pull-right">
                          <div class="form-group">
                            <label for="union-status">Union Status </label>
                              <select name="union-status" v-model="union">
                                <option value="0">Non-union</option>
                                <option value="1">EMC</option>
                                <option value="2">Equity</option>
                              </select>
                          </div>
                        </div>

                        <div>
                           <button class="submit">Submit</button>
                           <span id="image-loader">
                              <img src="images/loader.gif" alt="" />
                           </span>
                        </div>

                </fieldset>
              </form> <!-- Form End -->

                  <!-- contact-warning -->
                    <ul v-if="errors">
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>


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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phone: "",
      type: "",
      union: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        phone: this.phone,
        type: this.type,
        union_status: this.union,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>