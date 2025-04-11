<script setup>
import { ref, onMounted } from 'vue'
import WodCard from './components/WodCard.vue'

const currentWod = ref(null)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

async function loadRandomWod() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/workouts/random`)
    const data = await response.json()
    currentWod.value = data
  } catch (error) {
    console.error('Failed to fetch random WOD:', error)
  }
}

onMounted(() => {
  loadRandomWod()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center p-6 text-white">
    <h1 class="text-4xl font-extrabold mb-8 drop-shadow-lg">WOD Generator</h1>

    <WodCard v-if="currentWod" :wod="currentWod" />

    <button
      @click="loadRandomWod"
      class="mt-6 px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
    >
      Ny WOD
    </button>
  </div>
</template>