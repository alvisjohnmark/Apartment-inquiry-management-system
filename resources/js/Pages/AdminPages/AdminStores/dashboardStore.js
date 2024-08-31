import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const dashboardStore = defineStore("dashboardStore", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        admin: null,
        adminName: "",
    }),
    actions: {
        logoutAdmin() {
            this.adminToken = null;
            this.admin = null;
            localStorage.removeItem("admin_token");

            toast.success("Logged out successfully.", {
                autoClose: 2000,
            });

            setTimeout(() => {
                this.router.push("/admin/login");
            }, 2000);
        },
        getAdminName() {
            axios
                .get("/api/admin/name")
                .then((response) => {
                    this.adminName = response.data.adminName;
                })
                .catch((error) => {
                    console.error("Error fetching admin name", error);
                });
        },
    },
});
