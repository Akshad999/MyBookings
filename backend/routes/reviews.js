const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).json({ success: false, message: "Email and message are required" });
    }
    const review = new Review({ email, message });
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to save review" });
  }
});

module.exports = router;
