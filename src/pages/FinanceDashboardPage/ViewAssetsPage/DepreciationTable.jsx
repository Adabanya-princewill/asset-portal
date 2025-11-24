import React from "react";
import { Loader2 } from "lucide-react";

const DepreciationTable = ({ loading, records }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600 mt-4">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading depreciation...</span>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return <p className="text-gray-500 mt-2">No depreciation history found.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Month</th>
            <th className="px-4 py-2 border">Rate (%)</th>
            <th className="px-4 py-2 border">Amount (₦)</th>
            <th className="px-4 py-2 border">Useful Life (m)</th>
            <th className="px-4 py-2 border">Prv. Net Book Value (₦)</th>
            <th className="px-4 py-2 border">Net Book Value (₦)</th>
          </tr>
        </thead>

        <tbody>
          {records.map((row) => (
            <tr
              key={row.depreciationId}
              className="odd:bg-white even:bg-gray-50"
            >
              <td className="px-4 py-2 border">{row.depreciationMonth}</td>
              <td className="px-4 py-2 border">{row.depreciationRate}</td>
              <td className="px-4 py-2 border">{row.depreciationAmount}</td>
              <td className="px-4 py-2 border">{row.usefulLifeMonths}</td>
              <td className="px-4 py-2 border">{row.previousNetBookValue}</td>
              <td className="px-4 py-2 border">{row.newNetBookValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepreciationTable;
