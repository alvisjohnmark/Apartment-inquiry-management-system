<template>
    <section class="h-screen background flex justify-center items-center p-4">
        <div
            class="relative w-full max-w-md mx-auto p-6 sm:p-8 border rounded bg-white shadow-xl"
        >
            <RouterLink
                to="/"
                class="absolute top-2 right-2 text-2xl text-[#141619] w-10 h-8 text-center rounded-xl flex items-center justify-center"
            >
                <i class="fa-solid fa-xmark"></i>
            </RouterLink>
            <h1 class="text-2xl font-bold text-center text-[#495057] mb-6">
                Tenant Login
            </h1>
            <form @submit.prevent="tenant.loginTenant">
                <div class="input-group mb-4">
                    <label for="username" class="block text-[#495057] mb-2">
                        Username
                    </label>
                    <input
                        v-model="tenant.username"
                        type="text"
                        id="username"
                        required
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#141619]"
                    />
                </div>
                <div class="input-group mb-6">
                    <label for="password" class="block text-[#495057] mb-2">
                        Password
                    </label>
                    <input
                        v-model="tenant.password"
                        type="password"
                        id="password"
                        required
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#141619]"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full py-2 bg-[#141619] text-white font-bold rounded hover:bg-[#212a31] transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { useTenantAuthStore } from "./TenantStores/tenantAuth";
const tenant = useTenantAuthStore();
</script>

<style scoped>
.background {
    background-color: #191919;
}
</style>
