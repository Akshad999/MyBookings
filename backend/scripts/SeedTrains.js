require('dotenv').config();
const mongoose = require('mongoose');
const Train = require('../models/Train');
const Station = require('../models/Station');

const seedTrains = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Get stations
    const cdg = await Station.findOne({ stationCode: 'CDG' });
    const klk = await Station.findOne({ stationCode: 'KLK' });

    if (!cdg || !klk) {
      console.error('❌ Chandigarh or Kalka station not found!');
      console.log('💡 Please run: npm run seed:stations first');
      process.exit(1);
    }

    console.log('✅ Found stations:', cdg.stationName, 'and', klk.stationName);

    // Clear existing trains
    await Train.deleteMany({});
    console.log('✅ Cleared existing trains');

    // Create trains
    const trains = [
      // Chandigarh to Kalka
      {
        trainNumber: '12011',
        trainName: 'Kalka Shatabdi',
        trainType: 'Shatabdi',
        sourceStation: cdg._id,
        destinationStation: klk._id,
        departureTime: '07:40',
        arrivalTime: '08:15',
        runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        route: [
          {
            station: cdg._id,
            arrivalTime: '07:40',
            departureTime: '07:40',
            distance: 0,
            stopNumber: 1,
            platform: '1',
            haltTime: 0
          },
          {
            station: klk._id,
            arrivalTime: '08:15',
            departureTime: '08:15',
            distance: 27,
            stopNumber: 2,
            platform: '1',
            haltTime: 0
          }
        ],
        classes: [
          { classType: 'CC', totalSeats: 78, fare: 150, availableSeats: 78 },
          { classType: '2S', totalSeats: 120, fare: 50, availableSeats: 120 }
        ],
        distance: 27,
        duration: '35m',
        isActive: true
      },
      // Kalka to Chandigarh
      {
        trainNumber: '12012',
        trainName: 'Kalka Shatabdi',
        trainType: 'Shatabdi',
        sourceStation: klk._id,
        destinationStation: cdg._id,
        departureTime: '18:30',
        arrivalTime: '19:05',
        runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        route: [
          {
            station: klk._id,
            arrivalTime: '18:30',
            departureTime: '18:30',
            distance: 0,
            stopNumber: 1,
            platform: '1',
            haltTime: 0
          },
          {
            station: cdg._id,
            arrivalTime: '19:05',
            departureTime: '19:05',
            distance: 27,
            stopNumber: 2,
            platform: '1',
            haltTime: 0
          }
        ],
        classes: [
          { classType: 'CC', totalSeats: 78, fare: 150, availableSeats: 78 },
          { classType: '2S', totalSeats: 120, fare: 50, availableSeats: 120 }
        ],
        distance: 27,
        duration: '35m',
        isActive: true
      }
    ];

    await Train.insertMany(trains);
    console.log(`✅ Seeded ${trains.length} trains successfully!\n`);
    
    // Show the trains
    const allTrains = await Train.find({}).populate('sourceStation destinationStation');
    console.log('🚂 Trains in database:');
    allTrains.forEach(t => {
      console.log(`  ${t.trainNumber} - ${t.trainName}`);
      console.log(`    Route: ${t.sourceStation.stationCode} → ${t.destinationStation.stationCode}`);
      console.log(`    Time: ${t.departureTime} - ${t.arrivalTime} (${t.duration})`);
    });
    
    console.log('\n✅ Done! Start your server with: npm run dev');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding trains:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedTrains();
