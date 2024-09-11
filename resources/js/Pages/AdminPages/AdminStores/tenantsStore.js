import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

export const tenantsStore = defineStore("tenantsStore", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        tenant_list: [],
        showModal: false,
        editingTenant: null,

        unit_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        email: "",
        username: "",
        password: "",
        isRepresentative: false, // Initialize as false
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
        async fetchTenants() {
            try {
                const response = await axios.get("/api/admin/getTenants", {
                    headers: {
                        Authorization: `Bearer ${this.adminToken}`,
                    },
                });
                this.tenant_list = response.data;
                console.log(this.tenant_list);
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
            this.unit_id = "";
            this.isRepresentative = false; // Reset to false
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
                !this.unit_id
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
                middle_name: this.middle_name,
                last_name: this.last_name,
                phone_number: this.phone_number,
                address: this.address,
                email: this.email,
                username: this.username,
                unit_id: this.unit_id,
                isRepresentative: this.isRepresentative,
            };
            if (this.password) {
                tenantData.password = this.password;
            }

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
                                `/api/admin/updateTenant/${this.editingTenant.id}`,
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
            this.unit_id = tenant.unit_id;
            this.first_name = tenant.first_name;
            this.middle_name = tenant.middle_name;
            this.last_name = tenant.last_name;
            this.phone_number = tenant.phone_number;
            this.address = tenant.address;
            this.email = tenant.email;
            this.username = tenant.username;
            this.password = tenant.password;
            this.isRepresentative = !!tenant.isRepresentative; // Ensure it is a boolean
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
                        await axios.delete(`/api/admin/deleteTenant/${id}`, {
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
