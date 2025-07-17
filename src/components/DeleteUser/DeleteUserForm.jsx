import React, { useState } from 'react';
import { deleteUser } from '../../services/apiServices';
import toast from 'react-hot-toast';

const DeleteUserForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleDelete = async () => {
    if (!employeeId) {
      toast.error("Please fill in the employee ID");
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      setIsLoading(true);
      try {
        await deleteUser(employeeId);
        toast.success("User deleted successfully")
        setEmployeeId("");
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
        console.error('Error deleting user:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDelete();
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Deactivate User</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            onKeyPress={handleKeyPress}
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g NOVA000"
            required
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Deactivating...
            </>
          ) : (
            <>
              Deactivate User
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteUserForm;
