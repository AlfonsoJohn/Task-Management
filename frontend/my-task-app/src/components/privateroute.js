import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { Amplify } from "aws-amplify";

const PrivateRoute = ({ path, element: Element, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Amplify.Auth.currentAuthenticatedUser();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return null; // Render nothing while checking authentication status
  }

  if (path === "/homepage" && !authenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} path={path} element={<Element />} />;
};

export default PrivateRoute;
