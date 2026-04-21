import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import "./Navbar.css";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📱</span>
          <span className="logo-text">SocialHub</span>
        </Link>

        {/* Center: Search Bar (when authenticated) */}
        {isAuthenticated && (
          <div className="navbar-search">
            <input
              type="text"
              placeholder="🔍 Search..."
              className="search-input"
            />
          </div>
        )}

        {/* Right: User Menu */}
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <button
                className="profile-btn"
                onClick={handleProfileClick}
                title="Go to profile"
              >
                {user?.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt={user.username}
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar placeholder">
                    {user?.username?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="username">{user?.username}</span>
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                Login
              </Link>
              <Link to="/register" className="auth-link register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
