<template>
    <div class="bg-slate-800 rounded-xl p-6 shadow-xl w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-4 text-indigo-300">{{ wod.title }}</h2>
      <ul class="space-y-2">
  <li v-for="(exercise, index) in wod.exercises" :key="index" class="text-slate-100">
    {{ exercise }}
  </li>
</ul>
    </div>
  </template>
  
  <script setup>
  defineProps({
    wod: {
      type: Object,
      required: true
    }
  });
  </script>