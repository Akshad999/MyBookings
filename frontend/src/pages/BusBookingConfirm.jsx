// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../styles/BusBookingConfirm.css';

// const BusBookingConfirm = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { bus, seats, date } = location.state;
//   const pricePerSeat = bus.price || 500;
//   const total = seats.length * pricePerSeat;

//   return (
//     <div className="confirm-container">
//       <div className="confirm-card">
//         <h2>Confirm Your Booking</h2>
        
//         <div className="booking-summary">
//           <div className="summary-row">
//             <span>Bus Operator:</span>
//             <strong>{bus.operator}</strong>
//           </div>
//           <div className="summary-row">
//             <span>Bus Type:</span>
//             <strong>{bus.busType}</strong>
//           </div>
//           <div className="summary-row">
//             <span>From:</span>
//             <strong>{bus.from}</strong>
//           </div>
//           <div className="summary-row">
//             <span>To:</span>
//             <strong>{bus.to}</strong>
//           </div>
//           <div className="summary-row">
//             <span>Journey Date:</span>
//             <strong>{new Date(date).toLocaleDateString()}</strong>
//           </div>
//           <div className="summary-row">
//             <span>Seats:</span>
//             <strong>{seats.join(', ')}</strong>
//           </div>
//           <div className="summary-row total-row">
//             <span>Total Amount:</span>
//             <strong>₹{total}</strong>
//           </div>
//         </div>
        
//         <button 
//           className="btn-proceed-payment"
//           onClick={() => navigate('/booking/bus/payment', { state: { bus, seats, total, date } })}
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BusBookingConfirm;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/BusBookingConfirm.css';

const BusBookingConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.bus) {
    navigate('/booking/bus');
    return null;
  }

  const { bus, seats, date, from, to } = location.state;
  const pricePerSeat = bus.price || 500;
  const total = seats.length * pricePerSeat;

  return (
    <div className="confirm-container">
      <motion.div 
        className="confirm-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Confirm Your Booking</h2>
        
        <div className="booking-summary">
          <div className="summary-row">
            <span>Bus Operator:</span>
            <strong>{bus.operator}</strong>
          </div>
          <div className="summary-row">
            <span>Bus Type:</span>
            <strong>{bus.busType}</strong>
          </div>
          <div className="summary-row">
            <span>From:</span>
            <strong>{from || bus.from}</strong>
          </div>
          <div className="summary-row">
            <span>To:</span>
            <strong>{to || bus.to}</strong>
          </div>
          <div className="summary-row">
            <span>Departure:</span>
            <strong>{bus.departure}</strong>
          </div>
          <div className="summary-row">
            <span>Arrival:</span>
            <strong>{bus.arrival}</strong>
          </div>
          <div className="summary-row">
            <span>Journey Date:</span>
            <strong>{new Date(date).toLocaleDateString('en-IN', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</strong>
          </div>
          <div className="summary-row">
            <span>Selected Seats:</span>
            <strong>{seats.join(', ')}</strong>
          </div>
          <div className="summary-row total-row">
            <span>Total Amount:</span>
            <strong>₹{total}</strong>
          </div>
        </div>
        
        <button 
          className="btn-proceed-payment"
          onClick={() => navigate('/booking/bus/payment', { 
            state: { bus, seats, total, date, from, to }
          })}
        >
          Proceed to Payment
        </button>
        
        <button 
          className="btn-go-back"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default BusBookingConfirm;
