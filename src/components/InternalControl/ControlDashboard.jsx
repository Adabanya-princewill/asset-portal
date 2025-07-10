import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const ControlDashboardPage = () => {
  const { user } = useContext(AuthContext);


  return <h1>Welcome Internal Control {user?.username} . id: {user?.id}</h1>;

};

export default ControlDashboardPage;