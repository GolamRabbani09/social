import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./LeftSidebar.css";

export default function LeftSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="left-sidebar">
      {/* Navigation Menu */}
      <div className="sidebar-menu">
        <h3 className="menu-title">Menu</h3>

        <Link to="/" className={`menu-item ${isActive("/") ? "active" : ""}`}>
          <span className="menu-icon">🏠</span>
          <span className="menu-label">Home</span>
        </Link>

        {user && (
          <Link
            to={`/profile/${user.id}`}
            className={`menu-item ${isActive(`/profile/${user.id}`) ? "active" : ""}`}
          >
            <span className="menu-icon">👤</span>
            <span className="menu-label">Profile</span>
          </Link>
        )}
      </div>

      {/* User Quick Access */}
      {user && (
        <div className="sidebar-card user-card">
          <div className="user-info">
            <h4>Profile</h4>
            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={user.username}
                className="user-avatar"
              />
            ) : (
              <div className="user-avatar placeholder">
                {user.username?.[0]?.toUpperCase()}
              </div>
            )}
            <p className="username">{user.username}</p>
            <p className="email">{user.email}</p>
          </div>
          <Link to={`/profile/${user.id}`} className="view-profile-btn">
            View Profile
          </Link>
        </div>
      )}

      {/* Quick Stats */}
      <div className="sidebar-card stats-card">
        <h4>Stats</h4>
        <div className="stat-item">
          <span className="stat-label">Posts</span>
          <span className="stat-value">{user?.posts_count || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Followers</span>
          <span className="stat-value">{user?.followers_count || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Following</span>
          <span className="stat-value">{user?.following_count || 0}</span>
        </div>
      </div>
    </div>
  );
}
