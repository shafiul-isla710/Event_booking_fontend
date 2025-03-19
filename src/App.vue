<script setup>

import Navber from './views/Navber.vue'
import HomePage from './views/HomePage.vue'
import Footer from './views/Footer.vue'
import {RouterView} from "vue-router";


</script>


<template>

  <Navber></Navber>

     <main>
       <router-view></router-view>
     </main>

  <Footer></Footer>

</template>

<style scoped>

</style>