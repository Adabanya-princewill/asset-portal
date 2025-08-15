import { useState } from "react";
import { transferAsset } from "../services/apiServices";
import toast from "react-hot-toast";
import { useDropdownContext } from "../contexts/DropdownContext";

const TransferAssetForm = () => {
  const { departments, locations, loadingDepartments, loadingLocations } = useDropdownContext();

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
      })
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error("Transfer Failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-6 bg-white shadow rounded space-y-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-2">Transfer Asset</h2>

        {/* Transfer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transfer Type
          </label>
          <select
            value={transferType}
            onChange={handleTransferTypeChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">-- select --</option>
            <option value="employee">To Another Employee</option>
            <option value="department">To Another Department</option>
            <option value="location">To Another Location</option>
            <option value="employee-department">Employee & Department</option>
            <option value="department-location">Department & Location</option>
            <option value="employee-location">Employee & Location</option>
            <option value="employee-department-location">Employee, Department & Location</option>
          </select>
        </div>

        {/* Asset Tag */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Tag *
          </label>
          <input
            type="text"
            name="assetTag"
            value={formData.assetTag}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., AST-001"
          />
        </div>

        {transferType.includes("employee") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transfer to Employee
            </label>
            <input
              type="text"
              name="toEmployeeId"
              value={formData.toEmployeeId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., NOVA005"
            />
          </div>
        )}

        {transferType.includes("department") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transfer to Department
            </label>
            <select
              name="toDepartmentId"
              value={formData.toDepartmentId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={loadingDepartments}
            >
              <option value="">Select Department</option>
              {departments?.map((dept) => (
                <option key={dept?.departmentId} value={dept?.departmentId}>
                  {dept?.departmentName}
                </option>
              ))}
            </select>
          </div>
        )}

        {transferType.includes("location") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transfer to Location
            </label>
            <select
              name="toLocationId"
              value={formData.toLocationId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              disabled={loadingLocations}
            >
              <option value="">Select Location</option>
              {locations?.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.locationName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason *
          </label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., Role change"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes *
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Describe the reason for transfer..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Transfer Asset
        </button>
      </form>
    </div>
  );
};

export default TransferAssetForm;