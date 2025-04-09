
<template>

  <div class="max-w-7xl h-[500px]  mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6">

    <div class="flex items-center justify-between flex-wrap p-3">
      <div class="flex flex-row items-center gap-10 ">
        <label for="search">Search</label>
        <input class="p-2 outline-none rounded-sm bg-indigo-50 text-center" type="search" id="search" placeholder="Search..." />
      </div>

      <div>
        <button @click="modal = true " class="bg-green-500 rounded-md p-3 text-white">Create Event</button>
      </div>
    </div>

    <table class="w-full">
      <tr class="bg-gray-200 text-left rounded-md ">
        <th class="p-3">Id</th>
        <th class="p-3">Event Title</th>
        <th class="p-3">Start Date</th>
        <th class="p-3">End Date</th>
        <th class="p-3">Member Name</th>
        <th class="p-3">Ticket Price</th>
        <th class="p-3">Ticket Quantity</th>
        <th class="p-3">Total Price</th>
        <th class="p-3">status</th>

      </tr>
      <tr v-for="(booking,index) in bookings" :key="index">
        <td class="p-3">{{index + 1}}</td>
        <td class="p-3">{{booking.event.title}}</td>
        <td class="p-3">{{booking.event.start_date}}</td>
        <td class="p-3">{{booking.event.end_date}}</td>
        <td class="p-3">{{booking.user.name}}</td>
        <td class="p-3">{{booking.event.ticket_price}}</td>
        <td class="p-3">{{booking.ticket_qty}}</td>
        <td class="p-3">{{booking.total_price}}</td>
        <td class="p-3">{{booking.status}}</td>

<!--        <div class="flex flex-row gap-3">-->
<!--          <router-link class="p-2 mt-3 bg-blue-600 text-white" :to="`/admin/event/edit/${event.id}`">Edit</router-link>-->
<!--          <button @click="destroy(event.id)" class="p-2 mt-3 bg-red-600 text-white ">Delete</button>-->
<!--        </div>-->
      </tr>
    </table>

  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import api from "@/api/axios.js";

const loginUser = ref();
const bookings = ref([]);

onMounted(async ()=>{

  const user = localStorage.getItem("user");
  loginUser.value = JSON.parse(user);
  const response = await api.get(`/booking-user/${loginUser.value.id}`);

  if(response.status){
    bookings.value = response.data.data;
  }
})


</script>