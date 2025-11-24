import React, { useState } from "react";
import {
  User,
  Users,
  Loader2,
  PackageSearch,
  ArrowDownToLine,
  Tag,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { retrieveAsset } from "../../../services/apiServices";

const RetrieveAssetPage = () => {
  const [retrievalType, setRetrievalType] = useState("all");
  const [formData, setFormData] = useState({
    employeeId: "",
    assetTag: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRetrievalTypeChange = (type) => {
    setRetrievalType(type);
    if (type === "all") {
      setFormData((prev) => ({ ...prev, assetTag: "" }));
    }
  };

  const isFormValid = () => {
    const hasEmployeeId = formData.employeeId.trim() !== "";
    const hasAssetTag = formData.assetTag.trim() !== "";

    return retrievalType === "all"
      ? hasEmployeeId
      : hasEmployeeId && hasAssetTag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await retrieveAsset(retrievalType, formData);
      toast.success(res || "Asset retrieved successfully");
      // Reset form after successful retrieval
      setFormData({ employeeId: "", assetTag: "" });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Failed to retrieve asset"
      );
      console.error("Asset retrieval error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <PackageSearch className="w-8 h-8 text-white" />
          </div> */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Retrieve Asset
          </h1>
          <p className="text-gray-600 text-lg">
            Reclaim assets from employees back to inventory
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-10">
            {/* Info Card */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Important Notes
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>
                        <strong>All User Assets:</strong> Retrieves every asset
                        currently assigned to the employee
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>
                        <strong>Specific Asset:</strong> Retrieves only the
                        asset matching the provided tag
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 text-blue-800 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span>
                        All retrievals are logged for audit trail purposes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Retrieval Type Selection */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-cyan-100">
                <ArrowDownToLine className="w-5 h-5 text-cyan-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Select Retrieval Type
                </h2>
                <span className="text-red-500 text-sm">*</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => handleRetrievalTypeChange("all")}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    retrievalType === "all"
                      ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-cyan-300 hover:shadow-md bg-white"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                      retrievalType === "all"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-600"
                    }`}
                  >
                    <Users className="h-6 w-6" />
                  </div>
                  <h3
                    className={`font-semibold text-lg mb-2 ${
                      retrievalType === "all"
                        ? "text-cyan-700"
                        : "text-gray-800"
                    }`}
                  >
                    All User Assets
                  </h3>
                  <p
                    className={`text-sm ${
                      retrievalType === "all"
                        ? "text-cyan-600"
                        : "text-gray-600"
                    }`}
                  >
                    Retrieve all assets assigned to a specific employee
                  </p>
                  {retrievalType === "all" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleRetrievalTypeChange("specific")}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    retrievalType === "specific"
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
                  }`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                      retrievalType === "specific"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                    }`}
                  >
                    <User className="h-6 w-6" />
                  </div>
                  <h3
                    className={`font-semibold text-lg mb-2 ${
                      retrievalType === "specific"
                        ? "text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    Specific Asset
                  </h3>
                  <p
                    className={`text-sm ${
                      retrievalType === "specific"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    Retrieve a specific asset by tag and employee ID
                  </p>
                  {retrievalType === "specific" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-indigo-100">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Retrieval Information
                  </h2>
                </div>

                <div
                  className={`grid grid-cols-1 gap-6 ${
                    retrievalType === "specific" ? "md:grid-cols-2" : ""
                  }`}
                >
                  <div>
                    <label
                      htmlFor="employeeId"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Employee ID <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      Enter the employee's ID
                    </p>
                  </div>

                  {retrievalType === "specific" && (
                    <div className="animate-fadeIn">
                      <label
                        htmlFor="assetTag"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Asset Tag <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="assetTag"
                          name="assetTag"
                          value={formData.assetTag}
                          onChange={handleInputChange}
                          placeholder="e.g., NOVA/HO/FF/TAB/0001"
                          className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        Enter the specific asset tag to retrieve
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ employeeId: "", assetTag: "" });
                    setRetrievalType("all");
                  }}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 cursor-pointer text-white py-4 px-6 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Retrieve{" "}
                      {retrievalType === "all" ? "All Assets" : "Asset"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrieveAssetPage;
