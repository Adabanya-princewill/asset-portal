import { useAuth } from "../contexts/AuthContext";

const BusinessDashboard = () => {
  const { user } = useAuth();
  return <h1>Welcome Business {user?.username}</h1>;
};

export default BusinessDashboard;
