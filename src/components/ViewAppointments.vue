<template>
    <div class="past-appointments">
      <!-- No Appointments Message -->
      <div v-if="pastappointments.length === 0" class="no-appointments">
        No appointments scheduled.
      </div>
  
      <!-- Appointments List -->
      <div v-else>
        <h2 class="section-title">Past Appointments</h2>
        <div class="appointments-list">
          <!-- Loop through appointments -->
          <div 
            v-for="(appointment, index) in pastappointments" 
            :key="index" 
            class="appointment-card"
          >
            <div class="appointment-header">
              <h2>{{ appointment.first_name }} {{ appointment.last_name }}</h2>
              <span class="appointment-type">{{ appointment.appointment_type }}</span>
            </div>
            <div class="appointment-grid">
              <div class="user-doctor-details">
                <p><strong>Date of Birth:</strong> {{ new Date(appointment.dob).toLocaleDateString() }}</p>
                <p><strong>Phone:</strong> {{ appointment.phone_number }}</p>
                <p><strong>Email:</strong> {{ appointment.email }}</p>
                <br>
                <h2>Doctor details</h2>
                <p>{{ appointment.doctor.first_name }} {{ appointment.doctor.last_name }} ({{ appointment.doctor.speciality }})</p>
                <p>{{ appointment.doctor.contact_number }}</p>
                <p>{{ appointment.doctor.email }}</p>
              </div>
              <div class="appointment-details">
                <h2>Appointment details</h2>
                <p>Date:{{ new Date(appointment.appointment_date).toLocaleDateString() }}</p>
                <p>Status: {{ appointment.status }}</p>
                <p>Notes: {{ appointment.notes }}</p>
                <p>Hospital: {{appointment.location.hospital_name}}</p>
                <p>Location: {{appointment.location.address}}</p>
                <p>Room: {{appointment.location.room_number}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>  

<script>
import axios from "axios";

export default{
    data(){
        return {
            pastappointments: [],
        };
    },
    mounted(){
        this.fetchPastAppointments();
    },
    methods:{
        async fetchPastAppointments(){
            try{
                const token = localStorage.getItem("token");
                console.log('Token being sent:', token);

                if(!token){
                    this.$router.push('/login');
                    return;
                }
                const response = await axios.get("http://localhost:5000/api/viewappointments", {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Past appointments received: ', response.data);
                this.pastappointments = response.data;
            } catch (err){
                console.error('Error fetching past appointments: ', err);
            }
        },
    },
};
</script>

<style scoped>
.past-appointments {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.no-appointments {
  text-align: center;
  font-size: 18px;
  color: #999;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.appointment-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 40px 35px 40px 40px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.appointment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.appointment-header h2 {
  margin: 0;
}

.appointment-type {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: #007bff;
  color: white;
}

.appointment-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.appointment-grid p {
  margin: 5px 0;
  font-size: 14px;
}

.appointment-grid p strong {
  color: #333;
}

.appointment-details h2 {
  margin-bottom: 15px;
}
</style>