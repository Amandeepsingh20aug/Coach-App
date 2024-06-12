<template>
  <Header/>
 <router-view></router-view>
</template>

<script>
import Header from './components/layout/TheHeader.vue'
export default {
  components : {
    Header
  },
  
  created () {
    this.$store.dispatch('coaches/autoLogin')
  },
  computed : {
    didAutoLogout () {
     return this.$store.getters['coaches/AutoLogout']
    }
  },
  watch: {
    didAutoLogout (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.$router.replace('/coaches');
      }
    }
  }
}
</script>

<style>
 @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>