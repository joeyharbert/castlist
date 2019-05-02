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

              <h1>Create a Show.</h1>

              <p class="lead">Add to our library.</p>

              <p>Make sure you fill out all the information.</p>

              <div id="contact-form">

                  <!-- form -->
                  <form name="contactForm" id="contactForm" method="post" action="" v-on:submit.prevent="makeNewShow()">
                <fieldset>

                        <div><span>
                         <label for="contactSubject">Show Name</label>
                         <input name="contactSubject" type="text" id="contactSubject" size="35" value="" v-model="newName"/>
                        </span></div>

                        <div><span>
                           <label  for="contactMessage">Show Description</label>
                           <textarea name="contactMessage"  id="contactMessage" rows="15" cols="50" v-model="newDescription"></textarea>
                        </span></div>

                        <div v-for="role in newRoles">
                          <div class="half"><span>
                             <label for="contactName"> Role Name:</label>
                             <input name="contactName" type="text" id="contactName" size="35" value="" v-model="role.name"/>
                          </span></div>

                          <div class="half pull-right"><span>
                             <label for="contactName"> Description:</label>
                             <input name="contactName" type="text" id="contactName" size="35" value="" v-model="role.description"/>
                          </span></div>
                        </div>
                        <div class="half pull-right">
                            <nav class="pagination add-bottom pull-right">
                              <a v-on:click="addRole()" class="page-numbers">+</a>
                              <a v-on:click="removeRole()" class="page-numbers">-</a>
                            </nav>
                        </div>


                        <div><span>
                           <button class="submit">Create Show</button>
                           <span id="image-loader">
                              <img src="images/loader.gif" alt="" />
                           </span>
                        </span></div>

                </fieldset>
              </form> <!-- Form End -->

                  <!-- contact-warning -->
                  <div v-if="errors.length > 0">
                    Please fix the following errors:
                    <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
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
      newDescription: "",
      newRoles: [{
        name: "",
        description: ""
      }],
      loading: false,
      errors: []
    };
  },
  created: function() {
  },
  methods: {
    makeNewShow: function() {
      var params = {
        name: this.newName,
        description: this.newDescription,
        roles: this.newRoles,
      }
      axios.post("/api/shows", params)
      .then(response => {
        console.log(response.data);
        var show = response.data;
        this.$router.push("/shows/" + show.id);
        })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    addRole: function() {
      this.newRoles.push({
        name: "",
        description: ""
      });
    },
    removeRole: function() {
      this.newRoles.pop();
    }
  }
};
</script>