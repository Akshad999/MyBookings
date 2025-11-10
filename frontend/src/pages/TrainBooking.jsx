// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaTrain } from 'react-icons/fa';
// import { FiMapPin, FiCalendar, FiSearch, FiClock, FiAlertCircle } from 'react-icons/fi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import toast from 'react-hot-toast';
// import api from '../utils/api';
// import '../styles/TrainBooking.css';

// import '../styles/TrainBooking.css';

// const TrainBooking = () => {
//   const [searchData, setSearchData] = useState({
//     from: '',
//     to: '',
//     date: new Date(),
//     fromStationCode: '',
//     toStationCode: '',
//   });

//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fromStations, setFromStations] = useState([]);
//   const [toStations, setToStations] = useState([]);
//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);

//   // Search stations as user types
//   const searchStations = async (query, setStations) => {
//     if (query.length < 2) {
//       setStations([]);
//       return;
//     }

//     try {
//       const { data } = await api.get(`/trains/stations/search?query=${query}`);
//       setStations(data.stations || []);
//     } catch (error) {
//       console.error('Station search error:', error);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchData.fromStationCode || !searchData.toStationCode) {
//       toast.error('Please select valid railway stations from dropdown');
//       return;
//     }

//     if (searchData.fromStationCode === searchData.toStationCode) {
//       toast.error('Source and destination cannot be the same');
//       return;
//     }

//     setLoading(true);

//     try {
//       const dateStr = searchData.date.toISOString().split('T')[0];
//       const { data } = await api.get('/trains/search', {
//         params: {
//           fromStationCode: searchData.fromStationCode,
//           toStationCode: searchData.toStationCode,
//           dateOfJourney: dateStr,
//         },
//       });

//       if (data.trains && data.trains.length > 0) {
//         setTrains(data.trains);
//         toast.success(`Found ${data.trains.length} trains!`);
//       } else {
//         setTrains([]);
//         toast.error(data.message || 'No trains found. Please check if both locations have railway stations.');
//       }
//     } catch (error) {
//       console.error('Train search error:', error);
//       toast.error(error.response?.data?.message || 'Error searching trains. Please try again.');
//       setTrains([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="train-booking">
//       <div className="container">
//         <motion.div
//           className="booking-hero"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <FaTrain size={48} className="hero-icon" />
//           <h1 className="hero-title">Train Ticket Booking</h1>
//           <p className="hero-subtitle">
//             Search real trains with live IRCTC data
//           </p>
//         </motion.div>

//         <motion.div
//           className="search-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="search-grid">
//             {/* From Station */}
//             <div className="search-field autocomplete-field">
//               <label className="search-label">
//                 <FiMapPin /> From Station
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter source station (e.g., Chandigarh)"
//                 className="search-input"
//                 value={searchData.from}
//                 onChange={(e) => {
//                   setSearchData({ ...searchData, from: e.target.value, fromStationCode: '' });
//                   searchStations(e.target.value, setFromStations);
//                   setShowFromDropdown(true);
//                 }}
//                 onFocus={() => setShowFromDropdown(true)}
//               />
//               {showFromDropdown && fromStations.length > 0 && (
//                 <div className="autocomplete-dropdown">
//                   {fromStations.map((station) => (
//                     <div
//                       key={station.code}
//                       className="autocomplete-item"
//                       onClick={() => {
//                         setSearchData({
//                           ...searchData,
//                           from: `${station.name} (${station.code})`,
//                           fromStationCode: station.code,
//                         });
//                         setShowFromDropdown(false);
//                       }}
//                     >
//                       <strong>{station.name}</strong>
//                       <span className="station-code">{station.code}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* To Station */}
//             <div className="search-field autocomplete-field">
//               <label className="search-label">
//                 <FiMapPin /> To Station
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter destination station (e.g., Kalka)"
//                 className="search-input"
//                 value={searchData.to}
//                 onChange={(e) => {
//                   setSearchData({ ...searchData, to: e.target.value, toStationCode: '' });
//                   searchStations(e.target.value, setToStations);
//                   setShowToDropdown(true);
//                 }}
//                 onFocus={() => setShowToDropdown(true)}
//               />
//               {showToDropdown && toStations.length > 0 && (
//                 <div className="autocomplete-dropdown">
//                   {toStations.map((station) => (
//                     <div
//                       key={station.code}
//                       className="autocomplete-item"
//                       onClick={() => {
//                         setSearchData({
//                           ...searchData,
//                           to: `${station.name} (${station.code})`,
//                           toStationCode: station.code,
//                         });
//                         setShowToDropdown(false);
//                       }}
//                     >
//                       <strong>{station.name}</strong>
//                       <span className="station-code">{station.code}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Date */}
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

//           <div className="search-note">
//             <FiAlertCircle />
//             <span>Type at least 2 characters to see station suggestions</span>
//           </div>

//           <motion.button
//             className="btn-search"
//             onClick={handleSearch}
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <FiSearch />
//             {loading ? 'Searching Real Trains...' : 'Search Trains'}
//           </motion.button>
//         </motion.div>

//         {/* Train Results */}
//         {trains.length > 0 && (
//           <motion.div
//             className="trains-list"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h2 className="results-title">
//               {trains.length} Train{trains.length > 1 ? 's' : ''} Found
//             </h2>

//             {trains.map((train, index) => (
//               <motion.div
//                 key={train.train_number || index}
//                 className="train-card"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <div className="train-header">
//                   <div className="train-info">
//                     <h3 className="train-name">{train.train_name}</h3>
//                     <p className="train-number">#{train.train_number}</p>
//                   </div>
//                   <div className="train-duration">
//                     <FiClock />
//                     <span>{train.duration || 'N/A'}</span>
//                   </div>
//                 </div>

//                 <div className="train-route">
//                   <div className="route-station">
//                     <div className="station-time">{train.from_std || train.from_time}</div>
//                     <div className="station-name">{train.from_station_name}</div>
//                   </div>

//                   <div className="route-line">
//                     <div className="route-arrow">→</div>
//                   </div>

//                   <div className="route-station">
//                     <div className="station-time">{train.to_std || train.to_time}</div>
//                     <div className="station-name">{train.to_station_name}</div>
//                   </div>
//                 </div>

//                 <div className="train-classes">
//                   {train.class_type && train.class_type.length > 0 ? (
//                     train.class_type.map((cls, i) => (
//                       <div key={i} className="class-option">
//                         <div className="class-info">
//                           <span className="class-name">{cls}</span>
//                         </div>
//                         <button className="btn-book-class">Check Availability</button>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="no-class-info">Class information not available</div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {trains.length === 0 && !loading && searchData.fromStationCode && (
//           <div className="no-results">
//             <FiAlertCircle size={48} />
//             <h3>No Trains Found</h3>
//             <p>
//               There are no direct trains between these stations, or one/both locations might not have a railway station.
//               <br />
//               Please try searching for nearby major cities.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainBooking;
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaTrain } from 'react-icons/fa';
// import { FiMapPin, FiCalendar, FiSearch, FiClock, FiAlertCircle } from 'react-icons/fi';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import toast from 'react-hot-toast';
// import api from '../utils/api';
// import '../styles/TrainBooking.css';
// import TrainSeatSelection from './TrainSeatSelection'; // 👈 Import your seat selection component

// const TrainBooking = () => {
//   const [searchData, setSearchData] = useState({
//     from: '',
//     to: '',
//     date: new Date(),
//     fromStationCode: '',
//     toStationCode: '',
//   });

//   const [trains, setTrains] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fromStations, setFromStations] = useState([]);
//   const [toStations, setToStations] = useState([]);
//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);

//   // 👉 New seat selection states
//   const [selectedTrain, setSelectedTrain] = useState(null);
//   const [showSeats, setShowSeats] = useState(false);

//   const navigate = useNavigate();

//   const handleSelectSeats = (train) => {
//     setSelectedTrain(train);
//     setShowSeats(true);
//   };

//   // Search stations as user types
//   const searchStations = async (query, setStations) => {
//     if (query.length < 2) {
//       setStations([]);
//       return;
//     }

//     try {
//       const { data } = await api.get(`/trains/stations/search?query=${query}`);
//       setStations(data.stations || []);
//     } catch (error) {
//       console.error('Station search error:', error);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchData.fromStationCode || !searchData.toStationCode) {
//       toast.error('Please select valid railway stations from dropdown');
//       return;
//     }

//     if (searchData.fromStationCode === searchData.toStationCode) {
//       toast.error('Source and destination cannot be the same');
//       return;
//     }

//     setLoading(true);

//     try {
//       const dateStr = searchData.date.toISOString().split('T')[0];
//       const { data } = await api.get('/trains/search', {
//         params: {
//           fromStationCode: searchData.fromStationCode,
//           toStationCode: searchData.toStationCode,
//           dateOfJourney: dateStr,
//         },
//       });

//       if (data.trains && data.trains.length > 0) {
//         setTrains(data.trains);
//         toast.success(`Found ${data.trains.length} trains!`);
//       } else {
//         setTrains([]);
//         toast.error(data.message || 'No trains found.');
//       }
//     } catch (error) {
//       console.error('Train search error:', error);
//       toast.error(error.response?.data?.message || 'Error searching trains.');
//       setTrains([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="train-booking">
//       <div className="container">
//         {/* ---------- HERO ---------- */}
//         <motion.div
//           className="booking-hero"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <FaTrain size={48} className="hero-icon" />
//           <h1 className="hero-title">Train Ticket Booking</h1>
//           <p className="hero-subtitle">Search real trains with live IRCTC data</p>
//         </motion.div>

//         {/* ---------- SEARCH FORM ---------- */}
//         <motion.div
//           className="search-card"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="search-grid">
//             {/* From Station */}
//             <div className="search-field autocomplete-field">
//               <label className="search-label"><FiMapPin /> From Station</label>
//               <input
//                 type="text"
//                 placeholder="Enter source station"
//                 className="search-input"
//                 value={searchData.from}
//                 onChange={(e) => {
//                   setSearchData({ ...searchData, from: e.target.value, fromStationCode: '' });
//                   searchStations(e.target.value, setFromStations);
//                   setShowFromDropdown(true);
//                 }}
//                 onFocus={() => setShowFromDropdown(true)}
//               />
//               {showFromDropdown && fromStations.length > 0 && (
//                 <div className="autocomplete-dropdown">
//                   {fromStations.map((station) => (
//                     <div
//                       key={station.code}
//                       className="autocomplete-item"
//                       onClick={() => {
//                         setSearchData({
//                           ...searchData,
//                           from: `${station.name} (${station.code})`,
//                           fromStationCode: station.code,
//                         });
//                         setShowFromDropdown(false);
//                       }}
//                     >
//                       <strong>{station.name}</strong>
//                       <span className="station-code">{station.code}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* To Station */}
//             <div className="search-field autocomplete-field">
//               <label className="search-label"><FiMapPin /> To Station</label>
//               <input
//                 type="text"
//                 placeholder="Enter destination station"
//                 className="search-input"
//                 value={searchData.to}
//                 onChange={(e) => {
//                   setSearchData({ ...searchData, to: e.target.value, toStationCode: '' });
//                   searchStations(e.target.value, setToStations);
//                   setShowToDropdown(true);
//                 }}
//                 onFocus={() => setShowToDropdown(true)}
//               />
//               {showToDropdown && toStations.length > 0 && (
//                 <div className="autocomplete-dropdown">
//                   {toStations.map((station) => (
//                     <div
//                       key={station.code}
//                       className="autocomplete-item"
//                       onClick={() => {
//                         setSearchData({
//                           ...searchData,
//                           to: `${station.name} (${station.code})`,
//                           toStationCode: station.code,
//                         });
//                         setShowToDropdown(false);
//                       }}
//                     >
//                       <strong>{station.name}</strong>
//                       <span className="station-code">{station.code}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Date */}
//             <div className="search-field">
//               <label className="search-label"><FiCalendar /> Journey Date</label>
//               <DatePicker
//                 selected={searchData.date}
//                 onChange={(date) => setSearchData({ ...searchData, date })}
//                 minDate={new Date()}
//                 dateFormat="dd MMM yyyy"
//                 className="search-input"
//               />
//             </div>
//           </div>

//           <div className="search-note">
//             <FiAlertCircle />
//             <span>Type at least 2 characters to see station suggestions</span>
//           </div>

//           <motion.button
//             className="btn-search"
//             onClick={handleSearch}
//             disabled={loading}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <FiSearch />
//             {loading ? 'Searching Real Trains...' : 'Search Trains'}
//           </motion.button>
//         </motion.div>

//         {/* ---------- TRAIN RESULTS ---------- */}
//         {trains.length > 0 && (
//           <motion.div
//             className="trains-list"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h2 className="results-title">
//               {trains.length} Train{trains.length > 1 ? 's' : ''} Found
//             </h2>

//             {trains.map((train, index) => (
//               <motion.div
//                 key={train.train_number || index}
//                 className="train-card"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 + index * 0.1 }}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <div className="train-header">
//                   <div className="train-info">
//                     <h3 className="train-name">{train.train_name}</h3>
//                     <p className="train-number">#{train.train_number}</p>
//                   </div>
//                   <div className="train-duration">
//                     <FiClock />
//                     <span>{train.duration || 'N/A'}</span>
//                   </div>
//                 </div>

//                 <div className="train-route">
//                   <div className="route-station">
//                     <div className="station-time">{train.from_std || train.from_time}</div>
//                     <div className="station-name">{train.from_station_name}</div>
//                   </div>

//                   <div className="route-line"><div className="route-arrow">→</div></div>

//                   <div className="route-station">
//                     <div className="station-time">{train.to_std || train.to_time}</div>
//                     <div className="station-name">{train.to_station_name}</div>
//                   </div>
//                 </div>

//                 <div className="train-classes">
//                   {train.class_type && train.class_type.length > 0 ? (
//                     train.class_type.map((cls, i) => (
//                       <div key={i} className="class-option">
//                         <span className="class-name">{cls}</span>
//                         <button
//                           className="btn-book-class"
//                           onClick={() => handleSelectSeats(train)} // 👈 Trigger seat selection
//                         >
//                           Select Seats
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="no-class-info">Class information not available</div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* ---------- NO RESULT ---------- */}
//         {trains.length === 0 && !loading && searchData.fromStationCode && (
//           <div className="no-results">
//             <FiAlertCircle size={48} />
//             <h3>No Trains Found</h3>
//             <p>
//               There are no direct trains between these stations.
//               Try searching for nearby major cities.
//             </p>
//           </div>
//         )}

//         {/* ---------- SEAT SELECTION MODAL ---------- */}
//         {showSeats && selectedTrain && (
//           <TrainSeatSelection
//             train={selectedTrain}
//             onClose={() => setShowSeats(false)}
//             onConfirm={(seats) => {
//               setShowSeats(false);
//               navigate('/booking/train/confirm', {
//                 state: { train: selectedTrain, seats },
//               });
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrainBooking;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrain } from 'react-icons/fa';
import { FiMapPin, FiCalendar, FiSearch, FiClock, FiAlertCircle } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import api from '../utils/api';
import '../styles/TrainBooking.css';
import TrainSeatSelection from './TrainSeatSelection';

const TrainBooking = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date(),
    fromStationCode: '',
    toStationCode: '',
  });

  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromStations, setFromStations] = useState([]);
  const [toStations, setToStations] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showSeats, setShowSeats] = useState(false);

  const navigate = useNavigate();

  const handleSelectSeats = (train) => {
    setSelectedTrain(train);
    setShowSeats(true);
  };

  // Search stations as user types
  const searchStations = async (query, setStations) => {
    if (query.length < 2) {
      setStations([]);
      return;
    }

    try {
      const { data } = await api.get(`/trains/stations/search?query=${query}`);
      setStations(data.stations || []);
    } catch (error) {
      console.error('Station search error:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchData.fromStationCode || !searchData.toStationCode) {
      toast.error('Please select valid railway stations from dropdown');
      return;
    }
    if (searchData.fromStationCode === searchData.toStationCode) {
      toast.error('Source and destination cannot be the same');
      return;
    }
    setLoading(true);

    try {
      const dateStr = searchData.date.toISOString().split('T')[0];
      const { data } = await api.get('/trains/search', {
        params: {
          fromStationCode: searchData.fromStationCode,
          toStationCode: searchData.toStationCode,
          dateOfJourney: dateStr,
        },
      });

      if (data.trains && data.trains.length > 0) {
        setTrains(data.trains);
        toast.success(`Found ${data.trains.length} trains!`);
      } else {
        setTrains([]);
        toast.error(data.message || 'No trains found.');
      }
    } catch (error) {
      console.error('Train search error:', error);
      toast.error(error.response?.data?.message || 'Error searching trains.');
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="train-booking">
      {/* Background train image */}
      <div className="train-bg-img">
        <img src="/irctc2.webp" alt="Train" className="train-bg-image" />
        <div className="train-bg-overlay"></div>
      </div>
      <div className="container">
        {/* ---------- HERO ---------- */}
        <motion.div
          className="booking-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaTrain size={48} className="hero-icon" />
          <h1 className="hero-title">Train Ticket Booking</h1>
          <p className="hero-subtitle">Search real trains with live IRCTC data</p>
        </motion.div>

        {/* ---------- SEARCH FORM ---------- */}
        <motion.div
          className="search-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-grid">
            {/* From Station */}
            <div className="search-field autocomplete-field">
              <label className="search-label"><FiMapPin /> From Station</label>
              <input
                type="text"
                placeholder="Enter source station"
                className="search-input"
                value={searchData.from}
                onChange={e => {
                  setSearchData({ ...searchData, from: e.target.value, fromStationCode: '' });
                  searchStations(e.target.value, setFromStations);
                  setShowFromDropdown(true);
                }}
                onFocus={() => setShowFromDropdown(true)}
              />
              {showFromDropdown && fromStations.length > 0 && (
                <div className="autocomplete-dropdown">
                  {fromStations.map((station) => (
                    <div
                      key={station.code}
                      className="autocomplete-item"
                      onClick={() => {
                        setSearchData({
                          ...searchData,
                          from: `${station.name} (${station.code})`,
                          fromStationCode: station.code,
                        });
                        setShowFromDropdown(false);
                      }}
                    >
                      <strong>{station.name}</strong>
                      <span className="station-code">{station.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To Station */}
            <div className="search-field autocomplete-field">
              <label className="search-label"><FiMapPin /> To Station</label>
              <input
                type="text"
                placeholder="Enter destination station"
                className="search-input"
                value={searchData.to}
                onChange={e => {
                  setSearchData({ ...searchData, to: e.target.value, toStationCode: '' });
                  searchStations(e.target.value, setToStations);
                  setShowToDropdown(true);
                }}
                onFocus={() => setShowToDropdown(true)}
              />
              {showToDropdown && toStations.length > 0 && (
                <div className="autocomplete-dropdown">
                  {toStations.map((station) => (
                    <div
                      key={station.code}
                      className="autocomplete-item"
                      onClick={() => {
                        setSearchData({
                          ...searchData,
                          to: `${station.name} (${station.code})`,
                          toStationCode: station.code,
                        });
                        setShowToDropdown(false);
                      }}
                    >
                      <strong>{station.name}</strong>
                      <span className="station-code">{station.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
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

          <div className="search-note">
            <FiAlertCircle />
            <span>Type at least 2 characters to see station suggestions</span>
          </div>

          <motion.button
            className="btn-search"
            onClick={handleSearch}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSearch />
            {loading ? 'Searching Real Trains...' : 'Search Trains'}
          </motion.button>
        </motion.div>

        {/* ---------- TRAIN RESULTS ---------- */}
        {trains.length > 0 && (
          <motion.div
            className="trains-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="results-title">
              {trains.length} Train{trains.length > 1 ? 's' : ''} Found
            </h2>
            {trains.map((train, index) => (
              <motion.div
                key={train.train_number || index}
                className="train-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="train-header">
                  <div className="train-info">
                    <h3 className="train-name">{train.train_name}</h3>
                    <p className="train-number">#{train.train_number}</p>
                  </div>
                  <div className="train-duration">
                    <FiClock />
                    <span>{train.duration || 'N/A'}</span>
                  </div>
                </div>
                <div className="train-route">
                  <div className="route-station">
                    <div className="station-time">{train.from_std || train.from_time}</div>
                    <div className="station-name">{train.from_station_name}</div>
                  </div>
                  <div className="route-line"><div className="route-arrow">→</div></div>
                  <div className="route-station">
                    <div className="station-time">{train.to_std || train.to_time}</div>
                    <div className="station-name">{train.to_station_name}</div>
                  </div>
                </div>
                <div className="train-classes">
                  {train.class_type && train.class_type.length > 0 ? (
                    train.class_type.map((cls, i) => (
                      <div key={i} className="class-option">
                        <span className="class-name">{cls}</span>
                        <button
                          className="btn-book-class"
                          onClick={() => handleSelectSeats(train)}
                        >
                          Select Seats
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-class-info">Class information not available</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ---------- NO RESULT ---------- */}
        {trains.length === 0 && !loading && searchData.fromStationCode && (
          <div className="no-results">
            <FiAlertCircle size={48} />
            <h3>No Trains Found</h3>
            <p>There are no direct trains between these stations. Try searching for nearby major cities.</p>
          </div>
        )}

        {/* ---------- SEAT SELECTION MODAL ---------- */}
        {showSeats && selectedTrain && (
          <TrainSeatSelection
            train={selectedTrain}
            onClose={() => setShowSeats(false)}
            onConfirm={(seats) => {
              setShowSeats(false);
              navigate('/booking/train/confirm', { state: { train: selectedTrain, seats } });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TrainBooking;
