const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { protect } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route   POST /api/auth/send-otp
// @desc    Send OTP to real Gmail
// @access  Public
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email',
      });
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Sending OTP to:', email);

    // Generate OTP
    const otp = generateOTP();
    console.log('🔢 Generated OTP:', otp);

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save new OTP to database
    await OTP.create({ email, otp });

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
        <div style="background: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #333; text-align: center; margin-bottom: 20px;">🎫 TicketHub Email Verification</h2>
          <p style="color: #666; font-size: 16px;">Hello!</p>
          <p style="color: #666; font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; text-align: center; margin: 30px 0; border-radius: 12px;">
            <div style="background: white; padding: 15px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 42px; font-weight: bold; letter-spacing: 12px; color: #667eea;">${otp}</span>
            </div>
          </div>
          
          <p style="color: #999; font-size: 14px; text-align: center; margin: 20px 0;">⏰ This OTP is valid for 10 minutes</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 25px;">
            <p style="color: #666; font-size: 13px; margin: 5px 0;">
              <strong>Security Tips:</strong>
            </p>
            <ul style="color: #666; font-size: 13px; margin: 10px 0; padding-left: 20px;">
              <li>Never share this OTP with anyone</li>
              <li>TicketHub will never ask for your OTP via phone or email</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
            © 2025 TicketHub - Your Local Ticketing System
          </p>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"TicketHub 🎫" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your OTP Code - TicketHub Verification',
      html: emailHtml,
    });

    console.log('✅ OTP email sent successfully to:', email);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully! Check your email inbox.',
    });

  } catch (error) {
    console.error('❌ Send OTP Error:', error);
    
    // Better error messages
    let errorMessage = 'Error sending OTP. Please try again.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your email configuration.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Could not connect to email server. Please check your internet connection.';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   POST /api/auth/register
// @desc    Register user with OTP verification
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;

    console.log('📝 Registration attempt for:', email);

    // Validate all fields
    if (!name || !email || !phone || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email, otp });
    
    if (!otpRecord) {
      console.log('❌ Invalid OTP provided:', otp);
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new one.',
      });
    }

    console.log('✅ OTP verified successfully');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      isVerified: true,
    });

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Generate JWT token
    const token = generateToken(user._id);

    console.log('✅ User registered successfully:', email);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to TicketHub.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('❌ Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration. Please try again.',
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    console.log('✅ User logged in:', email);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookings');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
    });
  }
});

module.exports = router;
