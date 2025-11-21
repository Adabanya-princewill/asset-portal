import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, FileText } from "lucide-react";

const LocationDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">No location data provided.</div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-blue-600 hover:underline mb-4"
      >
        <ChevronLeft size={18} /> Back
      </button>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md border p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin /> Location Details
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
            <p className="text-lg font-medium">{data.locationName}</p>
          </div>

          {/* Address */}
          <div className="p-4 border rounded-xl bg-gray-50 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-semibold">Address</p>
            <p className="text-lg font-medium">{data.address || "N/A"}</p>
          </div>

          {/* Description */}
          <div className="md:col-span-2 p-4 border rounded-xl bg-gray-50 shadow-sm">
            <p className="text-xs text-gray-500 uppercase font-semibold flex items-center gap-1">
              <FileText size={14} /> Description
            </p>
            <p className="text-lg font-medium">{data.description || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsPage;