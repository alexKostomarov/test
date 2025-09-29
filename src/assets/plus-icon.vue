<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7.5" :stroke="color"/>
    <path d="M8.00122 5.27722V10.7217" :stroke="color" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5.27881 7.99939H10.7233" :stroke="color"  stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>

const props = defineProps({
  color:{
    type: String,
    default: '#D7402D'
  },
  size:{
    type: String,
    default: '16'
  }
});
</script>