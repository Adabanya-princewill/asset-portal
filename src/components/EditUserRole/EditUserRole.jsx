import React, { useState } from 'react';
import { User, Shield, Save, AlertCircle } from 'lucide-react';
import { EditUserRole } from '../../services/apiServices';

const EditUserForm = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

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
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await EditUserRole(username, role);
      setMessage('User role updated successfully!');
      setMessageType('success');
      setUsername('');
      setRole('');
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <User className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Edit User Role</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
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
            <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a role</option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {message && (
          <div
            aria-live="polite"
            className={`flex items-center p-3 rounded-md border ${
              messageType === 'success'
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            {message}
          </div>
        )}

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
              <Save className="h-5 w-5 mr-2" />
              Update Role
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
