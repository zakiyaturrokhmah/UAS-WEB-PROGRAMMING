<template>
  <div class=" w-screen h-screen flex flex-col gap-5 items-center justify-center home">
    <div class=" w-[500px] h-[400px] bg-slate-50 p-8 rounded-3xl">
      <h1 class=" text-lg font-bold text-center">Update Todo</h1>
      <div class=" w-full">
        <form @submit.prevent="submit" class=" flex flex-col gap-3 w-full h-full text-sm">
            <div class="">
              <label for="title" class="block pb-2 text-sm font-medium text-gray-700">Kegiatan:</label>
              <input v-model="form.title" id="title" type="text"
                class="w-full bg-slate-200 px-3 py-2 rounded mb-4">
            </div>
            <div>
              <label for="end_date" class="block pb-2 text-sm font-medium text-gray-700">Deskripsi:</label>
              <input v-model="form.description" id="description" type="text"
              class="w-full bg-slate-200 px-3 py-2 rounded mb-4">
            </div>
  
            <div class=" flex items-center justify-center">
              <button type="submit" class="w-[100px] bg-pink-400 hover:bg-pink-600 text-white py-2 text-sm rounded">Update todo</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { useForm, Link, router } from '@inertiajs/vue3'
  import Todo from '#models/todo'
  import { defineAsyncComponent } from 'vue'
    defineOptions({
    layout: defineAsyncComponent(() => import('../layout/updateLayout.vue')),
    })
  
  const props = defineProps<{
    todos: Todo
  }>()
  
  const form = useForm({
    title: props.todos.title,
    description: props.todos.description,
  })
  
  const submit = () => {
    router.put(`/update-todo/${props.todos.id}`, form, {
      onSuccess: () => {
        router.visit('/dashboard')
      }
    })
  }
  </script>
  