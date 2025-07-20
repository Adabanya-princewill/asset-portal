import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAssetByStatus } from '../../../services/apiServices';
import { useAssetContext } from '../../../contexts/AssetContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleApproveAsset, handleRejectAsset } from '../../../utils/assetActions';
const statusTabs = ['PENDING', 'APPROVED', 'REJECTED'];

const ManageAssetsPage = () => {
  const location = useLocation();
  const initialStatus = location.state?.status || 'PENDING';
  const [status, setStatus] = useState(initialStatus);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const { cache, updateCache, clearCacheFor } = useAssetContext();

  useEffect(() => {
    if (!cache[status]) {
      fetchAssets(status);
    } else {
      setAssets(cache[status]);
      setCurrentPage(1);
    }
  }, [status]);

  const fetchAssets = async (statusToFetch) => {
    setLoading(true);
    try {
      const res = await getAssetByStatus(statusToFetch);
      const reversed = res.reverse() || [];
      updateCache(statusToFetch, reversed);
      setAssets(reversed);
      setCurrentPage(1);
    } catch (err) {
      toast.error(err.message || 'Failed to load assets');
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id) =>
    handleApproveAsset({
      assetId: id,
      status,
      clearCacheFor,
      fetchAssets,
    });

  const handleReject = (id) =>
    handleRejectAsset({
      assetId: id,
      status,
      clearCacheFor,
      fetchAssets,
    });

  // Pagination + Search (same as before)
  const filteredAssets = assets.filter(asset =>
    asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset.assetTag || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredAssets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalItems);
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg">

        {/* Status Tabs */}
        <div className="flex gap-4 p-4 border-b border-gray-200">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatus(tab);
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-lg font-medium ${status === tab
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="py-4 border-b border-gray-200 flex justify-end">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Tag
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    Loading assets...
                  </td>
                </tr>
              ) : currentAssets.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                    No assets found
                  </td>
                </tr>
              ) : (
                currentAssets.map((asset) => (
                  <tr onClick={() => navigate(`/manage-assets/${asset.assetId}`, { state: { asset, status } })} key={asset.assetId} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.assetTag}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {asset.assetName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.department?.departmentName || '—'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.createdBy?.username || '—'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.approvalStatus.charAt(0) + asset.approvalStatus.slice(1).toLowerCase()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(asset.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {status === 'PENDING' && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleApprove(asset.assetId) }}
                              className="text-green-600 hover:text-green-900 p-1"
                              title="Approve"
                            >
                              <CheckCircle size={20} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReject(asset.assetId) }}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Reject"
                            >
                              <XCircle size={20} />
                            </button>
                          </>
                        )}
                        {status === 'REJECTED' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleApprove(asset.assetId) }}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                        )}
                        {status === 'APPROVED' && <span className="text-gray-400">—</span>}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} assets
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAssetsPage;
