import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import EditRolePage from "./pages/UserManagementPage/EditRolePage";
import CreateUserPage from "./pages/UserManagementPage/CreateUserPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/create" element={<CreateAccountPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/edit-user" element={<EditRolePage />} />
              <Route path="/create-user" element={<CreateUserPage />} />
              {/* Add other protected routes here */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
