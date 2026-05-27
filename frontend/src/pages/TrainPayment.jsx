import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrain, FaCreditCard } from "react-icons/fa";
import { FiCalendar, FiUsers, FiMapPin } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import "../styles/TrainPayment.css";

const TrainPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!state || !state.train) {
    navigate('/booking/train');
    return null;
  }

  const { train, seats, total, date } = state;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/tickets/book', {
        type: "train",
        train: {
          train_name: train.train_name,
          from: train.from_station_name,
          to: train.to_station_name,
          departure: train.departure_time,
          arrival: train.arrival_time,
          duration: train.duration,
        },
        seats,
        total,
        from: train.from_station_name,
        to: train.to_station_name,
        date: date || new Date(),
      });

      if (data.success) {
        toast.success("Train booking confirmed! 🎉", { duration: 1500 });
        setTimeout(() => navigate('/my-bookings'), 1500);
      } else {
        toast.error(data.message || "Booking failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      const errorMessage = err.response?.data?.message || "Booking failed. Please try again.";
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
          <div className="payment-header">
            <FaTrain size={48} className="payment-icon" />
            <h2>Complete Your Payment</h2>
            <p>Review your booking details and confirm payment</p>
          </div>

          <div className="booking-details">
            <h3>Booking Summary</h3>
            <div className="detail-row">
              <span className="detail-label"><FaTrain /> Train</span>
              <span className="detail-value">{train.train_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><FiMapPin /> Route</span>
              <span className="detail-value route">{train.from_station_name} → {train.to_station_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Departure</span>
              <span className="detail-value">{train.departure_time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Arrival</span>
              <span className="detail-value">{train.arrival_time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{train.duration}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><FiCalendar /> Journey Date</span>
              <span className="detail-value">{new Date(date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><FiUsers /> Selected Seats</span>
              <span className="detail-value seats">{seats.join(', ')}</span>
            </div>
            <div className="detail-row total-row">
              <span className="detail-label">Total Amount</span>
              <span className="detail-value total">₹{total}</span>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Payment Method</h3>
            <div className="payment-info">
              <FaCreditCard size={24} />
              <p>Secure payment gateway (Demo mode)</p>
            </div>
          </div>

          <motion.button
            className="btn-complete-payment"
            onClick={handlePayment}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Processing Payment...' : `Complete Payment of ₹${total}`}
          </motion.button>

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

export default TrainPayment;
