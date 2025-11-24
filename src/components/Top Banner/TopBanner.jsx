import React, { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import "./TopBanner.css";
import { HiOutlineLogout } from "react-icons/hi";
import { logout } from "../../services/apiServices";

const TopBanner = ({ toggleSidebar }) => {
  const iconSize = 25;
  const { user, setToken, setUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      logout(setUser, setToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="welcome">
      <FaUserCircle fill="#241B5E" size={iconSize} />
      <span className="text">
        Welcome, {user.username} ({user.role})
      </span>
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <button
        className="logout-btn cursor-pointer"
        onClick={() => handleLogOut()}
        title="Logout"
      >
        <HiOutlineLogout size={iconSize} color="#e63945" />
      </button>
    </div>
  );
};

export default TopBanner;
