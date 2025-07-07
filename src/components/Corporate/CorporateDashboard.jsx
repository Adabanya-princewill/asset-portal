import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const CorporateDashboard = () => {
  const { user } = useContext(AuthContext);


  return <h1>Welcome Corporate Services {user?.username} . id: {user?.id}</h1>;

};

export default CorporateDashboard;