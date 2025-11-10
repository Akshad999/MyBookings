import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Thank you for your review!');
        setEmail('');
        setMessage('');
      } else {
        setStatus(data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus('Failed to send. Please try again.');
    }
    setTimeout(() => setStatus(''), 2500);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* ...existing sections... */}
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-newsletter-text">
              Subscribe to get updates about upcoming events & send us your feedback!
            </p>
            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="footer-newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your review or feedback"
                className="footer-newsletter-message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
              <button className="footer-newsletter-btn" type="submit">Send Your Review</button>
            </form>
            {status && <div className="footer-newsletter-status">{status}</div>}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MyBookings.in. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
