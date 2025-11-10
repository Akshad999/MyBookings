
import React, { useState, useEffect } from "react";

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    if (newOtp.join("").length === length) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          value={digit}
          maxLength="1"
          onChange={(e) => handleChange(e.target.value, i)}
          style={{
            width: "45px",
            height: "50px",
            textAlign: "center",
            fontSize: "1.5rem",
            borderRadius: "8px",
            border: "2px solid #93c5fd",
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
