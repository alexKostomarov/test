<template>
  <div class="p-2 bg-white font-sans font-thin text-sm">

    <div class="grid grid-cols-3 gap-5">
      <!-- метки -->
      <div>
        <label class="block  text-gray-500 mb-1 ">
          Метки
          <span v-if="errors.tags" class="text-red-500 text-xs">( {{ errors.tags }} )</span>
        </label>
        <div :class="errors.tags ? 'error' : ''">
          <input
              type="text"
              v-model="tags"
              @blur="save"
              placeholder="Введите метки через ;"
              class="border rounded px-2 py-1 w-full h-8"
              :class="errors.tags ? 'border-red-500' : ''"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <!-- Тип записи -->
        <div>
          <label class="block text-gray-500 mb-1 ">Тип записи</label>
          <select v-model="localAccount.type" @change="save" class="border rounded px-2 py-1 w-full h-8">
            <option value="LDAP">LDAP</option>
            <option value="Local">Локальная</option>
          </select>
        </div>
        <!-- Логин -->
        <div>
          <label class="block  text-gray-500 mb-1 ">
            Логин
            <span v-if="errors.login" class="text-red-500 text-xs">( {{ errors.login }} )</span>
          </label>
          <div :class="errors.login ? 'error' : ''">
            <input
                type="text"
                v-model="localAccount.login"
                @blur="save"
                class="border rounded px-2 py-1 w-full h-8"

            />
          </div>


        </div>
      </div>


      <div class="grid grid-cols-8 gap-2">
        <!-- Пароль -->
        <div class="col-span-6">
          <div v-if="localAccount.type === 'Local'">
            <label class="block font-semibold mb-1">
              Пароль
              <span v-if="errors.password" class="text-red-500 text-sm">( {{ errors.password }} )</span>
            </label>

            <div :class="errors.password ? 'error' : ''">
              <password-field
                  v-model:password="localAccount.password"
                  @update:password="save"
                  :class="errors.login ? 'error' : ''"
              />
            </div>

          </div>
        </div>
        <!-- Кнопка удаления -->
        <div class="col-span-1 col-start-8 flex items-end justify-center">

          <remove-icon
              @click="actions.remove(localAccount.id)"
              class="text-gray-500 hover:text-red-700 cursor-pointer mx-auto"
              :size="32"
          />
        </div>


      </div>

    </div>
</div>
</template>

<style scoped>
.error {
  box-shadow: inset 0 0 6px rgba(220, 38, 38, 0.6); /* красная внутренняя тень */
  border-radius: 0.375rem;   /* rounded */
}
</style>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import { Account } from '@/classes/Account';
import {Tag} from "@/classes/Tag.ts";
import { AccountErrors, AccountValidator} from "@/classes/AccountValidator.ts";

import {useAccountsStore} from "@/stores/AccountsStore.ts";
import RemoveIcon from "@/assets/remove-icon.vue";
import PasswordField from "@/components/common/passwordField.vue";

const props = defineProps<{account: Account}>();

const {actions} = useAccountsStore();

//копия пришедшего в пропсе объекта
const localAccount = reactive(props.account.clone());

//модель для тегов - строка, а в localAccount - массив
const tags = ref<string>(localAccount.tags.map(l => l.text).join(';'));

//Ошибки
const errors = reactive<AccountErrors>(new AccountErrors());

const save = async () => {

  const err = AccountValidator.validate(localAccount);

  Object.assign(errors, err);

  if(!err.empty()) return;

  // парсим метки
  localAccount.tags = tags.value.split(';').map(s => s.trim()).filter(Boolean).map<Tag>(s => ({ text: s }) );

  await actions.update(localAccount);

}


//изменение пропса
watch(() => props.account, newAcc => {
  Object.assign(localAccount, newAcc.clone());
  tags.value = localAccount.tags.map(l => l.text).join(';');
}, { deep: true });
</script>
