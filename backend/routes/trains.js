// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// const RAILRADAR_BASE_URL = 'https://railradar.in/api/v1';

// // @route   GET /api/trains/stations/search
// // @desc    Search railway stations by name or code
// // @access  Public
// router.get('/stations/search', async (req, res) => {
//   try {
//     const { query } = req.query;

//     if (!query || query.length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter at least 2 characters',
//       });
//     }

//     console.log('🔍 Searching stations for:', query);

//     // Call RailRadar public API - NO AUTH NEEDED
//     const response = await axios.get(`${RAILRADAR_BASE_URL}/search/stations`, {
//       params: {
//         q: query,
//         provider: 'railradar'
//       }
//     });

//     const stations = response.data || [];

//     console.log('✅ Found stations:', stations.length);

//     res.json({
//       success: true,
//       stations: stations.map(s => ({
//         name: s.name,
//         code: s.code,
//         state: s.nameHindi || '',
//       })),
//     });
//   } catch (error) {
//     console.error('❌ Station search error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error searching stations',
//       error: error.message,
//     });
//   }
// });

// // @route   GET /api/trains/search
// // @desc    Search trains between two stations
// // @access  Public
// router.get('/search', async (req, res) => {
//   try {
//     const { fromStationCode, toStationCode, dateOfJourney } = req.query;

//     if (!fromStationCode || !toStationCode) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide valid station codes',
//       });
//     }

//     console.log('🚂 Searching trains between:', fromStationCode, '→', toStationCode);

//     // Call RailRadar public API
//     const response = await axios.get(`${RAILRADAR_BASE_URL}/trains/between`, {
//       params: {
//         from: fromStationCode,
//         to: toStationCode,
//       }
//     });

//     const trains = response.data.trains || [];

//     if (trains.length === 0) {
//       return res.json({
//         success: true,
//         message: 'No trains found between these stations',
//         trains: [],
//       });
//     }

//     console.log('✅ Found trains:', trains.length);

//     res.json({
//       success: true,
//       trains: trains.map(t => ({
//         train_number: t.trainNumber,
//         train_name: t.trainName,
//         from_station_code: fromStationCode,
//         from_station_name: t.sourceStationName,
//         to_station_code: toStationCode,
//         to_station_name: t.destinationStationName,
//         from_time: t.departureTime || 'N/A',
//         to_time: t.arrivalTime || 'N/A',
//         duration: t.travelTimeMinutes ? `${Math.floor(t.travelTimeMinutes / 60)}h ${t.travelTimeMinutes % 60}m` : 'N/A',
//         class_type: t.classes || [],
//         distance: t.distanceKm || 0,
//       })),
//     });
//   } catch (error) {
//     console.error('❌ Train search error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error searching trains. Please verify station codes.',
//       error: error.message,
//     });
//   }
// });

// // @route   GET /api/trains/:trainNumber/live
// // @desc    Get live train status
// // @access  Public
// router.get('/:trainNumber/live', async (req, res) => {
//   try {
//     const { trainNumber } = req.params;

//     console.log('📍 Getting live status for train:', trainNumber);

//     const response = await axios.get(
//       `${RAILRADAR_BASE_URL}/trains/${trainNumber}/instances`
//     );

//     res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error('❌ Live status error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching live status',
//     });
//   }
// });

// module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const axios = require('axios');

// // // RapidAPI Configuration for Indian Railways
// // const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
// // const RAPIDAPI_HOST = 'irctc1.p.rapidapi.com';

// // // Indian Rail API (Free alternative)
// // const INDIAN_RAIL_API = 'https://indianrailapi.com/api/v2';
// // const INDIAN_RAIL_KEY = process.env.INDIAN_RAIL_KEY;

// // // @route   GET /api/trains/stations/search
// // // @desc    Search railway stations by name
// // // @access  Public
// // router.get('/stations/search', async (req, res) => {
// //   try {
// //     const { query } = req.query;

// //     if (!query || query.length < 2) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Please enter at least 2 characters',
// //       });
// //     }

// //     console.log('🔍 Searching stations for:', query);

// //     // Use Indian Rail API (Free)
// //     const response = await axios.get(
// //       `${INDIAN_RAIL_API}/StationSearch/search/${encodeURIComponent(query)}`,
// //       {
// //         headers: {
// //           'X-API-KEY': INDIAN_RAIL_KEY,
// //         },
// //       }
// //     );

// //     const stations = response.data.Stations || [];

// //     console.log('✅ Found stations:', stations.length);

// //     res.json({
// //       success: true,
// //       stations: stations.map(s => ({
// //         name: s.Name,
// //         code: s.StationCode,
// //         state: s.StateName
// //       })),
// //     });
// //   } catch (error) {
// //     console.error('❌ Station search error:', error.message);
    
// //     // Fallback to hardcoded common stations
// //     const commonStations = [
// //       { name: 'Chandigarh', code: 'CDG', state: 'Chandigarh' },
// //       { name: 'Kalka', code: 'KLK', state: 'Haryana' },
// //       { name: 'New Delhi', code: 'NDLS', state: 'Delhi' },
// //       { name: 'Delhi', code: 'DLI', state: 'Delhi' },
// //       { name: 'Mumbai Central', code: 'BCT', state: 'Maharashtra' },
// //       { name: 'Howrah Jn', code: 'HWH', state: 'West Bengal' },
// //       { name: 'Chennai Central', code: 'MAS', state: 'Tamil Nadu' },
// //       { name: 'Bangalore City', code: 'BNC', state: 'Karnataka' },
// //       { name: 'Jaipur', code: 'JP', state: 'Rajasthan' },
// //       { name: 'Lucknow', code: 'LKO', state: 'Uttar Pradesh' },
// //     ];

// //     const filtered = commonStations.filter(s => 
// //       s.name.toLowerCase().includes(req.query.query.toLowerCase()) ||
// //       s.code.toLowerCase().includes(req.query.query.toLowerCase())
// //     );

// //     res.json({
// //       success: true,
// //       stations: filtered,
// //     });
// //   }
// // });

// // // @route   GET /api/trains/search
// // // @desc    Search trains between two stations
// // // @access  Public
// // router.get('/search', async (req, res) => {
// //   try {
// //     const { fromStationCode, toStationCode, dateOfJourney } = req.query;

// //     if (!fromStationCode || !toStationCode) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Please provide valid station codes',
// //       });
// //     }

// //     console.log('🚂 Searching trains:', { fromStationCode, toStationCode, dateOfJourney });

// //     // Use Indian Rail API
// //     const response = await axios.get(
// //       `${INDIAN_RAIL_API}/TrainBetweenStations/from/${fromStationCode}/to/${toStationCode}/date/${dateOfJourney || 'today'}`,
// //       {
// //         headers: {
// //           'X-API-KEY': INDIAN_RAIL_KEY,
// //         },
// //       }
// //     );

// //     let trains = response.data.Trains || [];

// //     if (trains.length === 0) {
// //       // Fallback data for popular routes
// //       if (fromStationCode === 'CDG' && toStationCode === 'KLK') {
// //         trains = [
// //           {
// //             TrainNo: '12011',
// //             TrainName: 'Kalka Shatabdi',
// //             Source: 'CDG',
// //             SourceName: 'Chandigarh',
// //             Destination: 'KLK',
// //             DestinationName: 'Kalka',
// //             DepartureTime: '07:40',
// //             ArrivalTime: '08:15',
// //             Duration: '35 min',
// //             RunningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// //             AvailableClasses: ['CC'],
// //           },
// //           {
// //             TrainNo: '52455',
// //             TrainName: 'CDG KLK PASSENGER',
// //             Source: 'CDG',
// //             SourceName: 'Chandigarh',
// //             Destination: 'KLK',
// //             DestinationName: 'Kalka',
// //             DepartureTime: '09:20',
// //             ArrivalTime: '10:00',
// //             Duration: '40 min',
// //             RunningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// //             AvailableClasses: ['2S'],
// //           },
// //           {
// //             TrainNo: '52457',
// //             TrainName: 'CDG KLK PASSENGER',
// //             Source: 'CDG',
// //             SourceName: 'Chandigarh',
// //             Destination: 'KLK',
// //             DestinationName: 'Kalka',
// //             DepartureTime: '12:35',
// //             ArrivalTime: '13:15',
// //             Duration: '40 min',
// //             RunningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// //             AvailableClasses: ['2S'],
// //           },
// //         ];
// //       }
// //     }

// //     if (trains.length === 0) {
// //       return res.json({
// //         success: true,
// //         message: 'No trains found between these stations',
// //         trains: [],
// //       });
// //     }

// //     console.log('✅ Found trains:', trains.length);

// //     res.json({
// //       success: true,
// //       trains: trains.map(t => ({
// //         train_number: t.TrainNo,
// //         train_name: t.TrainName,
// //         from_station_code: t.Source,
// //         from_station_name: t.SourceName,
// //         to_station_code: t.Destination,
// //         to_station_name: t.DestinationName,
// //         from_time: t.DepartureTime,
// //         to_time: t.ArrivalTime,
// //         duration: t.Duration,
// //         running_days: t.RunningDays,
// //         class_type: t.AvailableClasses,
// //       })),
// //     });
// //   } catch (error) {
// //     console.error('❌ Train search error:', error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Error searching trains',
// //       error: error.message,
// //     });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// // Get API key from environment variables
// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
// const RAPIDAPI_HOST = 'irctc1.p.rapidapi.com';

// // Station database for autocomplete
// const STATIONS = {
//   CDG: { code: 'CDG', name: 'Chandigarh', state: 'Chandigarh' },
//   KLK: { code: 'KLK', name: 'Kalka', state: 'Haryana' },
//   NDLS: { code: 'NDLS', name: 'New Delhi', state: 'Delhi' },
//   DLI: { code: 'DLI', name: 'Delhi', state: 'Delhi' },
//   BCT: { code: 'BCT', name: 'Mumbai Central', state: 'Maharashtra' },
//   HWH: { code: 'HWH', name: 'Howrah Jn', state: 'West Bengal' },
//   MAS: { code: 'MAS', name: 'Chennai Central', state: 'Tamil Nadu' },
//   SBC: { code: 'SBC', name: 'Bangalore City', state: 'Karnataka' },
//   JP: { code: 'JP', name: 'Jaipur', state: 'Rajasthan' },
//   LKO: { code: 'LKO', name: 'Lucknow', state: 'Uttar Pradesh' },
//   AMD: { code: 'AMD', name: 'Ahmedabad', state: 'Gujarat' },
//   PUNE: { code: 'PUNE', name: 'Pune Jn', state: 'Maharashtra' },
// };

// // @route   GET /api/trains/stations/search
// // @desc    Search railway stations (using local database for speed)
// // @access  Public
// router.get('/stations/search', async (req, res) => {
//   try {
//     const { query } = req.query;

//     if (!query || query.length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter at least 2 characters',
//       });
//     }

//     console.log('🔍 Searching stations for:', query);

//     // Search in local station database
//     const searchTerm = query.toLowerCase();
//     const results = Object.values(STATIONS).filter(
//       (station) =>
//         station.name.toLowerCase().includes(searchTerm) ||
//         station.code.toLowerCase().includes(searchTerm)
//     );

//     console.log('✅ Found stations:', results.length);

//     res.json({
//       success: true,
//       stations: results,
//     });
//   } catch (error) {
//     console.error('❌ Station search error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error searching stations',
//     });
//   }
// });

// // @route   GET /api/trains/search
// // @desc    Search trains between two stations using RapidAPI
// // @access  Public
// router.get('/search', async (req, res) => {
//   try {
//     const { fromStationCode, toStationCode, dateOfJourney } = req.query;

//     if (!fromStationCode || !toStationCode) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide valid station codes',
//       });
//     }

//     console.log('🚂 Searching trains via RapidAPI:', fromStationCode, '→', toStationCode);

//     // Check if API key exists
//     if (!RAPIDAPI_KEY) {
//       console.error('❌ RAPIDAPI_KEY not found in .env file!');
//       return res.status(500).json({
//         success: false,
//         message: 'API key not configured. Please contact administrator.',
//       });
//     }

//     // Call RapidAPI
//     const response = await axios.get(
//       `https://${RAPIDAPI_HOST}/api/v1/searchTrain`,
//       {
//         params: {
//           stationFrom: fromStationCode,
//           stationTo: toStationCode,
//         },
//         headers: {
//           'X-RapidAPI-Key': RAPIDAPI_KEY,
//           'X-RapidAPI-Host': RAPIDAPI_HOST,
//         },
//       }
//     );

//     const trains = response.data.data || [];

//     if (trains.length === 0) {
//       // Fallback for popular routes
//       if (fromStationCode === 'CDG' && toStationCode === 'KLK') {
//         const fallbackTrains = [
//           {
//             train_number: '12011',
//             train_name: 'Kalka Shatabdi',
//             from_time: '07:40',
//             to_time: '08:15',
//             duration: '35m',
//             class_type: ['CC', '2S'],
//           },
//           {
//             train_number: '52455',
//             train_name: 'CDG KLK Passenger',
//             from_time: '09:20',
//             to_time: '10:00',
//             duration: '40m',
//             class_type: ['2S'],
//           },
//         ];

//         return res.json({
//           success: true,
//           trains: fallbackTrains.map(t => ({
//             ...t,
//             from_station_code: fromStationCode,
//             from_station_name: STATIONS[fromStationCode]?.name || 'Source',
//             to_station_code: toStationCode,
//             to_station_name: STATIONS[toStationCode]?.name || 'Destination',
//           })),
//           source: 'fallback',
//         });
//       }

//       return res.json({
//         success: true,
//         message: 'No trains found between these stations',
//         trains: [],
//       });
//     }

//     console.log('✅ Found trains from API:', trains.length);

//     // Format response
//     res.json({
//       success: true,
//       trains: trains.map(t => ({
//         train_number: t.train_number || t.number,
//         train_name: t.train_name || t.name,
//         from_station_code: fromStationCode,
//         from_station_name: STATIONS[fromStationCode]?.name || t.from_station_name,
//         to_station_code: toStationCode,
//         to_station_name: STATIONS[toStationCode]?.name || t.to_station_name,
//         from_time: t.from_std || t.departure_time,
//         to_time: t.to_std || t.arrival_time,
//         duration: t.duration,
//         class_type: t.class_type || [],
//       })),
//       source: 'rapidapi',
//     });
//   } catch (error) {
//     console.error('❌ RapidAPI Error:', error.response?.data || error.message);
    
//     // Fallback to hardcoded data if API fails
//     if (fromStationCode === 'CDG' && toStationCode === 'KLK') {
//       const fallbackTrains = [
//         {
//           train_number: '12011',
//           train_name: 'Kalka Shatabdi',
//           from_station_code: 'CDG',
//           from_station_name: 'Chandigarh',
//           to_station_code: 'KLK',
//           to_station_name: 'Kalka',
//           from_time: '07:40',
//           to_time: '08:15',
//           duration: '35m',
//           class_type: ['CC', '2S'],
//         },
//         {
//           train_number: '52455',
//           train_name: 'CDG KLK Passenger',
//           from_station_code: 'CDG',
//           from_station_name: 'Chandigarh',
//           to_station_code: 'KLK',
//           to_station_name: 'Kalka',
//           from_time: '09:20',
//           to_time: '10:00',
//           duration: '40m',
//           class_type: ['2S'],
//         },
//       ];

//       return res.json({
//         success: true,
//         trains: fallbackTrains,
//         source: 'fallback',
//         message: 'Using cached data (API unavailable)',
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error searching trains',
//       error: error.message,
//     });
//   }
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
// const Station = require('../models/Station');
// const Booking = require('../models/Booking');

// // RapidAPI configuration
// const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
// const RAPIDAPI_HOST = 'irctc1.p.rapidapi.com';

// // Backup: RailwayAPI configuration
// const RAILWAY_API_KEY = process.env.RAILWAY_API_KEY; // Optional backup

// // @route   GET /api/trains/stations/search
// // @desc    Search railway stations from real IRCTC database
// // @access  Public
// router.get('/stations/search', async (req, res) => {
//   try {
//     const { query } = req.query;

//     if (!query || query.length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter at least 2 characters',
//       });
//     }

//     console.log('🔍 Searching real stations for:', query);

//     // Try MongoDB first (for cached stations)
//     let stations = await Station.find({
//       $or: [
//         { stationName: { $regex: query, $options: 'i' } },
//         { stationCode: { $regex: query, $options: 'i' } },
//         { city: { $regex: query, $options: 'i' } }
//       ],
//       isActive: true
//     }).limit(10);

//     // If not found in DB, search via API
//     if (stations.length === 0) {
//       try {
//         const response = await axios.get(
//           `https://${RAPIDAPI_HOST}/api/v3/getStationsByName`,
//           {
//             params: { query },
//             headers: {
//               'X-RapidAPI-Key': RAPIDAPI_KEY,
//               'X-RapidAPI-Host': RAPIDAPI_HOST,
//             },
//           }
//         );

//         const apiStations = response.data.data || [];
        
//         // Cache stations in database for faster future searches
//         for (const station of apiStations.slice(0, 10)) {
//           await Station.findOneAndUpdate(
//             { stationCode: station.code },
//             {
//               stationCode: station.code,
//               stationName: station.name,
//               city: station.name.split(' ')[0],
//               state: station.state || 'Unknown',
//               isActive: true
//             },
//             { upsert: true, new: true }
//           );
//         }

//         stations = apiStations.map(s => ({
//           code: s.code,
//           name: s.name,
//           state: s.state || 'India'
//         }));
//       } catch (apiError) {
//         console.error('API search failed:', apiError.message);
//       }
//     }

//     res.json({
//       success: true,
//       count: stations.length,
//       stations: stations.map(s => ({
//         code: s.stationCode || s.code,
//         name: s.stationName || s.name,
//         city: s.city,
//         state: s.state
//       }))
//     });

//   } catch (error) {
//     console.error('❌ Station search error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error searching stations',
//       error: error.message
//     });
//   }
// });

// // @route   GET /api/trains/search
// // @desc    Search REAL trains between stations using live IRCTC data
// // @access  Public
// router.get('/search', async (req, res) => {
//   try {
//     const { fromStationCode, toStationCode, dateOfJourney } = req.query;

//     if (!fromStationCode || !toStationCode) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide valid station codes',
//       });
//     }

//     console.log('🚂 Searching REAL trains:', fromStationCode, '→', toStationCode);

//     if (!RAPIDAPI_KEY) {
//       return res.status(500).json({
//         success: false,
//         message: 'API key not configured',
//       });
//     }

//     // Get real-time train data from IRCTC via RapidAPI
//     const response = await axios.get(
//       `https://${RAPIDAPI_HOST}/api/v1/searchTrain`,
//       {
//         params: {
//           stationFrom: fromStationCode.toUpperCase(),
//           stationTo: toStationCode.toUpperCase(),
//         },
//         headers: {
//           'X-RapidAPI-Key': RAPIDAPI_KEY,
//           'X-RapidAPI-Host': RAPIDAPI_HOST,
//         },
//         timeout: 10000 // 10 second timeout
//       }
//     );

//     let trains = response.data.data || [];

//     if (!trains || trains.length === 0) {
//       return res.json({
//         success: true,
//         message: 'No trains found between these stations',
//         trains: [],
//         source: 'rapidapi'
//       });
//     }

//     console.log('✅ Found REAL trains from IRCTC:', trains.length);

//     // Enhance with availability from our booking database
//     const trainsWithAvailability = await Promise.all(
//       trains.map(async (train) => {
//         // Get our local bookings for this train
//         const searchDate = new Date(dateOfJourney || new Date());
//         const bookings = await Booking.find({
//           trainNumber: train.train_number || train.number,
//           journeyDate: {
//             $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
//             $lt: new Date(searchDate.setHours(23, 59, 59, 999))
//           },
//           bookingStatus: { $ne: 'Cancelled' }
//         });

//         // Calculate booked seats per class
//         const bookedSeatsPerClass = {};
//         bookings.forEach(booking => {
//           if (!bookedSeatsPerClass[booking.classType]) {
//             bookedSeatsPerClass[booking.classType] = 0;
//           }
//           bookedSeatsPerClass[booking.classType] += booking.passengers.length;
//         });

//         // Get class types from API or use defaults
//         const classTypes = train.class_type || ['SL', '3A', '2A', '1A'];
        
//         const classesWithAvailability = classTypes.map(classType => {
//           const totalSeats = getDefaultSeatsForClass(classType);
//           const bookedSeats = bookedSeatsPerClass[classType] || 0;
//           const availableSeats = totalSeats - bookedSeats;

//           return {
//             classType: classType,
//             totalSeats: totalSeats,
//             bookedSeats: bookedSeats,
//             availableSeats: Math.max(0, availableSeats),
//             fare: calculateFare(classType, train.distance || 100),
//             status: availableSeats > 0 ? 'Available' : 'Waitlist'
//           };
//         });

//         return {
//           trainId: train.train_number || train.number,
//           train_number: train.train_number || train.number,
//           train_name: train.train_name || train.name,
//           train_type: train.train_type || 'Express',
//           from_station_code: fromStationCode,
//           from_station_name: train.from_station_name || fromStationCode,
//           to_station_code: toStationCode,
//           to_station_name: train.to_station_name || toStationCode,
//           from_time: train.from_std || train.departure_time || 'N/A',
//           to_time: train.to_std || train.arrival_time || 'N/A',
//           duration: train.duration || calculateDuration(train.from_std, train.to_std),
//           distance: train.distance || 0,
//           class_type: classesWithAvailability,
//           running_days: train.running_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           source: 'live_irctc'
//         };
//       })
//     );

//     res.json({
//       success: true,
//       count: trainsWithAvailability.length,
//       date: new Date(dateOfJourney || new Date()).toDateString(),
//       trains: trainsWithAvailability,
//       source: 'live_irctc',
//       message: 'Real-time data from Indian Railways'
//     });

//   } catch (error) {
//     console.error('❌ IRCTC API Error:', error.response?.data || error.message);
    
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching real-time train data',
//       error: error.message,
//       hint: 'Check your RapidAPI key and quota'
//     });
//   }
// });

// // @route   GET /api/trains/:trainNumber/live-status
// // @desc    Get real-time train running status
// // @access  Public
// router.get('/:trainNumber/live-status', async (req, res) => {
//   try {
//     const { trainNumber } = req.params;
//     const { date } = req.query;

//     console.log('🔴 Checking live status for train:', trainNumber);

//     const response = await axios.get(
//       `https://${RAPIDAPI_HOST}/api/v1/liveTrainStatus`,
//       {
//         params: {
//           trainNo: trainNumber,
//           startDay: date ? new Date(date).getDate() : new Date().getDate()
//         },
//         headers: {
//           'X-RapidAPI-Key': RAPIDAPI_KEY,
//           'X-RapidAPI-Host': RAPIDAPI_HOST,
//         },
//       }
//     );

//     const status = response.data;

//     res.json({
//       success: true,
//       trainNumber: trainNumber,
//       liveStatus: {
//         currentStation: status.current_station_name,
//         delayMinutes: status.delay || 0,
//         lastUpdated: status.updated_time,
//         status: status.train_status || 'Running',
//         position: status.position
//       }
//     });

//   } catch (error) {
//     console.error('❌ Live status error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching live train status'
//     });
//   }
// });

// // @route   GET /api/trains/:trainNumber/schedule
// // @desc    Get complete train schedule
// // @access  Public
// router.get('/:trainNumber/schedule', async (req, res) => {
//   try {
//     const { trainNumber } = req.params;

//     console.log('📅 Fetching schedule for train:', trainNumber);

//     const response = await axios.get(
//       `https://${RAPIDAPI_HOST}/api/v1/trainSchedule`,
//       {
//         params: { trainNo: trainNumber },
//         headers: {
//           'X-RapidAPI-Key': RAPIDAPI_KEY,
//           'X-RapidAPI-Host': RAPIDAPI_HOST,
//         },
//       }
//     );

//     const schedule = response.data.data || [];

//     res.json({
//       success: true,
//       trainNumber: trainNumber,
//       schedule: schedule.map(station => ({
//         stationCode: station.station_code,
//         stationName: station.station_name,
//         arrivalTime: station.arrival_time,
//         departureTime: station.departure_time,
//         distance: station.distance,
//         haltTime: station.halt_time,
//         platform: station.platform,
//         day: station.day
//       }))
//     });

//   } catch (error) {
//     console.error('❌ Schedule error:', error.message);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching train schedule'
//     });
//   }
// });

// // Helper: Get default seats for class type
// function getDefaultSeatsForClass(classType) {
//   const seatsMap = {
//     '1A': 18,
//     '2A': 46,
//     '3A': 64,
//     'SL': 72,
//     '2S': 100,
//     'CC': 78,
//     'EC': 48,
//     '3E': 72
//   };
//   return seatsMap[classType] || 50;
// }

// // Helper: Calculate fare based on class and distance
// function calculateFare(classType, distance) {
//   const baseRates = {
//     '1A': 3.5,
//     '2A': 2.0,
//     '3A': 1.5,
//     'SL': 0.6,
//     '2S': 0.3,
//     'CC': 1.2,
//     'EC': 2.5,
//     '3E': 1.0
//   };
  
//   const rate = baseRates[classType] || 1.0;
//   const baseFare = distance * rate;
  
//   // Add reservation charges
//   const reservationCharges = {
//     '1A': 50,
//     '2A': 40,
//     '3A': 30,
//     'SL': 20,
//     '2S': 0,
//     'CC': 30,
//     'EC': 40,
//     '3E': 25
//   };
  
//   return Math.round(baseFare + (reservationCharges[classType] || 20));
// }

// // Helper: Calculate duration
// function calculateDuration(depTime, arrTime) {
//   if (!depTime || !arrTime) return 'N/A';
  
//   const [depHour, depMin] = depTime.split(':').map(Number);
//   const [arrHour, arrMin] = arrTime.split(':').map(Number);
  
//   let totalMinutes = (arrHour * 60 + arrMin) - (depHour * 60 + depMin);
//   if (totalMinutes < 0) totalMinutes += 24 * 60;
  
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;
  
//   return `${hours}h ${minutes}m`;
// }

// module.exports = router;




const express = require('express');
const router = express.Router();
const axios = require('axios');
const Station = require('../models/Station');
const Booking = require('../models/Booking');
const { INDIAN_LOCATIONS } = require('../config/indianLocations');

// RapidAPI IRCTC config
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'irctc1.p.rapidapi.com';

// Helper to flatten stations from database
function getAllStations() {
  const stations = [];
  INDIAN_LOCATIONS.forEach(state => {
    state.cities.forEach(city => {
      city.railwayStations.forEach(st => {
        stations.push({
          code: st.code.toUpperCase(),
          name: st.name,
          city: city.name,
          state: state.state,
          lat: city.lat,
          lng: city.lng
        });
      });
    });
  });
  return stations;
}

// Helper to calculate distance in km
function getDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Radius of Earth
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

// Dynamic train schedule generator
function generateDynamicTrains(fromCode, toCode) {
  const stations = getAllStations();
  const fromSt = stations.find(s => s.code === fromCode.toUpperCase());
  const toSt = stations.find(s => s.code === toCode.toUpperCase());
  
  let distance = 0;
  if (fromSt && toSt) {
    distance = getDistance(fromSt.lat, fromSt.lng, toSt.lat, toSt.lng) || 350;
    if (distance === 0) distance = 25; // Same city station connections
  } else {
    // Deterministic fallback distance
    let hash = 0;
    for (let i = 0; i < fromCode.length; i++) hash += fromCode.charCodeAt(i);
    for (let i = 0; i < toCode.length; i++) hash += toCode.charCodeAt(i);
    distance = 120 + (hash % 12) * 80;
  }

  const fromCity = fromSt ? fromSt.city : fromCode;
  const toCity = toSt ? toSt.city : toCode;
  const fromName = fromSt ? fromSt.name : fromCode + " Jn";
  const toName = toSt ? toSt.name : toCode + " Jn";

  // Different templates for trains in India
  const trainTemplates = [
    {
      type: "Shatabdi Express",
      speed: 85,
      startHour: 6,
      classes: ["CC", "EC"],
      number: "120" + (10 + (fromCode.charCodeAt(0) % 9)),
      runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    {
      type: "Rajdhani Express",
      speed: 80,
      startHour: 17,
      classes: ["3A", "2A", "1A"],
      number: "129" + (50 + (fromCode.charCodeAt(0) % 9)),
      runningDays: ["Mon", "Wed", "Fri", "Sun"]
    },
    {
      type: "Superfast Express",
      speed: 60,
      startHour: 10,
      classes: ["SL", "3A", "2A", "1A", "2S"],
      number: "126" + (20 + (fromCode.charCodeAt(0) % 9)),
      runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    {
      type: "Garib Rath Express",
      speed: 65,
      startHour: 13,
      classes: ["3A"],
      number: "122" + (30 + (fromCode.charCodeAt(0) % 9)),
      runningDays: ["Tue", "Thu", "Sat"]
    },
    {
      type: "Jan Shatabdi",
      speed: 70,
      startHour: 14,
      classes: ["2S", "CC"],
      number: "120" + (60 + (fromCode.charCodeAt(0) % 9)),
      runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  ];

  // Select train types based on distance
  let activeTemplates = [];
  if (distance < 500) {
    activeTemplates = [trainTemplates[0], trainTemplates[2], trainTemplates[4]]; // Shatabdi, Superfast, Jan Shatabdi
  } else {
    activeTemplates = [trainTemplates[1], trainTemplates[2], trainTemplates[3]]; // Rajdhani, Superfast, Garib Rath
  }

  // Handle Shimla Toy Train routes specifically as it is iconic
  if ((fromCode === 'KLK' && toCode === 'SML') || (fromCode === 'SML' && toCode === 'KLK')) {
    return [{
      train_number: fromCode === 'KLK' ? '52457' : '52458',
      train_name: fromCode === 'KLK' ? 'Kalka-Shimla Toy Train' : 'Shimla-Kalka Toy Train',
      train_type: 'Toy Train',
      from_station_code: fromCode,
      from_station_name: fromName,
      to_station_code: toCode,
      to_station_name: toName,
      from_time: fromCode === 'KLK' ? '07:00' : '15:50',
      to_time: fromCode === 'KLK' ? '12:10' : '20:00',
      duration: fromCode === 'KLK' ? '5h 10m' : '4h 10m',
      class_type: ['2S', 'FC'],
      running_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      distance: 96,
      price: 250,
      source: 'fallback'
    }];
  }

  return activeTemplates.map((t, idx) => {
    const travelTimeHours = distance / t.speed;
    const durationMins = Math.round(travelTimeHours * 60);
    const durationHoursStr = Math.floor(durationMins / 60);
    const durationMinsStr = durationMins % 60;
    
    const startHour = (t.startHour + (idx * 2)) % 24;
    const startMin = (idx * 15) % 60;
    const depTime = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
    
    const arrHour = Math.floor(startHour + travelTimeHours) % 24;
    const arrMin = Math.round(startMin + (travelTimeHours % 1 * 60)) % 60;
    const arrTime = `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}`;

    // Base fare: Sleeper SL is ₹0.7 per km, AC Chair Car CC is ₹1.2 per km, 3A is ₹1.8 per km, 2A is ₹2.4, 1A is ₹3.6
    let basePrice = Math.max(120, Math.round(distance * 0.8));

    return {
      train_number: t.number + (idx % 2 === 0 ? "1" : "2"),
      train_name: `${fromCity} - ${toCity} ${t.type}`,
      train_type: t.type.split(" ")[0],
      from_station_code: fromCode,
      from_station_name: fromName,
      to_station_code: toCode,
      to_station_name: toName,
      from_time: depTime,
      to_time: arrTime,
      duration: `${durationHoursStr}h ${durationMinsStr}m`,
      class_type: t.classes,
      running_days: t.runningDays,
      distance: distance,
      price: basePrice,
      source: 'fallback'
    };
  });
}

// ===================== STATION SEARCH =====================
router.get('/stations/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please enter at least 2 characters',
      });
    }
    console.log('🔍 Searching stations for:', query);

    const searchLower = query.toLowerCase();
    const stations = getAllStations();
    
    const filtered = stations.filter(s => 
      s.name.toLowerCase().includes(searchLower) ||
      s.code.toLowerCase().includes(searchLower) ||
      s.city.toLowerCase().includes(searchLower)
    );

    console.log('✅ Found matching stations:', filtered.length);

    res.json({
      success: true,
      count: filtered.length,
      stations: filtered,
      source: 'indian_locations'
    });

  } catch (error) {
    console.error('❌ Station search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error searching stations',
      error: error.message
    });
  }
});

// ================== TRAIN SEARCH ========================
router.get('/search', async (req, res) => {
  try {
    const { fromStationCode, toStationCode, dateOfJourney } = req.query;
    if (!fromStationCode || !toStationCode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid station codes',
      });
    }
    console.log('🚂 Searching trains:', fromStationCode, '→', toStationCode);

    // Call dynamic schedules generator using our Indian locations
    const trains = generateDynamicTrains(fromStationCode.toUpperCase(), toStationCode.toUpperCase());
    
    if (trains.length > 0) {
      return res.json({
        success: true,
        count: trains.length,
        trains: trains,
        source: 'dynamic_generator'
      });
    }

    res.json({
      success: true,
      message: 'No trains found between these stations',
      trains: [],
      source: 'none'
    });

  } catch (error) {
    console.error('❌ Train search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error searching trains',
      error: error.message
    });
  }
});

module.exports = router;
