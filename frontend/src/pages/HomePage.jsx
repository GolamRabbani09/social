import React, { useEffect, useState } from "react";
import { postAPI } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { usePost } from "../context/PostContext.jsx";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import LeftSidebar from "../components/LeftSidebar";

import "./HomePage.css";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const { posts, loading, setPostsData, setLoading, setError } = usePost();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postAPI.getPosts(page);
      setPostsData(response.data.results);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="home-container">
        <div className="welcome-message">
          <h1>👋 Welcome to SocialHub</h1>
          <p>Please login or register to see the feed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Left Sidebar */}
      <aside className="home-sidebar home-sidebar-left">
        <LeftSidebar />
      </aside>

      {/* Center Feed */}
      <main className="home-feed">
        <CreatePost />

        <div className="posts-container">
          {loading && <p className="loading">Loading posts...</p>}

          {posts.length === 0 && !loading && (
            <p className="no-posts">No posts yet. Be the first to post!</p>
          )}

          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={fetchPosts} />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="home-sidebar home-sidebar-right">
        <div className="sidebar-card">
          <h3>Trending Topics</h3>
          <div className="trending-item">#Technology</div>
          <div className="trending-item">#Photography</div>
          <div className="trending-item">#Travel</div>
        </div>
      </aside>
    </div>
  );
}
