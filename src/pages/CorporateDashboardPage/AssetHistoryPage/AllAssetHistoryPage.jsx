import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAssetHistory } from '../../../contexts/AssetHistoryContext';

const ITEMS_PER_PAGE = 10;

const AllAssetHistoriesPage = () => {
  const { histories, loading } = useAssetHistory();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(location.state?.search || '');
  const [actionTypeFilter, setActionTypeFilter] = useState('');
  const [groupedHistories, setGroupedHistories] = useState({});
  const [expanded, setExpanded] = useState(null); // one open at a time

  const actionTypes = [
    'CREATED',
    'ACQUIRED',
    'TRANSFERRED',
    'RETRIEVED',
    'RETIRED',
    'DISPOSED',
  ];

  useEffect(() => {
    if (!Array.isArray(histories)) return;

    const lowerSearch = searchTerm.toLowerCase();

    const filtered = histories.filter((entry) => {
      const matchesSearch =
        entry.assetTag?.toLowerCase().includes(lowerSearch) ||
        entry.performedBy?.toLowerCase().includes(lowerSearch);

      const matchesAction =
        actionTypeFilter === '' || entry.actionType === actionTypeFilter;

      return matchesSearch && matchesAction;
    });

    // Group by assetTag
    const grouped = {};
    filtered.forEach((entry) => {
      const tag = entry.assetTag || 'UNKNOWN';
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(entry);
    });

    setGroupedHistories(grouped);
    setExpanded(null);
  }, [searchTerm, actionTypeFilter, histories]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6">All Asset Histories</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Asset Tag or Performed By"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full sm:w-72"
          />

          <select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full sm:w-60"
          >
            <option value="">All Actions</option>
            {actionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : Object.keys(groupedHistories).length === 0 ? (
          <p className="text-gray-600">No history found.</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedHistories).map(([assetTag, historyList]) => (
              <div
                key={assetTag}
                className="border rounded shadow-sm bg-white overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpanded((prev) => (prev === assetTag ? null : assetTag))
                  }
                  className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 font-medium text-sm text-gray-800 flex justify-between items-center"
                >
                  <span>{assetTag}</span>
                  {expanded === assetTag ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {expanded === assetTag && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                      <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                        <tr>
                          <th className="px-4 py-3 text-left">Action</th>
                          <th className="px-4 py-3 text-left">Summary</th>
                          <th className="px-4 py-3 text-left">Reason</th>
                          <th className="px-4 py-3 text-left">Notes</th>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {historyList.map((entry) => (
                          <tr
                            key={entry.historyId}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() =>
                              navigate(`/history/${entry.historyId}`, {
                                state: { entry },
                              })
                            }
                          >
                            <td className="px-4 py-2 font-semibold text-blue-700">
                              {entry.actionType}
                            </td>
                            <td className="px-4 py-2">
                              {[
                                entry.fromEmployee || entry.toEmployee
                                  ? `Employee: ${entry.fromEmployee || '-'} → ${
                                      entry.toEmployee || '-'
                                    }`
                                  : null,
                                entry.fromDepartment || entry.toDepartment
                                  ? `Department: ${entry.fromDepartment || '-'} → ${
                                      entry.toDepartment || '-'
                                    }`
                                  : null,
                                entry.fromLocation || entry.toLocation
                                  ? `Location: ${entry.fromLocation || '-'} → ${
                                      entry.toLocation || '-'
                                    }`
                                  : null,
                              ]
                                .filter(Boolean)
                                .join(' | ')}
                            </td>
                            <td className="px-4 py-2">{entry.reason || '-'}</td>
                            <td className="px-4 py-2">{entry.notes || '-'}</td>
                            <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                              {new Date(entry.actionDate).toLocaleString()}
                            </td>
                            <td className="px-4 py-2">{entry.performedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAssetHistoriesPage;
