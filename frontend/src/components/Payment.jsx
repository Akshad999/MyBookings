import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = ({ eventId, ticketTypeIndex, quantity }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await api.post('/payment/create-checkout-session', { eventId, ticketTypeIndex, quantity }, { withCredentials: true });
      const data = await response.json();
      if (data.success) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        alert(data.message || "Payment initiation failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container" style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;