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

// RapidAPI IRCTC config
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'irctc1.p.rapidapi.com';

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

    // Try RapidAPI IRCTC station search (autocomplete)
    if (RAPIDAPI_KEY) {
      try {
        const response = await axios.get(
          `https://${RAPIDAPI_HOST}/api/v3/stations`,
          {
            params: { station: query },
            headers: {
              'x-rapidapi-key': RAPIDAPI_KEY,
              'x-rapidapi-host': RAPIDAPI_HOST
            },
            timeout: 12000
          }
        );
        const apiStations = response.data.data || [];
        console.log('✅ Found stations from IRCTC API:', apiStations.length);

        // Cache in local DB for later offline search
        for (const station of apiStations.slice(0, 20)) {
          await Station.findOneAndUpdate(
            { stationCode: station.code },
            {
              stationCode: station.code,
              stationName: station.name,
              city: station.name.split(' ')[0],
              state: station.state || 'India',
              isActive: true
            },
            { upsert: true, new: true }
          );
        }

        if (apiStations.length > 0) {
          return res.json({
            success: true,
            count: apiStations.length,
            stations: apiStations.map(s => ({
              code: s.code,
              name: s.name,
              state: s.state || 'India',
              city: s.name.split(' ')[0]
            })),
            source: 'irctc_api'
          });
        }
      } catch (err) {
        console.error('RapidAPI IRCTC error:', err.message);
      }
    }

    // Fallback: local MongoDB cache
    const cachedStations = await Station.find({
      $or: [
        { stationName: { $regex: query, $options: 'i' } },
        { stationCode: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } }
      ],
      isActive: true
    }).limit(20);

    if (cachedStations.length > 0) {
      console.log('✅ Using cached stations:', cachedStations.length);
      return res.json({
        success: true,
        count: cachedStations.length,
        stations: cachedStations.map(s => ({
          code: s.stationCode,
          name: s.stationName,
          city: s.city,
          state: s.state
        })),
        source: 'cache'
      });
    }

    // Manual fallback for most common stations
    const manualStations = {
      'cdg': { code: 'CDG', name: 'Chandigarh', city: 'Chandigarh', state: 'Chandigarh' },
      'klk': { code: 'KLK', name: 'Kalka', city: 'Kalka', state: 'Haryana' },
      'ndls': { code: 'NDLS', name: 'New Delhi', city: 'Delhi', state: 'Delhi' },
      'bct': { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
      'hwh': { code: 'HWH', name: 'Howrah Jn', city: 'Kolkata', state: 'West Bengal' },
      'sml': { code: 'SML', name: 'Shimla', city: 'Shimla', state: 'Himachal Pradesh' } // Added Shimla
    };

    const searchLower = query.toLowerCase();
    const manualResults = Object.values(manualStations).filter(s =>
      s.name.toLowerCase().includes(searchLower) ||
      s.code.toLowerCase().includes(searchLower)
    );

    if (manualResults.length > 0) {
      return res.json({
        success: true,
        count: manualResults.length,
        stations: manualResults,
        source: 'manual'
      });
    }

    res.json({
      success: true,
      count: 0,
      stations: [],
      message: 'No stations found'
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

    // IRCTC getTrainBetweenStations endpoint (RapidAPI)
    if (RAPIDAPI_KEY) {
      try {
        const response = await axios.get(
          `https://${RAPIDAPI_HOST}/api/v3/trainBetweenStations`,
          {
            params: {
              fromStationCode: fromStationCode.toUpperCase(),
              toStationCode: toStationCode.toUpperCase()
            },
            headers: {
              'x-rapidapi-key': RAPIDAPI_KEY,
              'x-rapidapi-host': RAPIDAPI_HOST
            },
            timeout: 15000
          }
        );

        const trainsData = response.data.data || [];
        console.log('✅ Found trains from IRCTC API:', trainsData.length);

        if (trainsData.length > 0) {
          const formattedTrains = trainsData.map(train => ({
            train_number: train.train_number,
            train_name: train.train_name,
            train_type: train.train_type || 'Express',
            from_station_code: fromStationCode,
            from_station_name: train.from_station_name || fromStationCode,
            to_station_code: toStationCode,
            to_station_name: train.to_station_name || toStationCode,
            from_time: train.from_std || train.from_time || 'N/A',
            to_time: train.to_std || train.to_time || 'N/A',
            duration: train.duration || 'N/A',
            class_type: train.class_type || ['SL', '3A', '2A', '1A'],
            running_days: train.running_days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            source: 'irctc_api'
          }));

          return res.json({
            success: true,
            count: formattedTrains.length,
            trains: formattedTrains,
            source: 'irctc_api'
          });
        }
      } catch (err) {
        console.error('RapidAPI IRCTC Train error:', err.message);
      }
    }

    // Fallback: Sample data for common routes (includes toy train)
    const fallbackTrains = getFallbackTrains(fromStationCode.toUpperCase(), toStationCode.toUpperCase());
    if (fallbackTrains.length > 0) {
      console.log('✅ Using fallback trains:', fallbackTrains.length);
      return res.json({
        success: true,
        count: fallbackTrains.length,
        trains: fallbackTrains,
        source: 'fallback',
        message: 'Using cached train data'
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

// Fallback train data for common routes
function getFallbackTrains(from, to) {
  const routes = {
    'NDLS-CDG': [
      {
        train_number: '12011',
        train_name: 'Kalka Shatabdi',
        train_type: 'Shatabdi',
        from_time: '07:20',
        to_time: '10:50',
        duration: '3h 30m',
        class_type: ['CC', 'EC']
      },
      {
        train_number: '12045',
        train_name: 'CDG Shatabdi',
        train_type: 'Shatabdi',
        from_time: '16:25',
        to_time: '19:55',
        duration: '3h 30m',
        class_type: ['CC', 'EC']
      }
    ],
    'CDG-KLK': [
      {
        train_number: '52455',
        train_name: 'CDG KLK Passenger',
        train_type: 'Passenger',
        from_time: '09:20',
        to_time: '10:00',
        duration: '40m',
        class_type: ['2S']
      }
    ],
    'KLK-CDG': [
      {
        train_number: '52456',
        train_name: 'KLK CDG Passenger',
        train_type: 'Passenger',
        from_time: '18:00',
        to_time: '18:40',
        duration: '40m',
        class_type: ['2S']
      }
    ],
    // Toy train routes
    'KLK-SML': [
      {
        train_number: '52457',
        train_name: 'Kalka-Shimla Toy Train',
        train_type: 'Toy Train',
        from_time: '07:00',
        to_time: '12:10',
        duration: '5h 10m',
        class_type: ['2S', 'FC'],
        price: 40 // ₹40 toy train fare
      }
    ],
    'SML-KLK': [
      {
        train_number: '52458',
        train_name: 'Shimla-Kalka Toy Train',
        train_type: 'Toy Train',
        from_time: '15:50',
        to_time: '20:00',
        duration: '4h 10m',
        class_type: ['2S', 'FC'],
        price: 40 // ₹40 toy train fare
      }
    ]
  };

  const key = `${from}-${to}`;
  const trains = routes[key] || [];
  return trains.map(train => ({
    ...train,
    from_station_code: from,
    to_station_code: to,
    from_station_name: from,
    to_station_name: to,
    from_std: train.from_time,
    to_std: train.to_time,
    distance: 0,
    running_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    price: train.price || 40,
    source: 'fallback'
  }));
}

module.exports = router;
