import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBus, FaCreditCard } from "react-icons/fa";
import { FiCalendar, FiUsers, FiMapPin } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import '../styles/BusPayment.css';

const BusPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if no state
  if (!state || !state.bus) {
    navigate('/booking/bus');
    return null;
  }

  const { bus, seats, total, date } = state;

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      console.log("🚀 Sending booking request...");
      console.log("Bus data:", bus);
      console.log("From:", bus.from);
      console.log("To:", bus.to);
      console.log("Date:", date);
      
      const bookingPayload = {
        type: "bus",
        bus: {
          operator: bus.operator,
          busType: bus.busType,
          from: bus.from,
          to: bus.to,
          departure: bus.departure,
          arrival: bus.arrival,
          duration: bus.duration
        },
        seats: seats,
        total: total,
        from: bus.from,
        to: bus.to,
        date: date || new Date(),
      };

      console.log("📦 Full booking payload:", bookingPayload);

      const { data } = await api.post('/tickets/book', bookingPayload);

      console.log("✅ Response from server:", data);

      if (data.success) {
        toast.success("Bus booking confirmed! 🎉");
        
        // Navigate to My Bookings after short delay
        setTimeout(() => {
          navigate('/my-bookings');
        }, 1500);
      } else {
        toast.error(data.message || "Booking failed.");
        setLoading(false);
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
      console.error("Error response:", err.response?.data);
      
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          "Booking failed. Please try again.";
      
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        <motion.div 
          className="payment-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="payment-header">
            <FaBus size={48} className="payment-icon" />
            <h2>Complete Your Payment</h2>
            <p>Review your booking details and confirm payment</p>
          </div>

          {/* Booking Details */}
          <div className="booking-details">
            <h3>Booking Summary</h3>
            
            <div className="detail-row">
              <span className="detail-label">
                <FaBus /> Bus Operator
              </span>
              <span className="detail-value">{bus.operator}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Bus Type</span>
              <span className="detail-value">{bus.busType}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">
                <FiMapPin /> Route
              </span>
              <span className="detail-value route">
                {bus.from} → {bus.to}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Departure</span>
              <span className="detail-value">{bus.departure}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Arrival</span>
              <span className="detail-value">{bus.arrival}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{bus.duration}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">
                <FiCalendar /> Journey Date
              </span>
              <span className="detail-value">
                {new Date(date).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">
                <FiUsers /> Selected Seats
              </span>
              <span className="detail-value seats">{seats.join(', ')}</span>
            </div>

            <div className="detail-row total-row">
              <span className="detail-label">Total Amount</span>
              <span className="detail-value total">₹{total}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-methods">
            <h3>Payment Method</h3>
            <div className="payment-info">
              <FaCreditCard size={24} />
              <p>Secure payment gateway (Demo mode)</p>
            </div>
          </div>

          {/* Complete Payment Button */}
          <motion.button
            className="btn-complete-payment"
            onClick={handlePayment}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Processing Payment...' : `Complete Payment of ₹${total}`}
          </motion.button>

          {/* Go Back Button */}
          <button 
            className="btn-cancel-payment"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BusPayment;
