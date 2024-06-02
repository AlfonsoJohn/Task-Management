import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confetti from "react-confetti";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [confettiActive, setConfettiActive] = useState(false);

  const startConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, 9000); // Duration for confetti effect
  };

  return (
    <>
      <div className="fade-in">
        <div
          style={{
            backgroundImage: "url('/images/city3.jpg')",
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
            </div>
            <div className="aws-logo">
              <img src="/images/aws-logo.png" alt="AWS Logo" />
              <p>Powered by AWS</p>
            </div>
            <div className="signup-box">
              <Link
                to="/register"
                onMouseEnter={startConfetti} // Trigger confetti on mouse enter
                onMouseLeave={() => setConfettiActive(false)} // Stop confetti on mouse leave
              >
                Sign Up
              </Link>
              {confettiActive && <Confetti />} {/* Render confetti effect */}
            </div>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </header>
          <div className="landing-page-container">
            <div className="landing-page">
              <h1>Welcome to Task Management!</h1>
              <div className="free-box">
                <Link
                  to="/register"
                  onMouseEnter={startConfetti} // Trigger confetti on mouse enter
                  onMouseLeave={() => setConfettiActive(false)} // Stop confetti on mouse leave
                >
                  Start for free!
                </Link>
                {confettiActive && <Confetti />} {/* Render confetti effect */}
              </div>
            </div>
            <div className="additional-content-container">
              <div className="additional-content">
                <h2>Explore the Features:</h2>
                <p className="app-description">
                  Our Task Management app helps you organize, prioritize, and
                  manage your tasks effectively.
                </p>
                <ul className="task-direction">
                  <p>Create tasks with ease</p>
                  <p>Retrieve tasks created</p>
                  <p>Made an error? Update the task</p>
                  <p>Delete tasks you no longer need</p>
                </ul>
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer className="main-footer">
            <p>&copy; 2023 Task Management App</p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/AlfonsoJohn"
            >
              <FontAwesomeIcon
                className="github-logo"
                icon={faGithub}
                color="#4d4d4e"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/alfonso-reynoso/"
            >
              <FontAwesomeIcon
                className="linkedin-logo"
                icon={faLinkedin}
                color="#4d4d4e"
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://resume.alfonsojohn.com"
            >
              <FontAwesomeIcon
                className="portfolio-logo"
                icon={faSuitcase}
                color="#4d4d4e"
              />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Header;
