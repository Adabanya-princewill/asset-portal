import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAllAssetHistories } from '../../../services/apiServices';
import {
  ArrowLeft, Calendar, UserRound, Info, Users, Building, MapPin, ArrowRight
} from 'lucide-react';

const AssetHistoryDetailPage = () => {
  const { historyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedEntry = location.state?.entry;
  const [entry, setEntry] = useState(passedEntry || null);
  const [loading, setLoading] = useState(!passedEntry);

  useEffect(() => {
    if (passedEntry) return;

    const fetchEntry = async () => {
      try {
        const all = await getAllAssetHistories();
        const found = all.find((e) => String(e.historyId) === historyId);
        setEntry(found);
      } catch (err) {
        console.error('Error fetching entry:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [historyId, passedEntry]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (!entry) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">History not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f8ff] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 text-sm hover:underline">
            <ArrowLeft size={16} className="mr-1" />
            Back to History
          </button>
          <div className="text-xs text-gray-400">History ID: <span className="font-semibold">{entry.historyId}</span></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Asset History Detail</h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Calendar size={16} className="mr-1" />
              {new Date(entry.actionDate).toLocaleString()}
            </div>
          </div>
          <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mt-3 md:mt-0">
            {entry.actionType}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

          {/* Asset Info Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-5">
            <div className="text-sm opacity-75">Asset Information</div>
            <div className="text-lg font-semibold">{entry.assetTag}</div>
          </div>

          {/* Action Details */}
          <div className="p-6">
            <div className="flex items-center mb-4 text-indigo-600 font-medium text-sm">
              <Info size={16} className="mr-2" />
              Action Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-500">Reason</p>
                <p className="font-medium text-gray-800">{entry.reason || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">Performed By</p>
                <div className="flex items-center gap-1 text-gray-800 font-medium">
                  <UserRound size={16} />
                  {entry.performedBy}
                </div>
              </div>
            </div>

            {/* Notes */}
            {entry.notes && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-1">Notes</p>
                <div className="bg-gray-50 p-3 rounded border text-gray-700 text-sm">
                  {entry.notes}
                </div>
              </div>
            )}
          </div>

          {/* Transfer Information */}
          <div className="border-t p-6 bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-4">Transfer Information</p>

            <div className="space-y-4">

              {(entry.fromEmployee || entry.toEmployee) && (
                <TransferRow label="Employee" from={entry.fromEmployee} to={entry.toEmployee} Icon={Users} />
              )}
              {(entry.fromDepartment || entry.toDepartment) && (
                <TransferRow label="Department" from={entry.fromDepartment} to={entry.toDepartment} Icon={Building} />
              )}
              {(entry.fromLocation || entry.toLocation) && (
                <TransferRow label="Location" from={entry.fromLocation} to={entry.toLocation} Icon={MapPin} />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransferRow = ({ label, from, to, Icon }) => (
  <div className="bg-white rounded-lg border p-4 flex flex-col sm:flex-row items-center justify-between shadow-sm">
    <div className="flex items-center gap-2 mb-2 sm:mb-0">
      <Icon className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium text-gray-800">{label}</span>
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-700">
      <span className="text-gray-500">{from || '-'}</span>
      <ArrowRight size={14} className="text-gray-400" />
      <span>{to || '-'}</span>
    </div>
  </div>
);

export default AssetHistoryDetailPage;
