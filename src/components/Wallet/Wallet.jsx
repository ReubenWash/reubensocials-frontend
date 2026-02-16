// src/components/Wallet/Wallet.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCreditCard, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  getWalletBalance,
  getWalletTransactions,
  getUserPurchases,
  createAddFundsIntent,
  confirmPayment,
} from "../../api/paymentsApi";
import "./Wallet.css";

// --- Initialize Stripe ---
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- Add Funds Form ---
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
      // Create Stripe payment intent
      const { client_secret, payment_intent_id } = await createAddFundsIntent(amount);

      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Confirm payment on backend and update balance
      await onSuccess(payment_intent_id);
      setProcessing(false);
    } catch (err) {
      setError(err?.error || err?.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <CardElement
        options={{
          style: {
            base: { fontSize: "16px", color: "#004d4d", "::placeholder": { color: "#99c2c2" } },
          },
        }}
      />
      {error && <div className="payment-error">{error}</div>}
      <div className="payment-form-actions">
        <button type="button" onClick={onCancel} disabled={processing} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" disabled={!stripe || processing} className="confirm-btn">
          {processing ? "Processing..." : `Add ₵${amount.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

// --- Main Wallet Component ---
const Wallet = () => {
  const [activeTab, setActiveTab] = useState("wallet");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    setLoading(true);
    try {
      const balanceData = await getWalletBalance();
      setBalance(parseFloat(balanceData?.balance) || 0);

      const transactionsData = await getWalletTransactions();
      setTransactions(Array.isArray(transactionsData?.results) ? transactionsData.results : []);

      const purchasesData = await getUserPurchases();
      setPurchases(Array.isArray(purchasesData?.results) ? purchasesData.results : []);
    } catch (err) {
      console.error("Error loading wallet data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = (amount) => {
    setSelectedAmount(amount);
    setShowModal(true);
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    setShowModal(false);
    setSelectedAmount(null);

    try {
      const response = await confirmPayment(paymentIntentId);
      if (response.success) {
        // Update balance immediately using backend response
        setBalance(response.new_balance);
        // Reload transactions
        const transactionsData = await getWalletTransactions();
        setTransactions(Array.isArray(transactionsData?.results) ? transactionsData.results : []);
        alert(response.message || "Funds added successfully! 🎉");
      } else {
        // fallback
        await loadWalletData();
      }
    } catch (err) {
      console.error("Error confirming payment:", err);
      await loadWalletData();
      alert("Funds added, but failed to update balance automatically.");
    }
  };

  // --- Render wallet content ---
  const renderWalletContent = () => {
    if (loading) return <p className="loading">Loading...</p>;

    return (
      <>
        <h3>Wallet Balance</h3>
        <p className="balance">₵{balance.toFixed(2)}</p>

        <div className="quick-add">
          {[10, 25, 50, 100].map((amt) => (
            <button key={amt} onClick={() => handleAddFunds(amt)} className="quick-btn">
              + ₵{amt}
            </button>
          ))}
        </div>

        <h4>Recent Transactions</h4>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="transactions">
            {transactions.slice(0, 5).map((tx) => (
              <li key={tx.id}>
                <span>{tx.description}</span>
                <span className={`amount ${tx.transaction_type}`}>
                  {tx.transaction_type === "credit" ? "+" : "-"}₵{tx.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  // --- Render payments content ---
  const renderPaymentsContent = () => {
    if (loading) return <p className="loading">Loading...</p>;

    return (
      <>
        <h3>Purchase History</h3>
        {purchases.length === 0 ? (
          <p>No purchases yet.</p>
        ) : (
          <ul className="purchases">
            {purchases.map((p) => (
              <li key={p.id}>
                <span>Post #{p.post_id}</span>
                <span>₵{p.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="wallet-page">
      <div className="tabs">
        <button className={activeTab === "wallet" ? "active" : ""} onClick={() => setActiveTab("wallet")}>
          <FontAwesomeIcon icon={faWallet} /> Wallet
        </button>
        <button className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>
          <FontAwesomeIcon icon={faCreditCard} /> Payments
        </button>
      </div>

      <div className="wallet-content">
        {activeTab === "wallet" ? renderWalletContent() : renderPaymentsContent()}
      </div>

      {/* Add Funds Modal */}
      {showModal && selectedAmount && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Add ₵{selectedAmount.toFixed(2)} to Wallet</h3>
            <Elements stripe={stripePromise}>
              <AddFundsForm
                amount={selectedAmount}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowModal(false)}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
