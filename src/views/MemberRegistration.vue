
<template>

  <div class="flex items-center justify-center py-16 mt-20 bg-gradient-to-r from-indigo-100 to-pink-50">

    <div class="container mx-auto flex justify-center items-center h-[550px]">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <form action="" @submit.prevent="onSubmit">
          <div class="card-body">
            <h4 class="text-2xl font-semibold mb-4">Update Your Information</h4>
            <hr class="mb-6"/>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

              <div class="p-2">
                <label class="block text-gray-700 font-medium mb-2">Name</label>
                <input  id="Name" placeholder="Name" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 outline-none focus:ring-blue-500" type="text" v-model="form.name"/>
                 <div class="text-red-300" v-if="errors.name">{{errors.name[0]}}</div>
              </div>
              <div class="p-2">
                <label class="block text-gray-700 font-medium mb-2">Email Address</label>
                <input  id="email" placeholder="User Email" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2  outline-none focus:ring-blue-500" type="email" v-model="form.email" />
                <div class="text-red-300" v-if="errors.email">{{errors.email[0]}}</div>
              </div>

              <div class="p-2">
                <label class="block text-gray-700 font-medium mb-2">Password</label>
                <input  id="password" placeholder="User Password" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 outline-none focus:ring-blue-500" type="password" v-model="form.password"/>
                <div class="text-red-300" v-if="errors.password">{{errors.password[0]}}</div>
              </div>

              <div class="p-2">
                <label class="block text-gray-700 font-medium mb-2">Confirmed Password</label>
                <input  id="confirmed password" placeholder="User Password" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 outline-none focus:ring-blue-500" type="password" v-model="form.password_confirmation"/>
                <div class="text-red-300" v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</div>
              </div>

              <div class="p-2">
                <label class="block text-gray-700 font-medium mb-2">Profile_image</label>
                <input  id="profile_image" placeholder="User Password" class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 outline-none focus:ring-blue-500" type="file" @change="imageHandle" />

              </div>
            </div>

            <div class="p-2">
              <button type="submit"  class="w-2/4 mx-auto py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Complete</button>

            </div>
          </div>

        </form>
      </div>
    </div>
  </div>


</template>

<script setup>

import api from '@/api/axios'
import {ref} from "vue";
import {useToast} from 'vue-toast-notification';
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const form = ref({
  name:"",
  email:"",
  password:"",
  password_confirmation:"",
  profile_image:""
})

const imageHandle=(event)=>{
   form.value.profile_image = event.target.files[0];
}

//onSubmit function start  and error handling
const errors = ref({})
const onSubmit=async()=>{
   try{
     const formData = new FormData();
     for(let key in form.value){
       formData.append(key, form.value[key]);
     }
     const response = await api.post('/member-registration', formData , {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     })
     if(response.status){
       toast.success(response.data.message,{
         position:"top-right",
         duration:1000
       })
       setTimeout(()=>{
         router.push('/login').then(()=>{
          return window.location.reload();
         })
       },1000)
     }
   }
   catch(someError){
     toast.error('User Create Failed.',{
       position:"top-right",
     });
     errors.value = someError.response.data.errors;
   }
}





</script>