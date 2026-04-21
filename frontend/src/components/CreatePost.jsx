import React, { useState } from "react";
import { postAPI } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { usePost } from "../context/PostContext.jsx";

import "./CreatePost.css";

export default function CreatePost() {
  const { user } = useAuth();
  const { addPost } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const response = await postAPI.createPost(formData);
      addPost(response.data);
      setTitle("");
      setContent("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Failed to create post";
      setError(errorMsg);
      console.error("Post creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-wrapper">
      <div className="create-post-container">
        {/* Header with Avatar */}
        <div className="create-post-header">
          {user && user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={user.username}
              className="profile-pic"
            />
          ) : (
            <div className="profile-pic placeholder">
              {user?.username?.[0]?.toUpperCase()}
            </div>
          )}
          <input
            type="text"
            className="post-input-header"
            placeholder={`What's on your mind, ${user?.username}?`}
            onFocus={(e) => {
              e.target.parentElement
                .querySelector(".create-post-form")
                .classList.add("active");
            }}
            disabled
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-divider"></div>

          {/* Title Input */}
          <input
            type="text"
            className="form-input title-input"
            placeholder="Post title (max 200 characters)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
          />

          {/* Content Textarea */}
          <textarea
            className="form-input content-input"
            placeholder="Share your thoughts, stories, photos, and videos..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          ></textarea>

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" className="preview-img" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={handleRemoveImage}
              >
                ✕
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="error-message">⚠️ {error}</p>}

          {/* Footer with Buttons */}
          <div className="form-footer">
            <div className="footer-actions">
              <label className="image-upload-btn">
                <span className="upload-icon">🖼️</span>
                <span>Photo/Video</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <button
              type="submit"
              className="post-btn"
              disabled={loading || (!title.trim() && !content.trim())}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
