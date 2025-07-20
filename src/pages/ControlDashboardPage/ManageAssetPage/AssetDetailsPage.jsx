import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { handleApproveAsset, handleRejectAsset } from '../../../utils/assetActions';

const AssetDetailsPage = () => {
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

  const status = location.state?.status || 'PENDING';

  const handleApprove = () =>
    handleApproveAsset({ assetId: asset.assetId, status, navigate });

  const handleReject = () =>
    handleRejectAsset({ assetId: asset.assetId, status, navigate });


  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <button
        onClick={() => navigate('/manage-assets', { state: { status } })}
        className="flex items-center gap-1 text-blue-600 hover:underline mb-4"
      >
        <ChevronLeft size={18} /> Back
      </button>
      <h2 className="text-2xl font-semibold mb-4">Asset Details</h2>

      <div className="space-y-4 text-gray-700">
        <div><strong>Asset Tag:</strong> {asset.assetTag}</div>
        <div><strong>Asset Name:</strong> {asset.assetName}</div>
        <div><strong>Department:</strong> {asset.department?.departmentName || '—'}</div>
        <div><strong>Created By:</strong> {asset.createdBy?.username || '—'}</div>
        <div><strong>Status:</strong> {asset.approvalStatus}</div>
        <div><strong>Created At:</strong> {new Date(asset.createdAt).toLocaleString()}</div>
      </div>

      {asset.approvalStatus === 'PENDING' && (
        <div className="mt-6 flex gap-4">
          <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Approve
          </button>
          <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Reject
          </button>
        </div>
      )}

      {asset.approvalStatus === 'REJECTED' && (
        <div className="mt-6">
          <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetDetailsPage;
