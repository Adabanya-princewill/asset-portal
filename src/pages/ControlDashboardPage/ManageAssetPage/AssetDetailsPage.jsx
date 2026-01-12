import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { handleApproveAsset, handleRejectAsset } from '../../../utils/assetActions';

const AssetDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;

  if (!asset) {
    return (
      <div className="p-6 max-w-3xl mx-auto mt-20 text-center text-gray-500">
        No asset data found.
      </div>
    );
  }

  const status = location.state?.status || 'PENDING';

  const handleApprove = () =>
    handleApproveAsset({ assetId: asset.assetId, status, navigate });

  const handleReject = () =>
    handleRejectAsset({ assetId: asset.assetId, status, navigate });

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8">
      <button
        onClick={() => navigate('assetportal/manage-assets', { state: { status } })}
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ChevronLeft size={20} /> Back to Assets
      </button>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold mb-2">{asset.assetName}</h2>
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(asset.approvalStatus)}`}>
          {asset.approvalStatus}
        </span>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium text-gray-600">Asset Tag</p>
            <p className="text-gray-800">{asset.assetTag}</p>
          </div>
           <div>
            <p className="font-medium text-gray-600">Category</p>
            <p className="text-gray-800">{asset.category?.categoryName || '—'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Department</p>
            <p className="text-gray-800">{asset.department?.departmentName || '—'}</p>
          </div>
           <div>
            <p className="font-medium text-gray-600">Location</p>
            <p className="text-gray-800">{asset.location?.locationName || '—'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Created By</p>
            <p className="text-gray-800">{asset.createdBy?.username || '—'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Created At</p>
            <p className="text-gray-800">{new Date(asset.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {asset.approvalStatus === 'PENDING' && (
            <>
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Reject
              </button>
            </>
          )}

          {asset.approvalStatus === 'REJECTED' && (
            <button
              onClick={handleApprove}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
