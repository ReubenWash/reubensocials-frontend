import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { loginUser } from "../../api/authApi";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      console.log("Login successful:", data);

      // Save JWT tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);

      if (err.detail) {
        setError(err.detail);
      } else if (err.non_field_errors) {
        setError(err.non_field_errors[0]);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="Rocials logo" className="logo-img" />
        </div>

        <p className="first-header">Share your world, earn your worth.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="remember-forget">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password
            </a>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="register-link">
            <p>
              Create new account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>

        <footer>
          <p>&copy; 2026 Rocials, All rights reserved.</p>
          <nav>
            <a href="#">Terms of Service</a> <a href="#">Privacy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}