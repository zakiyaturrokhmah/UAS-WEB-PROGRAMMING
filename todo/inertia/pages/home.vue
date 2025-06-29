<script setup>
import { Head, Link } from '@inertiajs/vue3'
</script>

<template>
  <Head title="Home" />
  <main class=" relative home min-h-screen flex flex-col items-center justify-center">
    <div class=" absolute top-8 left-8 font-bold text-3xl max-sm:text-2xl">
      <h1>Todo List Kita</h1>
       <p class=" text-black mb-8 text-xl max-sm:text-sm md:hidden"><q>Buat dan rencanakan kegiatan sehari - harimu</q></p>
    </div>
    <div>
      <img src="../../public/image/kucing-uas.png" alt="" srcset="">
    </div>
    <div class="text-center max-sm:mt-16">
      <p class=" max-sm:hidden text-gray-600 mb-8 text-lg"><q>Buat dan rencanakan kegiatan sehari - harimu</q></p>

      <div class="flex gap-4 justify-center">
        <Link href="/login" class="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded shadow transition">
          Login
        </Link>
      </div>
    </div>
  </main>
</template>