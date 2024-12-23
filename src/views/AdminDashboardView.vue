<template>
    <div class="admin-dashboard">
  
      <div class="main-content">
        <nav class="sidebar">
          <ul>
            <li @click="selectTab('overview')">Overview</li>
            <li @click="selectTab('patients')">Patients</li>
            <li @click="selectTab('appointments')">Appointments</li>
            <li @click="selectTab('records')">Health Records</li>
            <li @click="selectTab('settings')">Settings</li>
          </ul>
        </nav>
  
        <section class="content">
          <div v-if="currentTab === 'overview'" class="overview">
            <h3>Dashboard Overview</h3>
            <div class="overview-cards">
              <div class="card">
                <h4>Total Patients</h4>
                <p>1234</p>
              </div>
              <div class="card">
                <h4>Total Appointments</h4>
                <p>456</p>
              </div>
              <div class="card">
                <h4>Doctors Available</h4>
                <p>10</p>
              </div>
              <div class="card">
                <h4>Pending Records</h4>
                <p>5</p>
              </div>
            </div>
          </div>
  
          <div v-if="currentTab === 'patients'" class="patients">
            <h3>Manage Patients</h3>
            <p>List of registered patients with actions to view, update, or delete their information.</p>
          </div>
  
          <div v-if="currentTab === 'appointments'" class="appointments">
            <h3>Manage Appointments</h3>
            <p>Upcoming appointments and actions to manage them.</p>
          </div>
  
          <div v-if="currentTab === 'records'" class="records">
            <h3>Health Records</h3>
            <p>List of health records of patients. You can view, add, or update them.</p>
          </div>
  
          <div v-if="currentTab === 'settings'" class="settings">
            <h3>Settings</h3>
            <p>Configure hospital settings and other preferences.</p>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTab: 'overview',
        user: {
          username: 'adminUser', // This can be fetched from localStorage or a global state
        }
      };
    },
    methods: {
      selectTab(tab) {
        this.currentTab = tab;
      },
      logout() {
        // Handle logout, e.g., clear token and navigate to login page
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Global Styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
  
  body {
    background-color: #f4f7fc;
    color: #333;
  }
  
  /* Admin Dashboard Layout */
  .admin-dashboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1976d2;
    color: #fff;
    padding: 15px 30px;
  }
  
  .header .logo h2 {
    margin: 0;
  }
  
  .header .user-info {
    display: flex;
    align-items: center;
  }
  
  .header .user-info button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-left: 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .header .user-info button:hover {
    background-color: #d32f2f;
  }
  
  /* Main Content */
  .main-content {
    display: flex;
    flex: 1;
  }
  
  /* Sidebar */
  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    padding: 15px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .sidebar ul li:hover {
    background-color: #34495e;
  }
  
  .sidebar ul li.active {
    background-color: #1976d2;
  }
  
  /* Content Section */
  .content {
    flex: 1;
    padding: 30px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }
  
  .content h3 {
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
  }
  
  /* Overview Cards */
  .overview-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .card h4 {
    font-size: 18px;
    color: #555;
  }
  
  .card p {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }
  
    .sidebar {
      width: 100%;
      padding: 10px;
    }
  
    .overview-cards {
      grid-template-columns: 1fr 1fr;
    }
  }
  </style>
  