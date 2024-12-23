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

module.exports = router;
