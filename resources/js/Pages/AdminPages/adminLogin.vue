<template>
  <section class="h-screen background flex justify-center items-center">
    <div class="relative w-1/4 mx-auto p-8 border border-[#adb5bd] rounded bg-[#f8f9fa]">
      <RouterLink
        to="/"
        class="absolute top-2 right-2 text-2xl text-[#f8f9fa] bg-[#495057] w-8 h-8 text-center rounded-full flex items-center justify-center"
      >
        X
      </RouterLink>
      <h1 class="text-2xl font-bold text-center text-[#495057] mb-6">
        Admin Login
      </h1>
      <form @submit.prevent="loginAdmin">
        <div class="input-group mb-4">
          <label for="email" class="block text-[#495057] mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full px-4 py-2 border border-[#adb5bd] rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          />
        </div>
        <div class="input-group mb-6">
          <label for="password" class="block text-[#495057] mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full px-4 py-2 border border-[#adb5bd] rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 bg-[#007bff] text-white font-bold rounded hover:bg-[#0056b3] transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminAuthStore } from '../HomePages/Stores/adminAuth';

const email = ref('');
const password = ref('');
const adminAuthStore = useAdminAuthStore();

const loginAdmin = () => {
  adminAuthStore.loginAdmin(email.value, password.value);
};
</script>

<style scoped>
.background {
  background-color: #adb5bd;
}
</style>
