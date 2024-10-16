const express = require('express');
const router = express.Router();
const {
  getBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getAvailableSlots
} = require('../controllers/bookingController');

router.get('/available-slots', getAvailableSlots);


// @route   GET /api/bookings
// @desc    Get all bookings or filter by center, sport, and date
// @access  Public
router.get('/', getBookings);

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post('/', createBooking);

// @route   GET /api/bookings/:id
// @desc    Get a single booking
// @access  Public
router.get('/:id', getBooking);

// @route   PUT /api/bookings/:id
// @desc    Update a booking
// @access  Public
router.put('/:id', updateBooking);

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking
// @access  Public
router.delete('/:id', deleteBooking);

module.exports = router;