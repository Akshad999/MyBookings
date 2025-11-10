// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaBus } from 'react-icons/fa';
// import { FiMapPin, FiCalendar, FiSearch, FiClock, FiDollarSign } from 'react-icons/fi';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import toast from 'react-hot-toast';
// import '../styles/BusBooking.css';
// import { STATIC_BUS_ROUTES } from "../data/staticBusData";
// export function findStaticBuses(from, to) {
//   return STATIC_BUS_ROUTES.filter(route =>
//     route.from.toLowerCase() === from.toLowerCase() &&
//     route.to.toLowerCase() === to.toLowerCase()
//   ).flatMap(route => route.buses);
// }
// const BusBooking = () => {
//   const [searchData, setSearchData] = useState({
//     from: '',
//     to: '',
//     date: new Date(),
//   });

//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [showSeats, setShowSeats] = useState(false);

//   const handleSearch = async () => {
//     if (!searchData.from || !searchData.to) {
//       toast.error('Please enter both source and destination');
//       return;
//     }

//     if (searchData.from === searchData.to) {
//       toast.error('Source and destination cannot be the same');
//       return;
//     }

//     setLoading(true);

//     // Simulate API call (Replace with actual AbhiBus/HRTC API)
//     setTimeout(() => {
//       const mockBuses = [
//         {
//           id: 'BUS001',
//           operator: 'HRTC Volvo',
//           busType: 'AC Sleeper',
//           from: searchData.from,
//           to: searchData.to,
//           departure: '22:00',
//           arrival: '06:00',
//           duration: '1h 50m',
//           price: 850,
//           seatsAvailable: 18,
//           totalSeats: 40,
//           rating: 4.5,
//           amenities: ['AC', 'Charging Point', 'Water Bottle', 'Blanket'],
//         },
//         {
//           id: 'BUS002',
//           operator: 'HRTC Ordinary',
//           busType: 'Non-AC Seater',
//           from: searchData.from,
//           to: searchData.to,
//           departure: '06:30',
//           arrival: '07:50',
//           duration: '1h 40m',
//           price: 450,
//           seatsAvailable: 25,
//           totalSeats: 50,
//           rating: 4.0,
//           amenities: ['Charging Point', 'Water Bottle'],
//         },
//         {
//           id: 'BUS003',
//           operator: 'Private Deluxe',
//           busType: 'AC Semi-Sleeper',
//           from: searchData.from,
//           to: searchData.to,
//           departure: '18:00',
//           arrival: '02:00',
//           duration: '1h 20m',
//           price: 650,
//           seatsAvailable: 12,
//           totalSeats: 35,
//           rating: 4.3,
//           amenities: ['AC', 'Charging Point', 'Water Bottle', 'WiFi'],
//         },
//       ];
//       // src/data/staticBusData.js (recommended: keep data separate for clarity)

//   // HP ↔ Haryana
  
//     from: "Shimla",
//     to: "Chandigarh",
//     buses: [
//       {
//         id: "HP_VOLVO_SC1",
//         operator: "HRTC Volvo",
//         busType: "AC Semi-Sleeper",
//         departure: "06:00",
//         arrival: "11:00",
//         duration: "5h 0m",
//         price: 660,
//         seatsAvailable: 15,
//         totalSeats: 36,
//         rating: 4.5,
//         amenities: ["AC", "Charging Point", "Water Bottle", "Blanket"]
//       },
//       {
//         id: "HP_DELUXE_SC2",
//         operator: "HRTC Deluxe",
//         busType: "Non-AC Seater",
//         departure: "09:30",
//         arrival: "15:00",
//         duration: "5h 30m",
//         price: 380,
//         seatsAvailable: 24,
//         totalSeats: 40,
//         rating: 4.2,
//         amenities: ["Charging Point", "Water Bottle"]
//       }
//     ]
//   },
//   // Chandigarh ↔ Delhi
//   {
//     from: "Chandigarh",
//     to: "Delhi",
//     buses: [
//       {
//         id: "CTU_VOLVO_CD1",
//         operator: "CTU Volvo",
//         busType: "AC Seater",
//         departure: "06:00",
//         arrival: "11:00",
//         duration: "5h 0m",
//         price: 1100,
//         seatsAvailable: 26,
//         totalSeats: 38,
//         rating: 4.7,
//         amenities: ["AC", "Charging Point", "Blanket"]
//       },
//       {
//         id: "PRTC_DELHI_CD2",
//         operator: "PRTC",
//         busType: "Non-AC Seater",
//         departure: "12:30",
//         arrival: "18:00",
//         duration: "5h 30m",
//         price: 560,
//         seatsAvailable: 19,
//         totalSeats: 50,
//         rating: 4.1,
//         amenities: ["Charging Point"]
//       }
//     ]
//   },
//   // Amritsar ↔ Jammu
//   {
//     from: "Amritsar",
//     to: "Jammu",
//     buses: [
//       {
//         id: "PUN_VOLVO_AJ1",
//         operator: "Punjab Volvo",
//         busType: "AC Sleeper",
//         departure: "05:00",
//         arrival: "10:00",
//         duration: "5h 0m",
//         price: 900,
//         seatsAvailable: 20,
//         totalSeats: 44,
//         rating: 4.5,
//         amenities: ["AC", "Charging Point", "Water Bottle"]
//       },
//       {
//         id: "JK_DELUXE_AJ2",
//         operator: "JKRTC Deluxe",
//         busType: "Non-AC Seater",
//         departure: "13:00",
//         arrival: "18:15",
//         duration: "5h 15m",
//         price: 470,
//         seatsAvailable: 30,
//         totalSeats: 52,
//         rating: 4.3,
//         amenities: ["Charging Point"]
//       }
//     ]
//   },
//   // HP ↔ Punjab
//   {
//     from: "Kangra",
//     to: "Amritsar",
//     buses: [
//       {
//         id: "HP_VOLVO_KA1",
//         operator: "HRTC Volvo",
//         busType: "AC Seater",
//         departure: "17:00",
//         arrival: "22:30",
//         duration: "5h 30m",
//         price: 820,
//         seatsAvailable: 14,
//         totalSeats: 35,
//         rating: 4.4,
//         amenities: ["AC", "Water Bottle"]
//       }
//     ]
//   },
//   // Uttarakhand ↔ Delhi
//   {
//     from: "Dehradun",
//     to: "Delhi",
//     buses: [
//       {
//         id: "UKRTC_VOLVO_DD1",
//         operator: "UKRTC Volvo",
//         busType: "AC Semi-Sleeper",
//         departure: "22:00",
//         arrival: "05:00",
//         duration: "7h 0m",
//         price: 950,
//         seatsAvailable: 20,
//         totalSeats: 40,
//         rating: 4.4,
//         amenities: ["AC", "Charging Point", "Blanket"]
//       },
//       {
//         id: "UKRTC_DELUXE_DD2",
//         operator: "UKRTC",
//         busType: "Non-AC Seater",
//         departure: "09:30",
//         arrival: "16:00",
//         duration: "6h 30m",
//         price: 420,
//         seatsAvailable: 30,
//         totalSeats: 48,
//         rating: 4.1,
//         amenities: ["Charging Point"]
//       }
//     ]
//   },
//   // Himachal ↔ Haryana
//   {
//     from: "Solan",
//     to: "Karnal",
//     buses: [
//       {
//         id: "HRTC_VOLVO_SK1",
//         operator: "HRTC Volvo",
//         busType: "AC Seater",
//         departure: "08:30",
//         arrival: "12:00",
//         duration: "3h 30m",
//         price: 470,
//         seatsAvailable: 28,
//         totalSeats: 44,
//         rating: 4.6,
//         amenities: ["AC", "Charging Point", "Blanket"]
//       }
//     ]
//   },
//   // More routes: add as needed—each from/to pair can have any number of buses and operators
// ];


//       setBuses(mockBuses);
//      setLoading(true);
// setTimeout(() => {
//   const allBuses = findStaticBuses(searchData.from, searchData.to);
//   if (allBuses.length) {
//     setBuses(allBuses);
//     toast.success('Buses loaded successfully!');
//   } else {
//     setBuses([]);
//     toast.error('No buses found for this route');
//   }
//   setLoading(false);
// }, 600);

//   const handleSelectSeats = (bus) => {
//     setSelectedBus(bus);
//     setShowSeats(true);
//   };

//   return (
//     <div className="bus-booking">
//       <div className="container">
//         <motion.div
//           className="booking-hero"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <FaBus size={48} className="hero-icon" />
//           <h1 className="hero-title">Bus Ticket Booking</h1>
//           <p className="hero-subtitle">
//             Book bus tickets from HRTC and other operators with live tracking
//           </p>
//         </motion.div>

//         <motion.div
//           className="search-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="search-grid">
//             <div className="search-field">
//               <label className="search-label">
//                 <FiMapPin /> From
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter source city"
//                 className="search-input"
//                 value={searchData.from}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, from: e.target.value })
//                 }
//               />
//             </div>

//             <div className="search-field">
//               <label className="search-label">
//                 <FiMapPin /> To
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter destination city"
//                 className="search-input"
//                 value={searchData.to}
//                 onChange={(e) =>
//                   setSearchData({ ...searchData, to: e.target.value })
//                 }
//               />
//             </div>

//             <div className="search-field">
//               <label className="search-label">
//                 <FiCalendar /> Journey Date
//               </label>
//               <DatePicker
//                 selected={searchData.date}
//                 onChange={(date) => setSearchData({ ...searchData, date })}
//                 minDate={new Date()}
//                 dateFormat="dd MMM yyyy"
//                 className="search-input"
//               />
//             </div>
//           </div>

//           <motion.button
//             className="btn-search"
//             onClick={handleSearch}
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <FiSearch />
//             {loading ? 'Searching...' : 'Search Buses'}
//           </motion.button>
//         </motion.div>

//         {buses.length > 0 && (
//           <motion.div
//             className="buses-list"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h2 className="results-title">
//               {buses.length} Bus{buses.length > 1 ? 'es' : ''} Found
//             </h2>

//             {buses.map((bus, index) => (
//               <motion.div
//                 key={bus.id}
//                 className="bus-card"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//                 whileHover={{ scale: 1.01 }}
//               >
//                 <div className="bus-header">
//                   <div className="bus-info">
//                     <h3 className="bus-operator">{bus.operator}</h3>
//                     <p className="bus-type">{bus.busType}</p>
//                     <div className="bus-rating">
//                       ⭐ {bus.rating}
//                     </div>
//                   </div>
//                   <div className="bus-duration">
//                     <FiClock />
//                     <span>{bus.duration}</span>
//                   </div>
//                 </div>

//                 <div className="bus-route">
//                   <div className="route-station">
//                     <div className="station-time">{bus.departure}</div>
//                     <div className="station-name">{bus.from}</div>
//                   </div>

//                   <div className="route-line">
//                     <div className="route-arrow">→</div>
//                   </div>

//                   <div className="route-station">
//                     <div className="station-time">{bus.arrival}</div>
//                     <div className="station-name">{bus.to}</div>
//                   </div>
//                 </div>

//                 <div className="bus-amenities">
//                   {bus.amenities.map((amenity, i) => (
//                     <span key={i} className="amenity-badge">
//                       {amenity}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="bus-footer">
//                   <div className="bus-seats-info">
//                     <span className="seats-available">
//                       {bus.seatsAvailable} seats available
//                     </span>
//                     <span className="seats-total">
//                       of {bus.totalSeats}
//                     </span>
//                   </div>

//                   <div className="bus-booking">
//                     <div className="bus-price">
//                       <FiDollarSign />
//                       ₹{bus.price}
//                     </div>
//                     <button
//                       className="btn-select-seats"
//                       onClick={() => handleSelectSeats(bus)}
//                     >
//                       Select Seats
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {showSeats && selectedBus && (
//           <SeatSelectionModal
//             bus={selectedBus}
//             onClose={() => setShowSeats(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Seat Selection Modal Component
// const SeatSelectionModal = ({ bus, onClose }) => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const generateSeats = () => {
//     const seats = [];
//     const rows = 10;
//     const seatsPerRow = 4;

//     for (let i = 0; i < rows; i++) {
//       const rowSeats = [];
//       for (let j = 0; j < seatsPerRow; j++) {
//         const seatNumber = i * seatsPerRow + j + 1;
//         const isBooked = Math.random() > 0.7; // 30% chance of being booked
//         rowSeats.push({
//           number: seatNumber,
//           isBooked,
//           isSelected: selectedSeats.includes(seatNumber),
//         });
//       }
//       seats.push(rowSeats);
//     }
//     return seats;
//   };

//   const seats = generateSeats();

//   const toggleSeat = (seatNumber, isBooked) => {
//     if (isBooked) {
//       toast.error('This seat is already booked');
//       return;
//     }

//     if (selectedSeats.includes(seatNumber)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
//     } else {
//       if (selectedSeats.length >= 6) {
//         toast.error('You can select maximum 6 seats');
//         return;
//       }
//       setSelectedSeats([...selectedSeats, seatNumber]);
//     }
//   };

//   const totalPrice = selectedSeats.length * bus.price;

//   return (
//     <motion.div
//       className="seat-modal-overlay"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       onClick={onClose}
//     >
//       <motion.div
//         className="seat-modal"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="modal-header">
//           <h2>Select Your Seats</h2>
//           <button className="btn-close" onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="seat-legend">
//             <div className="legend-item">
//               <div className="seat-demo available"></div>
//               <span>Available</span>
//             </div>
//             <div className="legend-item">
//               <div className="seat-demo selected"></div>
//               <span>Selected</span>
//             </div>
//             <div className="legend-item">
//               <div className="seat-demo booked"></div>
//               <span>Booked</span>
//             </div>
//           </div>

//           <div className="bus-layout">
//             <div className="driver-section">🚗 Driver</div>
//             <div className="seats-grid">
//               {seats.map((row, rowIndex) => (
//                 <div key={rowIndex} className="seat-row">
//                   {row.map((seat, seatIndex) => (
//                     <React.Fragment key={seat.number}>
//                       <button
//                         className={`seat ${seat.isBooked ? 'booked' : ''} ${
//                           seat.isSelected ? 'selected' : ''
//                         }`}
//                         onClick={() => toggleSeat(seat.number, seat.isBooked)}
//                         disabled={seat.isBooked}
//                       >
//                         {seat.number}
//                       </button>
//                       {seatIndex === 1 && <div className="aisle"></div>}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="modal-footer">
//           <div className="selected-info">
//             <span>Selected Seats: {selectedSeats.join(', ') || 'None'}</span>
//             <div className="bus-price">
//   <span>₹{bus.price}</span>
// </div>

//           </div>
//           <button
//             className="btn-proceed"
//             disabled={selectedSeats.length === 0}
//             onClick={() => {
//               toast.success('Proceeding to payment...');
//               // Handle payment
//             }}
//           >
//             Proceed to Pay
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default BusBooking;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaBus } from 'react-icons/fa';
// import { FiMapPin, FiCalendar, FiSearch, FiClock } from 'react-icons/fi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import toast from 'react-hot-toast';
// import '../styles/BusBooking.css';
// import { STATIC_BUS_ROUTES } from "../data/StaticBusData";

// function findStaticBuses(from, to) {
//   return STATIC_BUS_ROUTES
//     .filter(route =>
//       route.from.toLowerCase() === from.toLowerCase() &&
//       route.to.toLowerCase() === to.toLowerCase())
//     .flatMap(route => route.buses);
// }

// const BusBooking = () => {
//   const [searchData, setSearchData] = useState({
//     from: '',
//     to: '',
//     date: new Date(),
//   });
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [showSeats, setShowSeats] = useState(false);

//   const handleSearch = async () => {
//     if (!searchData.from || !searchData.to) {
//       toast.error('Please enter both source and destination');
//       return;
//     }
//     if (searchData.from.trim().toLowerCase() === searchData.to.trim().toLowerCase()) {
//       toast.error('Source and destination cannot be the same');
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       const allBuses = findStaticBuses(searchData.from, searchData.to);
//       if (allBuses.length) {
//         setBuses(allBuses);
//         toast.success('Buses loaded successfully!');
//       } else {
//         setBuses([]);
//         toast.error('No buses found for this route');
//       }
//       setLoading(false);
//     }, 600);
//   };

//   const handleSelectSeats = (bus) => {
//     setSelectedBus(bus);
//     setShowSeats(true);
//   };

//   return (
//     <div className="bus-booking">
//       {/* Bus image background */}
//       <div className="bus-bg-img">
//         <img src="/bedi.jpg" alt="Bedi Travels Volvo" className="bus-bg-image" />
//         <div className="bus-bg-overlay"></div>
//       </div>

//       <div className="container">
//         <motion.div className="booking-hero" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//           <FaBus size={48} className="hero-icon" />
//           <h1 className="hero-title">Bus Ticket Booking</h1>
//           <p className="hero-subtitle">
//             Book bus tickets from HRTC, CTU, PRTC, and more for North India interstate routes
//           </p>
//         </motion.div>
//         <motion.div className="search-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//           <div className="search-grid">
//             <div className="search-field">
//               <label className="search-label"><FiMapPin /> From</label>
//               <input
//                 type="text" placeholder="Enter source city" className="search-input"
//                 value={searchData.from}
//                 onChange={e => setSearchData({ ...searchData, from: e.target.value })}
//               />
//             </div>
//             <div className="search-field">
//               <label className="search-label"><FiMapPin /> To</label>
//               <input
//                 type="text" placeholder="Enter destination city" className="search-input"
//                 value={searchData.to}
//                 onChange={e => setSearchData({ ...searchData, to: e.target.value })}
//               />
//             </div>
//             <div className="search-field">
//               <label className="search-label"><FiCalendar /> Journey Date</label>
//               <DatePicker
//                 selected={searchData.date}
//                 onChange={date => setSearchData({ ...searchData, date })}
//                 minDate={new Date()} dateFormat="dd MMM yyyy"
//                 className="search-input" />
//             </div>
//           </div>
//           <motion.button
//             className="btn-search"
//             onClick={handleSearch}
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <FiSearch />
//             {loading ? 'Searching...' : 'Search Buses'}
//           </motion.button>
//         </motion.div>
//         {buses.length > 0 && (
//           <motion.div className="buses-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//             <h2 className="results-title">{buses.length} Bus{buses.length > 1 ? 'es' : ''} Found</h2>
//             {buses.map((bus, idx) => (
//               <motion.div key={bus.id} className="bus-card"
//                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + idx * 0.1 }} whileHover={{ scale: 1.01 }}>
//                 <div className="bus-header">
//                   <div className="bus-info">
//                     <h3 className="bus-operator">{bus.operator}</h3>
//                     <p className="bus-type">{bus.busType}</p>
//                     <div className="bus-rating">⭐ {bus.rating}</div>
//                   </div>
//                   <div className="bus-duration"><FiClock /><span>{bus.duration}</span></div>
//                 </div>
//                 <div className="bus-route">
//                   <div className="route-station"><div className="station-time">{bus.departure}</div><div className="station-name">{bus.from}</div></div>
//                   <div className="route-line"><div className="route-arrow">→</div></div>
//                   <div className="route-station"><div className="station-time">{bus.arrival}</div><div className="station-name">{bus.to}</div></div>
//                 </div>
//                 <div className="bus-amenities">
//                   {bus.amenities.map((amenity, i) => (
//                     <span key={i} className="amenity-badge">{amenity}</span>
//                   ))}
//                 </div>
//                 <div className="bus-footer">
//                   <div className="bus-seats-info">
//                     <span className="seats-available">{bus.seatsAvailable} seats available</span>
//                     <span className="seats-total">of {bus.totalSeats}</span>
//                   </div>
//                   <div className="bus-booking">
//                     <div className="bus-price">₹{bus.price}</div>
//                     <button className="btn-select-seats" onClick={() => handleSelectSeats(bus)}>Select Seats</button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//         {/* Modal and further seat selection/modal etc */}
//         {/* ... your modal code ... */}
//       </div>
//     </div>
//   );
// };

// export default BusBooking;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';
import { FiMapPin, FiCalendar, FiSearch, FiClock } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/BusBooking.css';
import { STATIC_BUS_ROUTES } from "../data/StaticBusData";
import BusSeatSelection from '../components/BusSeatSelection';

function findStaticBuses(from, to) {
  return STATIC_BUS_ROUTES
    .filter(route =>
      route.from.toLowerCase() === from.toLowerCase() &&
      route.to.toLowerCase() === to.toLowerCase())
    .flatMap(route => route.buses);
}

const BusBooking = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date(),
  });
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showSeats, setShowSeats] = useState(false);

  const handleSearch = async () => {
    if (!searchData.from || !searchData.to) {
      toast.error('Please enter both source and destination');
      return;
    }
    if (searchData.from.trim().toLowerCase() === searchData.to.trim().toLowerCase()) {
      toast.error('Source and destination cannot be the same');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const allBuses = findStaticBuses(searchData.from, searchData.to);
      if (allBuses.length) {
        setBuses(allBuses);
        toast.success('Buses loaded successfully!');
      } else {
        setBuses([]);
        toast.error('No buses found for this route');
      }
      setLoading(false);
    }, 600);
  };

  const handleSelectSeats = (bus) => {
    setSelectedBus(bus);
    setShowSeats(true);
  };

  return (
    <div className="bus-booking">
      <div className="bus-bg-img">
        <img src="/bedi.jpg" alt="Bedi Travels Volvo" className="bus-bg-image" />
        <div className="bus-bg-overlay"></div>
      </div>

      <div className="container">
        <motion.div className="booking-hero" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <FaBus size={48} className="hero-icon" />
          <h1 className="hero-title">Bus Ticket Booking</h1>
          <p className="hero-subtitle">
            Book bus tickets from HRTC, CTU, PRTC, and more for North India interstate routes
          </p>
        </motion.div>
        
        <motion.div className="search-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="search-grid">
            <div className="search-field">
              <label className="search-label"><FiMapPin /> From</label>
              <input
                type="text" placeholder="Enter source city" className="search-input"
                value={searchData.from}
                onChange={e => setSearchData({ ...searchData, from: e.target.value })}
              />
            </div>
            <div className="search-field">
              <label className="search-label"><FiMapPin /> To</label>
              <input
                type="text" placeholder="Enter destination city" className="search-input"
                value={searchData.to}
                onChange={e => setSearchData({ ...searchData, to: e.target.value })}
              />
            </div>
            <div className="search-field">
              <label className="search-label"><FiCalendar /> Journey Date</label>
              <DatePicker
                selected={searchData.date}
                onChange={date => setSearchData({ ...searchData, date })}
                minDate={new Date()} 
                dateFormat="dd MMM yyyy"
                className="search-input" 
              />
            </div>
          </div>
          <motion.button
            className="btn-search"
            onClick={handleSearch}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSearch />
            {loading ? 'Searching...' : 'Search Buses'}
          </motion.button>
        </motion.div>

        {buses.length > 0 && (
          <motion.div className="buses-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h2 className="results-title">{buses.length} Bus{buses.length > 1 ? 'es' : ''} Found</h2>
            {buses.map((bus, idx) => (
              <motion.div key={bus.id} className="bus-card"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }} whileHover={{ scale: 1.01 }}>
                <div className="bus-header">
                  <div className="bus-info">
                    <h3 className="bus-operator">{bus.operator}</h3>
                    <p className="bus-type">{bus.busType}</p>
                    <div className="bus-rating">⭐ {bus.rating}</div>
                  </div>
                  <div className="bus-duration"><FiClock /><span>{bus.duration}</span></div>
                </div>
                <div className="bus-route">
                  <div className="route-station">
                    <div className="station-time">{bus.departure}</div>
                    <div className="station-name">{bus.from}</div>
                  </div>
                  <div className="route-line"><div className="route-arrow">→</div></div>
                  <div className="route-station">
                    <div className="station-time">{bus.arrival}</div>
                    <div className="station-name">{bus.to}</div>
                  </div>
                </div>
                <div className="bus-amenities">
                  {bus.amenities.map((amenity, i) => (
                    <span key={i} className="amenity-badge">{amenity}</span>
                  ))}
                </div>
                <div className="bus-footer">
                  <div className="bus-seats-info">
                    <span className="seats-available">{bus.seatsAvailable} seats available</span>
                    <span className="seats-total"> of {bus.totalSeats}</span>
                  </div>
                  <div className="bus-booking">
                    <div className="bus-price">₹{bus.price}</div>
                    <button className="btn-select-seats" onClick={() => handleSelectSeats(bus)}>
                      Select Seats
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {showSeats && selectedBus && (
          <BusSeatSelection
            bus={selectedBus}
            onClose={() => setShowSeats(false)}
            onConfirm={(seats) => {
              setShowSeats(false);
              navigate('/booking/bus/confirm', { 
                state: { 
                  bus: selectedBus, 
                  seats,
                  date: searchData.date 
                } 
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BusBooking;
