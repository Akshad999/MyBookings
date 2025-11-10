import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TrainSearch.css'; // We'll create this next

const TrainSearch = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFromStation, setSelectedFromStation] = useState(null);
  const [selectedToStation, setSelectedToStation] = useState(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000';

  // Search stations
  const searchStations = async (query, setSuggestions) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/trains/stations/search?query=${query}`
      );
      setSuggestions(response.data.stations || []);
    } catch (error) {
      console.error('Station search error:', error);
      setSuggestions([]);
    }
  };

  // Handle from station input
  const handleFromInput = (value) => {
    setFromStation(value);
    setSelectedFromStation(null);
    setShowFromDropdown(true);
    searchStations(value, setFromSuggestions);
  };

  // Handle to station input
  const handleToInput = (value) => {
    setToStation(value);
    setSelectedToStation(null);
    setShowToDropdown(true);
    searchStations(value, setToSuggestions);
  };

  // Select from station
  const selectFromStation = (station) => {
    setFromStation(`${station.name} (${station.code})`);
    setSelectedFromStation(station);
    setShowFromDropdown(false);
  };

  // Select to station
  const selectToStation = (station) => {
    setToStation(`${station.name} (${station.code})`);
    setSelectedToStation(station);
    setShowToDropdown(false);
  };

  // Search trains
  const searchTrains = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedFromStation || !selectedToStation) {
      setError('Please select valid railway stations from dropdown');
      return;
    }

    if (!date) {
      setError('Please select journey date');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/api/trains/search`, {
        params: {
          fromStationCode: selectedFromStation.code,
          toStationCode: selectedToStation.code,
          dateOfJourney: date
        }
      });

      if (response.data.success) {
        setTrains(response.data.trains);
        if (response.data.trains.length === 0) {
          setError('No trains found between these stations');
        }
      }
    } catch (error) {
      setError('Error searching trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="train-search-container">
      <h1>🚂 Indian Railway Booking</h1>
      
      {error && <div className="error-alert">{error}</div>}

      <form onSubmit={searchTrains} className="search-form">
        {/* From Station */}
        <div className="form-group">
          <label>From Station</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              value={fromStation}
              onChange={(e) => handleFromInput(e.target.value)}
              placeholder="Type: Kalka, Delhi, Mumbai..."
              className="form-control"
              autoComplete="off"
            />
            {showFromDropdown && fromSuggestions.length > 0 && (
              <div className="dropdown-suggestions">
                {fromSuggestions.map((station, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => selectFromStation(station)}
                  >
                    <strong>{station.name}</strong> ({station.code})
                    <br />
                    <small>{station.city}, {station.state}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* To Station */}
        <div className="form-group">
          <label>To Station</label>
          <div className="autocomplete-wrapper">
            <input
              type="text"
              value={toStation}
              onChange={(e) => handleToInput(e.target.value)}
              placeholder="Type: Chandigarh, Jaipur..."
              className="form-control"
              autoComplete="off"
            />
            {showToDropdown && toSuggestions.length > 0 && (
              <div className="dropdown-suggestions">
                {toSuggestions.map((station, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => selectToStation(station)}
                  >
                    <strong>{station.name}</strong> ({station.code})
                    <br />
                    <small>{station.city}, {station.state}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Journey Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            className="form-control"
            required
          />
        </div>

        {/* Search Button */}
        <button type="submit" className="btn-search" disabled={loading}>
          {loading ? '🔍 Searching...' : 'Search Trains'}
        </button>
      </form>

      {/* Train Results */}
      {trains.length > 0 && (
        <div className="train-results">
          <h2>Available Trains ({trains.length})</h2>
          {trains.map((train, index) => (
            <div key={index} className="train-card">
              <div className="train-header">
                <div>
                  <h3>{train.train_number} - {train.train_name}</h3>
                  <span className="train-type">{train.train_type}</span>
                </div>
              </div>
              
              <div className="train-journey">
                <div className="station-time">
                  <h4>{train.from_time}</h4>
                  <p>{train.from_station_name}</p>
                </div>
                <div className="duration">
                  <span>⏱️ {train.duration}</span>
                  <div className="journey-line"></div>
                </div>
                <div className="station-time">
                  <h4>{train.to_time}</h4>
                  <p>{train.to_station_name}</p>
                </div>
              </div>

              <div className="classes-grid">
                {train.class_type.map((cls, idx) => (
                  <div key={idx} className={`class-card ${cls.status === 'Available' ? 'available' : 'waitlist'}`}>
                    <div className="class-name">{cls.classType}</div>
                    <div className="class-fare">₹{cls.fare}</div>
                    <div className="class-seats">{cls.availableSeats} seats</div>
                    <span className={`status-badge ${cls.status === 'Available' ? 'available' : 'waitlist'}`}>
                      {cls.status}
                    </span>
                    <button 
                      className="btn-book"
                      onClick={() => alert(`Booking ${cls.classType} class for ${train.train_name}`)}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainSearch;
