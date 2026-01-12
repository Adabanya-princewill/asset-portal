import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAssetContext } from "../../../contexts/AssetContext";
import AssetHistoryPreview from "../AssetHistoryPage/AssetHistoryPreview";
import Barcode from "react-barcode";

const ViewAssetDetailsPage = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getAssetById } = useAssetContext();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  const scanInputRef = useRef(null);
  const [scanValue, setScanValue] = useState("");

  useEffect(() => {
    scanInputRef.current?.focus();
  }, []);

  const handleScanKeyDown = (e) => {
    if (e.key === "Enter" && scanValue.trim()) {
      navigate(`/assets/${scanValue.trim()}`);
      setScanValue("");
    }
  };

  useEffect(() => {
    if (state?.asset) {
      setAsset(state.asset);
    } else {
      const found = getAssetById(assetId);
      setAsset(found || null);
    }
    setLoading(false);
  }, [state, assetId, getAssetById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
        <h2 className="text-red-600 text-xl font-semibold">Asset not found</h2>
        <button
          onClick={() =>
            navigate("/view", {
              state: { status: state?.status || "TOTAL ASSETS" },
            })
          }
          className="mt-4 px-6 py-2.5 bg-[#00B0F0] text-white rounded-xl shadow transition"
        >
          Back to Assets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      {/* Hidden scanner input */}
      <input
        ref={scanInputRef}
        type="text"
        value={scanValue}
        onChange={(e) => setScanValue(e.target.value)}
        onKeyDown={handleScanKeyDown}
        className="absolute opacity-0 pointer-events-none"
        autoFocus
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          {asset.assetName}
        </h1>
        <button
          onClick={() =>
            navigate("/assetportal/view", {
              state: { status: state?.status || "TOTAL ASSETS" },
            })
          }
          className="px-5 py-2 cursor-pointer bg-[#00B0F0] text-white rounded-xl shadow transition"
        >
          Back to Assets
        </button>
      </div>

      {/* Details Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800 mb-10 border border-gray-100">
        <div>
          <strong className="font-semibold text-gray-700">Asset Tag:</strong>
          <p className="mt-1 text-black">{asset.assetTag}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Status:</strong>
          <p className="mt-1 text-gray-900">{asset.assetStatus}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Category:</strong>
          <p className="mt-1 text-gray-900">{asset.category?.categoryName}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Location:</strong>
          <p className="mt-1 text-gray-900">{asset.location?.locationName}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Department:</strong>
          <p className="mt-1 text-gray-900">
            {asset.department?.departmentName || "--"}
          </p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">
            Purchase Price:
          </strong>
          <p className="mt-1 text-gray-900">₦{asset.purchasePrice}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">
            Current Value:
          </strong>
          <p className="mt-1 text-gray-900">₦{asset.currentValue}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Condition:</strong>
          <p className="mt-1 text-gray-900">{asset.condition}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">
            Acquisition Date:
          </strong>
          <p className="mt-1 text-gray-900">{asset.acquisitionDate}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">
            Warranty Expiration:
          </strong>
          <p className="mt-1 text-gray-900">{asset.warrantyExpirationDate}</p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Created By:</strong>
          <p className="mt-1 text-gray-900">
            {asset.createdBy?.username || "--"}
          </p>
        </div>

        <div>
          <strong className="font-semibold text-gray-700">Description:</strong>
          <p className="mt-1 text-gray-900 leading-relaxed">
            {asset.description}
          </p>
        </div>

        {/* Barcode */}
        <div className="sm:col-span-2 flex flex-col items-center py-4 bg-gray-50 rounded-xl border border-gray-200">
          <Barcode
            value={asset.barcode}
            format="CODE128"
            width={1.4}
            height={70}
            displayValue
          />
        </div>
      </div>

      {/* Asset History */}
      <AssetHistoryPreview assetTag={asset.assetTag} />
    </div>
  );
};

export default ViewAssetDetailsPage;
