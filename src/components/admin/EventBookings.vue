
<template>

  <div class="max-w-7xl  mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6">

    <table class="w-full text-center">
      <tr class="bg-gray-200 text-left rounded-md ">
        <th class="p-3">Id</th>
        <th class="p-3">Event Title</th>
        <th class="p-3">Start Date</th>
        <th class="p-3">End Date</th>
        <th class="p-3">Member Name</th>
        <th class="p-3">Ticket Price</th>
        <th class="p-3">Ticket Quantity</th>
        <th class="p-3">Total Price</th>
        <th class="p-3">Status</th>
        <th class="p-3">Action</th>

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
        <td class="text-center">
            <router-link class="px-3 py-2 mt-3 bg-green-600 text-white rounded-md" :to="`/admin/booking/update/${booking.id}`">Edit</router-link>
        </td>

        <!--        <div class="flex flex-row gap-3">-->
        <!--          <router-link class="p-2 mt-3 bg-blue-600 text-white" :to="`/admin/event/edit/${event.id}`">Edit</router-link>-->
        <!--          <button @click="destroy(event.id)" class="p-2 mt-3 bg-red-600 text-white ">Delete</button>-->
        <!--        </div>-->
      </tr>
    </table>

  </div>

</template>

<script setup>

import api from "@/api/axios.js";
import {ref,onMounted} from "vue";

const bookings = ref([]);
onMounted(async () => {

    const response = await api.get("/bookings");
    if(response.status){
      bookings.value = response.data.data;
    }
})

</script>