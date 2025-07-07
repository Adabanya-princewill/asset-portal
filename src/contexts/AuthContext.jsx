import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, refreshToken as refreshTokenAPI } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      // Try to get user profile (this will use stored tokens)
      const response = await getUserProfile();
      setUser(response);
    } catch (err) {
      console.log("Initial fetch failed, trying refresh token...", err);
      try {
        // Try to refresh the token
        await refreshTokenAPI();
        // Retry getting user profile after refresh
        const refreshedUser = await getUserProfile();
        setUser(refreshedUser);
      } catch (refreshErr) {
        console.log("Refresh token failed, redirecting to login...", refreshErr);
        setUser(null);
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      logout, 
      isLoading, 
      setIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);