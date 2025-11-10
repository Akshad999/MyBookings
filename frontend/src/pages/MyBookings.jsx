import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import '../styles/MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await api.get('/tickets/my');
      // Filter out cancelled bookings
      const activeBookings = data.bookings.filter(b => b.status !== 'cancelled');
      setBookings(activeBookings);
    } catch (err) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (ticketId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    try {
      const { data } = await api.patch(`/tickets/cancel/${ticketId}`);
      if (data.success) {
        toast.success(data.message);
        // Remove cancelled booking from list
        setBookings(bookings.filter(b => b._id !== ticketId));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  
  if (!bookings.length) return (
    <div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>
      <h1>My Bookings</h1>
      <p>No bookings yet.</p>
    </div>
  );

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1>My Bookings</h1>
      <div className="bookings-list">
        {bookings.map(b => (
          <div key={b._id} className="booking-card">
            <h3>{b.type === "train" ? "🚂 Train" : "🚌 Bus"} Booking</h3>
            <p><strong>Ticket No:</strong> {b.ticketNumber}</p>
            <p><strong>From:</strong> {b.from} <strong>To:</strong> {b.to}</p>
            <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
            <p><strong>Seats:</strong> {b.seats?.join(", ")}</p>
            <p><strong>Total:</strong> ₹{b.total}</p>
            <p><strong>Status:</strong> <span className={`status-badge ${b.status}`}>{b.status}</span></p>
            
            {b.status === 'booked' && (
              <button 
                className="btn-cancel" 
                onClick={() => handleCancel(b._id)}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
