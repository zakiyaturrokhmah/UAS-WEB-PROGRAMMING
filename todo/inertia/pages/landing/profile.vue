<template>
    <div class=" home h-full">
        <div class="h-[200px] bg-slate-50 rounded-br-3xl rounded-bl-3xl flex items-center justify-center">
            <div class="flex flex-col gap-5 items-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-17">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                        clip-rule="evenodd" />
                </svg>
                <div class="text-center">
                    <p>{{ user.username }}</p>
                    <p>{{ user.email }}</p>
                </div>
            </div>
        </div>
        <div>
            <h2 class="text-lg text-center pt-5 font-semibold">Todo List Kamu:</h2>
        </div>
        <div class=" flex items-center justify-center h-[400px]">
            <div class="mt-6 h-full overflow-y-scroll p-5">
                <ul class="mt-2 space-y-5">
                    <li v-for="(todo, index) in todos" :key="todo.id"
                        :class="['rounded-lg shadow relative flex justify-between items-start', getRandomBg(index)]">
                        <div class="p-6 h-[175px] flex flex-col gap-3">
                            <div class="flex justify-between items-start">
                                <div class="flex gap-3 w-[300px]">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                                clip-rule="evenodd" />
                                            <path fill-rule="evenodd"
                                                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <p class="font-semibold">{{ todo.title }}</p>
                                </div>
        
                                <!-- Titik Tiga -->
                                <div class=" menu-wrapper">
                                    <button class=" absolute right-4 top-4" @click.stop="toggleMenu(todo.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                            class="size-6">
                                            <path fill-rule="evenodd"
                                                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <div v-if="openMenuId === todo.id"
                                        class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                                        <button @click="updateTodo(todo.id)"
                                            class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100">Update</button>
                                        <button @click="deleteTodo(todo.id)"
                                            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">Delete</button>
                                    </div>
                                </div>
                            </div>
        
                            <p class="text-gray-600 text-justify">{{ todo.description }}</p>
                            <div class=" absolute bottom-5 flex gap-1">
                                <p>{{ DateTime.fromISO(todo.startDate).toFormat('HH:mm') }}</p>
                                <p>-</p>
                                <p>{{ DateTime.fromISO(todo.endDate).toFormat('HH:mm') }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Header -->

    <!-- Todo List -->
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { router } from '@inertiajs/vue3'
import type User from '#models/user'
import type Todo from '#models/todo'

// Props
const props = defineProps<{
    user: User
    todos: Todo[]
}>()

// Layout
defineOptions({
    layout: defineAsyncComponent(() => import('../layout/profileLayout.vue')),
})

// Random warna
const bgColors = [
    'bg-red-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-orange-100',
    'bg-lime-100',
    'bg-teal-100',
    'bg-emerald-100',
]
const getRandomBg = (index: number) => bgColors[index % bgColors.length]

// Menu dropdown
const openMenuId = ref<number | null>(null)
const toggleMenu = (id: number) => {
    openMenuId.value = openMenuId.value === id ? null : id
}

// Update dan delete
const updateTodo = (id: number) => {
    router.get(`/update-todo/${id}`)
}
const deleteTodo = (id: number) => {
    router.delete(`/delete-todo/${id}`, {
        onSuccess: () => router.reload({ only: ['todos'] }),
    })
}
</script>

