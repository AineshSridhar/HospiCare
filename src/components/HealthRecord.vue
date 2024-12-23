<template>
  <div class="health-records">
    <h2>Your Health Records</h2>
    <div v-if="records.length === 0" class="no-records">
      No health records available.
    </div>
    <div v-else class="record-grid">
      <div v-for="record in records" :key="record._id" class="record-card">
        <strong class="record-type">{{ record.recordType }}</strong>
        <p>{{ record.description }}</p>
        <p>{{ record.details }}</p>
        <p>{{ record.diagnosis }}</p>
        <p>{{ record.medication }}</p>
        <p>{{ record.doctor }}</p>
        <p>{{ record.clinic }}</p>
        <small class="record-date">{{ new Date(record.date).toLocaleDateString() }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      records: [],
    };
  },
  mounted() {
    this.fetchHealthRecords();
  },
  methods: {
    async fetchHealthRecords() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login'); // Redirect to login if no token is present
          return;
        }

        const response = await axios.get('http://localhost:5000/api/healthrecords', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the header
          },
        });
        console.log('Health records received:', response.data); // Log the received data

        this.records = response.data; // Set the fetched records to the component's data
      } catch (error) {
        console.error('Error fetching health records:', error);
      }
    },
  },
};
</script>

<style scoped>
.health-records {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

.no-records {
  text-align: center;
  color: #888;
  font-size: 18px;
  margin-top: 20px;
}

/* Grid layout to display 3 items per row */
.record-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px 0;
}

/* Card styling */
.record-card {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.record-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.record-type {
  font-size: 18px;
  color: #4a90e2;
}

.record-card p {
  margin: 10px 0;
  font-size: 16px;
  color: #555;
}

.record-date {
  font-size: 14px;
  color: #888;
  text-align: right;
  display: block;
  margin-top: 10px;
}
</style>
