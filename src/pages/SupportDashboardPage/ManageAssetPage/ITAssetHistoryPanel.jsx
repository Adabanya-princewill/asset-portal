import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAssetHistory } from "../../../contexts/AssetHistoryContext";

const ITAssetHistoryPanel = ({ assetTag }) => {
  const { histories, loading } = useAssetHistory();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true); // always open for single asset

  const filtered = useMemo(() => {
    if (!Array.isArray(histories)) return [];
    return histories
      .filter((h) => String(h.assetTag) === String(assetTag))
      .sort((a, b) => new Date(b.actionDate) - new Date(a.actionDate));
  }, [histories, assetTag]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div
        onClick={() => setExpanded((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer bg-gray-100 px-4 py-3 rounded"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Asset History ({assetTag})
        </h2>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {expanded && (
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading histories...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 text-sm bg-gray-50 border rounded px-4 py-3">
              No history found for this asset.
            </p>
          ) : (
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
                {filtered.map((entry) => (
                  <tr
                    key={entry.historyId}
                    onClick={() =>
                      navigate(`/assetportal/history/${entry.historyId}`, {
                        state: { entry },
                      })
                    }
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-2 font-semibold text-blue-700">
                      {entry.actionType}
                    </td>

                    <td className="px-4 py-2">
                      {[
                        entry.fromEmployee || entry.toEmployee
                          ? `Employee: ${entry.fromEmployee || "-"} → ${
                              entry.toEmployee || "-"
                            }`
                          : null,
                        entry.fromDepartment || entry.toDepartment
                          ? `Department: ${entry.fromDepartment || "-"} → ${
                              entry.toDepartment || "-"
                            }`
                          : null,
                        entry.fromLocation || entry.toLocation
                          ? `Location: ${entry.fromLocation || "-"} → ${
                              entry.toLocation || "-"
                            }`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" | ")}
                    </td>

                    <td className="px-4 py-2">{entry.reason || "-"}</td>
                    <td className="px-4 py-2">{entry.notes || "-"}</td>

                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
                      {new Date(entry.actionDate).toLocaleString()}
                    </td>

                    <td className="px-4 py-2">{entry.performedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ITAssetHistoryPanel;
