<template>
    <div class="doctor-details">
        <div v-if="loading" class="loading">
            Loading...
        </div>
        <div v-else-if="error" class="error">
            {{ error }}
        </div>
        <div v-else class="content">
            <!-- Doctor Info Section -->
            <div class="info-section">
                <h1>Dr. {{ doctor.first_name }} {{ doctor.last_name }}</h1>
                <div class="doctor-info">
                    <p class="specialization">{{ doctor.specialization }}</p>
                    <p>{{ doctor.location.hospital }}</p>
                    <p>{{ doctor.location.address }}</p>
                    <p>Room: {{ doctor.location.room_number }}</p>
                    <p>Email: {{ doctor.email }}</p>
                    <p>Contact: {{ doctor.contact_number }}</p>
                </div>
            </div>

            <!-- Appointment Booking Section -->
            <div class="booking-section">
                <h2>Book an Appointment</h2>
                
                <!-- Date Selection -->
                <div class="date-selector">
                    <label>Select Date:</label>
                    <select v-model="selectedDate" @change="updateAvailableSlots">
                        <option value="">Choose a date</option>
                        <option 
                            v-for="date in availableDates" 
                            :key="date" 
                            :value="date"
                        >
                            {{ formatDate(date) }}
                        </option>
                    </select>
                </div>

                <!-- Time Slots -->
                <div v-if="selectedDate" class="time-slots">
                    <h3>Available Time Slots</h3>
                    <div class="slots-grid">
                        <button
                            v-for="slot in availableSlots"
                            :key="slot"
                            :class="['slot-btn', { selected: selectedSlot === slot }]"
                            @click="selectSlot(slot)"
                        >
                            {{ slot }}
                        </button>
                    </div>
                </div>

                <!-- Booking Form -->
                <form v-if="selectedSlot" @submit.prevent="bookAppointment" class="booking-form">
                    <div class="form-group">
                        <label>Reason for Visit:</label>
                        <textarea 
                            v-model="appointmentReason" 
                            required
                            rows="3"
                            placeholder="Please describe your reason for visit"
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <label>Additional Notes:</label>
                        <textarea 
                            v-model="additionalNotes"
                            rows="2"
                            placeholder="Any additional information (optional)"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        class="book-btn"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? 'Booking...' : 'Book Appointment' }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DoctorDetails',
    data() {
        return {
            doctor: null,
            loading: true,
            error: null,
            selectedDate: '',
            selectedSlot: '',
            appointmentReason: '',
            additionalNotes: '',
            isSubmitting: false
        };
    },
    computed: {
        availableDates() {
            return this.doctor ? Object.keys(this.doctor.availability) : [];
        },
        availableSlots() {
            if (!this.selectedDate || !this.doctor?.availability[this.selectedDate]) {
                return [];
            }
            return this.doctor.availability[this.selectedDate];
        }
    },
    methods: {
        async fetchDoctorDetails() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push('/login');
                    return;
                }
                const response = await axios.get(
                    `http://localhost:5000/api/doctors/${this.$route.params.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                this.doctor = response.data;
                console.log(this.doctor);
            } catch (error) {
                this.error = 'Error loading doctor details. Please try again later.';
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        selectSlot(slot) {
            this.selectedSlot = slot;
        },
        updateAvailableSlots() {
            this.selectedSlot = '';
        },
        async bookAppointment() {
            if (!this.selectedDate || !this.selectedSlot) {
                alert('Please select a date and time slot');
                return;
            }

            this.isSubmitting = true;

            try {
                const token = localStorage.getItem('token');
                await axios.post(
                    'http://localhost:5000/api/appointments',
                    {
                        doctorId: this.$route.params.id,
                        date: this.selectedDate,
                        timeSlot: this.selectedSlot,
                        reason: this.appointmentReason,
                        notes: this.additionalNotes
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                // Show success message and redirect
                alert('Appointment booked successfully!');
                this.$router.push('/appointments');
            } catch (error) {
                alert('Error booking appointment. Please try again.');
                console.error('Booking error:', error);
            } finally {
                this.isSubmitting = false;
            }
        }
    },
    mounted() {
        this.fetchDoctorDetails();
    }
};
</script>

<style scoped>
.doctor-details {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.info-section, .booking-section {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #2c3e50;
    margin-bottom: 20px;
}

.doctor-info {
    font-size: 16px;
    line-height: 1.6;
}

.specialization {
    font-size: 18px;
    color: #3498db;
    margin-bottom: 15px;
}

.date-selector {
    margin-bottom: 30px;
}

.date-selector select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
}

.slots-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.slot-btn {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.slot-btn:hover {
    background: #f7f9fc;
}

.slot-btn.selected {
    background: #3498db;
    color: white;
    border-color: #3498db;
}

.booking-form {
    margin-top: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
}

.book-btn {
    width: 100%;
    padding: 12px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.book-btn:hover {
    background: #2980b9;
}

.book-btn:disabled {
    background: #95a5a6;
    cursor: not-allowed;
}

.loading, .error {
    text-align: center;
    padding: 40px;
    font-size: 18px;
}

.error {
    color: #e74c3c;
}
</style>