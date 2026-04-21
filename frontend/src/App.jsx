import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { userAPI } from "./services/api";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import "./App.css";

function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, setUser, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      userAPI
        .getMe()
        .then((res) => setUser(res.data))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
