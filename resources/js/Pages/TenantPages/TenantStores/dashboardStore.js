import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const dashboardStore = defineStore("dashboardStore", {
    state: () => ({
        tenantToken: localStorage.getItem("tenant_token") || null,
        tenant: null,
        announcement_list: [],
        tenant_name: "",
        title: "",
        content: "",
        showModal: false,
    }),
    actions: {
        getTenantName() {
            axios
                .get("/api/tenant/name")
                .then((response) => {
                    this.tenant_name = response.data.name;
                })
                .catch((error) => {
                    console.error("Error fetching tenant name", error);
                });
        },
        logoutTenant() {
            this.tenantToken = null;
            this.tenant = null;
            localStorage.removeItem("tenant_token");

            toast.success("Logged out successfully.", {
                autoClose: 3000,
            });
            setTimeout(() => {
                this.router.push("/tenant/login");
            }, 2000);
        },
        async fetchAnnouncements() {
            try {
                const response = await axios.get(
                    `/api/admin/getAnnouncements`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.adminToken}`,
                        },
                    }
                );
                this.announcement_list = response.data;
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        },
        toggleModal() {
            this.showModal = !this.showModal;
            if (!this.showModal) {
                this.title = "";
                this.content = "";
            }
        },
    },
});
