import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import HomePage from "./homepage";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

function Login() {
  const navigate = useNavigate(); // Access to the history object
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/sign-in", // Replace with your backend login endpoint
        { username, password }
      );

      console.log(response.data);
      setError("");

      // Redirect the user to the dashboard or desired page upon successful login
      navigate("/homepage"); // Replace "/dashboard" with your desired route
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="fade-in">
      <div
        style={{
          backgroundImage: "url('/images/nyc.png')",
          backgroundSize: "cover",
          minHeight: "100vh", // Set minimum height to fill viewport
        }}
      >
        <header className="main-header-login">
          <div className="title-login-container">
            <div className="title-login">
              <h1>Task App</h1>
            </div>
            <div className="logo">
              <Link to="/">
                <img src="/images/tasklogo.png" alt="Task Logo" />
              </Link>
            </div>
          </div>
        </header>
        <div className="login-container">
          <h2 className="login-handle">User Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="username-login"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group1">
              <input
                className="password-login"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group2">
              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
