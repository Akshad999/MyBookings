require('dotenv').config();
const mongoose = require('mongoose');
const Station = require('../models/Station');

const majorStations = [
  // Chandigarh & Kalka (MOST IMPORTANT!)
  { stationCode: 'CDG', stationName: 'Chandigarh', city: 'Chandigarh', state: 'Chandigarh', zone: 'NR' },
  { stationCode: 'KLK', stationName: 'Kalka', city: 'Kalka', state: 'Haryana', zone: 'NR' },
  
  // Delhi
  { stationCode: 'NDLS', stationName: 'New Delhi', city: 'Delhi', state: 'Delhi', zone: 'NR' },
  { stationCode: 'DLI', stationName: 'Old Delhi', city: 'Delhi', state: 'Delhi', zone: 'NR' },
  
  // Mumbai
  { stationCode: 'CSTM', stationName: 'Mumbai CST', city: 'Mumbai', state: 'Maharashtra', zone: 'CR' },
  { stationCode: 'BCT', stationName: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra', zone: 'WR' },
  
  // Kolkata
  { stationCode: 'HWH', stationName: 'Howrah Jn', city: 'Kolkata', state: 'West Bengal', zone: 'ER' },
  
  // Chennai
  { stationCode: 'MAS', stationName: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu', zone: 'SR' },
  
  // Bangalore
  { stationCode: 'SBC', stationName: 'Bangalore City', city: 'Bangalore', state: 'Karnataka', zone: 'SWR' },
  
  // Pune
  { stationCode: 'PUNE', stationName: 'Pune Junction', city: 'Pune', state: 'Maharashtra', zone: 'CR' },
];

const seedStations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
    
    // Clear existing stations
    await Station.deleteMany({});
    console.log('✅ Cleared existing stations');
    
    // Insert new stations
    await Station.insertMany(majorStations);
    console.log(`✅ Seeded ${majorStations.length} stations successfully!\n`);
    
    // Show the stations
    const stations = await Station.find({});
    console.log('📍 Stations in database:');
    stations.forEach(s => {
      console.log(`  ${s.stationCode} - ${s.stationName} (${s.city}, ${s.state})`);
    });
    
    console.log('\n✅ Done! You can now run: npm run seed:trains');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding stations:', error.message);
    process.exit(1);
  }
};

seedStations();
