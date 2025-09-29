<template>
  <svg viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" fill="none" >
		<path d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" id="XMLID_10_" :stroke="stroke" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
		<circle cx="16" cy="16" fill="none" r="5" :stroke="stroke" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
	</svg>
</template>

<script setup lang="ts">
    withDefaults(defineProps<{
      size?: number
    }>(), { size: 20});

const stroke = 'currentColor';
</script>
