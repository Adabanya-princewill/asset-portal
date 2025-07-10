import { useContext } from "react";
import FinanceDashboardPage from "../../components/Finance/FinanceDashboard";
import ControlDashboardPage from "../../components/InternalControl/ControlDashboard";
import AdminDashboardPage from "../AdminDashboardPage/AdminDashboardPage";
import AuditDashboardPage from "../AuditDashboardPage/AuditDashboardPage";
import CorporateDashboardPage from "../CorporateDashboardPage/CorporateDashboardPage";
import SupportDashboardPage from "../SupportDashboardPage/SupportDashboardPage";
import "./DashboardPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import UnauthorizedPage from "../UnauthorizedPage";

const DashboardPage = () => {

  const { user } = useContext(AuthContext);

    const dashboards = {
    ADMIN: AdminDashboardPage,
    IT_SUPPORT: SupportDashboardPage,
    FINANCE: FinanceDashboardPage,
    AUDITOR: AuditDashboardPage,
    CORPORATE_SERVICE: CorporateDashboardPage,
    INTERNAL_CONTROL: ControlDashboardPage,
  };

  const DashboardComponent = dashboards[user.role];


  return (
    <>
    {DashboardComponent ? <DashboardComponent /> : <UnauthorizedPage />}
    </>     
  );
};

export default DashboardPage;
