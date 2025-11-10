import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiXCircle } from 'react-icons/fi';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status-container">
      <motion.div
        className="status-card cancel-card"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <FiXCircle size={64} className="status-icon cancel-icon" />
        <h2 className="status-title">Payment Cancelled</h2>
        <p className="status-message">
          Your transaction was not completed.<br />
          No seats were booked.
        </p>
        <button className="status-btn" onClick={() => navigate('/booking')}>
          Retry Booking
        </button>
        <button className="status-btn alt" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
