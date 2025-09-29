<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" :width="width" :height="height" stroke="none" :fill="color" :style="style">
		<path d="M13.1,19.5a1.5,1.5,0,0,1-1.061-2.561l4.586-4.585a.5.5,0,0,0,0-.708L12.043,7.061a1.5,1.5,0,0,1,2.121-2.122L18.75,9.525a3.505,3.505,0,0,1,0,4.95l-4.586,4.586A1.5,1.5,0,0,1,13.1,19.5Z"/>
		<path d="M6.1,19.5a1.5,1.5,0,0,1-1.061-2.561L9.982,12,5.043,7.061A1.5,1.5,0,0,1,7.164,4.939l6,6a1.5,1.5,0,0,1,0,2.122l-6,6A1.5,1.5,0,0,1,6.1,19.5Z"/>
	</svg>
</template>


<script setup>
import {computed, ref, toRefs} from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 512
  },
  height: {
    type: Number,
    default: 512
  },
  color:{
    type: String,
    default: 'black'
  },
  rotate: {
    type: Number,
    default: 0
  }
})

const {width, height, color, rotate} = toRefs(props);

const style = computed( () => { return {transform: 'rotate(' + rotate.value + 'deg)'} });

</script>
