<template>
  <div class="flex  gap-2 items-center text-sm font-sans font-thin">
    <!-- Выбор количества элементов -->
    <div class="flex items-center gap-2">
      <label for="perPage">per page:</label>
      <select v-model="localPerPage" @change="changePerPage" class="border-0 px-2 py-1 rounded">
        <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <!-- Панель навигации -->
    <div class="flex items-center gap-1">
      <last-icon
          :rotate="180"
          @click="goToPage(1)"
          :class="currentPage === 1 ? 'text-gray-300': 'text-gray-500 cursor-pointer hover:text-red-700' "
      />
      <next-icon
          :rotate="180"
          @click="goToPage(currentPage - 1)"
          :class="currentPage === 1 ? 'text-gray-300': 'text-gray-500 cursor-pointer hover:text-red-700' "
      />

      <div class="mx-2">{{ currentPage }}</div>
      <next-icon
          :rotate="0"
          @click="goToPage(currentPage + 1)"
          :class="currentPage === totalPages ? 'text-gray-300': 'text-gray-500 cursor-pointer hover:text-red-700'"
      />
      <last-icon
          :rotate="0"
          @click="goToPage(totalPages)"
          :class="currentPage === totalPages ? 'text-gray-300': 'text-gray-500 cursor-pointer hover:text-red-700'" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import NextIcon from "@/assets/next-icon.vue";
import LastIcon from "@/assets/last-icon.vue";

const props = defineProps<{
  totalItems: number
  page: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'update:perPage', count: number): void
}>();

const perPageOptions = [5, 10, 20, 50];
const localPerPage = ref(props.perPage);
const currentPage = computed(() => props.page);
const totalPages = computed(() => Math.ceil(props.totalItems / localPerPage.value));

function goToPage(page: number) {
  const validPage = Math.max(1, Math.min(page, totalPages.value));
  emit('update:page', validPage);
}

function changePerPage() {
  emit('update:perPage', localPerPage.value);
  emit('update:page', 1);
}

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
})
</script>

<style scoped>

</style>

