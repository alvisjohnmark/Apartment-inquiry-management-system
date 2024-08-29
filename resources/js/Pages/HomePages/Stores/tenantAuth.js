import { defineStore } from "pinia";

export const useTenantAuthStore = defineStore("tenantAuth", {
    state: () => ({
        tenantToken: localStorage.getItem("tenant_token") || null,
        tenant: null,
    }),
    actions: {
        async loginTenant(email, password) {
            try {
                const response = await axios.post("/api/tenant/login", {
                    email,
                    password,
                });

                this.tenantToken = response.data.token;
                localStorage.setItem("tenant_token", this.tenantToken);

                await this.fetchTenant();

                this.router.push("/tenant/dashboard");
            } catch (error) {
                console.error("Tenant login failed", error);
            }
        },
        async fetchTenant() {
            if (this.tenantToken) {
                try {
                    const response = await axios.get("/api/tenant/dashboard", {
                        headers: {
                            Authorization: `Bearer ${this.tenantToken}`,
                        },
                    });
                    this.tenant = response.data.tenant;
                } catch (error) {
                    console.error("Failed to fetch tenant data", error);
                }
            }
        },
        logoutTenant() {
            this.tenantToken = null;
            this.tenant = null;
            localStorage.removeItem("tenant_token");
            this.router.push("/tenant/login");
        },
    },
});
