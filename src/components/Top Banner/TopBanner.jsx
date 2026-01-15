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
 const getRoleStyle = (role) => {
    const roleStyles = {
      ADMIN: {
        text: "text-black-900",
        label: "Admin",
      },
      SUPER_ADMIN: {
        text: "text-black-900",
        label: "Super Admin",
      },
      FINANCE: {
        text: "text-black-900",
        label: "Finance",
      },
      IT_SUPPORT: {
        text: "text-black-900",
        label: "IT Support",
      },
      CORPORATE_SERVICE: {
        text: "text-black-900",
        label: "Corporate Service",
      },
      INTERNAL_CONTROL: {
        text: "text-black-900",
        label: "Internal Control",
      },
    };
    return roleStyles[role] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: role,
    };
  };

  return (
    <div className="welcome">
      <FaUserCircle fill="#241B5E" size={iconSize} />
      <span className="text">
        Welcome, {user.username} ({getRoleStyle(user.role).label})
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
