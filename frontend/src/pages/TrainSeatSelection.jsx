import React, { useState } from "react";
import "../styles/TrainSeatSelection.css";

const TrainSeatSelection = ({ train, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // 5 bays of 8 berths = 40 berths total
  const totalSeats = 40;
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  // Deterministic booking based on train number and seat number to keep it consistent
  const isBooked = (num) => {
    const trainNum = parseInt(train.train_number) || 12011;
    const hash = (num * 13 + trainNum) % 10;
    return hash < 3; // 30% seats booked
  };

  const getBerthDetails = (num) => {
    const index = (num - 1) % 8; // 0 to 7
    const types = ["LB", "MB", "UB", "LB", "MB", "UB", "SL", "SU"];
    const names = [
      "Lower Berth",
      "Middle Berth",
      "Upper Berth",
      "Lower Berth",
      "Middle Berth",
      "Upper Berth",
      "Side Lower",
      "Side Upper"
    ];
    return {
      type: types[index],
      name: names[index]
    };
  };

  const toggleSeat = (num) => {
    if (isBooked(num)) return;
    
    setSelectedSeats((prev) => {
      if (prev.includes(num)) {
        return prev.filter((s) => s !== num);
      } else {
        if (prev.length >= 6) {
          alert("You can select a maximum of 6 seats.");
          return prev;
        }
        return [...prev, num];
      }
    });
  };

  const pricePerSeat = train.price || 350;
  const totalPrice = selectedSeats.length * pricePerSeat;
  const selectedClass = train.selectedClass || "SL";

  // Group seats into 5 bays
  const bays = [];
  for (let b = 0; b < 5; b++) {
    const start = b * 8 + 1;
    bays.push({
      bayNum: b + 1,
      leftCabin: [start, start + 1, start + 2], // LB, MB, UB
      rightCabin: [start + 3, start + 4, start + 5], // LB, MB, UB
      sideCabin: [start + 6, start + 7] // SL, SU
    });
  }

  const renderBerthButton = (num) => {
    const booked = isBooked(num);
    const selected = selectedSeats.includes(num);
    const { type } = getBerthDetails(num);

    let btnClass = `train-berth avail-${type}`;
    if (booked) btnClass = "train-berth booked-berth";
    else if (selected) btnClass = "train-berth selected-berth";

    return (
      <button
        key={num}
        type="button"
        disabled={booked}
        className={btnClass}
        onClick={() => toggleSeat(num)}
        title={`Seat ${num} - ${getBerthDetails(num).name}`}
      >
        <span className="berth-num">{num}</span>
        <span className="berth-type">{type}</span>
      </button>
    );
  };

  return (
    <div className="train-seat-modal-overlay">
      <div className="train-seat-modal">
        <div className="train-seat-modal-header">
          <h2>Select Train Seats / Berths</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Train Details Banner */}
        <div className="train-details-banner">
          <div>
            <h3>{train.train_name}</h3>
            <p>Train No: #{train.train_number} | Route: {train.from_station_code} → {train.to_station_code}</p>
          </div>
          <div className="class-badge">
            {selectedClass}
          </div>
        </div>

        {/* Legend */}
        <div className="train-legend">
          <div className="legend-item">
            <div className="legend-swatch available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item" style={{marginLeft: "10px", borderLeft: "1px solid #ccc", paddingLeft: "10px"}}>
            <div className="legend-swatch lb"></div>
            <span>Lower (LB)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch mb"></div>
            <span>Middle (MB)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch ub"></div>
            <span>Upper (UB)</span>
          </div>
          <div className="legend-item">
            <div className="legend-swatch side"></div>
            <span>Side (SL/SU)</span>
          </div>
        </div>

        {/* Coach Map */}
        <div className="coach-container">
          <div className="coach-header">COACH LAYOUT (8-BERTH BAYS)</div>
          
          {bays.map((bay) => (
            <div key={bay.bayNum} className="coach-bay">
              <span className="bay-label">Compartment {bay.bayNum}</span>
              
              <div className="bay-layout">
                {/* Main Cabin Left & Right */}
                <div className="main-cabin">
                  {/* Left Column Bunks */}
                  <div className="cabin-side">
                    {bay.leftCabin.map(num => renderBerthButton(num))}
                  </div>
                  
                  {/* Right Column Bunks */}
                  <div className="cabin-side">
                    {bay.rightCabin.map(num => renderBerthButton(num))}
                  </div>
                </div>

                {/* Aisle Walkway Corridor */}
                <div className="aisle-corridor">
                  Aisle / Walkway
                </div>

                {/* Side Cabin Bunks */}
                <div className="side-cabin">
                  {bay.sideCabin.map(num => renderBerthButton(num))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="train-seat-modal-footer">
          <div className="selected-summary">
            <p>
              Selected Seats:{" "}
              <strong>
                {selectedSeats.length > 0
                  ? selectedSeats
                      .map((num) => `${num} (${getBerthDetails(num).type})`)
                      .join(", ")
                  : "None"}
              </strong>
            </p>
            <p className="total-amt">
              Total Price: ₹{totalPrice} <span style={{fontSize: "12px", color: "#666", fontWeight: "normal"}}>({selectedSeats.length} &times; ₹{pricePerSeat})</span>
            </p>
          </div>
          
          <div className="footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-confirm-seats"
              disabled={selectedSeats.length === 0}
              onClick={() => onConfirm(selectedSeats)}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainSeatSelection;
