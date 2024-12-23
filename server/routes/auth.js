const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  console.log('Received data:', req.body);
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    // Compare the password with the hashed password in DB
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    // Generate a token with user ID, username, and role
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      username: user.username,
      role: user.role, // Include role in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  console.log('Received data:', req.body);
  const { name, age, dob, email, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      age,
      dob,
      email,
      username,
      password: hashedPassword,
      role: "patient",
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register Admin (Secure Endpoint)
router.post('/register-admin', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new User({
      name,
      username,
      password: hashedPassword,
      role: 'admin', // Explicitly set admin role
    });

    // Save admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware for Admin Authorization
function authorizeAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Admin-Only Route Example (e.g., Manage Users)
router.get('/admin/users', authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;