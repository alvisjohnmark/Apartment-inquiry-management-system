import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

export const tenantsStore = defineStore("tenantsStore", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        tenant_list: [],
        showModal: false,
        editingTenant: null,

        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        email: "",
        username: "",
        password: "",
        isRepresentative: false,
    }),
    actions: {
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
        async fetchTenants() {
            try {
                const response = await axios.get("/api/admin/getTenants", {
                    headers: {
                        Authorization: `Bearer ${this.adminToken}`,
                    },
                });
                this.tenant_list = response.data.tenants;
                console.log(this.tenant_list)
            } catch (error) {
                console.error("Error fetching tenants:", error);
            }
        },
        toggleModal() {
            this.showModal = !this.showModal;
            if (!this.showModal) {
                this.resetForm();
            }
        },
        resetForm() {
            this.first_name = "";
            this.middle_name = "";
            this.last_name = "";
            this.phone_number = "";
            this.address = "";
            this.email = "";
            this.username = "";
            this.password = "";
            this.isRepresentative = null;
            this.editingTenant = null;
        },
        async submitTenant() {
            if (
                !this.first_name ||
                !this.last_name ||
                !this.phone_number ||
                !this.address ||
                !this.email ||
                !this.username ||
                !this.password
            ) {
                Swal.fire({
                    icon: "error",
                    title: "All required fields must be filled.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                return;
            }

            const tenantData = {
                first_name: this.first_name,
                middle_name: this.middle_name || "",
                last_name: this.last_name,
                phone_number: this.phone_number,
                address: this.address,
                email: this.email,
                username: this.username,
                password: this.password,
                unit_number: this.unit_number,
                isRepresentative: this.isRepresentative || false,
            };

            Swal.fire({
                title: this.editingTenant ? "Confirm Update" : "Confirm Add",
                text: this.editingTenant
                    ? "Are you sure you want to update this tenant?"
                    : "Are you sure you want to add this tenant?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (this.editingTenant) {
                            await axios.put(
                                `/api/admin/tenants/${this.editingTenant.id}`,
                                tenantData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.adminToken}`,
                                    },
                                }
                            );
                            toast.success("Tenant updated successfully.", {
                                autoClose: 2000,
                            });
                        } else {
                            await axios.post(
                                "/api/admin/saveTenant",
                                tenantData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.adminToken}`,
                                    },
                                }
                            );
                            toast.success("Tenant added successfully.", {
                                autoClose: 2000,
                            });
                        }
                        this.fetchTenants();
                        this.toggleModal();
                    } catch (error) {
                        console.error("Error submitting tenant:", error);
                    }
                }
            });
        },

        editTenant(tenant) {
            this.editingTenant = tenant;
            this.name = tenant.name;
            this.email = tenant.email;
            this.phone = tenant.phone;
            this.toggleModal();
        },
        confirmDelete(id) {
            Swal.fire({
                title: "Are you sure you want to delete this tenant?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Proceed",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/admin/tenants/${id}`, {
                            headers: {
                                Authorization: `Bearer ${this.adminToken}`,
                            },
                        });
                        toast.success("Tenant deleted successfully.", {
                            autoClose: 2000,
                        });
                        this.fetchTenants();
                    } catch (error) {
                        console.error("Error deleting tenant:", error);
                    }
                }
            });
        },
    },
});
