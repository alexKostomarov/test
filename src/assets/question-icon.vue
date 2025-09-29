<template>
  <svg
      :class="['text-color']"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" :stroke="strokeColor" stroke-width="2" />
    <path
        d="M12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 9.44772 13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 11.4477 11 12V13"
        :stroke="strokeColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <circle cx="12" cy="16" r="1" :fill="strokeColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
}>(), { size: 16});

const strokeColor = 'currentColor';
</script>
