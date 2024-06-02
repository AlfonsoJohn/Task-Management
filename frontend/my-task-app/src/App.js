import React from "react";
import ReactDOM from "react-dom";
// import { Amplify } from "aws-amplify";
// import { useAuth } from "./useAuth";
// import awsExports from "./aws-exports"; // Adjust the path if necessary

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
//import PrivateRoute from "./components/privateroute";
import Registration from "./components/Registration/registration";
import Verification from "./components/Verification/verification";
import Login from "./components/Login/login";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/homepage";
import "./components/HomePage/homepage.css";
import "./components/Registration/registration.css";
import "./components/LandingPage/LandingPage.css";
import "./components/Verification/verification.css";
import "./components/Login/login.css";
import "./components/TaskCreation/taskcreation.css";
//import { AuthProvider } from "./components/authcontext";

// Amplify.configure(awsExports);

function App() {
  // const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div>
        <NavLink exact element to="/"></NavLink>
      </div>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/register" exact element={<Registration />} />
        <Route path="/confirm-signup" exact element={<Verification />} />
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/homepage"
          exact
          element={<HomePage />}
          // element={isAuthenticated ? <HomePage /> : <Route to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
