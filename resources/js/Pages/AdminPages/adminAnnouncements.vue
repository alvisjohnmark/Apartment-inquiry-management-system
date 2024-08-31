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
                        Welcome back, {{ announcement.adminName }}!
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

                <!-- Main Interface -->
                <div class="w-4/5 p-6 bg-white overflow-hidden flex flex-col">
                    <div class="flex justify-between items-center mb-4">
                        <h1 class="text-2xl font-bold text-[#343a40]">
                            Announcements
                        </h1>
                        <button
                            class="bg-[#007bff] text-white px-4 py-2 rounded shadow-md hover:bg-[#0056b3] transition-all duration-200"
                            @click="announcement.toggleModal"
                        >
                            Add Announcement
                        </button>
                    </div>
                    <div class="announcements-container flex-1 overflow-y-auto">
                        <div
                            v-for="announce in announcement.announcement_list"
                            :key="announce.id"
                            class="p-6 bg-white rounded-lg shadow-md border border-[#dee2e6] hover:shadow-lg transition-shadow duration-300 mb-4"
                        >
                            <div class="flex justify-between items-center">
                                <h2
                                    class="text-xl font-semibold text-[#495057]"
                                >
                                    {{ announce.title }}
                                </h2>
                                <p class="text-[#6c757d]">
                                    {{
                                        moment(announce.created_at).format(
                                            "MMMM Do YYYY"
                                        )
                                    }}
                                </p>
                            </div>
                            <p class="mt-4 text-[#6c757d]">
                                {{ announce.content }}
                            </p>
                            <div class="flex justify-end gap-2 text-xl">
                                <button
                                    @click="
                                        announcement.editAnnouncement(announce)
                                    "
                                    class="text-green-500 hover:text-green-700 transition-colors duration-200"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button
                                    @click="
                                        announcement.confirmDelete(announce.id)
                                    "
                                    class="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="announcement.showModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
        >
            <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
                <h2
                    class="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4"
                >
                    {{
                        announcement.editingAnnouncement
                            ? "Edit Announcement"
                            : "Add New Announcement"
                    }}
                </h2>
                <form @submit.prevent="announcement.submitAnnouncement">
                    <div class="mb-6">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                            >Title</label
                        >
                        <input
                            type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                            v-model="announcement.title"
                            required
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            class="block text-gray-600 text-sm font-medium mb-2"
                            >Content</label
                        >
                        <textarea
                            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out h-48 resize-none"
                            v-model="announcement.content"
                            required
                        ></textarea>
                    </div>
                    <div class="flex justify-end mt-8">
                        <button
                            type="button"
                            @click="announcement.toggleModal()"
                            class="bg-gray-100 text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg border border-gray-300 mr-4 transition duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out"
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
import { announcementStore } from "./AdminStores/announcementStore";
import { onMounted } from "vue";
import moment from "moment";
import { useRoute } from "vue-router";

const announcement = announcementStore();
const route = useRoute();
const currentRoute = route.path;

onMounted(() => {
    announcement.getAdminName();
    announcement.fetchAnnouncements();
});

const logout = () => {
    announcement.logoutAdmin();
};
</script>
