import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAssetContext } from '../../../contexts/AssetContext';

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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-red-600 text-lg font-semibold">Asset not found</h2>
        <button
          onClick={() => navigate('/view')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow rounded-lg mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{asset.assetName}</h1>
        <button
          onClick={() => navigate('/view')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Assets
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p><strong>Asset Tag:</strong> {asset.assetTag}</p>
        <p><strong>Status:</strong> {asset.assetStatus}</p>
        <p><strong>Category:</strong> {asset.category?.categoryName}</p>
        <p><strong>Location:</strong> {asset.location?.locationName}</p>
        <p><strong>Department:</strong> {asset.department?.departmentName || '--'}</p>
        <p><strong>Purchase Price:</strong> ₦{asset.purchasePrice}</p>
        <p><strong>Condition:</strong> {asset.condition}</p>
        <p><strong>Acquisition Date:</strong> {asset.acquisitionDate}</p>
        <p><strong>Warranty Expiration:</strong> {asset.warrantyExpirationDate}</p>
        <p><strong>Created By:</strong> {asset.createdBy?.username || '--'}</p>
        <p className="col-span-2"><strong>Description:</strong> {asset.description}</p>
      </div>
    </div>
  );
};

export default ViewAssetDetailsPage;
