import React, { useEffect, useState } from 'react';
import { getAllAssets } from '../../../services/apiServices';
import {  ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Cards } from '../../../components/Cards/Cards';


const ViewAssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [totalAssets, setTotalAssets] = useState(null);
  const [pendingAssets, setPendingAssets] = useState(null);
  const [approvedAssets, setApprovedAssets] = useState(null);
  const [rejectedAssets, setRejectedAssets] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('TOTAL ASSETS');

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const res = await getAllAssets();

        if (!Array.isArray(res)) {
          console.error('Unexpected response format:', res);
          return;
        }

        setAssets(res);
        console.log(res);
        setTotalAssets(res.length);
        setPendingAssets(res.filter((a) => a.approvalStatus === 'PENDING').length);
        setApprovedAssets(res.filter((a) => a.approvalStatus === 'APPROVED').length);
        setRejectedAssets(res.filter((a) => a.approvalStatus === 'REJECTED').length);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const filteredAssets = assets
    .filter((asset) => {
      if (status === 'TOTAL ASSETS') return true;
      return asset.approvalStatus === status.split(' ')[0]; // e.g. "APPROVED"
    })
    .filter(
      (asset) =>
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
    <>
      {/* Search */}
      <div className="py-4 flex justify-end">
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

      {/* Cards */}
      <div className="flex justify-between flex-wrap">
        <Cards
          title="TOTAL ASSETS"
          number={totalAssets ?? 0}
          onClick={() => {
            setStatus('TOTAL ASSETS');
            setCurrentPage(1);
          }}
          isActive={status === 'TOTAL ASSETS'}
        />
        <Cards
          title="PENDING ASSETS"
          number={pendingAssets ?? 0}
          onClick={() => {
            setStatus('PENDING ASSETS');
            setCurrentPage(1);
          }}
          isActive={status === 'PENDING ASSETS'}
        />
        <Cards
          title="APPROVED ASSETS"
          number={approvedAssets ?? 0}
          onClick={() => {
            setStatus('APPROVED ASSETS');
            setCurrentPage(1);
          }}
          isActive={status === 'APPROVED ASSETS'}
        />
        <Cards
          title="REJECTED ASSETS"
          number={rejectedAssets ?? 0}
          onClick={() => {
            setStatus('REJECTED ASSETS');
            setCurrentPage(1);
          }}
          isActive={status === 'REJECTED ASSETS'}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-8">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Tag</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  Loading assets...
                </td>
              </tr>
            ) : currentAssets.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No assets found
                </td>
              </tr>
            ) : (
              currentAssets.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.assetTag}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{asset.assetName}</td>
                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.location?.locationName || '--'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.department?.departmentName || '--'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.purchasePrice || '--'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.approvalStatus.charAt(0) + asset.approvalStatus.slice(1).toLowerCase()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.category.categoryName || "--"}
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
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
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
    </>
  );
};

export default ViewAssetsPage;
