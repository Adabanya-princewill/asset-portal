import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../services/apiServices";

const AdminDashboard = () => {
  const { user, setUser, setIsLoading } = useAuth();


  return <h1>Welcome Admin {user?.username} . id: {user?.id}</h1>;

};

export default AdminDashboard;
