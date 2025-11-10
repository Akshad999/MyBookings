import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import AnimatedCard from '../components/AnimatedCard';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import '../styles/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events');
      setEvents(data.events);
    } catch (error) {
      console.error('Fetch events error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Upcoming Events</h1>
          <p className="section-subtitle">Discover amazing events near you</p>
        </motion.div>

        <div className="events-grid">
          {events.length === 0 ? (
            <p>No events available at the moment.</p>
          ) : (
            events.map((event, index) => (
              <AnimatedCard key={event._id} delay={index * 0.1}>
                <div className="event-card">
                  <div className="event-image">
                    <img src={event.image || 'https://via.placeholder.com/400x250'} alt={event.title} />
                    <span className="event-badge">{event.category}</span>
                  </div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-meta">
                      <span><FiCalendar /> {new Date(event.date).toLocaleDateString()}</span>
                      <span><FiMapPin /> {event.venue.city}</span>
                    </div>
                    <Link to={`/events/${event._id}`} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
