import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import logo from "../../assets/logo.png";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ---------------- VALIDATIONS ----------------
    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email and password are required!");
      return;
    }

    if (!profilePic) {
      setError("Profile picture is required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    try {
      setLoading(true);

      // ---------------- SEND MULTIPART DATA ----------------
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("password_confirm", formData.confirmPassword);
      form.append("first_name", formData.first_name);
      form.append("last_name", formData.last_name);
      form.append("profile_picture", profilePic);

      // FIX: registerUser expects FormData (multipart)
      const data = await registerUser(form);

      console.log("Signup success:", data);

      // If backend returns tokens, save them
      if (data.tokens) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSuccess("Account created successfully! Redirecting...");

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);
      setError(err.detail || "Signup failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="logo" style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={logo} alt="Rocials logo" style={{ width: "120px" }} />
        </div>

        <h2>Create Account</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>

          {/* Profile Picture Upload */}
          <div className="profile-pic-wrapper">
            <label className="profile-label">Profile Picture (Required)</label>

            <div className="profile-preview-box">
              {preview ? (
                <img src={preview} className="preview-img" alt="preview" />
              ) : (
                <div className="preview-placeholder">No Image Selected</div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePic}
              required
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* First + Last */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name (Optional)</label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Last Name (Optional)</label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
