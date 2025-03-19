<template>

  <nav id="header" class="fixed top-0 z-30 w-full text-white">

    <div class="container flex flex-wrap items-center justify-between w-full py-2 mx-auto mt-0">

      <div class="flex items-center gap-10 pl-4">

        <a class="text-2xl font-bold text-gray-500 no-underline toggleColour hover:no-underline lg:text-4xl"
           href="#">
          <!--Icon from: http://www.potlabicons.com/ -->
          <svg class="inline h-8 fill-current" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 512.005 512.005">
            <rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502"
                  transform="matrix(1,0,0,1,0,0)" />
            <path class="plane-take-off"
                  d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z " />
          </svg> EVENT BOOKING
        </a>
        <router-link :to="{name:'home'}" class="plane-take-off text-gray-700 text-lg font-bold" >Home</router-link>
      </div>

      <div>
      <div class="block pr-4 lg:hidden">
        <button id="nav-toggle"
                class="flex items-center px-3 py-2 text-gray-500 border border-gray-600 rounded appearance-none hover:text-gray-800 hover:border-teal-500 focus:outline-none">
          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div class="z-20 flex-grow hidden w-full p-4 mt-2 text-black bg-white  lg:items-center lg:w-auto lg:flex gap-5  lg:mt-0 lg:bg-transparent lg:p-0"
           id="nav-content">
            <template class="flex gap-5" v-if="!login">
              <router-link :to="{name:'registration'}" class=""
              >Registration</router-link>
              <router-link :to="{name:'login'}"  id="navAction"
                           class="px-8 py-2 mx-auto mt-2 font-bold text-gray-800 bg-white rounded-lg shadow opacity-75 lg:mx-0 hover:underline lg:mt-0">Login</router-link>
            </template>

        <template class="flex gap-5" v-else>
          <router-link :to="{name:'member_dashboard'}" class=""
          >Dashboard</router-link>
          <button @click="logout()"  id="navAction"
                       class="px-8 py-2 mx-auto mt-2 font-bold text-gray-800 bg-white rounded-lg shadow opacity-75 lg:mx-0 hover:underline lg:mt-0">Logout</button>
        </template>



      </div>
      </div>
    </div>

    <hr class="py-0 my-0 border-b border-gray-100 opacity-25" />
  </nav>

</template>
<script setup>
import {RouterLink,useRouter} from "vue-router";
import {computed} from "vue";

const router = useRouter();


const login=computed(()=>{
  return localStorage.getItem('token')?true:false;
})
const logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login').then(()=>{
    return window.location.reload();
  });
}



</script>