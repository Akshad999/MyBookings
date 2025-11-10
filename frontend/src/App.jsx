import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import BookingHome from './pages/BookingHome';
import TrainBooking from './pages/TrainBooking';
import BusBooking from './pages/BusBooking';
import MyBookings from './pages/MyBookings';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css';
import About from './pages/About';

import TrainBookingConfirm from "./pages/TrainBookingConfirm";
import TrainPayment from "./pages/TrainPayment";
import BusPayment from './pages/BusPayment';
import BusBookingConfirm from './pages/BusBookingConfirm';
function App() {
  return (
    
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              {/* New Booking Routes */}
              <Route path="/booking" element={<BookingHome />} />
              <Route path="/booking/train" element={<TrainBooking />} />
              <Route path="/booking/bus" element={<BusBooking />} />
               <Route path="/booking/train" element={<TrainBooking />} />
      <Route path="/booking/train/confirm" element={<TrainBookingConfirm />} />
      <Route path="/booking/train/payment" element={<TrainPayment />} />
      <Route path="/booking/bus/payment" element={<BusPayment />} />
<Route path="/booking/bus/confirm" element={<BusBookingConfirm />} />
              {/* Protected Routes */}
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
