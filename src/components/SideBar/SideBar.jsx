import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../SideBar/SideBar.css';
import logo from '../../assets/novabank_logo copy.png';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';
import { adminMenuItems, auditMenuItems, controlMenuItems, corporateMenuItems, financeMenuItems, supportMenuItems } from '../../menu/menuItems';



const SideBar = ({
  showUserSubmenu,
  toggleSubmenu,
  showAssetSubmenu,
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
  } else if (userRole === 'SUPER_ADMIN') {
    menuItems = adminMenuItems;
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
    if (key === "actions") return showAssetSubmenu;
    if (key === "report") return showReportSubmenu;
    if (key === "user") return showUserSubmenu;
    return false;
  };

  const pathname = location.pathname; 
// "/assetportal/users/profile"
 
const normalizedPath = pathname.replace(/^\/?assetportal\//, "");

  return (
    <div className="sidebar">
      <img
        src={logo}
        alt="Nova Bank Logo"
        className="w-[190px] h-[90px]"
      />
      <div className="navlinks">
        {menuItems.map((item, idx) =>
          item.submenu ? (
            <div key={idx}>
              <div
                onClick={() => toggleSubmenu(item.submenuKey)}
                className={
                  normalizedPath.includes(item.submenuKey)
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
                    onClick={() => console.log("submenu item", sub)}
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
              end
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