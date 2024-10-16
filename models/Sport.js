const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center', required: true },
  courts: [{ type: String }], // Array of court names or identifiers
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Sport', sportSchema);