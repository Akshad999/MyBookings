const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const otps = new Map();

// ✅ Send OTP
router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(email, otp);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Mybookings.in" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Ticket System OTP Code 🎟️",
      html: `
        <div style="font-family:sans-serif;text-align:center">
          <h2>Welcome to Local Ticket System 🎫</h2>
          <p>Your OTP code is:</p>
          <h1>${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>`,
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  const validOtp = otps.get(email);

  if (validOtp === otp) {
    otps.delete(email);
    return res.json({ success: true, message: "OTP verified successfully" });
  }

  res.status(400).json({ success: false, error: "Invalid or expired OTP" });
});

module.exports = router;
