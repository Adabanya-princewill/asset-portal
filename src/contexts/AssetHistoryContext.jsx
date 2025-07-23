import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllAssetHistories } from '../services/apiServices';
import { AuthContext } from './AuthContext';

const AssetHistoryContext = createContext();

export const useAssetHistory = () => useContext(AssetHistoryContext);

export const AssetHistoryProvider = ({ children }) => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);

  const { token, user } = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const fetchHistories = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      if (user.role == "CORPORATE_SERVICE") {
        try {
          const res = await getAllAssetHistories();
          const sorted = res.sort((a, b) => new Date(b.actionDate) - new Date(a.actionDate));
          setHistories(sorted);
          setLastFetched(new Date());
        } catch (err) {
          console.error('Failed to fetch asset histories:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHistories();
  }, [token, user]);

  return (
    <AssetHistoryContext.Provider value={{ histories, loading, setHistories }}>
      {children}
    </AssetHistoryContext.Provider>
  );
};
