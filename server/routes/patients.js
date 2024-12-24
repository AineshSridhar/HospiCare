const express = require('express');
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');

function authenticateToken(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(403).json({message: 'No token provided'});
    }

    try{
        const decoded = jwt.verify(token, '8a4f0d912fe34f07b9a65c6fbfa64a85e9fef09ab639469b1ec9fca6725067d8');
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err){
        console.error(err);
        return res.status(403).json({message: 'Invalid token'});
    }
}

router.get('/', authenticateToken, async(req, res) =>{
    try{
        console.log('Collection name: ', User.collection.collectionName);
        console.log(req.user.username);

        // Find patients with specific fields
        const patients = await User.find({ username: req.user.username })
                                  .select('name username age');  // Only fetch name, username, and age

        console.log('User details: ', patients);

        // Get the count of patients
        const patientCount = await User.countDocuments({ username: req.user.username });

        // Send back the count and the basic details
        res.json({
            count: patientCount,
            patients: patients
        });
    } catch (err){
        console.error('Error fetching user details: ', err);
        res.status(500).json({message:"Error fetching user details"});
    }
})

module.exports = router;
