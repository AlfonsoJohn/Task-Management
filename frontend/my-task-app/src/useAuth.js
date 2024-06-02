import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Amplify.Auth.currentAuthenticatedUser()
      .then((user) => {
        setIsAuthenticated(true);
        setUser(user);
      })
      .catch((err) => {
        console.error(err);
        setIsAuthenticated(false);
      });
  }, []);

  return { isAuthenticated, user };
};
