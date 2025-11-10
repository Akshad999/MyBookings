import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status-container">
      <motion.div
        className="status-card success-card"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FiCheckCircle size={64} className="status-icon success-icon" />
        <h2 className="status-title">Payment Successful!</h2>
        <p className="status-message">
          Your ticket booking is confirmed.<br />
          You can view your ticket details in My Bookings.
        </p>
        <button className="status-btn" onClick={() => navigate('/my-bookings')}>
          Go to My Bookings
        </button>
        <button className="status-btn alt" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
