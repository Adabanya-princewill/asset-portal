import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import SupportDashboard from "./ITSupport/SupportDashboard";
import FinanceDashboard from "./Finance/FinanceDashboard";
import AuditDashboard from "./Audit/AuditDashboard";
import CorporateDashboard from "./Corporate/CorporateDashboard";
import ControlDashboard from "./InternalControl/ControlDashboard";
import LoginPage from "../pages/LoginPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import LoaderIcon from "./LoaderIcon/LoaderPageIcon";
import { Outlet } from "react-router-dom";


// ProtectedRoute Component
export const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <LoaderIcon />;
  if (!user) return <LoginPage />;

  // const dashboards = {
  //   ADMIN: AdminDashboard,
  //   IT_SUPPORT: SupportDashboard,
  //   FINANCE: FinanceDashboard,
  //   AUDITOR: AuditDashboard,
  //   CORPORATE_SERVICE: CorporateDashboard,
  //   INTERNAL_CONTROL: ControlDashboard,
  // };

  // const DashboardComponent = dashboards[user.role];

  // return DashboardComponent ? <DashboardComponent /> : <UnauthorizedPage />;

  return <Outlet />
};
