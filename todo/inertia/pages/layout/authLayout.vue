<template>
  <div class="w-full max-h-screen">
    <!-- Header -->
    <div class="fixed bg-slate-50 top-0 left-0 w-full z-20 ">
      <div class="mx-auto max-w-[1200px] flex items-center justify-between px-5 sm:px-[150px] pt-6 pb-3">
        <Link href="/" class="text-2xl font-bold text-gray-900">Todo List Kita</Link>
        <div class="text-lg flex items-center justify-center px-4 py-2">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>

    <!-- Bottom Image -->
    <div class="fixed bottom-0 left-5 z-10">
      <img
        class="w-[200px] h-[200px] object-contain"
        src="../../../public/image/kucing-uas.png"
        alt="Kucing"
      />
    </div>

    <!-- Page Content -->
    <div class="pt-[100px] px-5 home h-screen">
      <div class="max-w-[1200px] mx-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>
