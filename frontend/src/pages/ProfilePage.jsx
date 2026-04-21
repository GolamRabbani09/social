import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userAPI, followAPI } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import PostCard from "../components/PostCard";

import "./ProfilePage.css";

export default function ProfilePage() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userResponse = await userAPI.getUser(id);
      setUser(userResponse.data);

      // Check if current user is following this user (if it's a different user)
      if (currentUser && currentUser.id !== parseInt(id)) {
        try {
          await followAPI.follow(id);
        } catch (err) {
          // Error is ok, means not following
        }
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await followAPI.follow(id);
      setIsFollowing(!isFollowing);
      // Refetch to update follower count
      fetchUserData();
    } catch (err) {
      console.error("Failed to follow user:", err);
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (!user) return <p className="error">User not found</p>;

  return (
    <div className="profile-container">
      {/* Profile Header Card */}
      <div className="profile-header">
        {/* Banner */}
        <div className="profile-banner">
          <div className="profile-banner-content">
            {user.profile_picture ? (
              <img
                src={user.profile_picture}
                alt={user.username}
                className="profile-pic-large"
              />
            ) : (
              <div className="profile-pic-placeholder-large">
                {user.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="profile-info">
          {/* Name and Follow Button */}
          <div className="profile-name-section">
            <h1>{user.username}</h1>
            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={handleFollow}
                className={`follow-btn ${isFollowing ? "following" : ""}`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          {/* Bio */}
          <p className="bio">{user.bio || "No bio added yet"}</p>

          {/* Stats */}
          <div className="profile-stats">
            <div className="stat">
              <strong>{user.posts_count || 0}</strong>
              <span>Posts</span>
            </div>
            <div className="stat">
              <strong>{user.followers_count || 0}</strong>
              <span>Followers</span>
            </div>
            <div className="stat">
              <strong>{user.following_count || 0}</strong>
              <span>Following</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="profile-posts">
        <h2>Posts ({user.posts_count || 0})</h2>
        {user.posts && user.posts.length > 0 ? (
          <div className="posts-list">
            {user.posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={fetchUserData} />
            ))}
          </div>
        ) : (
          <p className="no-posts">No posts yet</p>
        )}
      </div>
    </div>
  );
}
