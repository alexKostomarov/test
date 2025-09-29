<template>
  <div class="relative">
    <input
        :type="show ? 'text' : 'password'"
        v-model="password"
        @blur="emit('update:password', password || '')"
        class="border rounded px-2 py-1 w-full pr-10"
    />
    <div class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" @click="show=!show">
      <hide-icon v-if="show"/>
      <view-icon v-else />
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import HideIcon from "@/assets/hide-icon.vue";
import ViewIcon from "@/assets/view-icon.vue";


const password = defineModel<string | null>('password');

const emit = defineEmits<{
  (e: 'update:password', text: string): void;
}>();


const show = ref<boolean>(false);



</script>