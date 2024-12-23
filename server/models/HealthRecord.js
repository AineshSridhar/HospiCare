const mongoose = require('mongoose');

const healthRecordsSchema = new mongoose.Schema({
  username: { type: String, required: true },  // Assuming username is stored here
  recordType: { type: String, required: true }, // Type of health record (e.g., blood test, x-ray, etc.)
  description: { type: String, required: true }, // Description of the health record
  date: { type: Date, default: Date.now }, // Date of the record
  details: { type: String, required: true }
}, {
  collection: 'HealthRecord' // Specify the collection name here
});

// Create the HealthRecord model
const HealthRecord = mongoose.model('HealthRecord', healthRecordsSchema);

module.exports = HealthRecord;