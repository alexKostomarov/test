<template>
  <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      fill="none"
  >

    <path
        d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z"
        :fill="fill"
        :stroke="stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
    />

    <circle
        cx="16"
        cy="16"
        r="5"
        fill="none"
        :stroke="stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
    />

    <line
        x1="6"
        y1="6"
        x2="26"
        y2="26"
        :stroke="stroke"
        stroke-width="2"
        stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
      size?: number
      fill?: string
    }>(),
    {
      size: 20,
      fill: 'none',
    }
)

const stroke = 'currentColor'
</script>

