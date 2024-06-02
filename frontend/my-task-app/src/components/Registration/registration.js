import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputEmail.trim() === "" || emailRegex.test(inputEmail)) {
      setEmailError(""); // Valid email format or empty, clear the error
    } else {
      setEmailError("Please enter a valid email"); // Invalid email format, set error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !email) {
        setError("Please fill in all fields.");
        return;
    }

    try {
        const formData = { username, password, email };
        const response = await axios.post(
            "http://127.0.0.1:5000/register",
            formData
        );

        // Handle success
        console.log(response.data); // Log the response data
        setMessage("Registration successful!"); // Set success message
        setError(""); // Clear any previous errors
    } catch (error) {
        // Handle different error scenarios
        if (error.response) {
            setError(error.response.data.error || "An error occurred.");
        } else {
            setError("An error occurred.");
        }
        setMessage(""); // Clear any previous success messages
    }
  };

  return (
    <>
      <div className="fade-in">
        <div
          style={{
            backgroundImage: "url('/images/cloud.png')",
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

          <div className="main-container">
            <div className="registration-container">
              <h2 className="user-reg">User Registration</h2>
              {error && <div style={{ color: "red" }}>{error}</div>}
              {message && <div style={{ color: "green" }}>{message}</div>}
              <form className="form" onSubmit={handleSubmit}>
                <input
                  className="user-input"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-toggle">
                  <input
                    className="password-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div className="confirmPass-toggle">
                  <input
                    className="confirmPass-input"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    className="toggle-icon"
                    onClick={toggleConfirmPasswordVisibility}
                  />
                </div>
                <input
                  className="email-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && <div style={{ color: "red" }}>{emailError}</div>}
                {password !== confirmPassword && (
                  <div style={{ color: "red" }}>Passwords do not match</div>
                )}
                {/* Additional form elements */}
                <button className="register-button" type="submit">
                  Register
                </button>
                <p className="verify-email-text">Please verify your email:</p>
                <Link className="verify-email-link" to="/confirm-signup">
                  Verify Email
                </Link>
              </form>
            </div>
            <div className="instruction-section">
              <h2 className="how-to">How to Sign Up:</h2>
              <p className="guidelines">
                To create an account, follow these guidelines:
              </p>
              <ul>
                <li>Choose a username.</li>
                <br></br>
                <li>Set a strong password with the following criteria:</li>
                <br></br>
                <ul>
                  <li>At least 8 characters long.</li>
                  <li>Include at least 1 uppercase letter.</li>
                  <li>Include at least 1 lowercase letter.</li>
                  <li>Include at least 1 number.</li>
                  <li>Include at least 1 special character (!@#$%^&amp;*).</li>
                </ul>
                <br></br>
                <li>Provide a valid email address for verification.</li>
                <br></br>
                <div className="powered-reg-by-container">
                  <p>Registration is Powered By: </p>
                  <li className="aws-cognito">Amazon Cognito</li>

                  <div className="cognito-logo">
                    <img src="/images/aws-cognito.png" alt="AWS Logo" />
                  </div>
                </div>
                {/* Add more instructions as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
