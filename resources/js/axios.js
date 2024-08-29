import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('admin_token');
    const tenantToken = localStorage.getItem('tenant_token');

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (tenantToken) {
      config.headers.Authorization = `Bearer ${tenantToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
