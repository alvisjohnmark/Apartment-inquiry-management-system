import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

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
                toast.success("Login successful! Redirecting to dashboard...", {
                    autoClose: 2000, 
                });

                setTimeout(() => {
                    this.router.push("/admin/dashboard");
                }, 2000); 
            } catch (error) {
                console.error("Admin login failed", error);
                if (error.response && error.response.status === 401) {
                    toast.error(
                        "Invalid credentials. Please check your email and password.",
                        {
                            autoClose: 2000, 
                        }
                    );
                } else {
                    toast.error(
                        "An error occurred during login. Please try again later.",
                        {
                            autoClose: 2000, 
                        }
                    );
                }
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

                    toast.error(
                        "Failed to fetch admin data. Please try again.",
                        {
                            autoClose: 2000, 
                        }
                    );
                }
            }
        },
        logoutAdmin() {
            this.adminToken = null;
            this.admin = null;
            localStorage.removeItem("admin_token");

            toast.error("Logged out successfully.", {
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
