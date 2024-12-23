import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NearbyHospView from '../views/NearbyHospView.vue'
import LoginView from '@/views/LoginView.vue'
import HealthRecordsView from '@/views/HealthRecordsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
// import BookAppointmentsView from '@/views/BookAppointmentsView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView  // Add the admin dashboard component here
    },
    {
      path: '/nearbyhospitals',
      name: 'nearbyhospitals',
      component: NearbyHospView
    },
    {
      path: '/healthrecords',
      name: 'healthrecords',
      component: HealthRecordsView
    },
    {
      path: '/bookappointment',
      name: 'bookappointment',
      component: DashboardView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');  // Assuming you stored the role in localStorage

  // Protect admin routes
  if (to.name === 'admin-dashboard' && role !== 'admin') {
    next('/');  // Redirect to home if not admin
  } else {
    next();  // Proceed with navigation
  }
});


export default router
