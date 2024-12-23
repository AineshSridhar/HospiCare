const express = require('express')
const viewAppointments = require('../models/Appointments.js');
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose');

function authenticateToken(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and add the user ID to the request object
        console.log(token);
        const decoded = jwt.verify(token, '8a4f0d912fe34f07b9a65c6fbfa64a85e9fef09ab639469b1ec9fca6725067d8'); // Replace 'yourSecretKey' with your secret key
        req.user = decoded; // Assuming the JWT contains the user ID
        console.log(token);
        console.log(req.user);
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Invalid token' });
    }
}
router.get('/', authenticateToken, async(req, res) => {
    try{
        console.log('Collection name: ', viewAppointments.collection.collectionName);
        console.log('Username: ', req.user.username);

        const pastappointments = await viewAppointments.find({username: req.user.username});
        
        console.log('Appointments: ', pastappointments);
        res.json(pastappointments);
    } catch (err){
        console.error('Error fetching past appointments: ', err);
        res.status(500).json({message: 'Error fetching past appointment records'});
    }
});

module.exports = router;