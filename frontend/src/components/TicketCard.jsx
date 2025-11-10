import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiUser, FiHash, FiDownload } from 'react-icons/fi';
import QRCode from 'qrcode.react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  const [showQR, setShowQR] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'used':
        return 'badge-info';
      case 'cancelled':
        return 'badge-error';
      case 'refunded':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById(`qr-${ticket._id}`);
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `ticket-${ticket.ticketNumber}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <motion.div
      className="ticket-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      {/* Ticket Header */}
      <div className="ticket-header">
        <div className="ticket-header-content">
          <h3 className="ticket-event-title">{ticket.event?.title || 'Event'}</h3>
          <span className={`badge ${getStatusColor(ticket.status)}`}>
            {ticket.status.toUpperCase()}
          </span>
        </div>
        <p className="ticket-type">{ticket.ticketType?.name || 'General'}</p>
      </div>

      {/* Ticket Body */}
      <div className="ticket-body">
        <div className="ticket-info-grid">
          <div className="ticket-info-item">
            <FiHash className="ticket-icon" />
            <div>
              <span className="ticket-label">Ticket Number</span>
              <span className="ticket-value">{ticket.ticketNumber}</span>
            </div>
          </div>

          <div className="ticket-info-item">
            <FiCalendar className="ticket-icon" />
            <div>
              <span className="ticket-label">Event Date</span>
              <span className="ticket-value">
                {new Date(ticket.event?.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="ticket-info-item">
            <FiClock className="ticket-icon" />
            <div>
              <span className="ticket-label">Time</span>
              <span className="ticket-value">{ticket.event?.startTime || 'TBA'}</span>
            </div>
          </div>

          <div className="ticket-info-item">
            <FiMapPin className="ticket-icon" />
            <div>
              <span className="ticket-label">Venue</span>
              <span className="ticket-value">
                {ticket.event?.venue?.name || 'To be announced'}
              </span>
            </div>
          </div>

          <div className="ticket-info-item">
            <FiUser className="ticket-icon" />
            <div>
              <span className="ticket-label">Quantity</span>
              <span className="ticket-value">{ticket.quantity} Ticket(s)</span>
            </div>
          </div>

          <div className="ticket-info-item">
            <div className="ticket-price-tag">₹{ticket.totalAmount}</div>
          </div>
        </div>

        {/* Purchase Date */}
        <div className="ticket-purchase-date">
          Purchased on: {new Date(ticket.purchaseDate).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Ticket Footer */}
      <div className="ticket-footer">
        <motion.button
          className="btn btn-primary btn-sm"
          onClick={() => setShowQR(!showQR)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </motion.button>

        {ticket.status === 'active' && (
          <motion.button
            className="btn btn-outline btn-sm"
            onClick={downloadQR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload /> Download
          </motion.button>
        )}
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="qr-code-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="qr-code-container">
              <QRCode
                id={`qr-${ticket._id}`}
                value={JSON.stringify({
                  ticketNumber: ticket.ticketNumber,
                  eventId: ticket.event?._id,
                  eventTitle: ticket.event?.title,
                  userId: ticket.user,
                  ticketType: ticket.ticketType?.name,
                  quantity: ticket.quantity,
                  status: ticket.status,
                })}
                size={200}
                level="H"
                includeMargin={true}
              />
              <p className="qr-instruction">
                Present this QR code at the venue for entry
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="ticket-perforations ticket-perforations-left"></div>
      <div className="ticket-perforations ticket-perforations-right"></div>
    </motion.div>
  );
};

export default TicketCard;
