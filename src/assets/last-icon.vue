<template>
  <svg :fill="stroke" :width="size" :height="size" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :style="style">
		<path d="M4.028,20.882a1,1,0,0,0,1.027-.05l12-8a1,1,0,0,0,0-1.664l-12-8A1,1,0,0,0,3.5,4V20A1,1,0,0,0,4.028,20.882ZM5.5,5.869,14.7,12,5.5,18.131ZM18.5,18V6a1,1,0,0,1,2,0V18a1,1,0,0,1-2,0Z"/>
	</svg>

</template>


<script setup lang="ts">
import {computed} from 'vue';

const props = withDefaults(defineProps<{
  size?: number, rotate?: number
}>(), { size: 16, rotate: 0});

const stroke = 'currentColor';

const style = computed( () => { return {transform: 'rotate(' + props.rotate + 'deg)'} });

</script>
