<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$parent.isLoggedIn = false;
    this.$parent.isDirector = false;
    this.$router.push("/");
  }
};
</script>