import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const DepartmentDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <div className="p-6 text-center text-gray-500">No department data provided.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline mb-4"
      >
        <ChevronLeft size={18} /> Back
      </button>

      <div className="bg-white rounded-lg border p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Department Details</h2>
        <div className="space-y-3">
          <div><strong>Name:</strong> {data.departmentName}</div>
          <div><strong>Head:</strong> {data.departmentHead || 'N/A'}</div>
          <div><strong>Description:</strong> {data.description || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
