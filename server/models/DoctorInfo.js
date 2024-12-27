const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Unique identifier for the doctor
  username: { type: String, required: true }, // Username of the doctor
  first_name: { type: String, required: true }, // First name of the doctor
  specialization: { type: String, required: true }, // Specialization of the doctor
  contact_number: { type: String, required: true }, // Contact number of the doctor
  email: { type: String, required: true }, // Email address of the doctor
  availability: {
    type: Map,
    of: [String], // Availability is stored as a map where each date maps to an array of time slots
    required: true,
    default: new Map()
  },
  location: {
    hospital: { type: String, required: true }, // Hospital where the doctor works
    address: { type: String, required: true }, // Address of the hospital
    room_number: { type: String, required: true } // Room number in the hospital
  }
}, {
  collection: 'doctors', // Specify the collection name here
  timestamps: true 
});

// Add indexes for better query performance
doctorSchema.index({ 'username': 1 }, { unique: true });
doctorSchema.index({ 'email': 1 }, { unique: true });
doctorSchema.index({ 'specialization': 1 });
doctorSchema.index({ 'location.hospital': 1 });

// Add the index for availability dates
// Note: Since availability is a Map, we need to index it differently
doctorSchema.index({ 'availability': 1 });

// Create the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;