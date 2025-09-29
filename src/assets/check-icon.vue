<template>
  <svg :width="size" :height="size" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg"><path :fill="stroke" d="M77.248 415.04a64 64 0 0190.496 0l226.304 226.304L846.528 188.8a64 64 0 1190.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 010-90.496z"/>
	</svg>

</template>


<script setup>
import {computed, ref, toRefs} from 'vue';

const props = defineProps({
  size: {
    type: Number,
    default: 16
  },
	fill:{
		type: String,
		default: 'none'
	},
  stroke:{
    type: String,
    default: '#383838'
  },
  rotate: {
    type: Number,
    default: 0
  }
})

const {width, height, color, rotate} = toRefs(props);

const style = computed( () => { return {transform: 'rotate(' + rotate.value + 'deg)'} });

</script>
