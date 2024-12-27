// routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointments');
const Doctor = require('../models/DoctorInfo');
const authenticateToken = require('./auth'); // Your authentication middleware

// Book a new appointment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason, notes } = req.body;
    const patientId = req.user.id; // Get from authenticated user

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if slot is available
    const doctorAvailability = doctor.availability.get(date) || [];
    if (!doctorAvailability.includes(timeSlot)) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    // Check if slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: date,
      timeSlot: timeSlot,
      status: 'scheduled'
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Slot already booked' });
    }

    // Create new appointment
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      date,
      timeSlot,
      reason,
      notes
    });

    await appointment.save();

    // Remove booked slot from doctor's availability
    const updatedSlots = doctorAvailability.filter(slot => slot !== timeSlot);
    doctor.availability.set(date, updatedSlots);
    await doctor.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

// Get all appointments for a patient
router.get('/my-appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'first_name last_name specialization')
      .sort({ date: 1, timeSlot: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Cancel appointment
router.patch('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify the appointment belongs to the user
    if (appointment.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get doctor and restore the time slot
    const doctor = await Doctor.findById(appointment.doctor);
    const currentSlots = doctor.availability.get(appointment.date) || [];
    doctor.availability.set(appointment.date, [...currentSlots, appointment.timeSlot].sort());
    await doctor.save();

    // Update appointment status
    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
});

module.exports = router;