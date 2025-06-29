<template>
    <div class=" h-screen w-screen">
        <slot />
        
    <div class="fixed bottom-0 left-5">
      <img class=" w-[200px] h-[200px] object-contain" src="../../../public/image/kucing-uas.png" alt="" srcset="" />
    </div>
    </div>
<!-- 
    <div class="fixed md:hidden bottom-0 w-full h-[65px] flex items-center justify-around pl-5 bg-pink-200 text-slate-700 z-10">
        <Link class=" flex flex-col text-sm items-center" href="/dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7">
            <path fill-rule="evenodd"
                d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                clip-rule="evenodd" />
        </svg>
        <p>Home</p>
        </Link>
        <Link class=" flex flex-col text-sm items-center" href="/create">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7">
            <path
                d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        <p>Create Todo</p>
        </Link>
        <Link class=" flex flex-col text-sm items-center" href="/profile">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-7">
            <path
                d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
        </svg>

        <p>Profile</p>
        </Link>
    </div> -->
</template>

<script setup lang="ts">
  import { Link, Head, useForm, router } from '@inertiajs/vue3'
</script>