<template>
    <div class="tenant-dashboard">
      <header>
        <h1>Tenant Dashboard</h1>
        <nav>
          <ul>
            <li><router-link to="/tenant/dashboard">Home</router-link></li>
            <li><router-link to="/tenant/bookings">My Bookings</router-link></li>
            <li><router-link to="/tenant/profile">Profile</router-link></li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </nav>
      </header>
  
      <main>
        <h2>Welcome, Tenant!</h2>
        <p>Here is your account overview.</p>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useTenantAuthStore } from "../HomePages/Stores/tenantAuth"; 
  
  const tenantAuthStore = useTenantAuthStore();
  
  const logout = () => {
    tenantAuthStore.logoutTenant();
  };
  </script>
  
  <style scoped>
  .tenant-dashboard {
    padding: 20px;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    color: white;
    padding: 10px;
  }
  nav ul {
    list-style-type: none;
    display: flex;
    gap: 10px;
  }
  nav ul li {
    margin: 0;
  }
  nav ul li a,
  nav ul li button {
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  main {
    padding: 20px;
    background-color: #e9ecef;
  }
  </style>
  