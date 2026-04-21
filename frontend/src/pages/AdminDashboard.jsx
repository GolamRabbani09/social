import React, { useEffect, useState } from "react";
import { userAPI, postAPI } from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    recentPosts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch all users
      const usersResponse = await userAPI.listUsers();
      const users = usersResponse.data.results || usersResponse.data;

      // Fetch all posts
      const postsResponse = await postAPI.getPosts();
      const posts = postsResponse.data.results || postsResponse.data;

      setStats({
        totalUsers: users.length || 0,
        totalPosts: posts.length || 0,
        recentPosts: posts.slice(0, 10), // Get latest 10 posts
      });
    } catch (err) {
      setError("Failed to fetch dashboard stats");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container loading-msg">Loading dashboard...</div>
    );
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">📊 Admin Dashboard</h1>

      {error && <div className="error-banner">{error}</div>}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card users-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card posts-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Posts</h3>
            <p className="stat-number">{stats.totalPosts}</p>
          </div>
        </div>

        <div className="stat-card activity-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>Recent Activity</h3>
            <p className="stat-number">{stats.recentPosts.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="recent-section">
        <h2>📌 Recent Posts</h2>
        {stats.recentPosts.length > 0 ? (
          <div className="posts-table">
            <div className="table-header">
              <div className="col author">Author</div>
              <div className="col title">Post Title</div>
              <div className="col date">Posted</div>
              <div className="col likes">Likes</div>
              <div className="col comments">Comments</div>
            </div>

            {stats.recentPosts.map((post) => (
              <div key={post.id} className="table-row">
                <div className="col author">
                  <div className="author-info">
                    <div className="author-avatar">
                      {post.author.profile_picture ? (
                        <img
                          src={post.author.profile_picture}
                          alt={post.author.username}
                        />
                      ) : (
                        <span>{post.author.username[0].toUpperCase()}</span>
                      )}
                    </div>
                    <span>{post.author.username}</span>
                  </div>
                </div>

                <div className="col title">
                  <span className="post-title">{post.title}</span>
                </div>

                <div className="col date">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>

                <div className="col likes">
                  <span className="badge likes-badge">
                    {post.likes_count} ❤️
                  </span>
                </div>

                <div className="col comments">
                  <span className="badge comments-badge">
                    {post.comments_count} 💬
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No posts yet</p>
        )}
      </div>

      {/* Refresh Button */}
      <button onClick={fetchStats} className="refresh-btn">
        🔄 Refresh Stats
      </button>
    </div>
  );
}
