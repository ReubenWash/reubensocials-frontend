import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { loginUser } from "../api/authApi"; // your axios call function
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
      const res = await loginUser(formData);

      // Save tokens to localStorage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      // Redirect to home or dashboard
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err.response);
      if (err.response && err.response.data) {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>
            <img src={logo} alt="Rocials logo" className="logo-img" />
          </h1>
        </div>

        <p className="first-header">Share your world, earn your worth.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <a href=" " className="forgot-password">
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
          <p> &copy; 2025 Rocials, All rights reserved.</p>
          <nav>
            <a href="#"> Terms of Service</a> <a href="#"> Privacy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
