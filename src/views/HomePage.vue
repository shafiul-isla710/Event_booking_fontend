
<template>

<div class="h-screen bg-gradient-to-r from-indigo-200 via-purple-400 to-pink-200 ">

  <div class="pt-28 relative">

    <div class="container max-h-screen flex  flex-wrap items-center px-3 mx-auto md:flex-col ">
      <!--Left Col-->
      <div class="flex flex-col items-start justify-center w-full text-center md:w-2/5 md:text-left">
        <p class="w-full uppercase tracking-loose">What business are you?</p>

        <h1 class="my-4 text-5xl font-bold leading-tight">Main Hero Message to sell yourself!</h1>
        <p class="mb-8 text-2xl leading-normal text-white">Sub-hero message, not too long and not too short. Make it just
          right!</p>
        <button
            class="px-8 py-4 mx-auto my-6 font-bold text-gray-800 bg-white rounded-full shadow-lg lg:mx-0 hover:underline">Subscribe</button>

      </div>
      <!--Right Col-->
      <div class="w-2/3 py-6 text-center ml-5   md:w-3/5">
        <img class="z-50 w-full md:w-4/5" src="../assets/image/hero.png">
      </div>
    </div>

  </div>

</div>

  <section class="py-8 bg-gray-100">

    <div class="container px-2 pt-4 pb-12 mx-auto text-gray-800">

      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Events</h1>

      <div  class="flex flex-col gap-10 pt-12 my-12  md:flex-row md:items-center sm:my-4">

        <div v-for="(event ,index) in events" :key="index">

          <div class="w-[360px] h-[350px] flex flex-col gap-5 rounded-lg overflow-hidden shadow-lg bg-white p-6">
            <h2 class="text-2xl font-bold text-gray-800">{{event.title}}</h2>
            <p class="text-gray-600 mt-2">{{event.description}}</p>

            <div class="mt-4">
              <p class="text-sm text-gray-500"><strong>Start Date:</strong>{{formatDate(event.start_date)}}</p>
              <p class="text-sm text-gray-500"><strong>End Date:</strong>{{formatDate(event.end_date)}}</p>
            </div>

            <button @click="handleBooking(event)" class="mt-10 w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">Booking Now</button>
          </div>


        </div>

      </div>

    </div>

  </section>

</template>

<script setup>

import api from '../api/axios.js';
import { onMounted,ref } from "vue";
import {useToast} from "vue-toast-notification";
import {useRouter} from "vue-router";

const toast = useToast();
const loggedIn = ref();
const events = ref([]);
const router = useRouter();
onMounted(async () => {

    try{
      const response = await api.get('/events')

       if(response.status){
            events.value = response.data.data;
       }
    }
    catch(error){
      console.log(error)
    }
})

function formatDate(date){
  const d = new Date(date);
  return d.toLocaleDateString();
}

const handleBooking = (event) =>{
  loggedIn.value = localStorage.getItem("user");

  if(!loggedIn.value){
    toast.error("You are not logged in!")
  }else{
    router.push({
      path:'/member-event-confirm',
      query:{'eventId':event.id}
    })
    toast.success("Already logged in!")

  }

}

</script>
