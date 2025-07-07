import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const FinanceDashboard = () => {
  const { user } = useContext(AuthContext);


  return <h1>Welcome Finance {user?.username} . id: {user?.id}</h1>;

};

export default FinanceDashboard;