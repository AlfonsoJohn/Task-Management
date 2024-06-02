import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Verification() {
  const [username, setUsername] = useState("");
  const [confirmation_code, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !confirmation_code) {
      setError("Please enter Username & Verification code.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/confirm-signup", // Replace with your backend endpoint for verification
        { username, confirmation_code } // Data to be sent to the backend
      );

      // Handle success
      console.log(response.data); // Log the response data
      setMessage("Verification successful!");
      setError(""); // Clear any previous errors
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        setError(error.response.data.error || "An error occurred.");
      } else {
        setError("An error occurred.");
      }
      setMessage("");
    }
  };

  return (
    <>
      <div className="fade-in">
        <div
          style={{
            backgroundImage: "url('/images/chrysler.png')",
            backgroundSize: "cover",
            minHeight: "100vh", // Set minimum height to fill viewport
          }}
        >
          <header className="main-header">
            <div className="title-logo-container">
              <div className="title">
                <h1>Task App</h1>
              </div>
              <div className="logo">
                <Link to="/">
                  <img src="/images/tasklogo.png" alt="Task Logo" />
                </Link>
              </div>
              <Link to="/login" className="login">
                Login
              </Link>
            </div>
          </header>
          <div className="verification-container">
            <h2 className="user-verf-text">User Verification</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {message && <div style={{ color: "green" }}>{message}</div>}
            <form onSubmit={handleSubmit}>
              <input
                className="username-text"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="verification-code"
                type="text"
                placeholder="Verification Code"
                value={confirmation_code}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
              <button className="submit-button" type="submit">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verification;
