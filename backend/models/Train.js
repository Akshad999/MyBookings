const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
    required: true
  },
  trainType: {
    type: String,
    enum: ['Express', 'Superfast', 'Passenger', 'Rajdhani', 'Shatabdi', 'Duronto', 'Garib Rath', 'Jan Shatabdi', 'Vande Bharat'],
    required: true
  },
  sourceStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  destinationStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  runningDays: {
    type: [String],
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    required: true
  },
  route: [{
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station'
    },
    arrivalTime: String,
    departureTime: String,
    distance: Number,
    stopNumber: Number,
    platform: String,
    haltTime: Number // in minutes
  }],
  classes: [{
    classType: {
      type: String,
      enum: ['1A', '2A', '3A', 'SL', '2S', 'CC', 'EC', '3E']
    },
    totalSeats: Number,
    fare: Number,
    availableSeats: Number
  }],
  distance: Number, // in KM
  duration: String, // HH:MM format
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster search
trainSchema.index({ trainNumber: 1, trainName: 'text' });
trainSchema.index({ sourceStation: 1, destinationStation: 1 });

module.exports = mongoose.model('Train', trainSchema);
