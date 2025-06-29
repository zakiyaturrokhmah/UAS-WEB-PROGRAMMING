<template>
  <div class="max-h-screen">
    <main class="w-full max-w-[1200px] mx-auto px-4 py-6">
      <!-- Welcome Section -->
      <div class="h-[125px] bg-slate-50 p-5 rounded-xl">
        <h1 class="font-bold">Selamat datang di Todo List Kita</h1>
        <p class="text-sm">Buat dan rencanakan kegiatan sehari - harimu</p>
      </div>

      <!-- Todo List -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold mb-5">Todo List Kamu:</h2>

        <!-- Scrollable Horizontal Container -->
        <div class="overflow-x-auto">
          <ul class="flex gap-7 min-w-full">
            <li
              v-for="(todo, index) in filteredTodos"
              :key="todo.id"
              :class="['rounded-lg h-[225px] relative p-5 shrink-0', getRandomBg(index)]"
            >
              <div class="w-[375px]">
                <div class="flex justify-between items-start">
                  <div class="flex gap-3">
                    <div>
                      <!-- Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="font-semibold">{{ todo.title }}</p>
                  </div>

                  <div class="relative menu-wrapper">
                    <button @click.stop="toggleMenu(todo.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="size-6">
                        <path fill-rule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <div v-if="openMenuId === todo.id" class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10">
                      <button @click="updateTodo(todo.id)" class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100">Update</button>
                      <button @click="deleteTodo(todo.id)" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">Delete</button>
                    </div>
                  </div>
                </div>

                <p class="text-gray-600 text-justify">{{ todo.description }}</p>
                <div class="flex flex-wrap gap-1 absolute bottom-5 text-sm">
                  <p>{{ DateTime.fromISO(todo.startDate).toFormat('HH:mm') }}</p>
                  <p>-</p>
                  <p>{{ DateTime.fromISO(todo.endDate).toFormat('HH:mm') }}</p>
                  <span class="text-gray-700 ml-2">{{ getTimeLeftText(todo.startDate) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tanggal Selector -->
      <div class="w-full overflow-x-auto flex items-center justify-center p-5">
        <div class="flex items-center gap-2 mt-4">
          <span
            v-for="(date, index) in dates"
            :key="index"
            @click="selectedDate = date.toISODate()"
            :class="[
              'px-3 py-1 relative font-medium bg-slate-50/60 text-center flex items-center justify-center cursor-pointer',
              date.toISODate() === selectedDate ? 'text-3xl w-[50px] h-[50px] rounded-xl text-black' : 'w-[40px] h-[40px] rounded-lg text-sm'
            ]"
          >
            <div>{{ date.day }}</div>
            <div class=" absolute -bottom-5 text-xs text-gray-500">{{ date.setLocale('id').toFormat('cccc') }}</div>
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineAsyncComponent } from 'vue'
import { DateTime } from 'luxon'
import Todo from '#models/todo'
import User from '#models/user'

defineOptions({
  layout: (h, page) =>
    h(defineAsyncComponent(() => import('../layout/homeLayout.vue')), { ...page.props }, () => page),
})

const props = defineProps<{ user: User; todos: Todo[] }>()

const today = DateTime.now()
const selectedDate = ref('')

const dates = computed(() => {
  const unique = new Set(props.todos.map(todo => DateTime.fromISO(todo.startDate).toISODate()))
  return Array.from(unique).map(date => DateTime.fromISO(date)).sort((a, b) => a.toMillis() - b.toMillis())
})

onMounted(() => {
  if (dates.value.length > 0) {
    selectedDate.value = dates.value[0].toISODate()
  }
})

const filteredTodos = computed(() => {
  return props.todos.filter((todo) => {
    const start = DateTime.fromISO(todo.startDate)
    return start.toISODate() === selectedDate.value
  })
})

const openMenuId = ref<number | null>(null)

const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

const closeMenu = () => {
  openMenuId.value = null
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.menu-wrapper')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const updateTodo = (id: number) => {
  router.get(`/update-todo/${id}`)
}

const deleteTodo = (id: number) => {
  router.delete(`/delete-todo/${id}`, {
    onSuccess: () => {
      router.reload({ only: ['todos'] })
    },
  })
}

const bgColors = [
  'bg-red-100', 'bg-green-100', 'bg-yellow-100', 'bg-blue-100',
  'bg-purple-100', 'bg-pink-100', 'bg-orange-100', 'bg-lime-100',
  'bg-teal-100', 'bg-emerald-100'
]

const getRandomBg = (index: number) => {
  return bgColors[index % bgColors.length]
}

const getTimeLeftText = (startDate: string) => {
  const now = DateTime.now()
  const start = DateTime.fromISO(startDate)
  const diff = start.diff(now, ['hours', 'minutes']).toObject()

  if (diff.hours && diff.hours > 1) {
    return `(dalam ${Math.floor(diff.hours)} jam)`
  } else if (diff.hours && diff.hours > 0) {
    return `(dalam ${Math.floor(diff.hours)} jam ${Math.floor(diff.minutes ?? 0)} menit)`
  } else if (diff.minutes && diff.minutes > 0) {
    return `(dalam ${Math.floor(diff.minutes)} menit)`
  } else {
    return `(waktu telah lewat)`
  }
}
</script>