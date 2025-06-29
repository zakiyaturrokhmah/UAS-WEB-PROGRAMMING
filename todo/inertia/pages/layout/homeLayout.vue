<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Top Navbar -->
    <div class="fixed z-30 top-0 left-0 right-0 bg-slate-50 h-[75px]">
      <div class="max-w-[1200px] w-full mx-auto h-full flex items-center justify-between px-4 text-black">
        <h1 class="font-bold md:text-2xl">Dashboard</h1>
        <div class="flex gap-5 text-base items-center">
          <Link href="/create">Create Todo</Link>
          <Link href="/profile">{{ user.username }}</Link>
          <button class="" @click="logout()">Logout</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="pt-[90px] px-4 home h-screen">
      <div class="max-w-[1200px] w-full mx-auto">
        <slot />
      </div>
      <div class="fixed bottom-0 left-5">
      <img class=" w-[200px] h-[200px] object-contain" src="../../../public/image/kucing-uas.png" alt="" srcset="" />
    </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { Link, Head, useForm, router } from '@inertiajs/vue3'
  import User from '#models/user';

  const props = defineProps<{
  user: User
}>()

  const logout = () => {
    router.post('/logout')
  }
  </script>
  