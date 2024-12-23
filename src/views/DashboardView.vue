<template>
    <div class="hospital-dashboard">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>Hi, {{ username }}</h2>
        <ul>
          <li @click="currentView = 'Dashboard'">Dashboard</li>
          <li @click="currentView = 'HealthRecords'">Health Records</li>
          <li @click="currentView = 'ViewAppointments'">View Appointments</li>
          <li @click="currentView = 'BookAppointments'">Book Appointments</li>
        </ul>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <component :is="currentViewComponent" />
      </div>
    </div>
  </template>
  
  <script setup>
  // Define the 'username' prop to be passed from the parent component
  defineProps({
    username: {
      type: String,
      required: true
    }
  });
  
  import { ref, computed } from 'vue';
  import Dashboard from '../components/Dashboard.vue';
  import HealthRecord from '../components/HealthRecord.vue';
  import ViewAppointments from '../components/ViewAppointments.vue';
  import BookAppointment from '../components/BookAppointment.vue';
  
  const currentView = ref('Dashboard');
  
  const currentViewComponent = computed(() => {
    switch (currentView.value) {
      case 'HealthRecords':
        return HealthRecord;
      case 'ViewAppointments':
        return ViewAppointments;
      case 'BookAppointments':
        return BookAppointment;
      default:
        return Dashboard;
    }
  });
  </script>
  
  <style scoped>
  .hospital-dashboard {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
  }
  
  .sidebar h2 {
    text-align: center;
    font-size: 20px;
    color: rgb(16, 10, 85);
    margin-bottom: 30px;
    background-color: white;
    padding: 3px;
    border-radius: 10px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin: 15px 0;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #34495e;
    transition: 0.3s;
  }
  
  .sidebar li:hover {
    background-color: #1abc9c;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #ecf0f1;
  }
  </style>