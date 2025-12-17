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
} from "recharts";
import {
  Building2,
  MapPin,
  Package,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { getAllAssetsDashboard } from "../../services/apiServices";

const AssetDashboard = () => {
  const [activeView, setActiveView] = useState("overview");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getAllAssetsDashboard();
        console.log(data);
        if (data && data.length > 0) {
          setDashboardData(data[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

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

  const activeCategories =
    dashboardData?.categories?.filter((cat) => cat.assetCount > 0) || [];
  const activeDepartments =
    dashboardData?.departments?.filter((dept) => dept.assetCount > 0) || [];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{ color }}>
            {value || 0}
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

  if (!dashboardData) {
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
            Overview of all organizational assets
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Assets"
            value={dashboardData?.assetsCount}
            icon={Package}
            color="#3b82f6"
          />
          <StatCard
            title="Categories"
            value={dashboardData?.categories?.length}
            icon={TrendingUp}
            color="#8b5cf6"
          />
          <StatCard
            title="Locations"
            value={dashboardData?.locations?.length}
            icon={MapPin}
            color="#ec4899"
          />
          <StatCard
            title="Departments"
            value={dashboardData?.departments?.length}
            icon={Building2}
            color="#f59e0b"
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
              {/* Categories Pie Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Assets by Category
                </h2>
                {activeCategories.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={activeCategories}
                        dataKey="assetCount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ x, y, name, percent }) => (
                          <text
                            x={x}
                            y={y}
                            fill="#374151"
                            fontSize={12}
                            textAnchor="middle"
                            dominantBaseline="central"
                          >
                            {`${name} (${(percent * 100).toFixed(0)}%)`}
                          </text>
                        )}
                      >
                        {activeCategories.map((entry, index) => (
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

              {/* Locations Bar Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Assets by Location
                </h2>
                {dashboardData?.locations &&
                dashboardData.locations.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.locations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="assetCount"
                        fill="#3b82f6"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState message="No location data available" />
                )}
              </div>
            </div>

            {/* Departments Bar Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Assets by Department
              </h2>
              {dashboardData?.departments &&
              dashboardData.departments.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.departments} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={150}
                      fontSize={12}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="assetCount"
                      fill="#8b5cf6"
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState message="No department data available" />
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Categories
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {dashboardData?.categories &&
                dashboardData.categories.length > 0 ? (
                  dashboardData.categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {cat.name}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {cat.assetCount}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState message="No categories found" />
                )}
              </div>
            </div>

            {/* Locations Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Locations
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {dashboardData?.locations &&
                dashboardData.locations.length > 0 ? (
                  dashboardData.locations.map((loc) => (
                    <div
                      key={loc.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {loc.name}
                      </span>
                      <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {loc.assetCount}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState message="No locations found" />
                )}
              </div>
            </div>

            {/* Departments Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Departments
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {dashboardData?.departments &&
                dashboardData.departments.length > 0 ? (
                  dashboardData.departments.map((dept) => (
                    <div
                      key={dept.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {dept.name}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {dept.assetCount}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState message="No departments found" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDashboard;
