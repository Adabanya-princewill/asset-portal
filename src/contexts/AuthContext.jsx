import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/apiServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const profile = await getUserProfile();
      setUser(profile);
    } catch (error) {
      setUser(null);
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if we have a stored user from localStorage
      const storedUser = localStorage.getItem("user");
      
      if (token) {
        // If we have a token, try to get fresh profile data
        await getProfile();
      } else if (storedUser) {
        // If no token but we have stored user data, set it and stop loading
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing stored user:", error);
          setUser(null);
        }
        setIsLoading(false);
      } else {
        // No token and no stored user
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};