import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCategories, getDepartments, getLocations } from "../../../services/apiServices";
import toast from "react-hot-toast";

const CreateAssetPage = () => {
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
    departmentId: "", // optional
    employeeId: "", // optional
  });

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch dropdown options using useEffect
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [catRes, deptRes, locRes] = await Promise.all([
          getCategories(),
          getDepartments(),
          getLocations(),
        ]);
        setCategories(catRes);
        setDepartments(deptRes);
        setLocations(locRes);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  // Prepare payload, removing optional empty fields
  const payload = { ...formData };

  if (!payload.employeeId) {
    delete payload.employeeId;
  }

  if (!payload.departmentId) {
    delete payload.departmentId;
  }

  try {
    const response = await axios.post(
      "http://192.168.20.158:9000/api/cs/create-asset",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Asset created successfully!");
    console.log("Success:", response.data);

    // Reset form
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
    });
  } catch (error) {
    console.error("Failed to create asset:", error);
    toast.error("Failed to create asset.");
  }
};


  // Map API data to {id, name} for SelectInput
  const categoryOptions = categories.map(cat => ({
    id: cat.categoryId,
    name: cat.categoryName,
  }));
  const departmentOptions = departments.map(dept => ({
    id: dept.departmentId,
    name: dept.departmentName,
  }));
  const locationOptions = locations.map(loc => ({
    id: loc.locationId,
    name: loc.locationName,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create New Asset
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Asset Tag" name="assetTag" value={formData.assetTag} onChange={handleChange} required />
          <TextInput label="Asset Name" name="assetName" value={formData.assetName} onChange={handleChange} required />
          <TextInput label="Barcode" name="barcode" value={formData.barcode} onChange={handleChange} required />
          <TextInput label="Purchase Price" name="purchasePrice" type="number" value={formData.purchasePrice} onChange={handleChange} required />
          <TextInput label="Acquisition Date" name="acquisitionDate" type="date" value={formData.acquisitionDate} onChange={handleChange} required />
          <TextInput label="Warranty Expiry Date" name="warrantyExpirationDate" type="date" value={formData.warrantyExpirationDate} onChange={handleChange} required />
          <SelectInput label="Condition" name="condition" value={formData.condition} onChange={handleChange} options={[{ id: "GOOD", name: "GOOD" }, { id: "FAIR", name: "FAIR" }, { id: "BAD", name: "BAD" }]} />
          <TextInput label="Employee ID (optional)" name="employeeId" value={formData.employeeId} onChange={handleChange} />
          <SelectInput label="Category" name="categoryId" value={formData.categoryId} onChange={handleChange} options={categoryOptions} required />
          <SelectInput label="Location" name="locationId" value={formData.locationId} onChange={handleChange} options={locationOptions} required />
          <SelectInput label="Department (optional)" name="departmentId" value={formData.departmentId} onChange={handleChange} options={departmentOptions} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Asset
        </button>
      </form>
    </div>
  );
};

const TextInput = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const SelectInput = ({ label, name, value, onChange, options, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">-- Select --</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

export default CreateAssetPage;
