import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import EditRolePage from "./pages/UserManagementPage/EditRolePage";
import CreateUserPage from "./pages/UserManagementPage/CreateUserPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ManageAssetPage from "./pages/ControlDashboardPage/ManageAssetPage/ManageAssetPage";
import ManageLocationPage from "./pages/ControlDashboardPage/ManageLocationPage/ManageLocationPage";
import ManageDepartmentPage from "./pages/ControlDashboardPage/ManageDepartmentPage/ManageDepartmentPage";
import ManageCategoryPage from "./pages/ControlDashboardPage/ManageCategoryPage/ManageCategoryPage";
import ViewAssetsPage from "./pages/CorporateDashboardPage/ViewAssetsPage/ViewAssetsPage";
import CreateAssetPage from "./pages/CorporateDashboardPage/AssetManagement/CreateAssetPage";
import RetrieveAssetPage from "./pages/CorporateDashboardPage/AssetManagement/RetrieveAssetPage";
import TransferAssetPage from "./pages/CorporateDashboardPage/AssetManagement/TransferAssetPage";
import DeleteUserPage from "./pages/UserManagementPage/DeleteUserPage";
import ViewAssetDetailsPage from "./pages/CorporateDashboardPage/ViewAssetsPage/ViewAssetDetailsPage";
import { AssetProvider } from "./contexts/AssetContext";
import { DropdownProvider } from "./contexts/DropdownContext";
import LocationDetailsPage from "./pages/ControlDashboardPage/ManageLocationPage/LocationDetailsPage";
import DepartmentDetailsPage from "./pages/ControlDashboardPage/ManageDepartmentPage/DepartmentDetailsPage";
import CategoryDetailsPage from "./pages/ControlDashboardPage/ManageCategoryPage/CategoryDetailsPage";
import AssetDetailsPage from "./pages/ControlDashboardPage/ManageAssetPage/AssetDetailsPage";
import AssetHistoryPage from "./pages/CorporateDashboardPage/AssetHistoryPage/AssetHistoryDetailsPage";
import AllAssetHistoriesPage from "./pages/CorporateDashboardPage/AssetHistoryPage/AllAssetHistoryPage";
import AssetHistoryDetailPage from "./pages/CorporateDashboardPage/AssetHistoryPage/AssetHistoryDetailsPage";
import { AssetHistoryProvider } from "./contexts/AssetHistoryContext";
import ITAssetsPage from "./pages/SupportDashboardPage/ManageAssetPage/ITAssetPage";
import ITAssetDetailsPage from "./pages/SupportDashboardPage/ManageAssetPage/ITAssetDetailsPage";
import ViewFinanceAssetsPage from "./pages/FinanceDashboardPage/ViewAssetsPage/ViewFinanceAssetsPage";
import ViewFinanceAssetDetailsPage from "./pages/FinanceDashboardPage/ViewAssetsPage/ViewFinanceAssetDetailsPage";
import AssetDashboard from "./pages/CorporateDashboardPage/AssetDashboard";

export default function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <AssetProvider>
              <DropdownProvider>
                <AssetHistoryProvider>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/" element={<ProtectedRoute />}>
                      <Route element={<DashboardLayout />}>
                        <Route index element={<DashboardPage />} />

                        {/* Admin Routes */}
                        <Route path="/edit-user" element={<EditRolePage />} />

                        <Route
                          path="/create-user"
                          element={<CreateUserPage />}
                        />
                        <Route
                          path="/delete-user"
                          element={<DeleteUserPage />}
                        />

                        {/* Internal Control Routes */}
                        <Route
                          path="/manage-assets"
                          element={<ManageAssetPage />}
                        />
                        <Route
                          path="/manage-assets/:assetId"
                          element={<AssetDetailsPage />}
                        />
                        <Route
                          path="/manage-locations"
                          element={<ManageLocationPage />}
                        />
                        <Route
                          path="/manage-locations/:locationId"
                          element={<LocationDetailsPage />}
                        />
                        <Route
                          path="/manage-departments"
                          element={<ManageDepartmentPage />}
                        />
                        <Route
                          path="/manage-departments/:departmentId"
                          element={<DepartmentDetailsPage />}
                        />
                        <Route
                          path="/manage-categories"
                          element={<ManageCategoryPage />}
                        />
                        <Route
                          path="/manage-categories/:catoryId"
                          element={<CategoryDetailsPage />}
                        />

                        {/* Corporate Service Routes */}
                        <Route path="/view" element={<ViewAssetsPage />} />
                        <Route path="/dashboard" element={<AssetDashboard />} />
                        <Route
                          path="/view/:assetId"
                          element={<ViewAssetDetailsPage />}
                        />
                        <Route
                          path="/create-asset"
                          element={<CreateAssetPage />}
                        />
                        <Route
                          path="/transfer-asset"
                          element={<TransferAssetPage />}
                        />
                        <Route
                          path="/retrieve-asset"
                          element={<RetrieveAssetPage />}
                        />
                        <Route
                          path="/history/:id"
                          element={<AssetHistoryDetailPage />}
                        />
                        <Route
                          path="/history"
                          element={<AllAssetHistoriesPage />}
                        />

                        {/* IT support Routes */}
                        <Route path="/it-assets" element={<ITAssetsPage />} />
                        <Route
                          path="/it-assets/:assetId"
                          element={<ITAssetDetailsPage />}
                        />

                        {/* Finance Routes*/}
                        <Route
                          path="/view-assets"
                          element={<ViewFinanceAssetsPage />}
                        />
                        <Route
                          path="/view-details/:assetId"
                          element={<ViewFinanceAssetDetailsPage />}
                        />
                      </Route>
                    </Route>
                  </Routes>
                </AssetHistoryProvider>
              </DropdownProvider>
            </AssetProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
