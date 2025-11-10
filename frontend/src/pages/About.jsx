import { FaInstagram } from 'react-icons/fa';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';
import '../styles/About.css';

const About = () => {
  const features = [
    {
      icon: <FiCheckCircle size={40} />,
      title: 'Easy Booking',
      description: 'Book tickets in seconds with our intuitive interface'
    },
    {
      icon: <FiUsers size={40} />,
      title: '1M+ Users',
      description: 'Trusted by millions of travelers across India'
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: 'Real-time Updates',
      description: 'Live train and bus tracking with instant notifications'
    },
    {
      icon: <FiAward size={40} />,
      title: 'Best Prices',
      description: 'Compare and get the best deals on all routes'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="about-title">About TicketHub</h1>
          <p className="about-subtitle">
            India's most trusted platform for train and bus bookings
          </p>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="about-story">
            <h2>Our Story</h2>
            <p>
              Founded in 2025, MyBookings was born from a simple idea: making travel booking 
              accessible, affordable, and hassle-free for everyone. We understand the challenges 
              of booking tickets in India, and we're here to make it easier.
            </p>
            <p>
              With partnerships with IRCTC, HRTC, and major bus operators across India, we provide 
              real-time availability, instant confirmations, and 24/7 customer support to ensure 
              your journey is smooth from start to finish.It was made by Akshad.
            </p>
          </div>

          <div className="about-features">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="about-creator" style={{ marginTop: '2rem' }}>
  <strong>Site Creator:</strong> Akshad
  <br />
  <a
    href="https://instagram.com/AkshadPatial_999"
    target="_blank"
    rel="noopener noreferrer"
    className="insta-link"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '0.5rem',
      color: '#e1306c',
      fontWeight: 600,
      fontSize: '1.1rem'
    }}
  >
    <FaInstagram size={24} /> @AkshadPatial_999
  </a>
</div>

    </div>
  );
};

export default About;
