import React, { createContext, useContext, useState, useMemo } from 'react';

const AssetContext = createContext();

export const useAssetContext = () => useContext(AssetContext);

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  const getAssetById = (id) =>
    assets.find((asset) => asset.assetId === parseInt(id));

  const totalAssets = assets.length;

  const pendingAssets = useMemo(
    () => assets.filter((a) => a.approvalStatus === 'PENDING'),
    [assets]
  );

  const approvedAssets = useMemo(
    () => assets.filter((a) => a.approvalStatus === 'APPROVED'),
    [assets]
  );

  const rejectedAssets = useMemo(
    () => assets.filter((a) => a.approvalStatus === 'REJECTED'),
    [assets]
  );

  const getAssetsByStatus = (status) => {
    if (status === 'TOTAL ASSETS') return assets;
    return assets.filter((a) => a.approvalStatus === status.split(' ')[0]);
  };

    const [cache, setCache] = useState({}); // { PENDING: [...], APPROVED: [...], ... }

  const updateCache = (status, data) => {
    setCache(prev => ({ ...prev, [status]: data }));
  };

  const clearCacheFor = (status) => {
    setCache(prev => ({ ...prev, [status]: null }));
  };


  return (
    <AssetContext.Provider
      value={{
        assets,
        setAssets,
        getAssetById,
        totalAssets,
        pendingAssets,
        approvedAssets,
        getAssetsByStatus,
        rejectedAssets,
         cache, updateCache, clearCacheFor
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};
