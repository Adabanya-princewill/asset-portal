import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/novabank_logo.png';
import { FaAngleDown, FaAngleUp, FaMedal } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { FiFileText } from "react-icons/fi";
import { LuFileUser } from "react-icons/lu";
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';

const adminMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  // {
  //   label: "Reward Management",
  //   icon: <FaMedal size={20} />,
  //   submenuKey: "reward",
  //   submenu: [
  //     { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //     { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //   ],
  // },
  // {
  //   label: "My Referrals",
  //   to: "/referrals",
  //   icon: <IoIosPeople size={20} />,
  // },
  // {
  //   label: "Report",
  //   icon: <FiFileText size={20} />,
  //   submenuKey: "report",
  //   submenu: [
  //     { label: "Total referrals", to: "/report/total-referrals" },
  //     { label: "Earning approved", to: "/report/earning-approved" },
  //     { label: "Top referrals", to: "/report/top-referrals" },
  //   ],
  // },
  {
    label: "User Management",
    to: "/",
    icon: <LuFileUser size={20} />,
    submenuKey: "user",
    submenu: [
      { label: "Create user", to: "/create-user" },
      { label: "Edit role", to: "/edit-role" },
    ],
  },
];

const auditMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  // {
  //   label: "Reward Management",
  //   icon: <FaMedal size={20} />,
  //   submenuKey: "reward",
  //   submenu: [
  //     { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //     { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //   ],
  // },
  // {
  //   label: "My Referrals",
  //   to: "/referrals",
  //   icon: <IoIosPeople size={20} />,
  // },
  // {
  //   label: "Report",
  //   icon: <FiFileText size={20} />,
  //   submenuKey: "report",
  //   submenu: [
  //     { label: "Total referrals", to: "/report/total-referrals" },
  //     { label: "Earning approved", to: "/report/earning-approved" },
  //     { label: "Top referrals", to: "/report/top-referrals" },
  //   ],
  // },
  // {
  //   label: "User Management",
  //   icon: <LuFileUser size={20} />,
  //   submenuKey: "user",
  //   submenu: [
  //     // { label: "Create role", to: "/user/create-role" },
  //     // { label: "Create user", to: "/user/create-user" },
  //     { label: "Modify User Role", to: "/user/modify-user" },
  //   ],
  // },
];

const itSupportMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  {
    label: "Reward Management",
    icon: <FaMedal size={20} />,
    submenuKey: "reward",
    submenu: [
      { label: "Sure Pay", to: "/rewards/surepay-bonus" },
      { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
    ],
  },
  {
    label: "My Referrals",
    to: "/referrals",
    icon: <IoIosPeople size={20} />,
  },
  {
    label: "Report",
    icon: <FiFileText size={20} />,
    submenuKey: "report",
    submenu: [
      { label: "Total referrals", to: "/report/total-referrals" },
      { label: "Earning approved", to: "/report/earning-approved" },
      { label: "Top referrals", to: "/report/top-referrals" },
    ],
  },
  {
    label: "User Management",
    icon: <LuFileUser size={20} />,
    submenuKey: "user",
    submenu: [
      // { label: "Create role", to: "/user/create-role" },
      // { label: "Create user", to: "/user/create-user" },
      { label: "Modify User Role", to: "/user/modify-user" },
    ],
  },
];

const financeMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  // {
  //   label: "Reward Management",
  //   icon: <FaMedal size={20} />,
  //   submenuKey: "reward",
  //   submenu: [
  //     { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //     { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //   ],
  // },
  // {
  //   label: "My Referrals",
  //   to: "/referrals",
  //   icon: <IoIosPeople size={20} />,
  // },
  {
    label: "Report",
    icon: <FiFileText size={20} />,
    submenuKey: "report",
    submenu: [
      { label: "Total referrals", to: "/report/total-referrals" },
      { label: "Earning approved", to: "/report/earning-approved" },
      { label: "Top referrals", to: "/report/top-referrals" },
    ],
  },
  // {
  //   label: "User Management",
  //   icon: <LuFileUser size={20} />,
  //   submenuKey: "user",
  //   submenu: [
  //     // { label: "Create role", to: "/user/create-role" },
  //     // { label: "Create user", to: "/user/create-user" },
  //     { label: "Modify User Role", to: "/user/modify-user" },
  //   ],
  // },
];

const controlMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  {
    label: "Reward Management",
    icon: <FaMedal size={20} />,
    submenuKey: "reward",
    submenu: [
      { label: "Sure Pay", to: "/rewards/surepay-bonus" },
      { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
    ],
  },
  {
    label: "My Referrals",
    to: "/referrals",
    icon: <IoIosPeople size={20} />,
  },
  {
    label: "Report",
    icon: <FiFileText size={20} />,
    submenuKey: "report",
    submenu: [
      { label: "Total referrals", to: "/report/total-referrals" },
      { label: "Earning approved", to: "/report/earning-approved" },
      { label: "Top referrals", to: "/report/top-referrals" },
    ],
  },
];

const corporateMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={20} />,
  },
  {
    label: "Reward Management",
    icon: <FaMedal size={20} />,
    submenuKey: "reward",
    submenu: [
      { label: "Sure Pay", to: "/rewards/surepay-bonus" },
      { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
    ],
  },
  {
    label: "My Referrals",
    to: "/referrals",
    icon: <IoIosPeople size={20} />,
  },
  {
    label: "Report",
    icon: <FiFileText size={20} />,
    submenuKey: "report",
    submenu: [
      { label: "Total referrals", to: "/report/total-referrals" },
      { label: "Earning approved", to: "/report/earning-approved" },
      { label: "Top referrals", to: "/report/top-referrals" },
    ],
  },
];
// Add other role menu arrays as needed

const MobileSidebar = ({
  showUserSubmenu,
  toggleSubmenu,
  showDropdown,
  showRewardSubmenu,
  dropdownRef,
  showReportSubmenu
}) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const userRole = user?.role;

  let menuItems = [];
  if (userRole === 'ADMIN') {
    menuItems = adminMenuItems;
  } else if (userRole === 'AUDITOR') {
    menuItems = auditMenuItems;
  } else if (userRole === 'IT_SUPPORT') {
    menuItems = itSupportMenuItems;
  } else if (userRole === 'FINANCE') {
    menuItems = financeMenuItems;
  } else if (userRole === 'INTERNAL_CONTROL') {
    menuItems = controlMenuItems;
  } else if (userRole === 'CORPORATE_SERVICE') {
    menuItems = corporateMenuItems;
  }

  const isSubmenuOpen = (key) => {
    if (key === "reward") return showRewardSubmenu;
    if (key === "report") return showReportSubmenu;
    if (key === "user") return showUserSubmenu;
    return false;
  };

  return (
    <>
      <div ref={dropdownRef} className={`dropdown-sidebar ${showDropdown ? 'active' : ''}`}>
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
                  className={`${location.pathname.includes(item.submenuKey) ? "sidebar-link sidebar-link-active" : "sidebar-link"}`}
                  style={{ cursor: "pointer" }}
                >
                  {item.icon} {item.label} {isSubmenuOpen(item.submenuKey) ? <FaAngleUp /> : <FaAngleDown />}
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
    </>
  )
}

export default MobileSidebar
