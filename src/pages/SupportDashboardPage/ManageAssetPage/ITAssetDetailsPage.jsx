import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ITAssetDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;

  if (!asset) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center text-gray-600">No asset data found.</div>
      </div>
    );
  }



  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <button
        onClick={() => navigate('/it-assets')}
        className="flex items-center gap-1 text-blue-600 hover:underline mb-4"
      >
        <ChevronLeft size={18} /> Back
      </button>
      <h2 className="text-2xl font-semibold mb-4">Asset Details</h2>

      <div className="space-y-4 text-gray-700">
        <div><strong>Asset Tag:</strong> {asset.assetTag}</div>
        <div><strong>Asset Name:</strong> {asset.assetName}</div>
        <div><strong>Barcode:</strong> {asset.barcode}</div>
        <div><strong>Description:</strong> {asset.description}</div>
        <div><strong>Status:</strong> {asset.assetStatus}</div>
        <div><strong>Approval Status:</strong> {asset.approvalStatus}</div>
        <div><strong>Condition:</strong> {asset.condition}</div>
        <div><strong>Warranty Expiration Date:</strong> {asset.warrantyExpirationDate || '—'}</div>
        <div><strong>Category:</strong> {asset.category}</div>
        <div><strong>Department:</strong> {asset.department || '—'}</div>
        <div><strong>Location:</strong> {asset.location || '—'}</div>
        <div><strong>User:</strong> {asset.user || '—'}</div>
      </div>  
    </div>
  );
};

export default ITAssetDetailsPage;
