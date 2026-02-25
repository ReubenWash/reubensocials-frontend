import "./landing.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// Lucide icons
import { Lock, DollarSign, Smartphone, Globe, Star, Zap } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Lock size={32} color="#008080" />,
      title: "Secure Payments",
      description: "End-to-end encrypted transactions with multiple payment options",
    },
    {
      icon: <DollarSign size={32} color="#008080" />,
      title: "Direct Earnings",
      description: "Get paid directly with competitive revenue share and instant withdrawals",
    },
    {
      icon: <Smartphone size={32} color="#008080" />,
      title: "Clean Experience",
      description: "Intuitive interface for both creators and fans on all devices",
    },
    {
      icon: <Globe size={32} color="#008080" />,
      title: "Built for Africa",
      description: "Optimized for local creators with regional payment support",
    },
    {
      icon: <Star size={32} color="#008080" />,
      title: "Exclusive Content",
      description: "Control who sees your premium content with flexible access options",
    },
    {
      icon: <Zap size={32} color="#008080" />,
      title: "Fast Growth",
      description: "Built-in tools to help you promote and monetize your audience",
    },
  ];

  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Rocials logo" className="logo-img" />
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/login")} className="link-btn">Login</button>
          <button onClick={() => navigate("/signup")} className="primary-btn">Sign Up</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>
          Monetize Your Exclusive Content with <span>ROCIALS</span>
        </h1>
        <p>
          A secure platform where creators earn directly from their premium content
          and fans access exclusive material.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/signup")} className="primary-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why Choose ROCIALS?</h2>
        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Start?</h2>
        <p>Join ROCIALS today and turn your content into income.</p>
        <button onClick={() => navigate("/signup")} className="primary-btn">
          Join ROCIALS Today
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 ROCIALS. Built for African creators.</p>
      </footer>
    </div>
  );
};

export default LandingPage;