import React, { useEffect, useState } from "react";
import { createUser, getDepartments } from "../../services/apiServices";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    employeeId: "",
    departmentId: "",
  });

  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      return setDepartments(response);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (formData) => {
    try {
      await createUser(formData);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(formData);
    setFormData({
      email: "",
      password: "",
      role: "",
      employeeId: "",
      departmentId: "",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-4"
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 -mt-4 mb-4">
          Create User
        </h3>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              - Select Role -
            </option>
            <option value="ADMIN">ADMIN</option>
            <option value="AUDIT">AUDIT</option>
            <option value="FINANCE">FINANCE</option>
            <option value="IT SUPPORT">IT SUPPORT</option>
            <option value="INTERNAL CONTROL">INTERNAL CONTROL</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Department
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
