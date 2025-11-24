import React, { useEffect, useState } from "react";
import { getAllAssets } from "../../../services/apiServices";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Cards } from "../../../components/Cards/Cards";
import { useLocation, useNavigate } from "react-router-dom";
import { useAssetContext } from "../../../contexts/AssetContext";
import "../../../index.css";

const ViewFinanceAssetsPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const initialStatus = location.state?.status || "TOTAL ASSETS";
  const [status, setStatus] = useState(initialStatus);

  const navigate = useNavigate();
  const { assets, setAssets, getAssetsByStatus } = useAssetContext();

  const itemsPerPage = 15;

  useEffect(() => {
    if (assets.length > 0) return;
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const res = await getAllAssets();
        if (!Array.isArray(res))
          return console.error("Unexpected response format:", res);
        setAssets(res);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const filteredAssets = getAssetsByStatus(status).filter(
    (asset) =>
      asset?.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset?.assetTag || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (asset?.user?.employeeId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredAssets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalItems);
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) =>
    page > 0 && page <= totalPages && setCurrentPage(page);

  return (
    <div className="p-6">
      {/* Search */}
      <div className="py-4 flex justify-end">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="w-full rounded-xl overflow-hidden">
          <thead className="bg-[#00B0F0] text-white">
            <tr>
              {[
                "Asset Tag",
                "Asset Name",
                "Location",
                "Department",
                "Purchase Price",
                "Current Value",
                "Approval Status",
                "Category",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  Loading assets...
                </td>
              </tr>
            ) : currentAssets.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  No assets found
                </td>
              </tr>
            ) : (
              currentAssets.map((asset) => (
                <tr
                  key={asset.assetId}
                  onClick={() =>
                    navigate(`/view-details/${asset.assetId}`, {
                      state: { asset, status },
                    })
                  }
                  className="hover:bg-gray-100 cursor-pointer transition"
                >
                  <td className="px-4 py-4 text-sm font-bold text-black">
                    {asset.assetTag}
                  </td>
                  <td className="px-4 py-4 text-sm text-900">
                    {asset.assetName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {asset.location?.locationName || "--"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {asset.department?.departmentName || "--"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {asset.purchasePrice || "--"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {asset.currentValue || "--"}
                  </td>
                  <td
                    className={`px-4 py-4 text-sm font-semibold ${
                      asset.approvalStatus === "PENDING"
                        ? "text-yellow-600"
                        : asset.approvalStatus === "APPROVED"
                        ? "text-green-600"
                        : asset.approvalStatus === "REJECTED"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {asset.approvalStatus.charAt(0) +
                      asset.approvalStatus.slice(1).toLowerCase()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {asset.category?.categoryName || "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-4 mt-4 flex items-center justify-between bg-white shadow rounded-xl">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems}{" "}
            assets
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFinanceAssetsPage;
