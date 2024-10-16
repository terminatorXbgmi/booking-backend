const Sport = require('../models/Sport');

// Get all sports
exports.getSports = async (req, res) => {
  try {
    const sports = await Sport.find(req.query.center ? { center: req.query.center } : {}).populate('center');
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sports', error: error.message });
  }
};

// Create a new sport
exports.createSport = async (req, res) => {
  try {
    const newSport = new Sport(req.body);
    const savedSport = await newSport.save();
    res.status(201).json(savedSport);
  } catch (error) {
    res.status(400).json({ message: 'Error creating sport', error: error.message });
  }
};

// Get a single sport
exports.getSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id).populate('center');
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json(sport);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sport', error: error.message });
  }
};

// Update a sport
exports.updateSport = async (req, res) => {
  try {
    const updatedSport = await Sport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('center');
    if (!updatedSport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json(updatedSport);
  } catch (error) {
    res.status(400).json({ message: 'Error updating sport', error: error.message });
  }
};

// Delete a sport
exports.deleteSport = async (req, res) => {
  try {
    const sport = await Sport.findByIdAndDelete(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sport', error: error.message });
  }
};