import React, { useState } from 'react';
import { User, Users, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { retrieveAsset } from '../../../services/apiServices';

const RetrieveAssetPage = () => {
  const [retrievalType, setRetrievalType] = useState('all');
  const [formData, setFormData] = useState({
    employeeId: '',
    assetTag: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRetrievalTypeChange = (type) => {
    setRetrievalType(type);
    if (type === 'all') {
      setFormData((prev) => ({ ...prev, assetTag: '' }));
    }
  };

  const isFormValid = () => {
    const hasEmployeeId = formData.employeeId.trim() !== '';
    const hasAssetTag = formData.assetTag.trim() !== '';

    return retrievalType === 'all' ? hasEmployeeId : hasEmployeeId && hasAssetTag;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await retrieveAsset(retrievalType, formData);
      toast.success(res || 'Asset retrieved successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Failed to retrieve asset');
      console.error('Asset retrieval error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="px-8 py-6 text-center">
            <h1 className="text-3xl font-bold text-black flex items-center justify-center gap-3">
              Retrieve Asset
            </h1>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Retrieval Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRetrievalTypeChange('all')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    retrievalType === 'all'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Users className="h-6 w-6 mx-auto mb-3" />
                  <h3 className="font-semibold text-md">All User Assets</h3>
                  <p className="text-sm mt-2 opacity-75">
                    Retrieve all assets for a specific employee
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRetrievalTypeChange('specific')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    retrievalType === 'specific'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <User className="h-6 w-6 mx-auto mb-3" />
                  <h3 className="font-semibold text-md">Specific Asset</h3>
                  <p className="text-sm mt-2 opacity-75">
                    Retrieve a specific asset by tag and employee
                  </p>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="e.g., NOVA002"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>

                {retrievalType === 'specific' && (
                  <div>
                    <label htmlFor="assetTag" className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Tag <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="assetTag"
                      name="assetTag"
                      value={formData.assetTag}
                      onChange={handleInputChange}
                      placeholder="e.g., AST-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Retrieving...
                    </>
                  ) : (
                    <>Retrieve Assets</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrieveAssetPage;
