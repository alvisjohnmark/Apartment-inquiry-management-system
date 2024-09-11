import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

export const unitsStore = defineStore("unitsStore", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        admin: null,
        adminName: "",
        unit_list: [],
        editingAnnouncement: null,
        showConcernsModal: false,
        showEditModal: false,
        selectedUnit: null,
        availability: null,
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
        async fetchUnits() {
            try {
                const response = await axios.get("/api/admin/getUnits", {
                    headers: {
                        Authorization: `Bearer ${this.adminToken}`,
                    },
                });
                this.unit_list = response.data.map((unit) => {
                    return {
                        ...unit,
                        availability: !!unit.availability,
                    };
                });
                console.log(this.unit_list);
            } catch (error) {
                console.error("Error fetching units:", error);
            }
        },

        openConcernsModal(unit) {
            this.selectedUnit = unit;
            this.showConcernsModal = true;
        },
        closeConcernsModal() {
            this.showConcernsModal = false;
            this.selectedUnit = null;
        },
        openEditModal(unit) {
            this.selectedUnit = { ...unit };
            this.showEditModal = true;
        },
        closeEditModal() {
            this.showEditModal = false;
            this.selectedUnit = null;
        },
        async updateUnit() {
            try {
                const response = await axios.put(
                    `/api/admin/updateUnit/${this.selectedUnit.id}`,
                    this.selectedUnit,
                    { headers: { Authorization: `Bearer ${this.adminToken}` } }
                );
                toast.success("Unit updated successfully.", {
                    autoClose: 2000,
                });
                this.fetchUnits();
                this.closeEditModal();
            } catch (error) {
                console.error("Error saving unit:", error);
                Swal.fire("Error", "Failed to save unit", "error");
            }
        },

        async updateOccupiedStatus(unit) {
            try {
                // Update unit availability on the server
                await axios.put(
                    `/api/admin/updateUnit/${unit.id}`,
                    { availability: unit.availability },
                    { headers: { Authorization: `Bearer ${this.adminToken}` } }
                );

                const index = this.unit_list.findIndex((u) => u.id === unit.id);
                if (index !== -1) {
                    this.unit_list[index] = {
                        ...this.unit_list[index],
                        availability: unit.availability,
                    };
                }

                toast.success("Unit status updated successfully.", {
                    autoClose: 2000,
                });
            } catch (error) {
                console.error("Error updating unit status:", error);
                Swal.fire("Error", "Failed to update unit status", "error");
            }
        },
    },
});
