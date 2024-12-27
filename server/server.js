// server/app.js

require('dotenv').config();  // Load environment variables at the top
console.log('JWT Secret:', process.env.JWT_SECRET);  // Make sure this is defined

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const healthRecordsRoute = require('./routes/healthRecords');
const userDetailsRoute = require('./routes/userdetails');
const viewAppointmentsRoute = require('./routes/viewappointments'); 
const doctorDetailsRoute = require('./routes/doctordetails');
const appointmentsRoute = require('./routes/appointments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute); 
app.use('/api/healthrecords', healthRecordsRoute); 
app.use('/api/userdetails', userDetailsRoute); 
app.use('/api/viewappointments', viewAppointmentsRoute); 
app.use('/api/doctors', doctorDetailsRoute);
app.use('/api/appointments', appointmentsRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error('Error fetching collections:', err);
      } else {
        console.log('Collections in the database:', collections.map(col => col.name));
      }
    });
  })
  .catch(err => console.log(err));

// Start the server
app.listen(5000, () => console.log('Server running on port 5000'));
