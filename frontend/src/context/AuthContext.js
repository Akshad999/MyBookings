import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password }, { withCredentials: true });
      const data = res.data;
      if (res.status >= 200 && res.status < 300) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Logged in successfully');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Network error during login');
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password }, { withCredentials: true });
      const data = res.data;
      if (res.status >= 200 && res.status < 300) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Account created and logged in');
        navigate('/');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error during signup');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
