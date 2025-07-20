import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllAssetHistories } from '../services/apiServices';

const AssetHistoryContext = createContext();

export const useAssetHistory = () => useContext(AssetHistoryContext);

export const AssetHistoryProvider = ({ children }) => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null); // optional caching logic

  useEffect(() => {
    const fetchHistories = async () => {
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
    };

    fetchHistories();
  }, []);

  return (
    <AssetHistoryContext.Provider value={{ histories, loading, setHistories }}>
      {children}
    </AssetHistoryContext.Provider>
  );
};
