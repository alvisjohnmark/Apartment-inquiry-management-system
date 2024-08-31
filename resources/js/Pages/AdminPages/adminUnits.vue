<template>
    <section class="h-screen bg-[#f8f9fa] overflow-hidden">
        <div class="flex flex-col h-full">
            <!-- Navbar -->
            <nav
                class="h-24 w-full py-4 px-10 bg-[#495057] text-white flex justify-between items-center shadow-md"
            >
                <div class="flex items-center">
                    <img
                        src="../../../../public/images/placeholder.png"
                        alt="Logo"
                        class="w-8 h-8 mr-3"
                    />
                    <h1 class="text-lg font-semibold">
                        Welcome back, {{ unit.adminName }}!
                    </h1>
                </div>
                <div class="flex items-center space-x-4">
                    <button
                        class="hover:text-[#adb5bd] transition-colors duration-200"
                    >
                        <i class="fas fa-bell text-2xl"></i>
                    </button>
                </div>
            </nav>

            <div class="flex flex-1 overflow-hidden">
                <!-- Sidebar -->
                <div
                    class="w-1/5 p-6 bg-[#343a40] flex flex-col justify-between"
                >
                    <div>
                        <div class="mb-8 text-center">
                            <img
                                src="../../../../public/images/placeholder.png"
                                alt="Logo"
                                class="mx-auto w-28 h-28 rounded-full shadow-md"
                            />
                            <h2 class="mt-4 text-white text-lg font-semibold">
                                Anjos Apartment
                            </h2>
                        </div>
                        <!-- Sidebar Links -->
                        <ul class="space-y-3 text-lg mt-8">
                            <li>
                                <RouterLink
                                    to="/admin/dashboard"
                                    :class="[
                                        'flex items-center px-4 py-3 rounded-lg w-full transition-colors duration-200',
                                        route.path === '/admin/dashboard'
                                            ? 'bg-[#495057] text-white'
                                            : 'text-white hover:text-[#adb5bd]',
                                    ]"
                                >
                                    <i
                                        class="pl-1 pr-4 fas fa-tachometer-alt"
                                    ></i>
                                    <span>Dashboard</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    to="/admin/units"
                                    :class="[
                                        'flex items-center px-4 py-3 rounded-lg w-full transition-colors duration-200',
                                        route.path === '/admin/units'
                                            ? 'bg-[#495057] text-white'
                                            : 'text-white hover:text-[#adb5bd]',
                                    ]"
                                >
                                    <i class="pl-1 pr-4 fas fa-building"></i>
                                    <span>Units</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    to="/admin/tenants"
                                    :class="[
                                        'flex items-center px-4 py-3 rounded-lg w-full transition-colors duration-200',
                                        route.path === '/admin/tenants'
                                            ? 'bg-[#495057] text-white'
                                            : 'text-white hover:text-[#adb5bd]',
                                    ]"
                                >
                                    <i class="pr-4 fas fa-users"></i>
                                    <span>Tenants</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    to="/admin/inquiries"
                                    :class="[
                                        'flex items-center px-4 py-3 rounded-lg w-full transition-colors duration-200',
                                        route.path === '/admin/inquiries'
                                            ? 'bg-[#495057] text-white'
                                            : 'text-white hover:text-[#adb5bd]',
                                    ]"
                                >
                                    <i class="pl-1 pr-4 fas fa-envelope"></i>
                                    <span>Inquiries</span>
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink
                                    to="/admin/announcements"
                                    :class="[
                                        'flex items-center px-4 py-3 rounded-lg w-full transition-colors duration-200',
                                        route.path === '/admin/announcements'
                                            ? 'bg-[#495057] text-white'
                                            : 'text-white hover:text-[#adb5bd]',
                                    ]"
                                >
                                    <i class="pl-1 pr-4 fas fa-bullhorn"></i>
                                    <span>Announcements</span>
                                </RouterLink>
                            </li>
                            <li class="mt-8">
                                <button
                                    @click="logout"
                                    class="flex items-center px-4 py-3 w-full text-white hover:text-red-400 transition-colors duration-200"
                                >
                                    <i
                                        class="pl-1 pr-4 fas fa-sign-out-alt"
                                    ></i>
                                    <span>Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-4/5 p-6 bg-white overflow-y-auto">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold text-[#343a40]">
                            Units
                        </h1>
                        <button
                            class="bg-[#007bff] text-white px-4 py-2 rounded shadow-md hover:bg-[#0056b3] transition-all duration-200"
                            @click="announcement.toggleModal"
                        >
                            Add Unit
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div
                            class="p-6 bg-white rounded-lg shadow-lg border border-[#dee2e6] hover:shadow-xl transition-shadow duration-300"
                        >
                            <div
                                class="flex justify-between items-center border-b pb-4 mb-4"
                            >
                                <h2
                                    class="text-xl font-semibold text-[#343a40]"
                                >
                                    Unit 1
                                </h2>
                                <button
                                    @click="editUnit(unit)"
                                    class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                    <i class="fas fa-edit mr-2"></i>Edit
                                </button>
                            </div>

                            <div class="flex items-center mb-4">
                                <span class="mr-2 font-semibold"
                                    >Occupied:</span
                                >
                                <input
                                    type="checkbox"
                                    v-model="unit.available"
                                    class="form-checkbox h-5 w-5 text-blue-600"
                                />
                            </div>
                            <div class="mb-4">
                                <span class="font-semibold"
                                    >Tenant representative:</span
                                >
                                <p class="text-gray-700">John doe</p>
                            </div>
                            <div class="mb-4">
                                <span class="font-semibold"
                                    >Paid This Month:</span
                                >
                                <p>No</p>
                            </div>
                            <div class="mb-4">
                                <span class="font-semibold"
                                    >Overall rent month (August of 2024):</span
                                >
                                <p>7300</p>
                            </div>
                            <div class="flex justify-end gap-2">
                                <button
                                    class="mt-auto bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-all duration-200"
                                >
                                    Add Bills
                                </button>
                                <button
                                    class="mt-auto bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-all duration-200"
                                >
                                    View Concerns
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { unitsStore } from "./AdminStores/unitsStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const unit = unitsStore();
const route = useRoute();

onMounted(() => {
    unit.getAdminName();
});
const logout = () => {
    unit.logoutAdmin();
};
</script>

<style scoped>
body {
    font-family: "Inter", sans-serif;
    overflow: hidden;
}
</style>
