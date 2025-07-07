import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const SupportDashboard = () => {
  const { user } = useContext(AuthContext);


  return <h1>Welcome IT Support {user?.username} . id: {user?.id}</h1>;

};

export default SupportDashboard;