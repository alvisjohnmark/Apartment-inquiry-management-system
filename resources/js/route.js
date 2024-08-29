import { useAdminAuthStore } from "./Pages/HomePages/Stores/adminAuth";
import { useTenantAuthStore } from "./Pages/HomePages/Stores/tenantAuth";

import Home from "./Pages/HomePages/homepage.vue";
import AdminDashboard from "./Pages/AdminPages/adminDashboard.vue";
import AdminInquiries from "./Pages/AdminPages/adminInquiries.vue";
import AdminUnits from "./Pages/AdminPages/adminUnits.vue";
import AdminTenants from "./Pages/AdminPages/adminTenants.vue";
import TenantDashboard from "./Pages/TenantPages/tenantDashboard.vue";
import AdminLogin from "./Pages/AdminPages/adminLogin.vue";
import TenantLogin from "./Pages/TenantPages/tenantLogin.vue";
import Inquire from "./Pages/HomePages/inquire.vue";

export const routes = [
    {
        path: "/",
        component: Home,
        name: "Home Page",
    },
    {
        path: "/admin/login",
        component: AdminLogin,
        name: "Admin Login",
    },
    {
        path: "/tenant/login",
        component: TenantLogin,
        name: "Tenant Login",
    },
    {
        path: "/inquire",
        component: Inquire,
        name: "Inquire",
    },

    {
        path: "/admin/dashboard",
        component: AdminDashboard,
        beforeEnter: (to, from, next) => {
            const adminAuthStore = useAdminAuthStore();
            if (!adminAuthStore.adminToken) {
                next("/admin/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/admin/inquiries",
        component: AdminInquiries,
        beforeEnter: (to, from, next) => {
            const adminAuthStore = useAdminAuthStore();
            if (!adminAuthStore.adminToken) {
                next("/admin/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/admin/units",
        component: AdminUnits,
        beforeEnter: (to, from, next) => {
            const adminAuthStore = useAdminAuthStore();
            if (!adminAuthStore.adminToken) {
                next("/admin/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/admin/tenants",
        component: AdminTenants,
        beforeEnter: (to, from, next) => {
            const adminAuthStore = useAdminAuthStore();
            if (!adminAuthStore.adminToken) {
                next("/admin/login");
            } else {
                next();
            }
        },
    },
    {
        path: "/tenant/dashboard",
        component: TenantDashboard,
        beforeEnter: (to, from, next) => {
            const tenantAuthStore = useTenantAuthStore();
            if (!tenantAuthStore.tenantToken) {
                next("/tenant/login");
            } else {
                next();
            }
        },
    },
];
