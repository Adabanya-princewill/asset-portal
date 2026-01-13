import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Clock, Loader2, ChevronDown, ChevronUp, Download } from "lucide-react";
import { useAssetContext } from "../../../contexts/AssetContext";
import { exportAssetToCSV } from "../../../utils/exportUtils";
import Barcode from "react-barcode";
import { getDepreciationRecords } from "../../../services/apiServices";
import DepreciationTable from "./DepreciationTable";

const ViewFinanceAssetDetailsPage = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getAssetById } = useAssetContext();

  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const [depRecords, setDepRecords] = useState([]);
  const [loadingDep, setLoadingDep] = useState(true);

  // Load asset details
  useEffect(() => {
    if (state?.asset) {
      setAsset(state.asset);
    } else {
      const found = getAssetById(assetId);
      setAsset(found || null);
    }
    setLoading(false);
  }, [state, assetId, getAssetById]);

  // Load depreciation history
  useEffect(() => {
    const loadDepreciation = async () => {
      const data = await getDepreciationRecords(assetId);
      console.log(data, "dep records");
      setDepRecords(data);
      setLoadingDep(false);
    };

    loadDepreciation();
  }, [assetId]);

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  // Asset not found screen
  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
        <h2 className="text-red-600 text-xl font-semibold">Asset not found</h2>
        <button
          onClick={() => navigate("/view-assets")}
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
        <h1 className="text-2xl font-bold text-gray-800">{asset.assetName}</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              exportAssetToCSV(
                asset,
                `${asset.assetTag || asset.assetId || "asset"}-${new Date()
                  .toISOString()
                  .slice(0, 10)}.csv`
              )
            }
            className="px-5 py-2 cursor-pointer bg-[#00B0F0] text-white rounded-xl flex items-center gap-2"
          >
            <Download size={20} className="inline-block mr-2 -mb-0.5" />
            Download
          </button>

          <button
            onClick={() =>
              navigate("/assetportal/view-assets", {
                state: { status: state?.status || "TOTAL ASSETS" },
              })
            }
            className="px-5 py-2 cursor-pointer bg-[#00B0F0] text-white rounded-xl shadow transition"
          >
            Back to Assets
          </button>
        </div>
      </div>

      {/* Collapsible Asset Details Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg mb-8">
        <button
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors rounded-lg"
        >
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">
              Asset Details
            </h2>
            <span className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded">
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
                <strong className="font-semibold text-gray-600">Status:</strong>
                <p className="mt-1 text-gray-800">{asset.assetStatus}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Category:
                </strong>
                <p className="mt-1 text-gray-800">
                  {asset.category?.categoryName}
                </p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Location:
                </strong>
                <p className="mt-1 text-gray-800">
                  {asset.location?.locationName}
                </p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Department:
                </strong>
                <p className="mt-1 text-gray-800">
                  {asset.department?.departmentName || "--"}
                </p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Purchase Price:
                </strong>
                <p className="mt-1 text-gray-800">₦{asset.purchasePrice}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Current Value:
                </strong>
                <p className="mt-1 text-gray-800">₦{asset.currentValue}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Condition:
                </strong>
                <p className="mt-1 text-gray-800">{asset.condition}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Acquisition Date:
                </strong>
                <p className="mt-1 text-gray-800">{asset.acquisitionDate}</p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Warranty Expiration:
                </strong>
                <p className="mt-1 text-gray-800">
                  {asset.warrantyExpirationDate}
                </p>
              </div>
              <div>
                <strong className="font-semibold text-gray-600">
                  Created By:
                </strong>
                <p className="mt-1 text-gray-800">
                  {asset.createdBy?.username || "--"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <strong className="font-semibold text-gray-600">
                  Description:
                </strong>
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

      {/* Depreciation History - Main Focus */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Depreciation History
          </h2>
        </div>

        <DepreciationTable loading={loadingDep} records={depRecords} />
      </div>
    </div>
  );
};

export default ViewFinanceAssetDetailsPage;
