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
                    <h1 class="text-lg">Welcome back, {{ unit.adminName }}!</h1>
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
                            <h2 class="mt-4 text-white text-lg">
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
                        <h1 class="text-2xl font-bold text-[#343a40]">Units</h1>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div
                            v-for="u in unit.unit_list"
                            :key="u.id"
                            class="p-4 bg-white rounded-lg shadow-lg border border-[#dee2e6] hover:shadow-xl transition-shadow duration-300"
                        >
                            <div
                                class="flex justify-between items-center border-b pb-4 mb-4"
                            >
                                <h2 class="text-xl text-[#343a40]">
                                    Unit {{ u.id }}
                                </h2>
                                <button
                                    @click="unit.openEditModal(u)"
                                    class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                    <i class="fas fa-edit mr-2"></i>Edit
                                </button>
                            </div>

                            <div class="mb-4">
                                <span class=""
                                    >Tenant representative:
                                    <span v-if="u.tenants.length > 0">
                                        <span>{{
                                            u.representative.first_name
                                        }}</span>
                                    </span>
                                    <div v-else>
                                        <span>No representative assigned</span>
                                    </div></span
                                >
                            </div>
                            <div class="flex items-center mb-4">
                                <span class="mr-2">Occupied:</span>
                                <div class="toggle-switch">
                                    <input
                                        type="checkbox"
                                        :id="'toggleOccupied' + u.id"
                                        v-model="u.availability"
                                        @change="unit.updateOccupiedStatus(u)"
                                    />
                                    <label
                                        :for="'toggleOccupied' + u.id"
                                        class="switch"
                                    ></label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <span class="">Capacity: {{ u.capacity }}</span>
                            </div>
                            <div class="mb-4">
                                <span class=""
                                    >Rent per month: {{ u.rent_cost }}</span
                                >
                            </div>
                            <div class="flex justify-end gap-2">
                                <button
                                    @click="unit.openConcernsModal(unit)"
                                    class="mt-auto bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-all duration-200"
                                >
                                    View Concerns
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="unit.showConcernsModal"
                        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    >
                        <div class="bg-white w-1/3 rounded-lg shadow-lg p-6">
                            <h2 class="text-2xl mb-4">
                                Concerns for Unit {{ unit.selectedUnit.id }}
                            </h2>
                            <div
                                v-for="concern in unit.selectedUnit.concerns"
                                :key="concern.id"
                                class="p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
                            >
                                <h3 class="font-bold text-xl">
                                    {{ concern.title }}
                                </h3>
                                <p class="mt-2">{{ concern.content }}</p>
                            </div>
                            <button
                                @click="unit.closeConcernsModal"
                                class="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition-all duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    <!-- Edit Unit Modal -->
                    <div
                        v-if="unit.showEditModal"
                        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    >
                        <div class="bg-white w-1/3 rounded-lg shadow-lg p-6">
                            <h2 class="text-2xl mb-4">
                                Edit Unit {{ unit.selectedUnit.id }}
                            </h2>
                            <input
                                v-model="unit.selectedUnit.capacity"
                                class="mb-4 p-2 w-full border rounded"
                                placeholder="Capacity"
                            />
                            <input
                                v-model="unit.selectedUnit.rent_cost"
                                class="mb-4 p-2 w-full border rounded"
                                placeholder="Rent Cost"
                            />
                            <div class="flex justify-end gap-2">
                                <button
                                    @click="unit.updateUnit"
                                    class="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition-all duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    @click="unit.closeEditModal"
                                    class="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition-all duration-200"
                                >
                                    Close
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
    unit.fetchUnits();
});

const logout = () => {
    unit.logoutAdmin();
};
</script>

<style scoped>
body {
    overflow: hidden;
}

.toggle-switch {
    display: inline-block;
    position: relative;
    width: 34px;
    height: 18px;
}

.toggle-switch input[type="checkbox"] {
    display: none;
}

.toggle-switch .switch {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 18px;
    width: 100%;
    height: 100%;
    transition: background-color 0.3s ease-in-out;
}

.toggle-switch .switch::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch input[type="checkbox"]:checked + .switch {
    background-color: #141619;
}

.toggle-switch input[type="checkbox"]:checked + .switch::before {
    transform: translateX(16px);
}
</style>
