
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrain, FaBus } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/BookingHome.css';

const BookingHome = () => {
  const bookingOptions = [
    {
      id: 'train',
      title: 'Train Booking',
    icon: <FaTrain size={48} />,

      description: 'Book train tickets with real-time availability. Search IRCTC trains, check PNR status, and get live running status.',
      features: [
        'Real-time seat availability',
        'Live train tracking',
        'PNR status check',
        'E-ticket generation',
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      path: '/booking/train',
    },
    {
      id: 'bus',
      title: 'Bus Booking',
icon: <FaBus size={48} />,

      description: 'Book bus tickets from multiple operators. Search routes, compare prices, and select your preferred seat.',
      features: [
        'Multiple bus operators',
        'Seat selection',
        'Live bus tracking',
        'Instant confirmation',
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      path: '/booking/bus',
    },
  ];

  return (
    <div className="booking-home">
      <div className="container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="booking-title">Choose Your Journey</h1>
          <p className="booking-subtitle">
            Book train or bus tickets with real-time availability and instant confirmation
          </p>
        </motion.div>

        <div className="booking-options">
          {bookingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              className="booking-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div
                className="booking-card-header"
                style={{ background: option.gradient }}
              >
                <div className="booking-icon">{option.icon}</div>
                <h2 className="booking-card-title">{option.title}</h2>
              </div>

              <div className="booking-card-body">
                <p className="booking-description">{option.description}</p>

                <ul className="booking-features">
                  {option.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                    >
                      <FiArrowRight className="feature-icon" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to={option.path}>
                  <motion.button
                    className="btn-book-now"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                    <FiArrowRight className="btn-icon" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="booking-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="info-card">
            <h3>🎯 Why Book With Us?</h3>
            <ul>
              <li>✅ Real-time availability check</li>
              <li>✅ Instant booking confirmation</li>
              <li>✅ Secure payment gateway</li>
              <li>✅ 24/7 customer support</li>
              <li>✅ Easy cancellation & refund</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingHome;
