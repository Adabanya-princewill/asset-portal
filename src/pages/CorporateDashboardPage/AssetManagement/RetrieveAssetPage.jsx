import React, { useState } from 'react';
import { User, Users, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';


const RetrieveAssetPage = () => {
  const [retrievalType, setRetrievalType] = useState('all');
  const [formData, setFormData] = useState({
    employeeId: '',
    assetTag: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRetrievalTypeChange = (type) => {
    setRetrievalType(type);
    setResponse(null);
    setError('');
    if (type === 'all') {
      setFormData(prev => ({ ...prev, assetTag: '' }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      let url, payload;

      if (retrievalType === 'all') {
        url = 'http://192.168.20.246:9000/api/cs/asset/retrieve-all';
        payload = { employeeId: formData.employeeId };
      } else {
        url = 'http://192.168.20.246:9000/api/cs/asset/retrieve';
        payload = {
          assetTag: formData.assetTag,
          employeeId: formData.employeeId,
        };
      }

      //Optional token if required
      const token = localStorage.getItem("token");

      console.log(payload);

      const res = await fetch (url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`${errText}`);
      }

      const data = await res.json();
      setResponse(data.data);
      toast.success('Assets retrieved successfully!');
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || 'An error occurred while retrieving assets');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (retrievalType === 'all') {
      return formData.employeeId.trim() !== '';
    } else {
      return formData.employeeId.trim() !== '' && formData.assetTag.trim() !== '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-black flex items-center justify-center gap-3">
              Retrieve Asset
            </h1>
            {/* <p className="text-blue-100 items-center justify-center mt-2">
              Retrieve asset information by employee or specific asset
            </p> */}
          </div>

          <div className="p-8">
            {/* Retrieval Type Selection */}
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
                  <Users className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">All User Assets</h3>
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
                  <User className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Specific Asset</h3>
                  <p className="text-sm mt-2 opacity-75">
                    Retrieve a specific asset by tag and employee
                  </p>
                </button>
              </div>
            </div>

            {/* Form */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Retrieving...
                    </>
                  ) : (
                    <>
                      Retrieve Assets
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Success Response */}
            {response && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Retrieval Successful
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetrieveAssetPage;
