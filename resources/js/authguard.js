import { useAdminAuthStore } from "./Pages/AdminPages/AdminStores/adminAuth";
import { useTenantAuthStore } from "./Pages/TenantPages/TenantStores/tenantAuth";

export function adminAuthGuard(to, from, next) {
    const adminAuthStore = useAdminAuthStore();
    if (!adminAuthStore.adminToken) {
        next("/admin/login");
    } else {
        next();
    }
}

export function tenantAuthGuard(to, from, next) {
    const tenantAuthStore = useTenantAuthStore();
    if (!tenantAuthStore.tenantToken) {
        next("/tenant/login");
    } else {
        next();
    }
}
