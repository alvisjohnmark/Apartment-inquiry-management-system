import { defineStore } from "pinia";

export const useAdminAuthStore = defineStore("adminAuth", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        admin: null,
        adminName: "",
    }),
    actions: {
        async loginAdmin(email, password) {
            try {
                const response = await axios.post("/api/admin/login", {
                    email,
                    password,
                });

                this.adminToken = response.data.token;
                localStorage.setItem("admin_token", this.adminToken);

                await this.fetchAdmin();

                this.router.push("/admin/dashboard");
            } catch (error) {
                console.error("Admin login failed", error);
            }
        },
        async fetchAdmin() {
            if (this.adminToken) {
                try {
                    const response = await axios.get("/api/admin/dashboard", {
                        headers: {
                            Authorization: `Bearer ${this.adminToken}`,
                        },
                    });
                    this.admin = response.data.admin;
                } catch (error) {
                    console.error("Failed to fetch admin data", error);
                }
            }
        },
        logoutAdmin() {
            this.adminToken = null;
            this.admin = null;
            localStorage.removeItem("admin_token");
            this.router.push("/admin/login");
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
