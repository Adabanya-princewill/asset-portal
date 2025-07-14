import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../SideBar/SideBar.css';
import logo from '../../assets/novabank_logo.png';
import { FaAngleDown, FaAngleUp, FaMedal } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';
import { adminMenuItems, auditMenuItems, controlMenuItems, corporateMenuItems, financeMenuItems, supportMenuItems } from '../../menu/menuItems';



const SideBar = ({
  showUserSubmenu,
  toggleSubmenu,
  showRewardSubmenu,
  showReportSubmenu,
}) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const userRole = user.role;

  // Select menu based on role
  let menuItems = [];
  if (userRole === 'ADMIN') {
    menuItems = adminMenuItems;
  } else if (userRole === 'INTERNAL_CONTROL') {
    menuItems = controlMenuItems;
  } else if (userRole === 'CORPORATE_SERVICE') {
    menuItems = corporateMenuItems;
  } else if (userRole === 'IT_SUPPORT') {
    menuItems = supportMenuItems;
  } else if (userRole === 'AUDITOR') {
    menuItems = auditMenuItems;
  } else if (userRole === 'FINANCE') {
    menuItems = financeMenuItems;
  }


  // Helper to get submenu open state
  const isSubmenuOpen = (key) => {
    if (key === "reward") return showRewardSubmenu;
    if (key === "report") return showReportSubmenu;
    if (key === "user") return showUserSubmenu;
    return false;
  };

  return (
    <div className="sidebar">
      <img
        src={logo}
        alt="Nova Bank Logo"
        className="w-[134.93px] h-[50px]"
      />
      <div className="navlinks">
        {menuItems.map((item, idx) =>
          item.submenu ? (
            <div key={idx}>
              <div
                onClick={() => toggleSubmenu(item.submenuKey)}
                className={
                  location.pathname.includes(item.submenuKey)
                    ? "sidebar-link sidebar-link-active"
                    : "sidebar-link"
                }
                style={{ cursor: "pointer" }}
              >
                {item.icon} {item.label}{" "}
                {isSubmenuOpen(item.submenuKey) ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              <div className={`submenu ${isSubmenuOpen(item.submenuKey) ? 'submenu-open' : ''}`}>
                {item.submenu.map((sub, subIdx) => (
                  <NavLink
                    key={subIdx}
                    to={sub.to}
                    className="submenu-link"
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              {item.icon} {item.label}
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}

export default SideBar;