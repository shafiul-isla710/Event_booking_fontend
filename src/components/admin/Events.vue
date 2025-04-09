
<template>

  <div class=" max-w-7xl mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6">

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
        <th class="p-3">Title</th>
        <th class="p-3">Description</th>
        <th class="p-3">Ticket Price</th>
        <th class="p-3">Start Date</th>
        <th class="p-3">End Date</th>
        <th class="p-3">Action</th>
      </tr>
      <tr v-for="(event,index) in events" :key="index">
        <td class="p-3">{{index + 1}}</td>
        <td class="p-3">{{event.title}}</td>
        <td class="p-3">{{event.description}}</td>
        <td class="p-3">{{event.ticket_price}}</td>
        <td class="p-3">{{dateFormat(event.start_date)}}</td>
        <td class="p-3">{{dateFormat(event.end_date)}}</td>
         <div class="flex flex-row gap-3">
          <router-link class="p-2 mt-3 bg-blue-600 text-white" :to="`/admin/event/edit/${event.id}`">Edit</router-link>
           <button @click="destroy(event.id)" class="p-2 mt-3 bg-red-600 text-white ">Delete</button>
         </div>
      </tr>
    </table>

  </div>

  <div v-if="modal" class="  max-w-7xl mt-5 mx-auto my-auto transform duration-75 bg-gray-50 shadow-lg rounded-lg p-6">

  <div >
    <form action="" @submit.prevent="onSubmit">
      <div class="card-body">
        <h4 class="text-2xl font-semibold mb-4">Update Your Information</h4>
        <hr class="mb-6"/>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4" >

          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Title</label>
            <input v-model="form.title"  id="Name" placeholder="title" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Description</label>
            <input v-model="form.description"  id="email" placeholder="Description" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text" />
          </div>


          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Ticket Price</label>
            <input v-model="form.ticket_price"  id="mobile" placeholder="Ticket Price" class="w-full border border-gray-300 rounded-lg p-2 outline-none  focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">Start Date</label>
            <input v-model="form.start_date"  class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
          <div class="p-2">
            <label class="block text-gray-700 font-medium mb-2">End Date</label>
            <input v-model="form.end_date"  class="w-full border border-gray-300 rounded-lg p-2  outline-none focus:ring-2 focus:ring-blue-500" type="text"/>
          </div>
        </div>

        <div class="p-2 max-w-xl mt-5 flex items-center justify-between">
          <button type="submit"  class="w-2/5 mx-auto py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Submit</button>
          <button  @click="modal = false"  class="w-2/5 mx-auto py-3 font-medium text-white bg-red-500 hover:bg-red-400 rounded-lg border-red-500 hover:shadow inline-flex space-x-2 items-center justify-center">Cancel</button>

        </div>
      </div>

    </form>
  </div>


  </div>

</template>

<script setup>
import api from '@/api/axios.js';
import { onMounted,ref } from "vue";
import {useToast} from "vue-toast-notification";
import {useRouter} from "vue-router";
const toast = useToast();
const events  = ref([]);
const router = useRouter();

onMounted(async () =>{
    try{
        const res = await api.get("/events");

        if(res.status ){
           events.value = res.data.data;
        }
        else{
            console.log("error getting events");
        }
    }
    catch(error){
      console.log(error)
    }
})

function dateFormat(data){

  const d = new Date(data)
  return d.toLocaleDateString();

}
const destroy=(id)=>{

  api.delete(`event-delete/${id}`).then((response)=>{
    toast.success("Event deleted successfully!",{
      position:"top-right",
      duration:2000,
    })
  })
}

const modal = ref(false);

const form  = ref({
  title:"",
  description:"",
  ticket_price:"",
  start_date:"",
  end_date:"",
})
const errors =  ref({})

const onSubmit = async ()=>{

    try{
      const useForm = FormData();

      for(let key in form.value){
        useForm.append(key,form.valeu[key]);
      }

      const response = await api.post("/event-create",useForm)

      if(response.status){
        toast.success("Event created successfully!",{
          position:"top-right",
          duration:2000,
        })
      }
      setTimeout(()=>{
         modal.value = false;
      },2000)

    }
    catch(error){
       toast.error("Error creating event",{
         position:"top-right",
       })
        errors.value = error.response.data.errors;
    }
}

</script>