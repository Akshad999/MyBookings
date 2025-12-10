// import React, { createContext, useState, useContext, useEffect } from 'react';
// import api from '../utils/api';
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');
    
//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//       loadUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const loadUser = async () => {
//     try {
//       const { data } = await api.get('/auth/me');
//       setUser(data.user);
//     } catch (error) {
//       console.error('Load user error:', error);
//       logout();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post('/auth/login', { email, password });
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       toast.success('Login successful!');
//       return data;
//     } catch (error) {
//       const message = error.response?.data?.message || 'Login failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const register = async (userData) => {
//     try {
//       console.log('📤 Sending registration data:', userData);
//       const { data } = await api.post('/auth/register', userData);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       setUser(data.user);
//       toast.success('Registration successful!');
//       return data;
//     } catch (error) {
//       console.error('❌ Registration error:', error.response?.data);
//       const message = error.response?.data?.message || 'Registration failed';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const sendOTP = async (email) => {
//     try {
//       console.log('📧 Sending OTP to:', email);
//       const { data } = await api.post('/auth/send-otp', { email });
//       console.log('✅ OTP response:', data);
//       toast.success('OTP sent to your email! Check your inbox.');
//       return data;
//     } catch (error) {
//       console.error('❌ Send OTP error:', error.response?.data);
//       const message = error.response?.data?.message || 'Failed to send OTP';
//       toast.error(message);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     toast.success('Logged out successfully');
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     sendOTP,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await api.get('/api/auth/me');
      setUser(data.user);
    } catch (error) {
      console.error('Load user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('📤 Sending registration data:', userData);
      const { data } = await api.post('/api/auth/register', userData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  // ✅ FIXED OTP ROUTE
  const sendOTP = async (email) => {
    try {
      console.log('📧 Sending OTP to:', email);
      const { data } = await api.post('/api/otp/send', { email });
      console.log('✅ OTP response:', data);
      toast.success('OTP sent to your email! Check your inbox.');
      return data;
    } catch (error) {
      console.error('❌ Send OTP error:', error.response?.data);
      const message = error.response?.data?.message || 'Failed to send OTP';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    sendOTP,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

