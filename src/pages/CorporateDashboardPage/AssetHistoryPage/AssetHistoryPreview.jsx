import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAssetHistory } from '../../../contexts/AssetHistoryContext';

const renderSummary = (entry) => {
  const changes = [];

  if (entry.fromEmployee || entry.toEmployee) {
    changes.push(`Employee: ${entry.fromEmployee || '-'} → ${entry.toEmployee || '-'}`);
  }
  if (entry.fromDepartment || entry.toDepartment) {
    changes.push(`Department: ${entry.fromDepartment || '-'} → ${entry.toDepartment || '-'}`);
  }
  if (entry.fromLocation || entry.toLocation) {
    changes.push(`Location: ${entry.fromLocation || '-'} → ${entry.toLocation || '-'}`);
  }

  return changes.length > 0 ? changes.join(' | ') : 'No significant change';
};

const AssetHistoryPreview = ({ assetTag }) => {
  const { histories, loading } = useAssetHistory();

  const filteredHistory = useMemo(() => {
    if (!Array.isArray(histories)) return [];
    return histories
      .filter((h) => String(h.assetTag) === String(assetTag))
      .sort((a, b) => new Date(b.actionDate) - new Date(a.actionDate))
      .slice(0, 3);
  }, [histories, assetTag]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Recent History</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading history...</p>
      ) : filteredHistory.length === 0 ? (
        <div className="text-sm text-gray-500 bg-gray-50 border rounded px-4 py-3">
          No history found for this asset.
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredHistory.map((entry) => (
            <li
              key={entry.historyId}
              className="p-4 border border-gray-200 rounded hover:shadow-sm transition"
            >
              <div className="text-blue-700 font-semibold mb-1">{entry.actionType}</div>
              <div className="text-gray-700 mb-1">{renderSummary(entry)}</div>
              <div className="text-xs text-gray-500 italic">
                {new Date(entry.actionDate).toLocaleString()} by {entry.performedBy}
              </div>
            </li>
          ))}
        </ul>
      )}

      {filteredHistory.length > 0 && !loading && (
        <div className="mt-4 text-right">
          <Link
            to={`/history`}
            state={{ search: assetTag }}
            className="text-sm text-blue-600 hover:underline"
          >
            View full history →
          </Link>
        </div>
      )}
    </div>
  );
};

export default AssetHistoryPreview;
