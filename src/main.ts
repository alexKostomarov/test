import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {LocalStorage} from "@/repo/LocalStorage.ts";
import {Account} from "@/classes/Account.ts";
import App from './App.vue';
import './index.css';

const app = createApp(App);
const pinia = createPinia();

const repo = new LocalStorage<Account>();
app.provide('accountsRepo', repo);

//в сторе используется этот репозиотрий
app.use(pinia);

app.mount('#app');
