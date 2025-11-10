// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import AnimatedButton from '../components/AnimatedButton';
// import { FiCalendar, FiClock, FiMapPin, FiTrendingUp } from 'react-icons/fi';
// import './Home.css';

// const Home = () => {
//   const features = [
//     {
//       Icon: FiCalendar,
//       title: 'Easy Booking',
//       description: 'Book tickets in seconds with our streamlined process',
//     },
//     {
//       Icon: FiClock,
//       title: 'Real-time Updates',
//       description: 'Get instant notifications about your events',
//     },
//     {
//       Icon: FiMapPin,
//       title: 'Local Events',
//       description: 'Discover exciting events happening near you',
//     },
//     {
//       Icon: FiTrendingUp,
//       title: 'Best Prices',
//       description: 'Get the best deals on tickets for all events',
//     },
//   ];

//   return (
//     <div className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container">
//           <motion.div
//             className="hero-content"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="hero-title">
//               Discover Amazing Events <br />
//               <span className="hero-gradient">Near You</span>
//             </h1>
//             <p className="hero-subtitle">
//               Book tickets for concerts, sports, theaters, and more. Experience the best local events with TicketHub.
//             </p>
//             <div className="hero-buttons">
//               <Link to="/events">
//                 <AnimatedButton className="btn-primary btn-lg">
//                   Explore Events
//                 </AnimatedButton>
//               </Link>
//               <Link to="/signup">
//                 <AnimatedButton className="btn-outline btn-lg">
//                   Get Started
//                 </AnimatedButton>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features">
//         <div className="container">
//           <motion.div
//             className="section-header"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="section-title">Why Choose TicketHub?</h2>
//             <p className="section-subtitle">
//               Your trusted platform for seamless event ticketing
//             </p>
//           </motion.div>

//           <div className="features-grid">
//             {features.map(({ Icon, title, description }, index) => (
//               <motion.div
//                 key={index}
//                 className="feature-card"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="feature-icon">
//                   <Icon size={32} />
//                 </div>
//                 <h3 className="feature-title">{title}</h3>
//                 <p className="feature-description">{description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta">
//         <div className="container">
//           <motion.div
//             className="cta-content"
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="cta-title">Ready to Get Started?</h2>
//             <p className="cta-subtitle">
//               Join thousands of event-goers and start booking today!
//             </p>
//             <Link to="/signup">
//               <AnimatedButton className="btn-primary btn-lg">
//                 Create Free Account
//               </AnimatedButton>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import "../styles/Home.css";
import { FiClock, FiCalendar, FiMapPin, FiTrendingUp } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const features = [
    {
      icon: <FiClock size={28} />,
      title: "Fast Support",
      desc: "Quick ticket response time.",
    },
    {
      icon: <FiCalendar size={28} />,
      title: "Event Scheduling",
      desc: "Easy event management.",
    },
    {
      icon: <FiMapPin size={28} />,
      title: "Location Tracking",
      desc: "Track tickets by venue.",
    },
    {
      icon: <FiTrendingUp size={28} />,
      title: "Performance",
      desc: "Real-time analytics.",
    },
  ];

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Optional greeting for logged in users */}
      {user && (
        <div className="welcome-message">
          <h2>Welcome back, {user.name}!</h2>
          <p>Ready to book your next ticket?</p>
        </div>
      )}

      {/* Hero Section with Bus Background */}
      <section className="hero" style={{ position: "relative" }}>
        <div className="hero-bg-img">
          <img src="/hrtc1.jpg" alt="HRTC Bus" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="hero-gradient">Local Ticket System 🎟️</span>
          </h1>
          <p className="hero-subtitle">
            Simplify your ticketing process with fast support, live tracking,
            and event management — all in one platform.
          </p>
          <div className="hero-buttons">
            {!user && (
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
            )}
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="hero-title hero-gradient">Our Features</h2>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-description">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Train Background */}
      <section className="cta" style={{ position: "relative" }}>
        <div className="cta-bg-img">
          <img src="/train.jpg" alt="Train" className="cta-bg-image" />
          <div className="cta-overlay"></div>
        </div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to manage your tickets smarter?</h2>
          <p className="cta-subtitle">
            Start using the Local Ticket System today and experience effortless event management.
          </p>
          {!user && (
            <Link to="/signup" className="btn btn-light">
              Create an Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
