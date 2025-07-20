import React, { useState } from 'react';
import { EditUserRole } from '../../services/apiServices';
import toast from 'react-hot-toast';

const EditUserForm = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    'ADMIN',
    'IT_SUPPORT',
    'FINANCE',
    'AUDITOR',
    'CORPORATE_SERVICE',
    'INTERNAL_CONTROL',
  ];

  const handleSubmit = async () => {
    if (!username || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    const isValidEmail = (username) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

    if (!isValidEmail(username)) {
      toast.error("Please enter a valid email");
      return;
    }


    setIsLoading(true);
    try {
      const res = await EditUserRole(username, role);
      toast.success(res || "User role updated successfully!");
      setUsername('');
      setRole('');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit User Role</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">---Select a role---</option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Updating...
            </>
          ) : (
            <>
              Update Role
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
