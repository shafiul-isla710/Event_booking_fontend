
<template>

  <div class="bg-gray-100 min-h-screen flex items-center justify-center">

    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>

      <div class="mb-6" v-if="loginUser">
        <h3 class="text-lg font-semibold text-gray-700">Welcome, <span class="text-blue-600">{{ loginUser.name }}</span></h3>
        <p class="text-gray-600">Your Email: {{loginUser.email}}</p>

           <img class="w-28 h-28 rounded-md" v-if="loginUser && loginUser.profile_image" :src="`${apiUrl}${loginUser.profile_image}`" alt="">


      </div>

      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-700">Upcoming Events</h3>
        <ul class="mt-2 space-y-2">
          <li class="p-3 bg-blue-100 rounded-lg">Web Development Workshop - 20th March</li>
          <li class="p-3 bg-blue-100 rounded-lg">Laravel Conference - 25th March</li>
        </ul>
      </div>

      <div>
        <router-link to="booking-table" class="text-lg font-semibold text-gray-700">Your Bookings</router-link>
        <table class="w-full mt-2 border-collapse border border-gray-300">
          <thead>
          <tr class="bg-gray-200">
            <th class="border border-gray-300 p-2">Event</th>
            <th class="border border-gray-300 p-2">Date</th>
            <th class="border border-gray-300 p-2">Status</th>
          </tr>
          </thead>
          <tbody >
          <tr class="bg-white" v-for="(booking, index) in bookings" :key="index">
            <td class="border border-gray-300 p-2">{{booking.event.title}}</td>
            <td class="border border-gray-300 p-2">{{booking.event.start_date}}</td>
            <td class="border border-gray-300 p-2">{{booking.status}}</td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>


  </div>


</template>

<script setup>

import {onMounted, ref} from "vue";
import api from "@/api/axios.js";

const loginUser = ref(null);
const apiUrl = 'http://127.0.0.1:8000/';
onMounted(async()=>{
  const user  =  localStorage.getItem("user");
  loginUser.value = JSON.parse(user)

})
const bookings = ref([]);

onMounted(async ()=>{

  const user = localStorage.getItem("user");
  loginUser.value = JSON.parse(user);
  const response = await api.get(`/booking-user/${loginUser.value.id}`);

  if(response.status){
    bookings.value = response.data.data;
  }
})

const isBooking = () =>{
   if(!bookings.value){
     return false;
   }
   else{
     return true;
   }
}

</script>