import { useAuth } from "../contexts/AuthContext";

const OperationsDashboard = () => {
  const { user } = useAuth();
  return <h1>Welcome operation {user?.username}</h1>;
};

export default OperationsDashboard;
