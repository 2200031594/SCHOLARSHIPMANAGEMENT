import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage"; // Import HomePage
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Toggle between Admin and User
  const navigate = useNavigate();

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Determine API endpoint based on user type
    const endpoint = isAdmin
      ? "http://scholarshipmanagement/api/admin/login"
      : "http://scholarshipmanagement/api/users/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Save user type and ID in localStorage
        localStorage.setItem("userType", isAdmin ? "admin" : "user");
        localStorage.setItem("userId", data.id);

        // Navigate to respective dashboard
        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }

        alert(`${isAdmin ? "Admin" : "User"} login successful!`);
      } else {
        // Handle server-side error messages
        const errorMessage = await response.text();
        alert(errorMessage || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      {/* Render HomePage in the background */}
      <HomePage />

      <div className="login-container">
        <h2>{isAdmin ? "Admin Login" : "User Login"}</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
        </form>

        {/* Toggle Login Type */}
        <div className="toggle-login">
          <p>
            {isAdmin
              ? "Want to log in as a user?"
              : "Are you an admin?"}{" "}
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className="toggle-button"
            >
              {isAdmin ? "Switch to User Login" : "Switch to Admin Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
