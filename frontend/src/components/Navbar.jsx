// import React, { useState } from 'react';


// import { Link, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import { FiMenu, FiX, FiUser, FiLogOut, FiTag } from 'react-icons/fi';



// import './Navbar.css';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="container navbar-container">
//         <Link to="/" className="navbar-logo">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             🎫 <span>TicketHub</span>
//           </motion.div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="navbar-links">
//           <Link to="/" className="navbar-link">Home</Link>
//           <Link to="/events" className="navbar-link">Events</Link>
          
//           {user ? (
//             <>
//               <Link to="/my-tickets" className="navbar-link">My Tickets</Link>
//               {(user.role === 'organizer' || user.role === 'admin') && (
//                 <Link to="/create-event" className="navbar-link">Create Event</Link>
//               )}
              
//               <div className="navbar-user-menu">
//                 <motion.button
//                   className="navbar-user-button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FiUser /> {user.name}
//                 </motion.button>
                
//                 <AnimatePresence>
//                   {isDropdownOpen && (
//                     <motion.div
//                       className="navbar-dropdown"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Link to="/dashboard" className="navbar-dropdown-item">
//                         <FiUser /> Dashboard
//                       </Link>
//                       <Link to="/my-tickets" className="navbar-dropdown-item">
//                         <FiTag /> My Tickets
//                       </Link>
//                       <button onClick={handleLogout} className="navbar-dropdown-item">
//                         <FiLogOut /> Logout
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
//               <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="navbar-mobile-toggle"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? <FiX /> : <FiMenu />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="navbar-mobile-menu"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Link to="/" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//               Home
//             </Link>
//             <Link to="/events" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//               Events
//             </Link>
            
//             {user ? (
//               <>
//                 <Link to="/dashboard" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//                   Dashboard
//                 </Link>
//                 <Link to="/my-tickets" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//                   My Tickets
//                 </Link>
//                 {(user.role === 'organizer' || user.role === 'admin') && (
//                   <Link to="/create-event" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//                     Create Event
//                   </Link>
//                 )}
//                 <button onClick={handleLogout} className="navbar-mobile-link">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//                   Login
//                 </Link>
//                 <Link to="/signup" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Tickets', path: '/booking' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            🎫 MyBookings.in
          </motion.span>
        </Link>

        <div className="navbar-menu">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.path}
                className="navbar-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/my-bookings" className="navbar-link">
                <FiUser /> My Bookings
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`navbar-mobile ${mobileMenuOpen ? 'active' : ''}`}
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
      >
        <div className="navbar-mobile-content">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/my-bookings"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="navbar-mobile-link"
                style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="navbar-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
