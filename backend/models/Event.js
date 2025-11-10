const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
  },
  category: {
    type: String,
    required: true,
    enum: ['concert', 'sports', 'theater', 'conference', 'workshop', 'other'],
  },
  venue: {
    name: String,
    address: String,
    city: String,
    capacity: Number,
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date'],
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'default-event.jpg',
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticketTypes: [{
    name: {
      type: String,
      required: true, // e.g., VIP, General, Early Bird
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    benefits: [String], // e.g., ["Front Row Seating", "Meet & Greet"]
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for available tickets
eventSchema.virtual('availableTickets').get(function() {
  return this.ticketTypes.reduce((acc, type) => acc + (type.quantity - type.sold), 0);
});

module.exports = mongoose.model('Event', eventSchema);
