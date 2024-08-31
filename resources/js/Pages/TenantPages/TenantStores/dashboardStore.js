import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const dashboardStore = defineStore("dashboardStore", {
    state: () => ({
        tenantToken: localStorage.getItem("tenant_token") || null,
        tenant: null,
    }),
    actions: {
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
    },
});
