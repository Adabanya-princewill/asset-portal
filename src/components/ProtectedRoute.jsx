import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import LoaderIcon from "./LoaderIcon/LoaderPageIcon";
import { Outlet } from "react-router-dom";


// ProtectedRoute Component
export const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <LoaderIcon />;
  if (!user) return <LoginPage />;

  return <Outlet />
};
