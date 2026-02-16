// src/pages/Payments/Payments.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import MobileNav from "../../components/MobileNav/MobileNav";
import "./Payments.css";
import {
  getUserPurchases,
  getWalletBalance,
  getWalletTransactions,
  createAddFundsIntent,
  confirmPayment,
} from "../../api/paymentsApi";
import { getCurrentUser } from "../../api/authApi";

// Stripe publishable key fallback
const STRIPE_KEY =
  (typeof process !== "undefined" && process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) || 
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY) || 
  "pk_test_YOUR_KEY_HERE";

const stripePromise = loadStripe(STRIPE_KEY);

// AddFundsForm component (unchanged except safety)
const AddFundsForm = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { client_secret, payment_intent_id } = await createAddFundsIntent(amount);

      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      await confirmPayment(payment_intent_id);
      onSuccess();
    } catch (err) {
      setError(err.error || err.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-element-container">
        <CardElement />
      </div>
      {error && <div className="payment-error">{error}</div>}
      <div className="payment-actions">
        <button type="button" className="cancel-btn" onClick={onCancel} disabled={processing}>Cancel</button>
        <button type="submit" className="primary-teal-btn" disabled={!stripe || processing}>
          {processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

// Payments main component (mostly unchanged)
const Payments = () => {
  const [purchases, setPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [activeTab, setActiveTab] = useState("purchases");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentUser();
    loadPaymentData();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPaymentData = async () => {
    setLoading(true);
    try {
      const balance = await getWalletBalance();
      setWalletBalance(balance.balance || 0);
      setPurchases(await getUserPurchases());
      setTransactions(await getWalletTransactions());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFundsClick = (amount) => {
    setSelectedAmount(amount);
    setShowModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowModal(false);
    setSelectedAmount(null);
    loadPaymentData();
    alert("Funds added successfully! 🎉");
  };

  const formatDate = (date) => new Date(date).toLocaleString();
  const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;

  return (
    <div className="main-layout">
      <Sidebar currentUser={currentUser} />
      <div className="main-content-area">
        <Topbar currentUser={currentUser} />
        <div className="payments-page">
          <div className="payments-container">
            <h2>💰 Wallet & Payments</h2>
            <div className="wallet-card">
              <h3>Your Wallet Balance</h3>
              {loading ? <p>Loading...</p> : <p>{formatCurrency(walletBalance)}</p>}
              <div className="quick-add-buttons">
                {[10, 25, 50, 100].map((amt) => (
                  <button key={amt} onClick={() => handleAddFundsClick(amt)}>+ ${amt}</button>
                ))}
              </div>
            </div>
            {/* Tabs */}
            <div className="payment-tabs">
              <button onClick={() => setActiveTab("purchases")} className={activeTab==="purchases"?"active":""}>Purchase History</button>
              <button onClick={() => setActiveTab("transactions")} className={activeTab==="transactions"?"active":""}>Wallet Transactions</button>
            </div>
            {/* Content */}
            {loading ? <p>Loading...</p> : (
              <>
                {activeTab === "purchases" && purchases.map(p => (
                  <div key={p.id}>{`Post #${p.post_id} - $${p.amount}`}</div>
                ))}
                {activeTab === "transactions" && transactions.map(t => (
                  <div key={t.id}>{`${t.transaction_type} $${t.amount}`}</div>
                ))}
              </>
            )}
            {showModal && selectedAmount && (
              <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="payment-modal" onClick={e => e.stopPropagation()}>
                  <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
                  <h3>Add Funds to Wallet</h3>
                  <p>Add ${selectedAmount.toFixed(2)}</p>
                  <Elements stripe={stripePromise}>
                    <AddFundsForm amount={selectedAmount} onSuccess={handlePaymentSuccess} onCancel={() => setShowModal(false)} />
                  </Elements>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Rightbar currentUser={currentUser} />
      <MobileNav />
    </div>
  );
};

export default Payments;
