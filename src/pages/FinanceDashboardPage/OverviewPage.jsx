import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Package, TrendingUp, DollarSign, AlertCircle, TrendingDown } from "lucide-react";
import { getCategoryFinancialSummary } from "../../services/apiServices";
import { FaNairaSign } from "react-icons/fa6";

const OverviewPage = () => {
  const [activeView, setActiveView] = useState("overview");
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const fetchDashboardData = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await getCategoryFinancialSummary(filters);
      setDashboardData(data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#6366f1",
    "#14b8a6",
    "#f97316",
  ];

  // Use all categories
  const allCategories = dashboardData;

  // Generate years (current year and 10 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  // Months
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Days
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  
  // Handle filter application
  const handleApplyFilters = () => {
    const filters = {};
    if (selectedYear) filters.year = selectedYear;
    if (selectedMonth) filters.month = selectedMonth;
    if (selectedDay) filters.day = selectedDay;

    fetchDashboardData(filters);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    fetchDashboardData();
  };

  // Calculate totals
  const totalAssets = dashboardData.reduce(
    (sum, cat) => sum + cat.assetCount,
    0
  );
  const totalPurchaseValue = dashboardData.reduce(
    (sum, cat) => sum + cat.totalPurchaseAmount,
    0
  );
  const totalCurrentValue = dashboardData.reduce(
    (sum, cat) => sum + cat.totalCurrentAmount,
    0
  );
  const totalDepreciation = dashboardData.reduce(
    (sum, cat) => sum + cat.totalDepreciatedAmount,
    0
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const downloadCategoryDetailsCSV = () => {
    if (!dashboardData.length) return;

    const headers = [
      "Category",
      "Assets",
      "Purchase Amount (NGN)",
      "Current Amount (NGN)",
      "Depreciation (NGN)",
      "Depreciation (%)",
    ];

    const rows = dashboardData.map((category) => {
      const depreciationPercent =
        category.totalPurchaseAmount > 0
          ? (
              (category.totalDepreciatedAmount / category.totalPurchaseAmount) *
              100
            ).toFixed(2)
          : 0;

      return [
        category.categoryName,
        category.assetCount,
        category.totalPurchaseAmount,
        category.totalCurrentAmount,
        category.totalDepreciatedAmount,
        depreciationPercent,
      ];
    });

    // Totals row (matches table footer)
    rows.push([
      "TOTAL",
      totalAssets,
      totalPurchaseValue,
      totalCurrentValue,
      totalDepreciation,
      totalPurchaseValue > 0
        ? ((totalDepreciation / totalPurchaseValue) * 100).toFixed(2)
        : 0,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Category_Financial_Details.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    isCurrency = false,
  }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2" style={{ color }}>
            {isCurrency ? formatCurrency(value) : value}
          </p>
        </div>
        <div className="p-3 rounded-full bg-gray-100">
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ message }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Package className="w-16 h-16 text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600">Dashboard data could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Asset Management Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Financial overview of all assets
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Day Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Days</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleApplyFilters}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply
              </button>
              <button
                onClick={handleResetFilters}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Assets"
            value={totalAssets}
            icon={Package}
            color="#3b82f6"
          />
          <StatCard
            title="Total Purchase Value"
            value={totalPurchaseValue}
            icon={FaNairaSign}
            color="#10b981"
            isCurrency={true}
          />
          <StatCard
            title="Total Current Value"
            value={totalCurrentValue}
            icon={TrendingUp}
            color="#8b5cf6"
            isCurrency={true}
          />
          <StatCard
            title="Total Depreciation"
            value={totalDepreciation}
            icon={TrendingDown}
            color="#ec4899"
            isCurrency={true}
          />
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveView("overview")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeView === "overview"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView("details")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeView === "details"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Details
          </button>
        </div>

        {activeView === "overview" ? (
          <>
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Asset Count by Category - Pie Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Assets by Category
                </h2>
                {allCategories.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={allCategories}
                        dataKey="assetCount"
                        nameKey="categoryName"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ categoryName, percent }) =>
                          `${categoryName} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {allCategories.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState message="No category data available" />
                )}
              </div>

              {/* Purchase Amount by Category - Bar Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Purchase Value by Category
                </h2>
                {allCategories.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={allCategories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="categoryName"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={10}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          `₦${(value / 1000000).toFixed(0)}M`
                        }
                      />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar
                        dataKey="totalPurchaseAmount"
                        fill="#3b82f6"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState message="No category data available" />
                )}
              </div>
            </div>

            {/* Current vs Purchase Value Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Current Value vs Purchase Value by Category
              </h2>
              {allCategories.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={allCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="categoryName"
                      angle={-45}
                      textAnchor="end"
                      height={120}
                      fontSize={11}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        `₦${(value / 1000000).toFixed(0)}M`
                      }
                    />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar
                      dataKey="totalPurchaseAmount"
                      fill="#3b82f6"
                      name="Purchase Amount"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="totalCurrentAmount"
                      fill="#10b981"
                      name="Current Amount"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No category data available" />
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Category Financial Details
              </h2>

              <button
                onClick={downloadCategoryDetailsCSV}
               className="px-5 py-2 cursor-pointer bg-[#00B0F0] text-white rounded-xl flex items-center gap-2"
          >
                Download
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assets
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purchase Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Depreciation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Depreciation %
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardData.map((category) => {
                    const depreciationPercent =
                      category.totalPurchaseAmount > 0
                        ? (
                            (category.totalDepreciatedAmount /
                              category.totalPurchaseAmount) *
                            100
                          ).toFixed(2)
                        : 0;

                    return (
                      <tr
                        key={category.categoryId}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.categoryName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                            {category.assetCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(category.totalPurchaseAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(category.totalCurrentAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {formatCurrency(category.totalDepreciatedAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {depreciationPercent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-50 font-semibold">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                        {totalAssets}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(totalPurchaseValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(totalCurrentValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatCurrency(totalDepreciation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {totalPurchaseValue > 0
                        ? (
                            (totalDepreciation / totalPurchaseValue) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewPage;
