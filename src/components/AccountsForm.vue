<template>
  <div class="container">
    <div class="text-base font-bold mb-4 text-left font-sans flex justify-start items-center">
      <div>Учетные записи</div>
      <div
          class="
            flex justify-center items-center bg-white border border-gray-300 text-[1.5em] text-gray-700
            w-8 h-8 rounded-md cursor-pointer hover:bg-gray-200 ml-5
          "
          @click="actions.add"
      >
        +
      </div>
      <pagination-controls
          class="ml-auto mr-0"
          :total-items="state.total"
          :page="state.page"
          :per-page="state.perPage"
          @update:page="actions.setPage($event)"
          @update:perPage="actions.setPerPage($event)"
      />
    </div>

    <div class="bg-gray-200 px-3 py-1 rounded-md flex justify-start items-center">
      <question-icon class="text-gray-400"/>
      <div class="text-sm ml-3 text-gray-600">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ';'</div>
    </div>


    <div v-if="state.paginatedAccounts.length === 0" class="mt-5 text-center text-gray-800 font-sans font-thin">
      Empty list
    </div>

    <AccountItem v-for="account in state.paginatedAccounts" :account="account" v-else  class="mt-5" :key="account.id"/>



  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import { useAccountsStore } from '@/stores/AccountsStore.ts';
import AccountItem from "@/components/AccountsForm/AccountItem.vue";
import QuestionIcon from "@/assets/question-icon.vue";
import PaginationControls from "@/components/common/PaginationControls.vue";

const {state, actions} = useAccountsStore();

onMounted(async () => {
  await actions.load();
});

</script>