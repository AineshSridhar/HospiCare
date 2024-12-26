<template>
  <div class="hospital-dashboard">
    <!-- Sidebar with toggle -->
    <div :class="['sidebar', { collapsed: !isSidebarOpen }]">
      <h2 v-if="isSidebarOpen">Hi, {{ username }}</h2>
      <ul>
        <li @click="currentView = 'Dashboard'">
          <span class="icon">🏠</span>
          <span v-if="isSidebarOpen">Dashboard</span>
        </li>
        <li @click="currentView = 'HealthRecords'">
          <span class="icon">📁</span>
          <span v-if="isSidebarOpen">Health Records</span>
        </li>
        <li @click="currentView = 'ViewAppointments'">
          <span class="icon">📅</span>
          <span v-if="isSidebarOpen">View Appointments</span>
        </li>
        <li @click="currentView = 'BookAppointments'">
          <span class="icon">📝</span>
          <span v-if="isSidebarOpen">Book Appointments</span>
        </li>
        <li @click="currentView = 'ScheduleTest'">
          <span class="icon"></span>
          <span v-if="isSidebarOpen">Schedule a Test</span>
        </li>
      </ul>
    </div>

    <!-- Hamburger Icon -->
    <div class="hamburger" @click="toggleSidebar">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <component :is="currentViewComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Dashboard from '../components/Dashboard.vue';
import HealthRecord from '../components/HealthRecord.vue';
import ViewAppointments from '../components/ViewAppointments.vue';
import BookAppointment from '../components/BookAppointment.vue';

defineProps({
  username: {
    type: String,
    required: true
  }
});

const currentView = ref('Dashboard');
const isSidebarOpen = ref(true);

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

onMounted(() => {
  const viewParam = route.query.view || 'Dashboard';
  currentView.value = viewParam;
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.hospital-dashboard {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
  position: relative;
}

/* Sidebar Styling */
.sidebar {
  width: 250px;
  background-color: #34495e;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px; /* Only icons visible */
  padding-top: 80px;
}

.sidebar h2 {
  text-align: center;
  font-size: 22px;
  color: #ecf0f1;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 10px;
  transition: opacity 0.3s ease;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  padding: 10px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

.sidebar li:hover {
  background-color: #1abc9c;
  transform: translateX(5px);
}

.sidebar .icon {
  font-size: 18px;
  text-align: center;
  width: 25px;
}

.sidebar.collapsed .icon {
  margin: 0 auto;
}

.sidebar.collapsed h2 {
  opacity: 0; /* Hide the username smoothly */
}

.sidebar.collapsed + .hamburger{
  transform: translateX(-10px);
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #d9e8ed;
  transition: margin-left 0.3s ease;
}

/* Hamburger Icon Styling */
.hamburger {
  position: absolute;
  top: 34px;
  left: 35px;
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1  ;
}

.hamburger div {
  height: 4px;
  background-color: #869fb8;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
</style>
