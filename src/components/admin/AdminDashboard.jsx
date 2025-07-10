import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const AdminDashboard = () => {
  const { user } = useContext(AuthContext);


  return <h1>Welcome Admin {user?.username} . id: {user?.id}</h1>;

};

export default AdminDashboard;
