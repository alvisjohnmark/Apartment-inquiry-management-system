<template>
  <section class="h-screen background flex justify-center items-center">
    <div class="relative w-1/4 mx-auto p-8 border border-gray-300 rounded bg-[#f9f9f9]">
      <RouterLink
        to="/"
        class="absolute top-2 right-2 text-2xl text-[#e9f5db] bg-[#718355] w-8 h-8 text-center rounded-full flex items-center justify-center"
      >
        X
      </RouterLink>
      <h1 class="text-2xl font-bold text-center text-[#718355] mb-6">
        Tenant Login
      </h1>
      <form @submit.prevent="loginTenant">
        <div class="input-group mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          />
        </div>
        <div class="input-group mb-6">
          <label for="password" class="block text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-[#718355] text-white font-bold rounded hover:bg-[#0056b3] transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useTenantAuthStore } from '../HomePages/Stores/tenantAuth';

const email = ref('');
const password = ref('');
const tenantAuthStore = useTenantAuthStore();

const loginTenant = () => {
  tenantAuthStore.loginTenant(email.value, password.value);
};
</script>

<style scoped>
.background {
  background-color: #e9f5db;
}
</style>
