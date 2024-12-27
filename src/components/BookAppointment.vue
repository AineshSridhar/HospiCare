<template>
    <div class="bookappointments">
        <h2>Book an appointment with qualified Doctors</h2>
        
        <!-- Search and Filters - Always visible -->
        <div class="filters-section">
            <form @submit.prevent>
                <input 
                    type="text" 
                    class="searchdoctors" 
                    v-model="searchQuery"
                    placeholder="Search by doctor name, location, hospital..."
                >
            </form>
            
            <div class="filters">
                <select v-model="selectedLocation" class="filter-select">
                    <option value="">All Locations</option>
                    <option 
                        v-for="location in uniqueLocations" 
                        :key="location" 
                        :value="location"
                    >
                        {{ location }}
                    </option>
                </select>

                <select v-model="selectedSpecialization" class="filter-select">
                    <option value="">All Specializations</option>
                    <option 
                        v-for="spec in specializations" 
                        :key="spec.value" 
                        :value="spec.value"
                    >
                        {{ spec.label }}
                    </option>
                </select>

                <select v-model="maxDistance" class="filter-select">
                    <option value="">Any Distance</option>
                    <option value="5">Within 5 km</option>
                    <option value="10">Within 10 km</option>
                    <option value="20">Within 20 km</option>
                </select>
            </div>
        </div>

        <!-- No Results Message -->
        <div v-if="filteredDoctors.length === 0" class="no-records">
            No doctors found matching your search criteria. Try adjusting your filters.
        </div>

        <!-- Doctors Grid -->
        <div v-else class="displaydoctors">
            <div class="doctor-grid">
                <div v-for="doctor in filteredDoctors" :key="doctor._id" class="doctor-card" @click="viewDoctorDetails(doctor._id)">
                    <strong class="doctorTitle">Dr. {{ doctor.first_name }} {{ doctor.last_name }} <br>({{ doctor.specialization }})</strong>
                    <p>Email address: {{ doctor.email }}</p>
                    <p>Contact Number: {{ doctor.contact_number }}</p>
                    <p>Hospital: {{ doctor.location.hospital }}</p>
                    <p>Location: {{ doctor.location.address }}</p>
                    <p>Room: {{doctor.location.room_number}}</p>
                    <p v-if="doctor.distance">Distance: {{ doctor.distance.toFixed(1) }} km</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            doctors: [],
            searchQuery: '',
            selectedLocation: '',
            selectedSpecialization: '',
            maxDistance: '',
            userLocation: null,
            specializations: [
                { value: 'dentist', label: 'Dentist (Teeth)' },
                { value: 'cardiologist', label: 'Cardiologist (Heart)' },
                { value: 'dermatologist', label: 'Dermatologist (Skin)' },
                { value: 'pediatrician', label: 'Pediatrician (Children)' },
                { value: 'orthopedist', label: 'Orthopedist (Bones)' },
                { value: 'neurologist', label: 'Neurologist (Brain & Nerves)' }
            ]
        };
    },
    computed: {
        uniqueLocations() {
            return [...new Set(this.doctors.map(doc => doc.location.address))];
        },
        filteredDoctors() {
            return this.doctors.filter(doctor => {
                const matchesSearch = this.matchesSearchQuery(doctor);
                const matchesLocation = this.matchesLocation(doctor);
                const matchesSpecialization = this.matchesSpecialization(doctor);
                const matchesDistance = this.matchesDistance(doctor);
                
                return matchesSearch && matchesLocation && matchesSpecialization && matchesDistance;
            });
        }
    },
    methods: {
        viewDoctorDetails(doctorId) {
        this.$router.push(`/doctor/${doctorId}`);
        },
        matchesSearchQuery(doctor) {
            if (!this.searchQuery) return true;
            
            const searchLower = this.searchQuery.toLowerCase();
            const fullName = `${doctor.first_name} ${doctor.last_name}`.toLowerCase();
            
            return fullName.includes(searchLower) ||
                doctor.location.hospital.toLowerCase().includes(searchLower) ||
                doctor.location.address.toLowerCase().includes(searchLower) ||
                doctor.specialization.toLowerCase().includes(searchLower);
        },
        matchesLocation(doctor) {
            if (!this.selectedLocation) return true;
            return doctor.location.address === this.selectedLocation;
        },
        matchesSpecialization(doctor) {
            if (!this.selectedSpecialization) return true;
            return doctor.specialization.toLowerCase() === this.selectedSpecialization;
        },
        matchesDistance(doctor) {
            if (!this.maxDistance || !doctor.distance) return true;
            return doctor.distance <= parseFloat(this.maxDistance);
        },
        async getUserLocation() {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                await this.calculateDistances();
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        },
        async calculateDistances() {
            if (!this.userLocation) return;
            
            this.doctors = this.doctors.map(doctor => {
                const distance = this.calculateDistance(
                    this.userLocation.lat,
                    this.userLocation.lng,
                    doctor.location.latitude,
                    doctor.location.longitude
                );
                return { ...doctor, distance };
            });
        },
        calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Earth's radius in km
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a = 
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        },
        deg2rad(deg) {
            return deg * (Math.PI/180);
        },
        async fetchDoctors() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push('./login');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.doctors = response.data;
                await this.calculateDistances();
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }
    },
    async mounted() {
        await this.getUserLocation();
        await this.fetchDoctors();
    }
};
</script>

<style scoped>
h2 {
    text-align: center;
    margin: 20px;
}

.displaydoctors {
    width: 100%;
}

.filters-section {
    margin-bottom: 30px;
}

.searchdoctors {
    display: flex;
    width: 600px;
    height: 40px;
    font-size: 18px;
    margin: 20px auto;
    border-radius: 10px;
    border: none;
    padding: 13px;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.filter-select {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    min-width: 200px;
}

.doctor-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 10px 0;
}

.doctor-card {
    background-color: rgb(0, 136, 255);
    border-radius: 10px;
    font-size: 14px;
    color: white;
    padding: 20px;
    cursor: pointer;
    transition: 0.5s;
}

.doctor-card:hover {
    transform: scale(1.09);
}

.doctorTitle {
    margin-bottom: 40px;
    display: block;
}

.doctor-card strong {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}

.slots {
    display: flex;
    gap: 10px;
    list-style-type: none;
    flex-wrap: wrap;
}

.no-records {
    text-align: center;
    margin: 40px;
    font-size: 18px;
    color: #666;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
}
</style>