
<template>

  <div class="bg-gray-100 h-[700px]  flex items-center justify-center">

    <div class="w-full  max-w-4xl bg-white shadow-lg rounded-lg p-6 ">
      <h2 class="text-2xl text-center font-bold text-gray-800 mb-4">User Dashboard</h2>
    <div class="flex items-center justify-around ">
      <div class="mb-6 p-5" v-if="loggedUser">
        <h3 class="text-lg font-semibold text-gray-700">Welcome, <span class="text-blue-600">{{loggedUser.name}}</span></h3>
        <p class="text-gray-600">{{loggedUser.email}}</p>
        <img class="w-28 h-28 rounded-md" v-if="loggedUser && loggedUser.profile_image" :src="`${apiUrl}${loggedUser.profile_image}`" alt="">
      </div>

      <div class="mb-6 p-5" v-if="event">
          <h1>Name : {{event.title}}</h1>
           <h1>Description : {{event.description}}</h1>

          <h1>Start Time : {{timeHandle(event.start_date)}}</h1>
           <h1>End Time : {{timeHandle(event.end_date)}}</h1>
      </div>
    </div>
    </div>
  </div>

</template>

<script setup>

import {useRouter,useRoute} from "vue-router";
import {ref,onMounted} from "vue";
import api from "@/api/axios.js";

const apiUrl = 'http://127.0.0.1:8000/';
const router = useRouter();
const route = useRoute();
const loggedUser = ref(null);
const event = ref(null);

onMounted(() => {

  const user = localStorage.getItem("user");
  loggedUser.value = JSON.parse(user);
  const eventId = route.query.eventId;

   if (eventId){
      api.get(`/event/${eventId}`).then((response)=>{
        event.value = response.data.data;
        console.log(event.value);
      });
   }
})

const timeHandle = (date) =>{
    const d = new Date(date);
    return d.toLocaleDateString();
}




</script>