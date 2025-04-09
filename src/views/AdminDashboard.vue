
<template>



    <div class="flex mt-16 pl-2">
      <!-- Side Navigation -->
      <nav class="w-52 h-[900px] bg-gray-400 rounded-sm text-white p-4">
        <div class="block pr-4 text-white">
          <h1 class="font-semibold text-black">Menu</h1>
        </div>
        <ul class="space-y-4 mt-5">
           <li><router-link to="/admin/admin-profile">Admin Profile</router-link></li>
           <li><router-link to="/admin/events">Events</router-link></li>
          <li><router-link to="/admin/bookings">Bookings</router-link></li>

          <li><a href="#" class="hover:text-gray-300">Contact</a></li>
        </ul>
      </nav>

      <!-- Main Content -->
      <div class="flex-1 p-6">
        <router-view></router-view>
      </div>
    </div>



</template>

<script setup>

import {onMounted, ref} from "vue";

const loginUser = ref(null);
const apiUrl = 'http://127.0.0.1:8000/';
onMounted(async()=>{
  const user  =  localStorage.getItem("user");
  loginUser.value = JSON.parse(user)

})


</script>