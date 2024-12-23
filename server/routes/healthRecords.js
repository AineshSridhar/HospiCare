const express = require('express');
const HealthRecord = require('../models/HealthRecord');
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
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
// Get health records for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Collection name:', HealthRecord.collection.collectionName);
    console.log('Username:', req.user.username);  // Use username from JWT payload

    // Convert the string userId to ObjectId using 'new' keyword
    const records = await HealthRecord.find({ username: req.user.username });

    console.log('Health Records:', records);
    res.json(records);
  } catch (err) {
    console.error('Error fetching health records:', err);
    res.status(500).json({ message: 'Error fetching health records' });
  }
});

module.exports = router;
