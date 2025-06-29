<template>
  <div class=" w-screen h-screen flex flex-col gap-5 items-center justify-center home">
    <div class=" w-[425px] h-fit bg-slate-50 p-8 rounded-3xl">
      <h1 class=" text-lg font-bold text-center">Buat todo baru</h1>
      <div class=" w-full">
        <form @submit.prevent="submit" class=" flex flex-col gap-3 w-full h-full text-sm">
          <div>
            <label for="title" class="block pb-1 text-sm font-medium text-gray-700">Kegiatan :</label>
            <input v-model="form.title" type="text" placeholder="Nama kegiatan" class="w-full bg-slate-200 placeholder:text-sm px-3 py-2 rounded-lg" required />
          </div>
          <label for="description" class="block pb-none text-sm font-medium text-gray-700">Detail kegiatan :</label>
          <textarea v-model="form.description" class="w-full placeholder:text-sm p-2 bg-slate-200 rounded resize-none" rows="4"
            placeholder="Tulis deskripsi..."></textarea>
  
            <div class="">
              <label for="start_date" class="block pb-2 text-sm font-medium text-gray-700">Waktu Mulai :</label>
              <input v-model="form.start_date" id="start_date" type="datetime-local"
                class="w-full bg-slate-200 px-3 py-2 rounded mb-4">
            </div>
            <div>
              <label for="end_date" class="block pb-2 text-sm font-medium text-gray-700">Waktu Selesai :</label>
              <input v-model="form.end_date" id="end_date" type="datetime-local"
                class="w-full bg-slate-200 px-3 py-2 rounded">
            </div>
  
            <div class=" flex items-center justify-center">
              <button type="submit" class="w-[100px] bg-pink-400 hover:bg-pink-600 text-white py-2 text-sm rounded">buat todo</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
defineOptions({
  layout: defineAsyncComponent(() => import('../layout/createLayout.vue')),
})
import { Link, Head, useForm, router } from '@inertiajs/vue3'
const form = useForm({
  title: '',
  description: '',
  start_date: '',
  end_date: ''
})

const submit = () => {
  form.post('/create-todo', {
    onSuccess: () => {
      form.reset()
      router.reload({ only: ['todos'] })
    }
  })
}
</script>