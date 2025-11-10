// // const mongoose = require('mongoose');

// // const ticketSchema = new mongoose.Schema({
// //   ticketNumber: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   user: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true,
// //   },
// //   type: {
// //     type: String,
// //     default: "train" // or "bus"
// //   },
// //   train: {
// //     type: Object,
// //     default: {}
// //   },
// //   bus: {
// //     type: Object,
// //     default: {}
// //   },
// //   seats: {
// //     type: [String],
// //     default: []
// //   },
// //   total: {
// //     type: Number,
// //     required: true
// //   },
// //   from: {
// //     type: String,
// //     required: true
// //   },
// //   to: {
// //     type: String,
// //     required: true
// //   },
// //   date: {
// //     type: Date,
// //     required: true
// //   },
// //   status: {
// //     type: String,
// //     enum: ['booked', 'used', 'cancelled', 'refunded'],
// //     default: 'booked',
// //   },
// //   paymentStatus: {
// //     type: String,
// //     enum: ['pending', 'completed', 'failed', 'refunded'],
// //     default: 'completed'
// //   },
// //   purchaseDate: {
// //     type: Date,
// //     default: Date.now,
// //   },
// //   usedAt: Date
// // });

// // // Generate unique ticket number on save
// // ticketSchema.pre('save', async function(next) {
// //   if (!this.ticketNumber) {
// //     this.ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
// //   }
// //   next();
// // });

// // module.exports = mongoose.model('Ticket', ticketSchema);
// const mongoose = require('mongoose');

// const ticketSchema = new mongoose.Schema({
//   ticketNumber: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   type: { type: String, default: "train" },
//   train: { type: Object, default: {} },
//   bus: { type: Object, default: {} },
//   seats: { type: [String], default: [] },
//   total: { type: Number, required: true },
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   date: { type: Date, required: true },
//   status: {
//     type: String,
//     enum: ['booked', 'used', 'cancelled', 'refunded'],
//     default: 'booked',
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'completed', 'failed', 'refunded'],
//     default: 'completed'
//   },
//   purchaseDate: { type: Date, default: Date.now },
//   usedAt: Date
// });

// // This block will be called BEFORE saving any ticket
// ticketSchema.pre('validate', function(next) {
//   if (!this.ticketNumber) {
//     this.ticketNumber =
//       `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
//   }
//   next();
// });

// module.exports = mongoose.model('Ticket', ticketSchema);
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: { 
    type: String, 
    default: "train" // "train" or "bus"
  },
  train: { 
    type: Object, 
    default: {} 
  },
  bus: { 
    type: Object, 
    default: {} 
  },
  seats: { 
    type: [String], 
    default: [] 
  },
  total: { 
    type: Number, 
    required: true 
  },
  from: { 
    type: String, 
    required: true 
  },
  to: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: {
    type: String,
    enum: ['booked', 'used', 'cancelled', 'refunded'],
    default: 'booked',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  },
  usedAt: Date
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Generate unique ticket number BEFORE validation
ticketSchema.pre('validate', function(next) {
  if (!this.ticketNumber) {
    this.ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
