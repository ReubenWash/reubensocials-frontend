import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home"; // new import
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
// Assuming the path is: /pages/UserProfilePage/UserProfilePage.jsx// new import
import MessagingSystem from "./pages/Messages/MessagingSystem"; // new import
import Settings from "./pages/Settings/Settings";
import Explore from "./pages/Explore/Explore";
import Payments from "./pages/Payments/Payments";
import Search from "./pages/Search/Search";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main layout route */}
        <Route path="/home" element={<Home />} />

        {/*  Dynamic Profile Route (Recommended) */}
    <Route path="/user/:username" element={<UserProfilePage />} />

       {/* Messaging Route */}
<Route path="/messages" element={<MessagingSystem />} /> {/* <-- Add this route */}
       
       {/* 🔑 NEW ROUTE: Settings */}
            <Route path="/settings" element={<Settings />} />

        {/* Explore Route */}
        <Route path="/explore" element={<Explore />} />

        {/* Payments Route */}
        <Route path="/payments" element={<Payments />} />

        {/* Search Route */}
        <Route path="/search" element={<Search />} />
      
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h2>
          }
        />

        
      </Routes>
    </Router>
  );
};

export default App;
