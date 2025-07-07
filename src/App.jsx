import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AdminDashboard from "./components/admin/AdminDashboard";
import BusinessDashboard from "./components/BusinessDashboard";
import OperationsDashboard from "./components/OperationsDashboard";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage ";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; 
  }

  console.log(user)
  
  if (!user) return <LoginPage />;
  
  if (user.role === "ADMIN") return <AdminDashboard />;
  if (user.role === "BUSINESS") return <BusinessDashboard />;
  if (user.role === "OPERATIONS") return <OperationsDashboard />;
  
  return <UnauthorizedPage />;
}

function App() {
  return (    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/create" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>    
  );
}

export default App;