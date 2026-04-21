import React, { createContext, useState, useCallback } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPost = useCallback((newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((id, updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? updatedPost : post))
    );
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }, []);

  const setPostsData = useCallback((data) => {
    setPosts(data);
  }, []);

  const value = {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    setPostsData,
    setLoading,
    setError,
  };

  return (
    <PostContext.Provider value={value}>{children}</PostContext.Provider>
  );
};

export const usePost = () => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within PostProvider");
  }
  return context;
};
