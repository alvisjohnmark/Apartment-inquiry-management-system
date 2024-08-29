<template>
    <section class="h-screen bg-[#f8f9fa]">
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
                        Welcome back, {{ adminAuthStore.adminName }}!
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

            <div class="flex h-full">
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
                        <ul class="space-y-6 text-lg">
                            <li class="flex justify-start">
                                <RouterLink
                                    to="/admin/dashboard"
                                    class="flex items-center text-white hover:text-[#adb5bd] transition-colors duration-200"
                                >
                                    <i
                                        class="pl-1 pr-5 fas fa-tachometer-alt"
                                    ></i>
                                    <span>Dashboard</span>
                                </RouterLink>
                            </li>
                            <li class="flex justify-start">
                                <RouterLink
                                    to="/admin/units"
                                    class="flex items-center text-white hover:text-[#adb5bd] transition-colors duration-200"
                                >
                                    <i class="pl-1 pr-6 fas fa-building"></i>
                                    <span>Units</span>
                                </RouterLink>
                            </li>
                            <li class="flex justify-start">
                                <RouterLink
                                    to="/admin/tenants"
                                    class="flex items-center text-white hover:text-[#adb5bd] transition-colors duration-200"
                                >
                                    <i class="pr-5 fas fa-users"></i>
                                    <span>Tenants</span>
                                </RouterLink>
                            </li>
                            <li class="flex justify-start">
                                <RouterLink
                                    to="/admin/inquiries"
                                    class="flex items-center text-white hover:text-[#adb5bd] transition-colors duration-200"
                                >
                                    <i class="pl-1 pr-5 fas fa-envelope"></i>
                                    <span>Inquiries</span>
                                </RouterLink>
                            </li>
                            <button
                                @click="logout"
                                class="flex items-center text-white hover:text-red-400 transition-colors duration-200 mt-8"
                            >
                                <i class="pl-1 pr-5 fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </button>
                        </ul>
                    </div>
                </div>

                <!-- Main Interface -->
                <div class="w-4/5 p-6 bg-white">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-home text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Total Units
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ totalUnits }}
                            </p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-door-open text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Occupied Units
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ occupiedUnits }}
                            </p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-dollar-sign text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Payments This Month
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ monthlyPayments }}
                            </p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-envelope-open-text text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Pending Inquiries
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ pendingInquiries }}
                            </p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-building text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Available Units
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ availableUnits }}
                            </p>
                        </div>
                        <div
                            class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
                        >
                            <i
                                class="fas fa-user-friends text-3xl text-[#007bff] mb-4"
                            ></i>
                            <h2 class="text-xl font-semibold text-[#212529]">
                                Total Tenants
                            </h2>
                            <p class="text-4xl font-bold text-[#007bff]">
                                {{ totalTenants }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useAdminAuthStore } from "../HomePages/Stores/adminAuth";
import { ref, onMounted } from "vue";

const adminAuthStore = useAdminAuthStore();

onMounted(() => {
    adminAuthStore.getAdminName();
});

// Placeholder values for counters
const totalUnits = ref(50); // Example value, replace with actual data
const occupiedUnits = ref(35); // Example value, replace with actual data
const monthlyPayments = ref("$15,000"); // Example value, replace with actual data
const pendingInquiries = ref(5); // Example value, replace with actual data
const availableUnits = ref(15); // Example value, replace with actual data
const totalTenants = ref(40); // Example value, replace with actual data

const logout = () => {
    adminAuthStore.logoutAdmin();
};
</script>

<style scoped>
body {
    font-family: "Inter", sans-serif;
}
</style>
