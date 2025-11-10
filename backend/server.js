

// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv').config();
// console.log("EMAIL_USER is", process.env.EMAIL_USER);
// console.log("EMAIL_PASS is", process.env.EMAIL_PASS ? "loaded" : "empty"); // Don't print password value
// console.log("INDIANRAIL_KEY", process.env.INDIANRAIL_KEY);
// console.log("RAPIDAPI_KEY", process.env.RAPIDAPI_KEY);

// const connectDB = require('./config/db');
// const nodemailer=require('nodemailer')
// // Load environment variables
// //dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true,
// }));

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging middleware (optional but helpful)
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/events', require('./routes/events'));
// app.use('/api/tickets', require('./routes/tickets'));
// app.use('/api/payment', require('./routes/payment'));
// app.use("/api/otp", require("./routes/otp"));
// // Add after other routes
// app.use('/api/trains', require('./routes/trains'));
// app.use('/api/reviews', require('./routes/reviews'));

// // Health check route
// app.get('/', (req, res) => {
//   res.json({ 
//     message: 'Ticketing System API is running',
//     status: 'active',
//     timestamp: new Date().toISOString(),
//   });
// });

// // API info route
// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Welcome to Ticketing System API',
//     version: '1.0.0',
//     endpoints: {
//       auth: '/api/auth',
//       events: '/api/events',
//       tickets: '/api/tickets',
//       payment: '/api/payment',
//     },
//   });
// });

// // 404 handler - Route not found
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: `Route ${req.originalUrl} not found`,
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
  
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//   });
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
//   console.log('🚀 Server is running on port', PORT);
//   console.log('📍 API URL:', `http://localhost:${PORT}`);
//   console.log('🌐 Frontend URL:', process.env.FRONTEND_URL);
//   console.log('⏰ Started at:', new Date().toLocaleString());
//   console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('❌ Unhandled Promise Rejection:', err);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//   console.error('❌ Uncaught Exception:', err);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM received. Shutting down gracefully...');
//   server.close(() => {
//     console.log('✅ Process terminated');
//   });
// });
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// module.exports = app;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  📦 Imports and Configuration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const nodemailer = require("nodemailer");

// Debug environment variables
console.log("EMAIL_USER is", process.env.EMAIL_USER);
console.log("EMAIL_PASS is", process.env.EMAIL_PASS ? "loaded" : "empty"); 
console.log("INDIANRAIL_KEY", process.env.INDIANRAIL_KEY);
console.log("RAPIDAPI_KEY", process.env.RAPIDAPI_KEY);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ───────── API Routes ─────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/otp", require("./routes/otp"));
app.use("/api/trains", require("./routes/trains"));
app.use("/api/reviews", require("./routes/reviews"));

// Health check
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Ticketing System API",
    version: "1.0.0",
    status: "active",
    timestamp: new Date().toISOString(),
  });
});

// ───────── Serve React Frontend ─────────
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// Only serve React for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});
// ───────── Start Server ─────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log("🌐 Frontend URL:", process.env.FRONTEND_URL);
  console.log("⏰ Started at:", new Date().toLocaleString());
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});

// ───────── Error & Shutdown Handling ─────────
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Process terminated");
  });
});

module.exports = app;
