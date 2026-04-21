import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/api";
// Backend root (useful for media URLs)
export const API_ROOT = API_BASE_URL.replace(/\/api\/?$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests and handle Content-Type for FormData
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Don't override Content-Type for FormData (let axios/browser handle it)
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// Better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register/", userData),
  login: (credentials) => api.post("/auth/login/", credentials),
};

// User API
export const userAPI = {
  getMe: () => api.get("/users/me/"),
  getUser: (id) => api.get(`/users/${id}/`),
  updateProfile: (data) => api.put("/users/update_profile/", data),
  listUsers: () => api.get("/users/"),
};

// Post API
export const postAPI = {
  getPosts: (page = 1) => api.get(`/posts/?page=${page}`),
  createPost: (data) => api.post("/posts/", data),
  getPost: (id) => api.get(`/posts/${id}/`),
  updatePost: (id, data) => api.put(`/posts/${id}/`, data),
  deletePost: (id) => api.delete(`/posts/${id}/`),
  like: (id) => api.post(`/posts/${id}/like/`),
  comment: (id, data) => api.post(`/posts/${id}/comment/`, data),
  getComments: (id) => api.get(`/posts/${id}/comments/`),
};

// Follow API
export const followAPI = {
  follow: (userId) => api.post("/follow/follow/", { user_id: userId }),
  getFollowers: (userId) => api.get(`/follow/followers/?user_id=${userId}`),
  getFollowing: (userId) => api.get(`/follow/following/?user_id=${userId}`),
};

export default api;
