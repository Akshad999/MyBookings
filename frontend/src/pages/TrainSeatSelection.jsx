import React, { useState } from "react";

const TrainSeatSelection = ({ train, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Generate seats: e.g., 3A: 64, SL: 72, etc (simplified: 40 seats)
  const seats = Array.from({ length: 40 }, (_, i) => i + 1);
  const isBooked = () => false; // Replace with booking data if available

  const toggleSeat = (num) => {
    if (isBooked(num)) return;
    setSelectedSeats((seats) =>
      seats.includes(num)
        ? seats.filter((s) => s !== num)
        : seats.length < 6 ? [...seats, num] : seats
    );
  };

  return (
    <div className="train-seat-modal">
      <h3>Select Your Seats ({train.train_name})</h3>
      <div className="seats-grid">
        {seats.map((num) => (
          <button
            key={num}
            disabled={isBooked(num)}
            className={`seat${selectedSeats.includes(num) ? " selected" : ""}`}
            onClick={() => toggleSeat(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div>
        <span>Selected: {selectedSeats.join(", ") || "None"}</span>
      </div>
      <button disabled={selectedSeats.length === 0}
        onClick={() => onConfirm(selectedSeats)}>Confirm Seats</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
export default TrainSeatSelection;
