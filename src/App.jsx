import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from 'react-hot-toast';
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

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />

                {/* Admin Routes */}
                <Route path="/edit-user" element={<EditRolePage />} />
                <Route path="/create-user" element={<CreateUserPage />} />
                <Route path="/delete-user" element={<DeleteUserPage />} />

                {/* Internal Control Routes */}
                <Route path="/manage-assets" element={<ManageAssetPage />} />
                <Route path="/manage-locations" element={<ManageLocationPage />} />
                <Route path="/manage-departments" element={<ManageDepartmentPage />} />
                <Route path="/manage-categories" element={<ManageCategoryPage />} />

                {/* Corporate Service Routes */}
                <Route path="/view" element={<ViewAssetsPage />} />
                <Route path="/create-asset" element={<CreateAssetPage />} />
                <Route path="/transfer-asset" element={<TransferAssetPage />} />
                <Route path="/retrieve-asset" element={<RetrieveAssetPage />} />


              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>

  );
}
