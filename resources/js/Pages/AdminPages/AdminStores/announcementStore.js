import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { toast } from "vue3-toastify";

export const announcementStore = defineStore("announcementStore", {
    state: () => ({
        adminToken: localStorage.getItem("admin_token") || null,
        admin: null,
        adminName: "",
        announcement_list: [],
        showModal: false,
        title: "",
        content: "",
        editingAnnouncement: null,
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
        toggleModal() {
            this.showModal = !this.showModal;
            if (!this.showModal) {
                this.title = "";
                this.content = "";
                this.editingAnnouncement = null;
            }
        },
        async submitAnnouncement() {
            if (!this.title || !this.content) {
                Swal.fire({
                    icon: "error",
                    title: "Title and content are required.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                return;
            }

            const announcementData = {
                title: this.title,
                content: this.content,
            };

            Swal.fire({
                title: this.editingAnnouncement
                    ? "Confirm Update"
                    : "Confirm Add",
                text: this.editingAnnouncement
                    ? "Are you sure you want to update this announcement?"
                    : "Are you sure you want to add this announcement?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (this.editingAnnouncement) {
                            await axios.put(
                                `/api/admin/updateAnnouncement/${this.editingAnnouncement.id}`,
                                announcementData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.adminToken}`,
                                    },
                                }
                            );
                            toast.success(
                                "Announcement updated successfully.",
                                {
                                    autoClose: 2000,
                                }
                            );
                        } else {
                            await axios.post(
                                "/api/admin/saveAnnouncements",
                                announcementData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${this.adminToken}`,
                                    },
                                }
                            );
                            toast.success("Announcement added successfully.", {
                                autoClose: 2000,
                            });
                        }
                        this.fetchAnnouncements();
                        this.toggleModal();
                    } catch (error) {
                        console.error("Error submitting announcement:", error);
                    }
                }
            });
        },
        editAnnouncement(announce) {
            this.editingAnnouncement = announce;
            this.title = announce.title;
            this.content = announce.content;
            this.toggleModal();
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
        confirmDelete(id) {
            Swal.fire({
                title: "Are you sure you want to delete this announcement?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Proceed",
                cancelButtonText: "Cancel",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(
                            `/api/admin/deleteAnnouncement/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${this.adminToken}`,
                                },
                            }
                        );
                        toast.success("Announcement deleted successfully.", {
                            autoClose: 2000,
                        });
                        this.fetchAnnouncements();
                    } catch (error) {
                        console.error("Error deleting announcement:", error);
                    }
                }
            });
        },
    },
});
