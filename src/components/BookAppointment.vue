<template>
    <div class="bookappointments">
        <h2>Book an appointment with qualified Doctors</h2>
        <div v-if="doctors.length===0" class="no-records">
            No Doctors found
        </div>
        <div v-else class="displaydoctors">
            <form>
                <input type="text" class="searchdoctors">
            </form>
            <div class="doctor-grid">
            <div v-for="doctor in doctors" :key="doctor._id" class="doctor-card">
                <strong class="doctorTitle">Dr. {{ doctor.first_name }} {{ doctor.last_name }} ({{ doctor.specialization }})</strong>
                <p>Name: {{ doctor.specialization }}</p>
                <p>Email address: {{ doctor.email }}</p>
                <p>Contact Number: {{ doctor.contact_number }}</p>
                <p>Hospital: {{ doctor.location.hospital }}</p>
                <p>Location: {{ doctor.location.address }}</p>
                <p>Room: {{doctor.location.room_number}}</p>
                <p>Slots:</p>
                <div v-for="(slots, date) in doctor.availability" :key="date" class="date-slots">
                <p>{{ date }}</p>
                <!-- Iterate over time slots for each date -->
                <ul class="slots">
                    <li v-for="slot in slots" :key="slot">{{ slot }}</li>
                </ul>
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
            doctors: [],
        };
    },
    mounted(){
        this.fetchDoctors();
    },
    methods:{
        async fetchDoctors(){
            try{
                const token = localStorage.getItem('token');
                if(!token){
                    this.$router.push('./login');
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/doctors', {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                });       
                console.log('Doctor details received:', response.data);
                this.doctors = response.data;
            } catch (error){
                console.error('Error fetching doctor ', error)
            }
        }
    }
}
</script>

<style scoped>
h2{
    text-align: center;
    margin: 20px;
}

.displaydoctors{
    /* display: flex;
    flex-direction: column; */
    width: 100%;
}

.searchdoctors{
    display: flex;
    width: 600px;
    height: 40px;
    font-size: 18px;
    margin: 20px auto 30px;
    border-radius: 10px;
    border: none;
    padding: 13px;
}

.doctor-grid{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 10px 0
}

.doctor-card{
    background-color: rgb(0, 136, 255);
    border-radius: 10px;
    font-size: 14px;
    color: white;
    padding: 20px;
    cursor: pointer;
    transition: 0.5s;
}

.doctor-card:hover{
    transform: scale(109%)
}

.doctorTitle{
    margin-bottom: 40px;
}

.doctor-card strong{
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}

.slots{
    display: flex;
    gap: 10px;
    list-style-type: none;
}
</style>