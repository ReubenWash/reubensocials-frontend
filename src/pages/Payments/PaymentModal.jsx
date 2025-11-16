// src/pages/Payments/PaymentModal.jsx

import React, { useState } from "react";
import "./Payments.css";

const PaymentModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (amount > 0) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <div className="payment-modal-backdrop" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{success ? "✅ Payment Successful" : "Pay for Exclusive Content"}</h3>

        {!success && (
          <>
            <p>Enter amount to pay (USD):</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 10.00"
            />
            <button className="confirm-btn" onClick={handlePayment}>
              Pay Now
            </button>
          </>
        )}

        {success && <p className="success-text">Thank you! Access granted 🎉</p>}

        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default PaymentModal;
