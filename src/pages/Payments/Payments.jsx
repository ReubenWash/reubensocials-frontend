// src/pages/Payments/Payments.jsx
import React, { useState } from "react";
import "./Payments.css";

const Payments = () => {
  const [walletBalance, setWalletBalance] = useState(100); // Example starting balance
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="payments-page">
      <h2>Wallet & Payments</h2>
      <div className="wallet-card">
        <h3>Your Wallet Balance</h3>
        <p className="balance">₵{walletBalance.toFixed(2)}</p>
        <button
          className="primary-teal-btn"
          onClick={() => setShowModal(true)}
        >
          💳 Pay Now
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirm Payment</h3>
            <p>Proceed to make a secure payment.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="primary-teal-btn"
                onClick={() => {
                  setWalletBalance(walletBalance - 10); // Example deduction
                  setShowModal(false);
                }}
              >
                Pay ₵10.00
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
