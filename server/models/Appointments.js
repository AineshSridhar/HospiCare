const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: Date, required: true },  // Using Date type for correct format
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  appointment_date: { type: Date, required: true },
  appointment_type: { type: String, required: true },

  doctor: {
    status: { type: String, required: true }
  },

  location: {
    notes: { type: String, required: true }
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  collection: 'pastappointments'  // Specify the collection name here
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
