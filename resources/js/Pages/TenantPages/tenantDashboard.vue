<template>
    <section class="tenant-dashboard h-screen bg-[#f8f9fa] overflow-hidden">
        <div class="flex flex-col h-full">
            <!-- Header -->
            <header
                class="h-24 w-full py-4 px-10 bg-[#495057] text-white flex justify-between items-center shadow-md"
            >
                <h1 class="text-lg">Tenant Dashboard</h1>
                <nav>
                    <ul class="flex space-x-4">
                        <li>
                            <RouterLink
                                to="/tenant/concerns"
                                class="text-red-400 hover:text-red-600"
                            >
                                Concerns
                            </RouterLink>
                        </li>
                        <li>
                            <button
                                @click="tenant.logoutTenant"
                                class="text-red-400 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <main class="flex-1 p-6 bg-white">
                <h2 class="text-2xl font-bold text-[#343a40]">
                    Welcome back! {{ tenant.tenant_name }}
                </h2>
                <br>
                <hr>
                <br>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-[#343a40]">
                        Announcements
                    </h2>
                    <button
                        @click="tenant.toggleModal()"
                        class="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-all duration-200"
                    >
                        Make Concern
                    </button>
                </div>
                <div
                    v-for="announce in tenant.announcement_list"
                    :key="announce.id"
                    class="p-6 bg-white rounded-lg shadow-md border border-[#dee2e6] hover:shadow-lg transition-shadow duration-300 mb-4"
                >
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-semibold text-[#495057]">
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
                    <p class="mt-4 text-[#6c757d]">{{ announce.content }}</p>
                </div>
            </main>

            <!-- Make Concern Modal -->
            <div
                v-if="tenant.showModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                <div class="bg-white w-1/3 rounded-lg shadow-lg p-6">
                    <h2 class="text-2xl mb-4">Make Announcement</h2>
                    <input
                        v-model="tenant.title"
                        class="mb-4 p-2 w-full border rounded"
                        placeholder="Title"
                    />
                    <textarea
                        v-model="tenant.content"
                        class="mb-4 p-2 w-full border rounded"
                        placeholder="Content"
                        rows="4"
                    ></textarea>
                    <div class="flex justify-end gap-2">
                        <button
                            @click="tenant.createAnnouncement"
                            class="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition-all duration-200"
                        >
                            Save
                        </button>
                        <button
                            @click="tenant.toggleModal()"
                            class="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition-all duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { dashboardStore } from "./TenantStores/dashboardStore";
import moment from "moment";
import { onMounted } from "vue";

const tenant = dashboardStore();

onMounted(() => {
    tenant.fetchAnnouncements();
    tenant.getTenantName();
});
</script>

<style scoped>
.tenant-dashboard {
    padding: 0;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #495057;
    color: white;
}

nav ul {
    display: flex;
    gap: 1rem;
}

nav ul li a,
nav ul li button {
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s;
}

nav ul li button {
    border: none;
}

nav ul li a:hover,
nav ul li button:hover {
    color: #adb5bd;
}

main {
    padding: 2rem;
    background-color: #f8f9fa;
}

button {
    cursor: pointer;
}
</style>
