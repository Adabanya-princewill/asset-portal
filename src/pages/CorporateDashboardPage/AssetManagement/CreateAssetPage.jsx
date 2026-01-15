import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createAsset } from "../../../services/apiServices";
import { useDropdownContext } from "../../../contexts/DropdownContext";
import {
  Package,
  FileText,
  DollarSign,
  Calendar,
  Tag,
  MapPin,
  Building2,
  Users,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";

const CreateAssetPage = () => {
  const { categories, departments, locations, loading, refreshDropdown } =
    useDropdownContext();

  const [formData, setFormData] = useState({
    assetTag: "",
    assetName: "",
    barcode: "",
    description: "",
    acquisitionDate: "",
    purchasePrice: "",
    condition: "GOOD",
    warrantyExpirationDate: "",
    categoryId: "",
    locationId: "",
    departmentId: "",
    employeeId: "",
  });

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
    if (!payload.employeeId) delete payload.employeeId;
    if (!payload.departmentId) delete payload.departmentId;

    try {
      const res = await createAsset(payload);
      toast.success(res || "Asset created successfully!");
      setFormData({
        shortCode: "",
        assetName: "",
        description: "",
        acquisitionDate: "",
        purchasePrice: "",
        condition: "GOOD",
        warrantyExpirationDate: "",
        categoryId: "",
        locationId: "",
        departmentId: "",
        employeeId: "",
      });
    } catch (error) {
      console.error("Failed to create asset:", error);
      toast.error(error.message || "Failed to create asset.");
    }
  };

  useEffect(() => {
    if (!categories || !departments || !locations) {
      refreshDropdown();
    }
  }, []);

  const categoryOptions = categories?.map((cat) => ({
    id: cat.categoryId,
    name: cat.categoryName,
  }));
  const departmentOptions = departments?.map((dept) => ({
    id: dept.departmentId,
    name: dept.departmentName,
  }));
  const locationOptions = locations?.map((loc) => ({
    id: loc.locationId,
    name: loc.locationName,
  }));

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Asset
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to register a new asset in the system
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-gray-600 text-lg">Loading form data...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 lg:p-10">
              {/* Basic Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-blue-100">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Basic Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="Asset Short Code"
                    name="shortCode"
                    value={formData.shortCode}
                    onChange={handleChange}
                    required
                    placeholder="e.g., TAB,CHA,etc."
                  />
                  <TextInput
                    label="Asset Name"
                    name="assetName"
                    value={formData.assetName}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Dell Laptop XPS 15"
                  />
                  <SelectInput
                    label="Condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    options={[
                      { id: "EXCELLENT", name: "Excellent" },
                      { id: "GOOD", name: "Good" },
                      { id: "FAIR", name: "Fair" },
                      { id: "POOR", name: "Poor" },
                    ]}
                    required
                  />
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-green-100">
                  <FaNairaSign className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Financial Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    label="Purchase Price"
                    name="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                  />
                  <TextInput
                    label="Acquisition Date"
                    name="acquisitionDate"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={handleChange}
                    required
                  />
                  <TextInput
                    label="Warranty Expiry Date"
                    name="warrantyExpirationDate"
                    type="date"
                    value={formData.warrantyExpirationDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Location & Assignment Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-purple-100">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Location & Assignment
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Category"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    options={categoryOptions}
                    required
                  />
                  <SelectInput
                    label="Location"
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleChange}
                    options={locationOptions}
                    required
                  />
                  <SelectInput
                    label="Department"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    options={departmentOptions}
                    optional
                  />
                  <TextInput
                    label="Employee ID"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-orange-100">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Additional Details
                  </h2>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter detailed description of the asset..."
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      assetTag: "",
                      assetName: "",
                      barcode: "",
                      description: "",
                      acquisitionDate: "",
                      purchasePrice: "",
                      condition: "GOOD",
                      warrantyExpirationDate: "",
                      categoryId: "",
                      locationId: "",
                      departmentId: "",
                      employeeId: "",
                    })
                  }
                  className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-lg cursor-pointer"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Create Asset
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  step,
  optional = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
      {optional && (
        <span className="text-gray-400 text-xs font-normal ml-1">
          (Optional)
        </span>
      )}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      step={step}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  optional = false,
}) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
      {optional && (
        <span className="text-gray-400 text-xs font-normal ml-1">
          (Optional)
        </span>
      )}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
    >
      <option value="">-- Select {label} --</option>
      {options?.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default CreateAssetPage;
