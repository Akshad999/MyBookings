const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  pnr: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainNumber: {  // ← Add this field
    type: String,
    required: true
  },
  trainName: String,
  journeyDate: {
    type: Date,
    required: true
  },
  fromStationCode: {
    type: String,
    required: true
  },
  toStationCode: {
    type: String,
    required: true
  },
  classType: {
    type: String,
    required: true
  },
  passengers: [{
    name: String,
    age: Number,
    gender: String,
    seatNumber: String,
    berthPreference: String,
    status: String
  }],
  totalFare: Number,
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'RAC', 'Waitlisted', 'Cancelled'],
    default: 'Confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  }
}, { timestamps: true });

// Auto-generate PNR
bookingSchema.pre('save', async function(next) {
  if (!this.pnr) {
    this.pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
