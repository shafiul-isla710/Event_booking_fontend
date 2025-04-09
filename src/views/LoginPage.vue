
<template>

  <div class="flex items-center justify-center py-5 mt-20 bg-gradient-to-r from-indigo-100 to-pink-50">

    <div  class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[600px] lg:py-0 ">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">
          Verify Your OTP
        </h2>
        <p class="text-gray-600 text-center mb-6">
          We have sent a One-Time Password (OTP) to your.
        </p>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <div>
              <label
                  for="otp"
                  class="block text-sm font-medium text-gray-700"
              >Enter Your Valide Email</label
              >
              <input
                  type="text"
                  placeholder=""
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 outline-none focus:border-indigo-500 sm:text-sm"

                  v-model="email"
              />
              <div class="text-sm text-red-300" v-if="errors.email">{{errors.email[0]}}</div>
            </div>
            <div>
              <label
                  for="otp"
                  class="block text-sm font-medium text-gray-700"
              >Enter Your Valide Password</label
              >
              <input
                  type="password"
                  placeholder=""
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 outline-none focus:border-indigo-500 sm:text-sm"

                  v-model="password"
              />
              <div class="text-sm text-red-300" v-if="errors.password">{{errors.password[0]}}</div>
            </div>
          </div>
          <button type="submit"  class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">Login</button>
        </form>
        <div class="text-center mt-4">
          <p class="text-gray-600 text-sm">
            Didn't receive the OTP?
            <a href="#" class="text-blue-600 hover:underline"
            >Resend OTP</a
            >
          </p>
        </div>
      </div>
    </div>

  </div>

  
</template>

<script setup>
import api from '@/api/axios';
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from 'vue-toast-notification';
const router = useRouter();

const toast = useToast();

const email = ref('');
const password = ref('');

const errors = ref({});
const onSubmit = async()=>{

  try{
    const response = await api.post("/login",{
      email:email.value,
      password:password.value
    })
    if(response.status ){
      toast.success('Login Successfully',{
        position: 'top-right',
        duration: 1000,
      });
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('user',JSON.stringify(response.data.data));

      setTimeout(()=>{

        if(response.data.data.role == 'admin'){
          router.push('/admin/admin-profile').then(()=>{
            return window.location.reload();
          })
        }
        else{
          router.push('/member-dashboard').then(()=>{
            return  window.location.reload();
          })
        }
      },1000)
    }


  }catch(error){

    toast.error("Unauthorized",{
      position:"top-right",
      duration:2000
    });

    errors.value = error.response.data.errors;

  }

}



</script>
