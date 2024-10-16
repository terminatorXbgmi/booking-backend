const express = require('express');
const router = express.Router();
const {
  getCenters,
  createCenter,
  getCenter,
  updateCenter,
  deleteCenter
} = require('../controllers/centerController');

// @route   GET /api/centers
// @desc    Get all centers
// @access  Public
router.get('/', getCenters);

// @route   POST /api/centers
// @desc    Create a new center
// @access  Public
router.post('/', createCenter);

// @route   GET /api/centers/:id
// @desc    Get a single center
// @access  Public
router.get('/:id', getCenter);

// @route   PUT /api/centers/:id
// @desc    Update a center
// @access  Public
router.put('/:id', updateCenter);

// @route   DELETE /api/centers/:id
// @desc    Delete a center
// @access  Public
router.delete('/:id', deleteCenter);

module.exports = router;