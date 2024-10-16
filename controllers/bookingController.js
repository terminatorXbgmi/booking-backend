// const Booking = require('../models/Booking');
// const Sport = require('../models/Sport');

// // Get all bookings
// exports.getBookings = async (req, res) => {
//   try {
//     const { center, sport, date } = req.query;
//     const query = {};
//     if (center) query.center = center;
//     if (sport) query.sport = sport;
//     if (date) query.date = date;

//     const bookings = await Booking.find(query).populate('center sport');
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching bookings', error: error.message });
//   }
// };

// // Create a new booking
// exports.createBooking = async (req, res) => {
//   try {
//     const { center, sport, court, date, startTime, endTime } = req.body;

//     // Check if the sport exists and get the available courts
//     const sportData = await Sport.findById(sport);
//     if (!sportData) {
//       return res.status(404).json({ message: 'Sport not found' });
//     }

//     // Validate if the selected court is available
//     if (!sportData.courts.includes(court)) {
//       return res.status(400).json({ message: 'Selected court is not available for this sport' });
//     }

//     // Check for overlapping bookings
//     const existingBooking = await Booking.findOne({
//       center,
//       sport,
//       date,
//       court,
//       $or: [
//         { startTime: { $lt: endTime, $gt: startTime } },
//         { endTime: { $gt: startTime, $lt: endTime } },
//       ],
//     });

//     if (existingBooking) {
//       return res.status(400).json({ message: 'Court is already booked for the selected time' });
//     }

//     // Create new booking
//     const newBooking = new Booking({
//       center,
//       sport,
//       court,
//       date,
//       startTime,
//       endTime,
//     });

//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating booking', error: error.message });
//   }
// };

// // Get a single booking
// exports.getBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id).populate('center sport');
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching booking', error: error.message });
//   }
// };

// // Update a booking
// exports.updateBooking = async (req, res) => {
//   try {
//     const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('center sport');
//     if (!updatedBooking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating booking', error: error.message });
//   }
// };

// // Delete a booking
// exports.deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.status(200).json({ message: 'Booking deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting booking', error: error.message });
//   }
// };
const Booking = require('../models/Booking');
const Sport = require('../models/Sport');

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const { center, sport, date } = req.query;
    const query = {};
    if (center) query.center = center;
    if (sport) query.sport = sport;
    if (date) query.date = date;

    const bookings = await Booking.find(query).populate('center sport');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { center, sport, court, date, startTime, endTime } = req.body;

    // Check if the sport exists and get the available courts
    const sportData = await Sport.findById(sport);
    if (!sportData) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    // Validate if the selected court is available
    if (!sportData.courts.includes(court)) {
      return res.status(400).json({ message: 'Selected court is not available for this sport' });
    }

    // Check for overlapping bookings
    // const existingBooking = await Booking.findOne({
    //   center,
    //   sport,
    //   date,
    //   court,
    //   $or: [
    //     { startTime: { $lte: endTime, $gte: startTime } },
    //     { endTime: { $gte: startTime, $lte: endTime } },
    //   ],
    // });

    // if (existingBooking) {
    //   return res.status(400).json({ message: 'Court is already booked for the selected time' });
    // }

    const existingBooking = await Booking.findOne({
        center,
        sport,
        date,
        court,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } }, // New booking starts before an existing booking ends
          { endTime: { $gt: startTime, $lte: endTime } },   // New booking ends after an existing booking starts
          { startTime: { $gte: startTime, $lte: endTime } }, // New booking starts during an existing booking
          { endTime: { $lte: endTime, $gte: startTime } }    // New booking ends during an existing booking
        ],
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Court is already booked for the selected time' });
      }

    // Create new booking
    const newBooking = new Booking({
      center,
      sport,
      court,
      date,
      startTime,
      endTime,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get available time slots for a specific date, center, sport, and court
exports.getAvailableSlots = async (req, res) => {
  const { center, sport, court, date } = req.query;

  // Define all possible time slots (24 slots for a 24-hour period)
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    return { startTime: hour, endTime: `${hour.split(':')[0]}:59` };
  });

  try {
    // Fetch existing bookings for the specified date, center, sport, and court
    const existingBookings = await Booking.find({
      center,
      sport,
      court,
      date,
    });

    // Filter out booked slots
    const bookedSlots = existingBookings.map(booking => ({
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));

    const availableSlots = timeSlots.filter(slot => {
      return !bookedSlots.some(booked => 
        booked.startTime === slot.startTime || booked.endTime === slot.endTime
      );
    });

    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error: error.message });
  }
};

// Get a single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('center sport');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('center sport');
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking', error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};