
<template>

  <div class="bg-gray-100 h-[700px]  flex items-center justify-center">

    <div class="w-full  max-w-4xl bg-white shadow-lg rounded-lg p-6 ">
      <h2 class="text-2xl text-center font-bold text-gray-800 mb-4">Event Dashboard</h2>
    <div class="flex items-center justify-around ">
      <div class="mb-6 p-5" v-if="loggedUser">
        <h3 class="text-lg font-semibold text-gray-700">Welcome, <span class="text-blue-600">{{loggedUser.name}}</span></h3>
        <p class="text-gray-600">{{loggedUser.email}}</p>
        <img class="w-28 h-28 rounded-md" v-if="loggedUser && loggedUser.profile_image" :src="`${apiUrl}${loggedUser.profile_image}`" alt="">
      </div>

      <div class="mb-6 p-5" v-if="event">
          <h1>Name : {{event.title}}</h1>
           <h1>Description : {{event.description}}</h1>
           <h1>Ticket Price : {{event.ticket_price}}</h1>
           <h1>Start Time : {{timeHandle(event.start_date)}}</h1>
           <h1>End Time : {{timeHandle(event.end_date)}}</h1>
      </div>

      <div>
        <form @submit.prevent="bookingConfirm" class="space-y-4">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Ticket Quentity</label>
            <input type="number" min="1" id="name" v-model="ticket_quantity"  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Total Amount</label>
            <input type="number" disabled id="email" :value="total_amount" name="email" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
          </div>

          <!-- Submit Button -->
          <div>
            <button type="submit" class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Booking
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>

</template>

<script setup>

import {useRouter,useRoute} from "vue-router";
import {ref, onMounted, computed} from "vue";
import {useToast} from "vue-toast-notification";
import api from "@/api/axios.js";

const apiUrl = 'http://127.0.0.1:8000/';
const router = useRouter();
const route = useRoute();
const loggedUser = ref(null);
const event = ref(null);
const toast = useToast();

onMounted(() => {

  const user = localStorage.getItem("user");
  loggedUser.value = JSON.parse(user);
  const eventId = route.query.eventId;

   if (eventId){
      api.get(`/event/${eventId}`).then((response)=>{
        event.value = response.data.data;
      });
   }
})

const timeHandle = (date) =>{
    const d = new Date(date);
    return d.toLocaleDateString();
}

//booking form
const ticket_quantity = ref(1);

const total_amount = computed(()=>{
     if(event.value){
     return  ticket_quantity.value * event.value.ticket_price;
     }
     else {
       return 0;
     }
})

const bookingConfirm = async () => {

     api.post('booking-create',{
       "user_id":loggedUser.value.id,
       "event_id":event.value.id,
       "ticket_qty":ticket_quantity.value,
       "ticket_price":event.value.ticket_price,
       "total_price":total_amount.value
     }).then((response)=>{
       toast.success("Successfully created!",{
         position:"top-right",
         duration:1000
       });
     })

  setTimeout(()=>{

    router.push('/booking-table')

  },1000)

}

</script>