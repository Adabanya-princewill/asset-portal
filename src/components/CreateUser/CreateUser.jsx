import React, { useEffect, useState } from "react";
import { createUser, getDepartments } from "../../services/apiServices";
import toast from "react-hot-toast";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    employeeId: "",
    departmentId: "",
  });

  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartments(response);
      } catch (error) {
        toast.error("Failed to load departments");
        console.error("Fetch departments error:", error);
      }
    };
    fetchDepartments();
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
    setIsSubmitting(true);
    try {
      await createUser(formData);
      toast.success("User created successfully");
      setFormData({
        email: "",
        password: "",
        role: "",
        employeeId: "",
        departmentId: "",
      });
    } catch (error) {
      toast.error(error.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Create User
      </h2>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          placeholder="user@example.com"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">-- Select Role --</option>
          <option value="ADMIN">Admin</option>
          <option value="AUDIT">Audit</option>
          <option value="FINANCE">Finance</option>
          <option value="IT SUPPORT">IT Support</option>
          <option value="INTERNAL CONTROL">Internal Control</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Employee ID</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          placeholder="EMP001"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-700">Department</label>
        <select
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          required
          className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        >
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 text-sm rounded-md text-white font-medium ${isSubmitting
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
          } transition duration-200`}
      >
        {isSubmitting ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateUser;
