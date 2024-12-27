const express = require('express');
const Doctor = require('../models/DoctorInfo.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');


// Middleware to authenticate the user
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and add the user ID to the request object
    const decoded = jwt.verify(token, '8a4f0d912fe34f07b9a65c6fbfa64a85e9fef09ab639469b1ec9fca6725067d8'); // Replace 'yourSecretKey' with your secret key
    req.user = decoded; // Assuming the JWT contains the user ID
    console.log(req.user);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Invalid token' });
  }
}
// Get user details for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Collection name:', Doctor.collection.collectionName);  

    // Convert the string userId to ObjectId using 'new' keyword
    const doctordetails = await Doctor.find();

    console.log('Doctor details:', doctordetails);
    res.json(doctordetails);
  } catch (err) {
    console.error('Error fetching doctor details:', err);
    res.status(500).json({ message: 'Error fetching doctor details' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const doctorId = req.params.id;
    console.log(doctorId);
    // Validate if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (err) {
    console.error('Error fetching doctor details:', err);
    res.status(500).json({ message: 'Error fetching doctor details' });
  }
});

// Add appointment booking route
router.post('/:id/book', authenticateToken, async (req, res) => {
  try {
    const { date, timeSlot, reason, notes } = req.body;
    const doctorId = req.params.id;
    const userId = req.user.id; // From the authenticated token

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    console.log(doctor);
    
    // Validate slot availability
    const availableSlots = doctor.availability.get(date) || [];
    if (!availableSlots.includes(timeSlot)) {
      return res.status(400).json({ message: 'Time slot not available' });
    }
    console.log(availableSlots);

    // Create appointment (you'll need an Appointment model)
    const appointment = new Appointment({
      doctor: doctorId,
      patient: userId,
      date,
      timeSlot,
      reason,
      notes
    });

    await appointment.save();

    // Remove booked slot from doctor's availability
    const updatedSlots = availableSlots.filter(slot => slot !== timeSlot);
    doctor.availability.set(date, updatedSlots);
    await doctor.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});


module.exports = router;
