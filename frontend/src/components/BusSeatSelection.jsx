import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import '../styles/BusSeatSelection.css';

const BusSeatSelection = ({ bus, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const generateSeats = () => {
    const seats = [];
    const rows = 10;
    const seatsPerRow = 4;
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= seatsPerRow; col++) {
        const seatNumber = `${row}${String.fromCharCode(64 + col)}`;
        seats.push({
          number: seatNumber,
          isAvailable: Math.random() > 0.3
        });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert('Maximum 6 seats can be selected');
      }
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    onConfirm(selectedSeats);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="seat-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="seat-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="seat-modal-header">
            <h2>Select Your Seats</h2>
            <button className="close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>

          <div className="bus-details">
            <h3>{bus.operator}</h3>
            <p>{bus.from} → {bus.to}</p>
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="seat-icon available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat-icon selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat-icon booked"></div>
              <span>Booked</span>
            </div>
          </div>

          <div className="seats-container">
            <div className="driver-section">🚗 Driver</div>
            <div className="seats-grid">
              {seats.map((seat) => (
                <button
                  key={seat.number}
                  className={`seat ${
                    !seat.isAvailable ? 'booked' : 
                    selectedSeats.includes(seat.number) ? 'selected' : 
                    'available'
                  }`}
                  disabled={!seat.isAvailable}
                  onClick={() => toggleSeat(seat.number)}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </div>

          <div className="seat-modal-footer">
            <div className="selected-info">
              <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
              <p className="total-price">
                Total: ₹{selectedSeats.length * bus.price}
              </p>
            </div>
            <button className="btn-confirm" onClick={handleConfirm}>
              Confirm & Proceed
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BusSeatSelection;
