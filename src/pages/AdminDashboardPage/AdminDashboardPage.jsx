import { useContext } from "react";
import "./AdminDashboardPage.css";
import { AuthContext } from "../../contexts/AuthContext";

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className="page-title">Dashboard</span>
        <div className="dashboard">
          <h1>
            Welcome Admin {user?.username} . id: {user?.id}
          </h1>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
