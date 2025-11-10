import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AnimatedButton from '../components/AnimatedButton';
import OTPInput from '../components/OTPInput';
import { FiMail, FiLock, FiUser, FiPhone, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import '../styles/Signup.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { register, sendOTP } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    console.log('🚀 Attempting to send OTP...');

    try {
      await sendOTP(formData.email);
      setOtpSent(true);
      setStep(2);
      console.log('✅ OTP sent, moving to step 2');
    } catch (error) {
      console.error('❌ Failed to send OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await sendOTP(formData.email);
      toast.success('OTP resent successfully!');
    } catch (error) {
      console.error('Resend OTP failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPComplete = async (otpValue) => {
    setFormData({ ...formData, otp: otpValue });
    setLoading(true);

    console.log('🔐 Verifying OTP and registering user...');

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        otp: otpValue,
      };

      console.log('📤 Registration data:', registrationData);

      await register(registrationData);
      console.log('✅ Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('❌ Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1>Create Account 🎉</h1>
          <p>
            {step === 1 ? 'Fill in your details to get started' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiMail /> Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiPhone /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiLock /> Password
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FiLock /> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <AnimatedButton
              type="submit"
              className="btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? '📧 Sending OTP...' : '📨 Send OTP'}
            </AnimatedButton>
          </form>
        ) : (
          <div className="otp-verification">
            <div className="otp-email-display">
              <FiCheckCircle size={24} color="#10b981" />
              <p>OTP sent to: <strong>{formData.email}</strong></p>
            </div>

            <OTPInput length={6} onComplete={handleOTPComplete} />

            <p className="otp-resend-text">
              Didn't receive OTP?{' '}
              <button
                className="otp-resend-button"
                onClick={handleResendOTP}
                disabled={loading}
              >
                Resend OTP
              </button>
            </p>

            {loading && <p className="otp-loading">⏳ Verifying OTP...</p>}

            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setStep(1);
                setOtpSent(false);
              }}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              ← Back to Form
            </button>
          </div>
        )}

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Login here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
