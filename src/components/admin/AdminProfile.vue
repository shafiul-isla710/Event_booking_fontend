
<template>

  <div class="w-full max-w-xl mt-10 mx-auto my-auto bg-white shadow-lg rounded-lg p-6 ">

      <div class="flex items-center justify-center flex-row gap-12 w-full">

        <div id="image">
          <img class="h-28 w-28" :src="profilePic" alt="">
        </div>
        <div id="text">
          <p>Name : Shafiul</p>
          <p>Email : Shafiul@gmail.com</p>
        </div>

      </div>

  </div>

</template>

<script setup>

import profilePic from "@/assets/image/profilePic.png"

</script>