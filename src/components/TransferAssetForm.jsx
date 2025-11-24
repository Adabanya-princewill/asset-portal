import { useState } from "react";
import { transferAsset } from "../services/apiServices";
import toast from "react-hot-toast";
import { useDropdownContext } from "../contexts/DropdownContext";
import {
  ArrowRightLeft,
  Package,
  User,
  Building2,
  MapPin,
  FileText,
  MessageSquare,
} from "lucide-react";

const TransferAssetForm = () => {
  const { departments, locations, loadingDepartments, loadingLocations } =
    useDropdownContext();

  const [formData, setFormData] = useState({
    assetTag: "",
    toEmployeeId: "",
    toDepartmentId: "",
    toLocationId: "",
    reason: "",
    notes: "",
  });

  const [transferType, setTransferType] = useState("");

  const handleTransferTypeChange = (e) => {
    const selected = e.target.value;
    setTransferType(selected);
    // Clear optional fields when changing types
    setFormData((prev) => ({
      ...prev,
      toEmployeeId: "",
      toDepartmentId: "",
      toLocationId: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    if (!payload.toEmployeeId) delete payload.toEmployeeId;
    if (!payload.toDepartmentId) delete payload.toDepartmentId;
    if (!payload.toLocationId) delete payload.toLocationId;

    try {
      const res = await transferAsset(payload);
      toast.success(res);
      setFormData({
        assetTag: "",
        toEmployeeId: "",
        toDepartmentId: "",
        toLocationId: "",
        reason: "",
        notes: "",
      });
      setTransferType("");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Transfer Failed:", error);
    }
  };

  const transferOptions = [
    {
      value: "employee",
      label: "To Another Employee",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "department",
      label: "To Another Department",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      value: "location",
      label: "To Another Location",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      value: "employee-department",
      label: "Employee & Department",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "department-location",
      label: "Department & Location",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      value: "employee-location",
      label: "Employee & Location",
      icon: <User className="w-4 h-4" />,
    },
    {
      value: "employee-department-location",
      label: "Employee, Department & Location",
      icon: <ArrowRightLeft className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <ArrowRightLeft className="w-8 h-8 text-white" />
          </div> */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Transfer Asset
          </h1>
          <p className="text-gray-600 text-lg">
            Reassign assets to different employees, departments, or locations
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-8">
            {/* Info Card */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Transfer Guidelines
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • Ensure the asset tag is correct before transferring
                    </li>
                    <li>• Provide clear reasons for audit trail purposes</li>
                    <li>
                      • All transfers are logged and can be tracked in the
                      system
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transfer Type Selection */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <ArrowRightLeft className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Transfer Type
                </h2>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <select
                value={transferType}
                onChange={handleTransferTypeChange}
                required
                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white font-medium"
              >
                <option value="">-- Select Transfer Type --</option>
                {transferOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {!transferType && (
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Choose how you want to transfer this asset
                </p>
              )}
            </div>

            {/* Asset Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Asset Information
                </h2>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset Tag <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="assetTag"
                  value={formData.assetTag}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., NOVA/HO/FF/TAB/0001"
                />
              </div>
            </div>

            {/* Transfer Destination Section */}
            {transferType && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <ArrowRightLeft className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Transfer Destination
                  </h2>
                </div>

                <div className="space-y-6">
                  {transferType.includes("employee") && (
                    <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-5 h-5 text-green-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Transfer to Employee{" "}
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        name="toEmployeeId"
                        value={formData.toEmployeeId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="e.g., NOVA005"
                      />
                    </div>
                  )}

                  {transferType.includes("department") && (
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-5 h-5 text-purple-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Transfer to Department{" "}
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <select
                        name="toDepartmentId"
                        value={formData.toDepartmentId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                        disabled={loadingDepartments}
                      >
                        <option value="">-- Select Department --</option>
                        {departments?.map((dept) => (
                          <option
                            key={dept?.departmentId}
                            value={dept?.departmentId}
                          >
                            {dept?.departmentName}
                          </option>
                        ))}
                      </select>
                      {loadingDepartments && (
                        <p className="mt-2 text-sm text-purple-600 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                          Loading departments...
                        </p>
                      )}
                    </div>
                  )}

                  {transferType.includes("location") && (
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        <label className="text-sm font-semibold text-gray-700">
                          Transfer to Location{" "}
                          <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <select
                        name="toLocationId"
                        value={formData.toLocationId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                        disabled={loadingLocations}
                      >
                        <option value="">-- Select Location --</option>
                        {locations?.map((loc) => (
                          <option key={loc.locationId} value={loc.locationId}>
                            {loc.locationName}
                          </option>
                        ))}
                      </select>
                      {loadingLocations && (
                        <p className="mt-2 text-sm text-orange-600 flex items-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></span>
                          Loading locations...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Transfer Details Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Transfer Details
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Transfer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Role change, relocation, equipment upgrade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Provide detailed information about this transfer..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    assetTag: "",
                    toEmployeeId: "",
                    toDepartmentId: "",
                    toLocationId: "",
                    reason: "",
                    notes: "",
                  });
                  setTransferType("");
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-lg cursor-pointer"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-600 cursor-pointer text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-5 h-5" />
                Transfer Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferAssetForm;
