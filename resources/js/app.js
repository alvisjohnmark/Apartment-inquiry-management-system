import "./bootstrap";
import "../css/app.css";
import './axios'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { toast } from 'vue3-toastify';
import { createApp, markRaw } from "vue/dist/vue.esm-bundler.js";
import { createRouter, createWebHistory, useRoute } from "vue-router";
import { createPinia } from "pinia";
import { routes } from "./route";

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.route = markRaw(useRoute());
});

const app = createApp({});

app.use(Vue3Toastify);
app.use(pinia);
app.use(router);
app.mount("#app");
