import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import '../styles/BusSeatSelection.css';

const BusSeatSelection = ({ bus, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentDeck, setCurrentDeck] = useState('lower');

  const busType = bus.type || '';
  const isSleeper = busType.toLowerCase().includes('sleeper') && !busType.toLowerCase().includes('semi-sleeper');

  // Deterministic seat booking based on seat name and bus operator
  const getSeatAvailability = (seatNumber) => {
    const operator = bus.operator || '';
    let hash = 0;
    for (let i = 0; i < operator.length; i++) {
      hash += operator.charCodeAt(i);
    }
    for (let i = 0; i < seatNumber.length; i++) {
      hash += seatNumber.charCodeAt(i);
    }
    return (hash % 10) >= 4; // ~60% available
  };

  // Generate seats once and store in state
  const [seatsData] = useState(() => {
    const data = {};
    if (isSleeper) {
      // 15 seats Lower Deck, 15 seats Upper Deck
      // 5 rows, 3 seats per row (2 + Aisle + 1)
      const decks = ['lower', 'upper'];
      decks.forEach(deck => {
        const prefix = deck === 'lower' ? 'L' : 'U';
        const deckSeats = [];
        for (let row = 1; row <= 5; row++) {
          // Col A, Col B, Col C
          ['A', 'B', 'C'].forEach(col => {
            const num = `${prefix}-${row}${col}`;
            deckSeats.push({
              number: num,
              row,
              col,
              isAvailable: getSeatAvailability(num)
            });
          });
        }
        data[deck] = deckSeats;
      });
    } else {
      // Seater: 40 seats
      // 10 rows, 4 seats per row (2 + Aisle + 2)
      const seaterSeats = [];
      for (let row = 1; row <= 10; row++) {
        ['A', 'B', 'C', 'D'].forEach(col => {
          const num = `${row}${col}`;
          seaterSeats.push({
            number: num,
            row,
            col,
            isAvailable: getSeatAvailability(num)
          });
        });
      }
      data.seater = seaterSeats;
    }
    return data;
  });

  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      } else {
        if (prev.length >= 6) {
          alert('Maximum 6 seats can be selected');
          return prev;
        }
        return [...prev, seatNumber];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    onConfirm(selectedSeats);
  };

  // Render a cell in the grid
  const renderSeat = (seat, type) => {
    const selected = selectedSeats.includes(seat.number);
    const booked = !seat.isAvailable;

    let seatClass = type === 'sleeper' ? 'seat-sleeper' : 'seat-chair';
    if (booked) seatClass += ' booked';
    else if (selected) seatClass += ' selected';
    else seatClass += ' available';

    return (
      <button
        key={seat.number}
        type="button"
        className={seatClass}
        disabled={booked}
        onClick={() => toggleSeat(seat.number)}
        title={`Seat ${seat.number} (${booked ? 'Booked' : 'Available'})`}
      >
        {seat.number}
      </button>
    );
  };

  // Generate grid cells including aisle spacers
  const renderSeaterGrid = () => {
    const gridCells = [];
    const rawSeats = seatsData.seater || [];
    
    // Group seats by row
    for (let r = 1; r <= 10; r++) {
      const rowSeats = rawSeats.filter(s => s.row === r);
      // Col A, Col B, Spacer, Col C, Col D
      const seatA = rowSeats.find(s => s.col === 'A');
      const seatB = rowSeats.find(s => s.col === 'B');
      const seatC = rowSeats.find(s => s.col === 'C');
      const seatD = rowSeats.find(s => s.col === 'D');

      if (seatA) gridCells.push(renderSeat(seatA, 'seater'));
      if (seatB) gridCells.push(renderSeat(seatB, 'seater'));
      
      // Aisle Spacer
      gridCells.push(<div key={`spacer-${r}`} className="aisle-spacer" />);
      
      if (seatC) gridCells.push(renderSeat(seatC, 'seater'));
      if (seatD) gridCells.push(renderSeat(seatD, 'seater'));
    }
    return gridCells;
  };

  const renderSleeperGrid = () => {
    const gridCells = [];
    const rawSeats = seatsData[currentDeck] || [];

    // Group seats by row
    for (let r = 1; r <= 5; r++) {
      const rowSeats = rawSeats.filter(s => s.row === r);
      // Col A, Col B, Spacer, Col C
      const seatA = rowSeats.find(s => s.col === 'A');
      const seatB = rowSeats.find(s => s.col === 'B');
      const seatC = rowSeats.find(s => s.col === 'C');

      if (seatA) gridCells.push(renderSeat(seatA, 'sleeper'));
      if (seatB) gridCells.push(renderSeat(seatB, 'sleeper'));
      
      // Aisle Spacer
      gridCells.push(<div key={`spacer-${r}`} className="aisle-spacer" />);
      
      if (seatC) gridCells.push(renderSeat(seatC, 'sleeper'));
    }
    return gridCells;
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
            <button type="button" className="close-btn" onClick={onClose}>
              <FiX />
            </button>
          </div>

          <div className="bus-details">
            <h3>{bus.operator}</h3>
            <p>{bus.from} → {bus.to}</p>
            <div className="bus-type-info">{bus.type}</div>
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
            {isSleeper && (
              <div className="deck-tabs">
                <button
                  type="button"
                  className={`deck-tab ${currentDeck === 'lower' ? 'active' : ''}`}
                  onClick={() => setCurrentDeck('lower')}
                >
                  Lower Deck
                </button>
                <button
                  type="button"
                  className={`deck-tab ${currentDeck === 'upper' ? 'active' : ''}`}
                  onClick={() => setCurrentDeck('upper')}
                >
                  Upper Deck
                </button>
              </div>
            )}

            <div className="bus-body">
              <div className="driver-section">
                <span>Driver Cabin</span>
                <span>🚪 Entry</span>
              </div>
              
              <div className={isSleeper ? 'seats-grid-sleeper' : 'seats-grid-seater'}>
                {isSleeper ? renderSleeperGrid() : renderSeaterGrid()}
              </div>
            </div>
          </div>

          <div className="seat-modal-footer">
            <div className="selected-info">
              <p>Selected Seats: <strong>{selectedSeats.join(', ') || 'None'}</strong></p>
              <p className="total-price">
                Total: ₹{selectedSeats.length * bus.price}
              </p>
            </div>
            <button
              type="button"
              className="btn-confirm"
              disabled={selectedSeats.length === 0}
              onClick={handleConfirm}
            >
              Confirm & Proceed
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BusSeatSelection;
