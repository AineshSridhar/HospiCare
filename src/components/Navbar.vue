<template>
  <nav>
    <div class="logo">
      <h1>HospiCare</h1>
    </div>
    <div class="options">
      <header v-if="isAdmin">
        <h1>Hospicare</h1>
      </header>
      <header v-else>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/nearbyhospitals">Nearby Hospitals</RouterLink></li>
          <li><a href="/healthrecords">Health Records</a></li>
          <li><a href="/bookappointment">Book Appointment</a></li>
        </ul>
      </header>
    </div>
    <div class="auth">
      <div v-if="username" class="user-dropdown">
        <button @click="toggleDropdown">{{ username }}</button>
        
        <!-- Apply conditional class for showing the dropdown -->
        <div :class="['dropdown-content', { show: showDropdown }]">
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/appointments">Appointments</RouterLink>
          <RouterLink to="/healthrecords">Health Records</RouterLink>
          <RouterLink to="/login" @click="logout">Logout</RouterLink>
        </div>
      </div>
      <RouterLink v-else to="/login"><button class="login">Login / Register</button></RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';

const role = ref(localStorage.getItem('role'));
const isAdmin = ref(role.value === 'admin');
const username = inject('username');

const showDropdown = ref(false);
const router = useRouter();

function toggleDropdown() {
  showDropdown.value = !showDropdown.value; // Toggle dropdown visibility
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  username.value = null;
  showDropdown.value = false; // Hide dropdown on logout
  router.push('/login');
}

onMounted(() => {
  username.value = localStorage.getItem('username');
});
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 20px;
  background-color: #fff;
  z-index: 1000;
}

nav ul {
  display: flex;
  gap: 50px;
  list-style-type: none;
  font-size: 20px;
  font-weight: 400;
}

nav a {
  text-decoration: none;
  color: rgb(193, 190, 190);
  transition: 0.7s;
}

a:hover {
  color: black;
}

.login {
  background-color: rgb(121, 215, 255);
  border: none;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 7px;
  cursor: pointer;
  color: white;
  transition: 0.7s;
}

.login:hover {
  color: black;
}

.user-dropdown {
  position: relative;
  display: inline-block;
  background-color: transparent;
}

.user-dropdown button {
  background-color: rgb(0, 140, 255);
  border-radius: 4px;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  width: 100px;
}

.dropdown-content {
  display: none; /* Default hidden */
  position: absolute;
  background-color: #007bff; /* Blue background */
  min-width: 170px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  /* padding: 12px 16px; */
  border-radius: 8px;
  top: 100%;
  left: 0%;
  transform: translateX(-50%); /* Center the dropdown */
  margin-top: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  overflow: hidden;
}

.dropdown-content.show {
  display: block; /* Show dropdown */
  opacity: 1;
}

.dropdown-content a,
.dropdown-content button {
  color: white;
  padding: 8px 12px;
  text-decoration: none;
  display: block;
  text-align: left;
  font-size: 16px;
  border: none;
  background: transparent;
}

.dropdown-content a:hover,
.dropdown-content button:hover {
  background-color: #0056b3;
}

/* Add reverse triangle */
.user-dropdown button::after {
  content: '';
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white; /* Triangle color matching dropdown */
  margin-left: 10px;
  display: inline-block;
  margin-top: 0px;
}

/* Responsive positioning fixes */
@media (max-width: 768px) {
  nav ul {
    gap: 30px;
  }

  .dropdown-content {
    left: auto;
    right: 0;
    transform: none;
  }
}
</style>
