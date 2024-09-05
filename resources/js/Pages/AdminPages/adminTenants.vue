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
                        Welcome back, {{ tenant.adminName }}!
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
                                        currentRoute === '/admin/dashboard'
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
                                        currentRoute === '/admin/units'
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
                                        currentRoute === '/admin/tenants'
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
                                        currentRoute === '/admin/inquiries'
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
                                        currentRoute === '/admin/announcements'
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
                                    @click="tenant.logoutAdmin"
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

                <!-- Main Interface -->
                <div class="w-4/5 p-6 bg-white overflow-hidden flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold text-[#343a40]">
                            Tenants
                        </h1>
                        <button
                            class="bg-[#007bff] text-white px-4 py-2 rounded shadow-md hover:bg-[#0056b3] transition-all duration-200"
                            @click="tenant.toggleModal"
                        >
                            Add Tenant
                        </button>
                    </div>

                    <!-- Tenants Table -->
                    <div class="overflow-x-auto">
                        <table
                            class="min-w-full bg-white border border-[#dee2e6]"
                        >
                            <thead>
                                <tr>
                                    <th class="py-2 px-4 border-b text-center">Unit no.</th>
                                    <th class="py-2 px-4 border-b text-center">Name</th>
                                    <th class="py-2 px-4 border-b text-center">Username</th>
                                    <th class="py-2 px-4 border-b text-center">Email</th>
                                    <th class="py-2 px-4 border-b text-center">Address</th>
                                    <th class="py-2 px-4 border-b text-center">Phone</th>
                                    <th class="py-2 px-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="t in tenant.tenant_list" :key="t.id">
                                    <td class="py-2 px-4 border-b text-center">
                                        {{ t.id }}
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <span class="pr-1">{{t.first_name}}</span>
                                        <span class="pr-1">{{t.middle_name}}</span>
                                        <span>{{t.last_name}}</span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        {{ t.username }}
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        {{ t.email }}
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        {{ t.address }}
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        {{ t.phone_number }}
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <button
                                            @click="tenant.editTenant(tenant)"
                                            class="text-green-500 hover:text-green-700 transition-colors duration-200"
                                        >
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button
                                            @click="
                                                tenant.confirmDelete(tenant.id)
                                            "
                                            class="text-red-500 hover:text-red-700 transition-colors duration-200"
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="tenant.showModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
        >
            <div
                class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <h2
                    class="text-3xl font-semibold mb-8 text-gray-800 border-b text-center pb-4"
                >
                    {{
                        tenant.editingTenant ? "Edit Tenant" : "Add New Tenant"
                    }}
                </h2>
                <form @submit.prevent="tenant.submitTenant">
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            v-model="tenant.first_name"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Middle Name
                        </label>
                        <input
                            type="text"
                            v-model="tenant.middle_name"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            v-model="tenant.last_name"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            v-model="tenant.phone_number"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            v-model="tenant.address"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            v-model="tenant.email"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Tenant Login Username (required)
                        </label>
                        <input
                            type="text"
                            v-model="tenant.username"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Tenant Login Password (required)
                        </label>
                        <input
                            type="password"
                            v-model="tenant.password"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <!-- <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Unit ID
                        </label>
                        <input
                            type="number"
                            v-model="tenant.unit_number"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md"
                        />
                    </div> -->
                    <div class="mb-4">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Is Representative
                        </label>
                        <input
                            type="checkbox"
                            v-model="tenant.isRepresentative"
                            class="w-6 h-6"
                        />
                    </div>
                    <div class="flex justify-end mt-8">
                        <button
                            type="button"
                            @click="tenant.toggleModal()"
                            class="bg-gray-100 text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg border border-gray-300 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from "vue";
import moment from "moment";
import { useRoute } from "vue-router";
import { tenantsStore } from "./AdminStores/tenantsStore";

const tenant = tenantsStore();
const route = useRoute();
const currentRoute = route.path;

onMounted(() => {
    tenant.fetchTenants();
});

const logout = () => {
    tenant.logoutAdmin();
};
</script>
