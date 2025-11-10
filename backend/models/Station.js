const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  stationCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  stationName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zone: {
    type: String,
    enum: ['CR', 'ER', 'ECR', 'NCR', 'NER', 'NFR', 'NR', 'NWR', 'SCR', 'SER', 'SR', 'SWR', 'WCR', 'WR']
  },
  latitude: Number,
  longitude: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster search
stationSchema.index({ stationName: 'text', city: 'text', stationCode: 'text' });

module.exports = mongoose.model('Station', stationSchema);
