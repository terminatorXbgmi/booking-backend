const Center = require('../models/Center');

// Get all centers
exports.getCenters = async (req, res) => {
  try {
    const centers = await Center.find();
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching centers', error: error.message });
  }
};

// Create a new center
exports.createCenter = async (req, res) => {
  try {
    const newCenter = new Center(req.body);
    const savedCenter = await newCenter.save();
    res.status(201).json(savedCenter);
  } catch (error) {
    res.status(400).json({ message: 'Error creating center', error: error.message });
  }
};

// Get a single center
exports.getCenter = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching center', error: error.message });
  }
};

// Update a center
exports.updateCenter = async (req, res) => {
  try {
    const updatedCenter = await Center.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCenter) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json(updatedCenter);
  } catch (error) {
    res.status(400).json({ message: 'Error updating center', error: error.message });
  }
};

// Delete a center
exports.deleteCenter = async (req, res) => {
  try {
    const center = await Center.findByIdAndDelete(req.params.id);
    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json({ message: 'Center deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting center', error: error.message });
  }
};