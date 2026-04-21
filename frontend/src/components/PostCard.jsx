import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postAPI, API_BASE_URL, API_ROOT } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";

import "./PostCard.css";

export default function PostCard({ post, onUpdate }) {
  const { user: currentUser } = useAuth();
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [commentCount, setCommentCount] = useState(post.comments_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      await postAPI.like(post.id);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (err) {
      console.error("Failed to like post");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postAPI.comment(post.id, {
        content: commentText,
      });
      setComments([response.data, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // build absolute media URL if backend returned relative path
  const mediaUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    // API_ROOT falls back to http://localhost:8000
    return `${API_ROOT}${url}`;
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="header-left">
          <Link to={`/profile/${post.author.id}`} className="author-link">
            {post.author.profile_picture ? (
              <img
                src={mediaUrl(post.author.profile_picture)}
                alt={post.author.username}
                className="author-avatar"
              />
            ) : (
              <div className="author-avatar placeholder">
                {post.author.username?.[0]?.toUpperCase()}
              </div>
            )}
          </Link>

          <div>
            <Link to={`/profile/${post.author.id}`} className="author-link">
              <p className="author-name">{post.author.username}</p>
            </Link>
            <p className="post-date">{formatDate(post.created_at)}</p>
          </div>
        </div>
        <button className="more-btn" title="More options">
          ⋯
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="post-image-wrapper">
          <img src={mediaUrl(post.image)} alt="Post" className="post-image" />
        </div>
      )}

      {/* Post Stats */}
      <div className="post-stats">
        <span className="stat-item">
          <span className="stat-icon">👍</span>
          <span>
            {likesCount} {likesCount === 1 ? "like" : "likes"}
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-icon">💬</span>
          <span>
            {post.comments_count}{" "}
            {post.comments_count === 1 ? "comment" : "comments"}
          </span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="post-actions">
        <button
          className={`action-btn ${liked ? "liked" : ""}`}
          onClick={handleLike}
          title={liked ? "Unlike" : "Like"}
        >
          <span className="action-icon">{liked ? "👍" : "🤍"}</span>
          <span className="action-label">Like</span>
        </button>
        <button
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
          title="Comment"
        >
          <span className="action-icon">💬</span>
          <span className="action-label">Comment</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            {currentUser && currentUser.profile_picture ? (
              <img
                src={currentUser.profile_picture}
                alt={currentUser.username}
                className="comment-avatar"
              />
            ) : (
              <div className="comment-avatar placeholder">
                {currentUser?.username?.[0]?.toUpperCase()}
              </div>
            )}
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="comment-submit"
              disabled={loading || !commentText.trim()}
            >
              {loading ? "..." : "Post"}
            </button>
          </form>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  {comment.user.profile_picture ? (
                    <img
                      src={mediaUrl(comment.user.profile_picture)}
                      alt={comment.user.username}
                      className="comment-user-avatar"
                    />
                  ) : (
                    <div className="comment-user-avatar placeholder">
                      {comment.user.username?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="comment-content">
                    <Link to={`/profile/${comment.user.id}`}>
                      <p className="comment-author">{comment.user.username}</p>
                    </Link>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
