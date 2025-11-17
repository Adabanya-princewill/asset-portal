import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAssetByCategoryName } from '../../../services/apiServices';
import { useLocation, useNavigate } from 'react-router-dom';


const ITAssetsPage = () => {
  const location = useLocation();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await getAssetByCategoryName("Laptop");
      const reversed = res.reverse() || [];
      setAssets(reversed);
      setCurrentPage(1);
    } catch (err) {
      toast.error(err.message || 'Failed to load assets');
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  const filteredAssets = assets?.filter(asset =>
    asset?.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset?.assetTag || '').toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Search Bar */}
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
          <table className="w-full text-sm">
            <thead className="bg-[#00B0F0] font-bold text-[#000000]">
              <tr>
                <th className="px-4 py-3 text-left">Asset ID</th>
                <th className="px-4 py-3 text-left">Asset Tag</th>
                <th className="px-4 py-3 text-left">Barcode</th>
                <th className="px-4 py-3 text-left">Asset Name</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Asset Status</th>
                <th className="px-4 py-3 text-left">Approval Status</th>
                <th className="px-4 py-3 text-left">Condition</th>
                <th className="px-4 py-3 text-left">Warranty Exp.</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">User</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="13" className="px-4 py-4 text-center text-gray-500">Loading assets...</td>
                </tr>
              ) : currentAssets.length === 0 ? (
                <tr>
                  <td colSpan="13" className="px-4 py-4 text-center text-gray-500">No assets found</td>
                </tr>
              ) : (
                currentAssets.map((asset) => (
                  <tr
                    key={asset.assetId}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/it-assets/${asset.assetId}`, { state: { asset } })}
                  >
                    <td className="px-4 py-2">{asset.assetId}</td>
                    <td className="px-4 py-2">{asset.assetTag}</td>
                    <td className="px-4 py-2">{asset.barcode}</td>
                    <td className="px-4 py-2">{asset.assetName}</td>
                    <td className="px-4 py-2">{asset.description}</td>
                    <td className="px-4 py-2">{asset.assetStatus}</td>

                    {/* Approval Status — Blinking if Pending */}
                    <td className={`px-4 py-2 font-semibold 
                      ${asset.approvalStatus === 'Approved'
                        ? 'text-green-600'
                        : 'text-green-600 blink'
                      }`}
                    >
                      {asset.approvalStatus}
                    </td>

                    <td className="px-4 py-2">{asset.condition}</td>
                    <td className="px-4 py-2">{asset.warrantyExpirationDate}</td>
                    <td className="px-4 py-2">{asset.category}</td>
                    <td className="px-4 py-2">{asset.location}</td>
                    <td className="px-4 py-2">{asset.department || '—'}</td>
                    <td className="px-4 py-2">{asset.user || '—'}</td>
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

export default ITAssetsPage;
