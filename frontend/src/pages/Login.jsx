// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../context/AuthContext';
// import AnimatedButton from '../components/AnimatedButton';
// import { FiMail, FiLock } from 'react-icons/fi';
// import '../styles/login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       await login(email, password);
//       navigate('/');
//     } catch (error) {
//       console.error('Login error:', error);
//     } finally {
//       setLoading(false);
//     }
//     try {
//   await login(email, password);
//   console.log('Login succeeded!');
//   navigate('/');
// } catch (error) {
//   console.error('Login error:', error); // See if this runs
// }

//   };

//   return (
//     <div className="auth-container">
//       <motion.div
//         className="auth-card"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="auth-header">
//           <h1>Welcome Back! 👋</h1>
//           <p>Login to access your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label className="form-label">
//               <FiMail /> Email Address
//             </label>
//             <input
//               type="email"
//               className="form-input"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">
//               <FiLock /> Password
//             </label>
//             <input
//               type="password"
//               className="form-input"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <AnimatedButton
//             type="submit"
//             className="btn-primary btn-lg"
//             style={{ width: '100%' }}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </AnimatedButton>
//         </form>

//         <div className="auth-footer">
//           <p>
//             Don't have an account?{' '}
//             <Link to="/signup" className="auth-link">Sign up here</Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock } from 'react-icons/fi';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password); // throws if fails
      navigate('/');
    } catch (error) {
      // handled in AuthContext by toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="auth-header">
          <h1>Welcome Back! 👋</h1>
          <p>Login to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label"><FiMail /> Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label"><FiLock /> Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">Sign up here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
