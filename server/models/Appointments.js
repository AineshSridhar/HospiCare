const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    ref: 'Doctor',
    required: true
  },
  patient: {
    type: String,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String },
      frequency: { type: String }
    }
  ],
  tests: [
    {
      testName: { type: String, required: true },
      instructions: { type: String }
    }
  ],
  diagnosis: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  collection: 'pastappointments',
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
