import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAssetContext } from '../../../contexts/AssetContext';
import AssetHistoryPreview from '../AssetHistoryPage/AssetHistoryPreview';

const ViewAssetDetailsPage = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getAssetById } = useAssetContext();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state?.asset) {
      setAsset(state.asset);
    } else {
      const found = getAssetById(assetId);
      setAsset(found || null);
    }
    setLoading(false);
  }, [state, assetId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-red-600 text-lg font-semibold">Asset not found</h2>
        <button
          onClick={() => navigate('/view', { state: { status: state?.status || 'TOTAL ASSETS' } })}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{asset.assetName}</h1>
        <button
          onClick={() => navigate('/view', { state: { status: state?.status || 'TOTAL ASSETS' } })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Assets
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mb-6">
        <div><strong>Asset Tag:</strong> {asset.assetTag}</div>
        <div><strong>Status:</strong> {asset.assetStatus}</div>
        <div><strong>Category:</strong> {asset.category?.categoryName}</div>
        <div><strong>Location:</strong> {asset.location?.locationName}</div>
        <div><strong>Department:</strong> {asset.department?.departmentName || '--'}</div>
        <div><strong>Purchase Price:</strong> ₦{asset.purchasePrice}</div>
        <div><strong>Current Value:</strong> ₦{asset.currentValue}</div>
        <div><strong>Condition:</strong> {asset.condition}</div>
        <div><strong>Acquisition Date:</strong> {asset.acquisitionDate}</div>
        <div><strong>Warranty Expiration:</strong> {asset.warrantyExpirationDate}</div>
        <div><strong>Created By:</strong> {asset.createdBy?.username || '--'}</div>
        <div className="sm:col-span-2">
          <strong>Description:</strong> {asset.description}
        </div>
      </div>

      <AssetHistoryPreview assetTag={asset.assetTag} />
    </div>
  );
};

export default ViewAssetDetailsPage;
