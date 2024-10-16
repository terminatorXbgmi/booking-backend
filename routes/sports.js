const express = require('express');
const router = express.Router();
const {
  getSports,
  createSport,
  getSport,
  updateSport,
  deleteSport
} = require('../controllers/sportController');

// @route   GET /api/sports
// @desc    Get all sports or filter by center
// @access  Public
router.get('/', getSports);

// @route   POST /api/sports
// @desc    Create a new sport
// @access  Public
router.post('/', createSport);

// @route   GET /api/sports/:id
// @desc    Get a single sport
// @access  Public
router.get('/:id', getSport);

// @route   PUT /api/sports/:id
// @desc    Update a sport
// @access  Public
router.put('/:id', updateSport);

// @route   DELETE /api/sports/:id
// @desc    Delete a sport
// @access  Public
router.delete('/:id', deleteSport);

module.exports = router;