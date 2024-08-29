<template>
    <section class="h-screen">
        <nav class="flex justify-between py-8 px-16 bg-[#b5c9aa]">
            <div class="text-[#718355] font-bold py-2 px-4 text-3xl">
                <h1>AnJos Apartment</h1>
            </div>
            <div class="text-[#718355] font-bold py-2 px-4 text-xl">
                <h1>Welcome back! {{ adminAuthStore.adminName }}</h1>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="flex h-full">
            <div class="w-1/5 p-4 bg-[#97a97c]">
                <div class="mb-6">
                    <img
                        src="../../../../public/images/placeholder.png"
                        alt="Logo"
                        class="mx-auto w-32 h-32 rounded-full"
                    />
                </div>
                <ul class="space-y-4 text-lg py-8">
                    <li class="flex justify-start pl-6">
                        <RouterLink
                            to="/admin/dashboard"
                            class="flex items-center text-gray-600 hover:text-[#e9f5db]"
                        >
                            <i class="pr-6 fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </RouterLink>
                    </li>
                    <li class="flex justify-start pl-6">
                        <RouterLink
                            to="/admin/units"
                            class="flex items-center text-gray-600 hover:text-[#e9f5db]"
                        >
                            <i class="pr-7 fas fa-building"></i>
                            <span>Units</span>
                        </RouterLink>
                    </li>
                    <li class="flex justify-start pl-6">
                        <RouterLink
                            to="/admin/tenants"
                            class="flex items-center text-gray-600 hover:text-[#e9f5db]"
                        >
                            <i class="pr-5 fas fa-users"></i>
                            <span>Tenants</span>
                        </RouterLink>
                    </li>
                    <li class="flex justify-start pl-6">
                        <RouterLink
                            to="/admin/inquiries"
                            class="flex items-center text-gray-600 hover:text-[#e9f5db]"
                        >
                            <i class="pr-6 fas fa-envelope"></i>
                            <span>Inquiries</span>
                        </RouterLink>
                    </li>
                    <li class="flex justify-start pl-6">
                        <button
                            @click="logout"
                            class="flex items-center text-gray-600 hover:text-red-500"
                        >
                            <i class="pr-6 fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="w-4/5 p-4 bg-[#e9f5db]">Main interface</div>
        </div>
    </section>
</template>

<script setup>
import { useAdminAuthStore } from "../HomePages/Stores/adminAuth";
import { onMounted } from "vue";

const adminAuthStore = useAdminAuthStore();

onMounted(() => {
    adminAuthStore.getAdminName();
});

const logout = () => {
    adminAuthStore.logoutAdmin();
};
</script>

<style scoped></style>
