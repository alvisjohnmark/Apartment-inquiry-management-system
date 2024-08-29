import { defineStore } from "pinia";
import axios from "axios";
import { toast } from "vue3-toastify";

export const useTenantAuthStore = defineStore("tenantAuth", {
    state: () => ({
        tenantToken: localStorage.getItem("tenant_token") || null,
        tenant: null,
    }),
    actions: {
        async loginTenant(username, password) {
            try {
                const response = await axios.post("/api/tenant/login", {
                    username,
                    password,
                });

                this.tenantToken = response.data.token;
                localStorage.setItem("tenant_token", this.tenantToken);

                await this.fetchTenant();
                toast.success("Login successful! Redirecting to dashboard...", {
                    autoClose: 3000,
                });

                setTimeout(() => {
                    this.router.push("/tenant/dashboard");
                }, 2000);
            } catch (error) {
                console.error("Tenant login failed", error);
                if (error.response && error.response.status === 401) {
                    toast.error(
                        "Invalid credentials. Please check your username and password.",
                        {
                            autoClose: 3000,
                        }
                    );
                } else {
                    toast.error(
                        "An error occurred during login. Please try again later.",
                        {
                            autoClose: 3000,
                        }
                    );
                }
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

                    toast.error(
                        "Failed to fetch tenant data. Please try again.",
                        {
                            autoClose: 3000,
                        }
                    );
                }
            }
        },
        logoutTenant() {
            this.tenantToken = null;
            this.tenant = null;
            localStorage.removeItem("tenant_token");

            toast.error("Logged out successfully.", {
                autoClose: 3000,
            });
            setTimeout(() => {
                this.router.push("/tenant/login");
            }, 2000);
        },
    },
});
