import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, History } from "lucide-react";
import Barcode from "react-barcode";
import ITAssetHistoryPanel from "./ITAssetHistoryPanel";

const ITAssetDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
        <h2 className="text-red-600 text-xl font-semibold">Asset not found</h2>
        <button
          onClick={() => navigate("/assetportal/it-assets")}
          className="mt-4 px-6 py-2.5 bg-[#00B0F0] text-white rounded-xl shadow transition"
        >
          Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {asset.assetName}
        </h1>
        <button
          onClick={() => navigate("/assetportal/it-assets")}
          className="px-5 py-2 cursor-pointer bg-[#00B0F0] text-white rounded-xl shadow transition"
        >
          Back to Assets
        </button>
      </div>

      {/* Collapsible Asset Details Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg mb-8">
        <button
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors rounded-lg"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">Asset Details</h2>
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
              {asset.assetTag}
            </span>
          </div>
          {isDetailsExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {isDetailsExpanded && (
          <div className="px-4 pb-4">
            <div className="bg-white rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
              <div>
                <strong className="font-semibold text-gray-600">Asset Name:</strong>
                <p className="mt-1 text-gray-800">{asset.assetName}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Barcode:</strong>
                <p className="mt-1 text-gray-800">{asset.barcode}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Status:</strong>
                <p className="mt-1 text-gray-800">{asset.assetStatus}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Approval Status:</strong>
                <p className="mt-1 text-gray-800">{asset.approvalStatus}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Condition:</strong>
                <p className="mt-1 text-gray-800">{asset.condition}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Warranty Expiration:</strong>
                <p className="mt-1 text-gray-800">{asset.warrantyExpirationDate || "—"}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Category:</strong>
                <p className="mt-1 text-gray-800">{asset.category}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Department:</strong>
                <p className="mt-1 text-gray-800">{asset.department || "—"}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">Location:</strong>
                <p className="mt-1 text-gray-800">{asset.location || "—"}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">User:</strong>
                <p className="mt-1 text-gray-800">{asset.user || "—"}</p>
              </div>
              <div className="sm:col-span-2">
                <strong className="font-semibold text-gray-600">Description:</strong>
                <p className="mt-1 text-gray-800 leading-relaxed">
                  {asset.description}
                </p>
              </div>

              {/* Barcode */}
              <div className="sm:col-span-2 flex flex-col items-center py-3 bg-gray-50 rounded-lg border border-gray-200">
                <Barcode
                  value={asset.barcode}
                  format="CODE128"
                  width={1.2}
                  height={50}
                  displayValue={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Asset History - Main Focus */}
      <ITAssetHistoryPanel assetTag={asset.assetTag} />
    </div>
  );
};

export default ITAssetDetailsPage;