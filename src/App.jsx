import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";



export default function App() {

  
  return (    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/create" element={<CreateAccountPage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>    
  );
}
