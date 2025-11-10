// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');
// const Train = require('../models/Train');
// const { protect } = require('../middleware/auth');

// // @route   POST /bookings/create
// // @desc    Create a new booking
// // @access  Private
// router.post('/create', protect, async (req, res) => {
//   try {
//     const {
//       trainId,
//       journeyDate,
//       fromStationId,
//       toStationId,
//       classType,
//       passengers
//     } = req.body;

//     // Validate
//     if (!trainId || !journeyDate || !fromStationId || !toStationId || !classType || !passengers) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }

//     // Get train details
//     const train = await Train.findById(trainId)
//       .populate('route.station');

//     if (!train) {
//       return res.status(404).json({
//         success: false,
//         message: 'Train not found'
//       });
//     }

//     // Check availability
//     const searchDate = new Date(journeyDate);
//     const existingBookings = await Booking.find({
//       train: trainId,
//       journeyDate: {
//         $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
//         $lt: new Date(searchDate.setHours(23, 59, 59, 999))
//       },
//       classType: classType,
//       bookingStatus: { $ne: 'Cancelled' }
//     });

//     const bookedSeats = existingBookings.reduce((total, b) => total + b.passengers.length, 0);
//     const classInfo = train.classes.find(c => c.classType === classType);
//     const availableSeats = classInfo.totalSeats - bookedSeats;

//     // Determine booking status
//     let bookingStatus = 'Confirmed';
//     let passengerStatus = 'CNF';
    
//     if (availableSeats < passengers.length) {
//       bookingStatus = 'Waitlisted';
//       passengerStatus = 'WL';
//     }

//     // Calculate fare
//     const farePerPassenger = classInfo.fare;
//     const totalFare = farePerPassenger * passengers.length;

//     // Assign seat numbers (simplified)
//     const passengersWithSeats = passengers.map((p, index) => ({
//       ...p,
//       seatNumber: availableSeats > index ? `${classType}-${bookedSeats + index + 1}` : 'WL',
//       status: availableSeats > index ? 'CNF' : `WL-${index - availableSeats + 1}`
//     }));

//     // Create booking
//     const booking = await Booking.create({
//       user: req.user._id,
//       train: trainId,
//       journeyDate: journeyDate,
//       fromStation: fromStationId,
//       toStation: toStationId,
//       classType: classType,
//       passengers: passengersWithSeats,
//       totalFare: totalFare,
//       bookingStatus: bookingStatus,
//       paymentStatus: 'Completed', // In real app, integrate payment gateway
//       paymentMethod: 'Card',
//       transactionId: `TXN${Date.now()}`
//     });

//     await booking.populate('train fromStation toStation');

//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       booking: booking
//     });

//   } catch (error) {
//     console.error('Booking error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error creating booking'
//     });
//   }
// });

// // @route   GET /bookings/my-bookings
// // @desc    Get user's bookings
// // @access  Private
// router.get('/my-bookings', protect, async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user._id })
//       .populate('train fromStation toStation')
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: bookings.length,
//       bookings: bookings
//     });
//   } catch (error) {
//     console.error('Get bookings error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching bookings'
//     });
//   }
// });

// // @route   GET /bookings/pnr/:pnr
// // @desc    Check PNR status
// // @access  Public
// router.get('/pnr/:pnr', async (req, res) => {
//   try {
//     const booking = await Booking.findOne({ pnr: req.params.pnr })
//       .populate('train fromStation toStation user', '-password');

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: 'PNR not found'
//       });
//     }

//     res.json({
//       success: true,
//       booking: booking
//     });
//   } catch (error) {
//     console.error('PNR check error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error checking PNR'
//     });
//   }
// });

// // @route   PUT /bookings/:bookingId/cancel
// // @desc    Cancel a booking
// // @access  Private
// router.put('/:bookingId/cancel', protect, async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.bookingId,
//       user: req.user._id
//     });

//     if (!booking) {
//       return res.status(404).json({
//         success: false,
//         message: 'Booking not found'
//       });
//     }

//     if (booking.bookingStatus === 'Cancelled') {
//       return res.status(400).json({
//         success: false,
//         message: 'Booking already cancelled'
//       });
//     }

//     booking.bookingStatus = 'Cancelled';
//     booking.paymentStatus = 'Refunded';
//     await booking.save();

//     res.json({
//       success: true,
//       message: 'Booking cancelled successfully',
//       booking: booking
//     });
//   } catch (error) {
//     console.error('Cancel booking error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error cancelling booking'
//     });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// @route   POST /api/bookings/create
// @desc    Create booking with real train data
// @access  Private
router.post('/create', protect, async (req, res) => {
  try {
    const {
      trainNumber,
      trainName,
      journeyDate,
      fromStationCode,
      toStationCode,
      classType,
      passengers,
      totalFare
    } = req.body;

    // Validate
    if (!trainNumber || !journeyDate || !fromStationCode || !toStationCode || !classType || !passengers) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check existing bookings for this train
    const searchDate = new Date(journeyDate);
    const existingBookings = await Booking.find({
      trainNumber: trainNumber,
      journeyDate: {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lt: new Date(searchDate.setHours(23, 59, 59, 999))
      },
      classType: classType,
      bookingStatus: { $ne: 'Cancelled' }
    });

    const bookedSeats = existingBookings.reduce((total, b) => total + b.passengers.length, 0);
    const totalSeats = 72; // Default, can be dynamic
    const availableSeats = totalSeats - bookedSeats;

    // Determine booking status
    let bookingStatus = 'Confirmed';
    let passengerStatus = 'CNF';
    
    if (availableSeats < passengers.length) {
      bookingStatus = 'Waitlisted';
      passengerStatus = 'WL';
    }

    // Assign seat numbers
    const passengersWithSeats = passengers.map((p, index) => ({
      ...p,
      seatNumber: availableSeats > index ? `${classType}-${bookedSeats + index + 1}` : 'WL',
      status: availableSeats > index ? 'CNF' : `WL-${index - availableSeats + 1}`
    }));

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      trainNumber: trainNumber,
      trainName: trainName,
      journeyDate: journeyDate,
      fromStationCode: fromStationCode,
      toStationCode: toStationCode,
      classType: classType,
      passengers: passengersWithSeats,
      totalFare: totalFare,
      bookingStatus: bookingStatus,
      paymentStatus: 'Completed'
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: booking,
      pnr: booking.pnr
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
});

// @route   GET /api/bookings/pnr/:pnr
// @desc    Check PNR status
// @access  Public
router.get('/pnr/:pnr', async (req, res) => {
  try {
    const booking = await Booking.findOne({ pnr: req.params.pnr })
      .populate('user', 'name email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'PNR not found'
      });
    }

    res.json({
      success: true,
      booking: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking PNR'
    });
  }
});

module.exports = router;
