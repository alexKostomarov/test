<template>
  <svg :fill="stroke" :width="size" :height="size" viewBox="0 0 24 24" id="next"  xmlns="http://www.w3.org/2000/svg" :style="style">
    <path
        id="primary"
        d="M17,12,5,21V3Z"
        :style="{
          fill: 'none',
          stroke: stroke,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 1
        }"
    />
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
