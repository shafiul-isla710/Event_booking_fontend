

<template>

  <div class=" max-w-7xl mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6">
    <form action="" @submit.prevent="updateEvent">
      <div class="card-body">
        <h4 class="text-2xl font-semibold mb-4">Update Your Information</h4>
        <hr class="mb-6"/>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="event">

          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Title</label>
            <input  v-model="event.title" id="Name" placeholder="Name" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Description</label>
            <input v-model="event.description"  id="email" placeholder="User Email" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text" />
          </div>


          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Ticket Price</label>
            <input v-model="event.ticket_price"  id="mobile" placeholder="Mobile" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Start Date</label>
            <input v-model="event.start_date"  class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">End Date</label>
            <input v-model="event.end_date"  class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
        </div>

        <div class="p-2 mt-5 w-1/2 flex justify-start">
          <button type="submit"  class="w-2/5 mx-auto py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Update Event</button>
          <router-link to="/admin/events"   class="w-2/5 mx-auto py-3 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Cancel</router-link>

        </div>
      </div>


    </form>
  </div>

</template>

<script setup>

import {useRoute,useRouter} from "vue-router";
import {ref,onMounted} from "vue";
import api from "@/api/axios.js";
import {useToast} from "vue-toast-notification";
const event = ref(null);
const apiUrl = 'http://127.0.0.1:8000'
const route = useRoute();
const router = useRouter();
const toast = useToast();

onMounted(async () =>{

     const eventId = route.params.id;
     if(eventId){
       api.get(`event/${eventId}`).then((response)=>{
         event.value = response.data.data;
         console.log(event.value);
       })
     }
})

const updateEvent = ()=>{

  const eventId = route.params.id;
    api.put(`event-update/${eventId}`,event.value).then((response)=>{
      toast.success("Event updated successfully!",{
        position:"top-right",
        duration:2000,
      });
    })

  setTimeout(()=>{
      router.push('/admin/events')
  },2000)
}


</script>