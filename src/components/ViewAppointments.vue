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
            <span class="appointment-type">{{ appointment.reason }}</span>
          </div>
          <div class="appointment-grid">
            <div class="user-doctor-details">
              <h2>Doctor Details</h2>
              <p><strong>Name:</strong> {{ appointment.doctorDetails[0].first_name }} {{ appointment.doctorDetails[0].last_name }}</p>
              <p><strong>Specialization:</strong> {{ appointment.doctorDetails[0].specialization }}</p>
              <p><strong>Location:</strong> <br>Room {{ appointment.doctorDetails[0].location.room_number }}, {{ appointment.doctorDetails[0].location.hospital }}, <br>{{ appointment.doctorDetails[0].location.address }}</p>

            </div>
            <div class="appointment-details">
              <h2>Appointment Details</h2>
              <p><strong>Date:</strong> {{ new Date(appointment.date).toLocaleDateString() }}</p>
              <p><strong>Time:</strong> {{ appointment.timeSlot }}</p>
              <p><strong>Status:</strong> {{ appointment.status }}</p>
              <p><strong>Reason:</strong> {{ appointment.reason }}</p>
              <p><strong>Notes:</strong> {{ appointment.notes }}</p>
            </div>
            <div class="consultation-details">
              <h2>Consultation Details</h2>
              <div v-if="appointment.medications && appointment.medications.length > 0">
                <h3>Medications</h3>
                <ul>
                  <li v-for="(med, medIndex) in appointment.medications" :key="medIndex">
                    {{ med.name }} - {{ med.dosage }} ({{ med.frequency }})
                  </li>
                </ul>
              </div>
              <div v-if="appointment.tests && appointment.tests.length > 0">
                <h3>Tests Suggested</h3>
                <ul>
                  <li v-for="(test, testIndex) in appointment.tests" :key="testIndex">
                    {{ test.testName }} ({{ test.instructions || 'No instructions' }})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { TrackOpTypes } from "vue";

export default {
  data() {
    return {
      pastappointments: [], // Stores the original MongoDB documents
    };
  },
  mounted() {
    this.fetchPastAppointments();
  },
  methods: {
    async fetchPastAppointments() {
      try {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);

        if (!token) {
          this.$router.push("/login");
          return;
        }
        const response = await axios.get("http://localhost:5000/api/viewappointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Past appointments received: ", response.data);
        this.pastappointments = response.data; // Use the original MongoDB document as-is
      } catch (err) {
        console.error("Error fetching past appointments: ", err);
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
  justify-content: flex-end; 
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