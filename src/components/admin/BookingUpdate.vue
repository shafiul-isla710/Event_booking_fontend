
<template>

  <div class=" max-w-7xl mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6">
    <form action="" @submit.prevent="updateBooking" >
      <div class="card-body">
        <h4 class="text-2xl font-semibold mb-4">Update Your Information</h4>
        <hr class="mb-6"/>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" v-if="booking" >

          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Title</label>
            <select class="form-control" v-model="booking.status" name="" id="">
              <option class="p-3 mt-2" value="pending">pending</option>
              <option class="p-3 mt-2" value="confirmed">confirmed</option>
              <option class="p-3 mt-2" value="cancelled">cancelled</option>
            </select>
          </div>

<!--          <div class="p-2">-->
<!--            <label class="block text-gray-700 font-medium mb-2">Description</label>-->
<!--            <input   id="email" placeholder="User Email" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text" />-->
<!--          </div>-->
<!--          <div class="p-2">-->
<!--            <label class="block text-gray-700 font-medium mb-2">Ticket Price</label>-->
<!--            <input   id="mobile" placeholder="Mobile" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text"/>-->
<!--          </div>-->
<!--          <div class="p-2">-->
<!--            <label class="block text-gray-700 font-medium mb-2">Start Date</label>-->
<!--            <input   class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>-->
<!--          </div>-->
<!--          <div class="p-2">-->
<!--            <label class="block text-gray-700 font-medium mb-2">End Date</label>-->
<!--            <input   class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>-->
<!--          </div>-->

        </div>

        <div class="p-2 mt-5 w-1/2 flex justify-start">
          <button type="submit"  class="w-2/5 mx-auto py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Update Booking</button>
          <router-link to="/admin/bookings"   class="w-2/5 mx-auto py-3 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Cancel</router-link>
        </div>
      </div>

    </form>
  </div>

</template>

<script setup>

import {ref,onMounted} from "vue";
import {useRouter,useRoute} from "vue-router";
import api from "@/api/axios.js";
import {useToast} from "vue-toast-notification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const booking = ref(null);
const id = route.params.bookingId;
onMounted(async ()=>{


    if(id){
      api.get(`/booking/${id}`).then((response)=>{

        booking.value = response.data.data
        console.log(booking.value)

      })
    }
})

const updateBooking = ()=>{

    api.put(`booking-update/${id}`,booking.value).then((response)=>{

      toast.success(response.data.message ,{
        position: "top-right",
        autoClose: 1000,
      })
    })

  setTimeout(()=>{
      router.push('/admin/bookings')
  },1000)

}

</script>