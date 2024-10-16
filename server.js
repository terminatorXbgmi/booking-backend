const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
// const config = require('./config/config');
const dotenv = require('dotenv');
// Initialize express app
const app = express();
// app.use(errorHandler);
app.use(cors());
app.use(express.json());
// Connect to database
dotenv.config({path:"config/config.env"});
connectDB();
// dotenv.config({pa});
// Middleware


// Import routes
const centerRoutes = require('./routes/centers');
const sportRoutes = require('./routes/sports');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

// // Use routes
app.use('/api/centers', centerRoutes);
app.use('/api/sports', sportRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;