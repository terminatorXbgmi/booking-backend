const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
  sport: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport', required: true },
  court: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Consider using a more structured time format
  endTime: { type: String, required: true },   // Consider using a more structured time format
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: reference to the user who made the booking
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);