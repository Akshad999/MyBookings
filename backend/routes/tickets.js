// const express = require('express');
// const router = express.Router();
// const Ticket = require('../models/Ticket');
// const { protect } = require('../middleware/auth');

// // ============== CREATE TICKET BOOKING ==============
// router.post('/book', protect, async (req, res) => {
//   try {
//     const { train, seats, total, from, to, date, type } = req.body;
//     console.log("Booking payload:", req.body);
//     console.log("User:", req.user);
//     const ticket = await Ticket.create({
//       user: req.user.id,
//       type: type || 'train',
//       train,
//       seats,
//       total,
//       from,
//       to,
//       date,
//       status: "booked"
//     });
//     console.log("Ticket created:", ticket); // <<< THIS SHOULD BE IN YOUR LOGS
//     res.status(201).json({ success: true, ticket });
//   } catch (err) {
//     console.error("❌ BOOKING ERROR:", err);
//     res.status(500).json({ success: false, message: "Booking failed!", error: err.message });
//   }
// });


// // =========== GET USER'S BOOKED TICKETS ============
// router.get('/my', protect, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const bookings = await Ticket.find({ user: userId }).sort({ createdAt: -1 });
//     res.json({ success: true, bookings });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Could not load bookings' });
//   }
// });

// // =========== ADMIN & USER TICKET VIEW ============
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id).populate('user');
//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: 'Ticket not found',
//       });
//     }
//     if (ticket.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(403).json({
//         success: false,
//         message: 'Not authorized to view this ticket',
//       });
//     }
//     res.status(200).json({ success: true, ticket });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error fetching ticket' });
//   }
// });

// // =========== VERIFY/USE TICKET ============
// router.post('/verify', protect, async (req, res) => {
//   try {
//     const { ticketNumber } = req.body;
//     const ticket = await Ticket.findOne({ ticketNumber }).populate('user');
//     if (!ticket) {
//       return res.status(404).json({
//         success: false,
//         message: 'Invalid ticket',
//       });
//     }
//     if (ticket.status === 'used') {
//       return res.status(400).json({
//         success: false,
//         message: 'Ticket already used',
//         usedAt: ticket.usedAt,
//       });
//     }
//     if (ticket.status === 'cancelled') {
//       return res.status(400).json({
//         success: false,
//         message: 'Ticket has been cancelled',
//       });
//     }
//     ticket.status = 'used';
//     ticket.usedAt = new Date();
//     await ticket.save();
//     res.status(200).json({
//       success: true,
//       message: 'Ticket verified successfully',
//       ticket,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error verifying ticket' });
//   }
// });
// // Cancel a booking
// router.patch('/cancel/:id', protect, async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
    
//     if (!ticket) {
//       return res.status(404).json({ success: false, message: 'Ticket not found' });
//     }
    
//     // Check if user owns this ticket
//     if (ticket.user.toString() !== req.user.id) {
//       return res.status(403).json({ success: false, message: 'Not authorized' });
//     }
    
//     // Check if already cancelled
//     if (ticket.status === 'cancelled') {
//       return res.status(400).json({ success: false, message: 'Ticket already cancelled' });
//     }
    
//     // Update ticket status
//     ticket.status = 'cancelled';
//     ticket.paymentStatus = 'refunded';
//     await ticket.save();
    
//     res.json({ 
//       success: true, 
//       message: 'Ticket cancelled successfully. Your money will be refunded within 5-7 business days.',
//       ticket 
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error cancelling ticket', error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/auth');

// ============== CREATE TICKET BOOKING ==============
router.post('/book', protect, async (req, res) => {
  try {
    const { train, bus, seats, total, from, to, date, type } = req.body;
    
    console.log("📝 Booking payload:", req.body);
    console.log("👤 User:", req.user.id);
    
    const ticket = await Ticket.create({
      user: req.user.id,
      type: type || 'train',
      train: train || {},
      bus: bus || {},
      seats,
      total,
      from,
      to,
      date,
      status: "booked",
      paymentStatus: "completed"
    });
    
    console.log("✅ Ticket created:", ticket._id);
    res.status(201).json({ success: true, ticket });
  } catch (err) {
    console.error("❌ BOOKING ERROR:", err);
    res.status(500).json({ 
      success: false, 
      message: "Booking failed!", 
      error: err.message 
    });
  }
});

// =========== GET USER'S BOOKED TICKETS ============
router.get('/my', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("📋 Fetching bookings for user:", userId);
    
    const bookings = await Ticket.find({ user: userId }).sort({ createdAt: -1 });
    
    console.log("✅ Found", bookings.length, "booking(s)");
    res.json({ success: true, bookings });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ success: false, message: 'Could not load bookings' });
  }
});

// =========== CANCEL BOOKING ============
router.patch('/cancel/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    
    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    if (ticket.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Ticket already cancelled' });
    }
    
    ticket.status = 'cancelled';
    ticket.paymentStatus = 'refunded';
    await ticket.save();
    
    console.log("🚫 Ticket cancelled:", ticket._id);
    
    res.json({ 
      success: true, 
      message: 'Ticket cancelled successfully. Your money will be refunded within 5-7 business days.',
      ticket 
    });
  } catch (err) {
    console.error("❌ Error cancelling ticket:", err);
    res.status(500).json({ success: false, message: 'Error cancelling ticket', error: err.message });
  }
});

// =========== VIEW SINGLE TICKET ============
router.get('/:id', protect, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('user');
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }
    if (ticket.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this ticket',
      });
    }
    res.status(200).json({ success: true, ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching ticket' });
  }
});

// =========== VERIFY/USE TICKET ============
router.post('/verify', protect, async (req, res) => {
  try {
    const { ticketNumber } = req.body;
    const ticket = await Ticket.findOne({ ticketNumber }).populate('user');
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Invalid ticket',
      });
    }
    if (ticket.status === 'used') {
      return res.status(400).json({
        success: false,
        message: 'Ticket already used',
        usedAt: ticket.usedAt,
      });
    }
    if (ticket.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Ticket has been cancelled',
      });
    }
    ticket.status = 'used';
    ticket.usedAt = new Date();
    await ticket.save();
    res.status(200).json({
      success: true,
      message: 'Ticket verified successfully',
      ticket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying ticket' });
  }
});

module.exports = router;
