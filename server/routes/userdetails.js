const express = require('express');
const User = require('../models/User.js');
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
    console.log('Collection name:', User.collection.collectionName);
    console.log('Username:', req.user.username);  // Use username from JWT payload

    // Convert the string userId to ObjectId using 'new' keyword
    const details = await User.find({ username: req.user.username });

    console.log('User details:', details);
    res.json(details);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});

module.exports = router;
