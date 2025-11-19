import React, { useState, useEffect, useContext, createContext } from "react";
import { getAllUsers } from "../services/apiServices";
import { AuthContext } from "./AuthContext";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllUsers();
      setUsers(Array.isArray(res) ? res : res?.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllUsers();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ users, loading, error, fetchAllUsers }}>
      {children}
    </UserContext.Provider>
  );
};
