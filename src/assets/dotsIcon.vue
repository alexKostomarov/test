<template>
  <svg :width="size" :height="size" viewBox="0 0 20 4" fill="none" :style="style" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.5 2C11.5 2.82837 10.8284 3.5 10 3.5C9.17163 3.5 8.5 2.82837 8.5 2C8.5 1.17163 9.17163 0.5 10 0.5C10.8284 0.5 11.5 1.17163 11.5 2Z" :fill="color"/>
		<path d="M19.5 2C19.5 2.82837 18.8284 3.5 18 3.5C17.1716 3.5 16.5 2.82837 16.5 2C16.5 1.17163 17.1716 0.5 18 0.5C18.8284 0.5 19.5 1.17163 19.5 2Z" :fill="color"/>
		<path d="M3.5 2C3.5 2.82837 2.82837 3.5 2 3.5C1.17163 3.5 0.5 2.82837 0.5 2C0.5 1.17163 1.17163 0.5 2 0.5C2.82837 0.5 3.5 1.17163 3.5 2Z" :fill="color"/>
  </svg>
</template>


<script setup>
import {computed, ref, toRefs} from 'vue';

const props = defineProps({
  size: {
		type: Number,
		default: 30
  },
  color:{
		type: String,
		default: '#1C1C1C'
  },
	rotate: {
		type: Number,
		default: 0
	}
})

const {size, rotate} = toRefs(props);

const style = computed( () => { return {transform: 'rotate(' + rotate.value + 'deg)'} });

</script>

