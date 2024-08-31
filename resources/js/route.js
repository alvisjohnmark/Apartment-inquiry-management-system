// Auth Guards
import { adminAuthGuard, tenantAuthGuard } from "./authguard";

// Home
import Home from "./Pages/HomePages/homepage.vue";
import Inquire from "./Pages/HomePages/inquire.vue";

// Admin
import AdminDashboard from "./Pages/AdminPages/adminDashboard.vue";
import AdminInquiries from "./Pages/AdminPages/adminInquiries.vue";
import AdminUnits from "./Pages/AdminPages/adminUnits.vue";
import AdminTenants from "./Pages/AdminPages/adminTenants.vue";
import AdminAnnouncements from "./Pages/AdminPages/adminAnnouncements.vue";
import AdminLogin from "./Pages/AdminPages/adminLogin.vue";

// Tenant
import TenantDashboard from "./Pages/TenantPages/tenantDashboard.vue";
import TenantLogin from "./Pages/TenantPages/tenantLogin.vue";

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
        beforeEnter: adminAuthGuard,
    },
    {
        path: "/admin/inquiries",
        component: AdminInquiries,
        beforeEnter: adminAuthGuard,
    },
    {
        path: "/admin/units",
        component: AdminUnits,
        beforeEnter: adminAuthGuard,
    },
    {
        path: "/admin/tenants",
        component: AdminTenants,
        beforeEnter: adminAuthGuard,
    },
    {
        path: "/admin/announcements",
        component: AdminAnnouncements,
        beforeEnter: adminAuthGuard,
    },
    {
        path: "/tenant/dashboard",
        component: TenantDashboard,
        beforeEnter: tenantAuthGuard,
    },
];
