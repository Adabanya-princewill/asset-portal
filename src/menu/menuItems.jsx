import { FaMedal } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { LuFileUser } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";

//asset mana
//manage cate ; create edit delete
//mana lo
//mana de

export const controlMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    label: "Manage Assets",
    to: "/manage-assets",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    label: "Manage Categories",
    to: "/manage-categories",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    label: "Manage Locations",
    to: "/manage-locations",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    label: "Manage Departments",
    to: "/manage-departments",
    icon: <MdOutlineSpaceDashboard size={25} />,
  }
];

export const adminMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  // {
  //   label: "Reward Management",
  //   icon: <FaMedal size={25} />,
  //   submenuKey: "reward",
  //   submenu: [
  //     { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //     { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //   ],
  // },
  // {
  //   label: "My Referrals",
  //   to: "/referrals",
  //   icon: <IoIosPeople size={25} />,
  // },
  // {
  //   label: "Report",
  //   icon: <FiFileText size={25} />,
  //   submenuKey: "report",
  //   submenu: [
  //     { label: "Total referrals", to: "/report/total-referrals" },
  //     { label: "Earning approved", to: "/report/earning-approved" },
  //     { label: "Top referrals", to: "/report/top-referrals" },
  //   ],
  // },
  {
    label: "User Management",
    to: "/user",
    icon: <LuFileUser size={25} />,
    submenuKey: "user",
    submenu: [
      { label: "Create User", to: "/create-user" },
      { label: "Edit Role", to: "/edit-user" },

    ],
  },
];

export const corporateMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  {
    label: "View Assets",
    to: "/assets",
    icon: <IoIosPeople size={25} />,
  },
  {
    label: "Manage Assets",
    icon: <FaMedal size={25} />,
    submenuKey: "reward",
    submenu: [
      { label: "Create Asset", to: "/create-asset" },
      { label: "Transfer Asset", to: "/transfer-asset" },
      { label: "Retrieve Asset", to: "/retrieve-asset" },
    ],
  },
];

export const auditMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  //   {
  //     label: "Reward Management",
  //     icon: <FaMedal size={25} />,
  //     submenuKey: "reward",
  //     submenu: [
  //       { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //       { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //     ],
  //   },
  //   {
  //     label: "My Referrals",
  //     to: "/referrals",
  //     icon: <IoIosPeople size={25} />,
  //   },
  //   {
  //     label: "Report",
  //     icon: <FiFileText size={25} />,
  //     submenuKey: "report",
  //     submenu: [
  //       { label: "Total referrals", to: "/report/total-referrals" },
  //       { label: "Earning approved", to: "/report/earning-approved" },
  //       { label: "Top referrals", to: "/report/top-referrals" },
  //     ],
  //   },
  //   {
  //     label: "User Management",
  //     icon: <LuFileUser size={25} />,
  //     submenuKey: "user",
  //     submenu: [
  //       { label: "Create role", to: "/user/create-role" },
  //       { label: "Create user", to: "/user/create-user" },
  //       { label: "Modify User Role", to: "/user/modify-user" },
  //     ],
  //   },
];

export const financeMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  //   {
  //     label: "Reward Management",
  //     icon: <FaMedal size={25} />,
  //     submenuKey: "reward",
  //     submenu: [
  //       { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //       { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //     ],
  //   },
  //   {
  //     label: "My Referrals",
  //     to: "/referrals",
  //     icon: <IoIosPeople size={25} />,
  //   },
  //   {
  //     label: "Report",
  //     icon: <FiFileText size={25} />,
  //     submenuKey: "report",
  //     submenu: [
  //       { label: "Total referrals", to: "/report/total-referrals" },
  //       { label: "Earning approved", to: "/report/earning-approved" },
  //       { label: "Top referrals", to: "/report/top-referrals" },
  //     ],
  //   },
  //   {
  //     label: "User Management",
  //     icon: <LuFileUser size={25} />,
  //     submenuKey: "user",
  //     submenu: [
  //       { label: "Create role", to: "/user/create-role" },
  //       { label: "Create user", to: "/user/create-user" },
  //       { label: "Modify User Role", to: "/user/modify-user" },
  //     ],
  //   },
];



export const supportMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <MdOutlineSpaceDashboard size={25} />,
  },
  //   {
  //     label: "Reward Management",
  //     icon: <FaMedal size={25} />,
  //     submenuKey: "reward",
  //     submenu: [
  //       { label: "Sure Pay", to: "/rewards/surepay-bonus" },
  //       { label: "Chairman Bonus", to: "/rewards/chairman-bonus" },
  //     ],
  //   },
  //   {
  //     label: "My Referrals",
  //     to: "/referrals",
  //     icon: <IoIosPeople size={25} />,
  //   },
  //   {
  //     label: "Report",
  //     icon: <FiFileText size={25} />,
  //     submenuKey: "report",
  //     submenu: [
  //       { label: "Total referrals", to: "/report/total-referrals" },
  //       { label: "Earning approved", to: "/report/earning-approved" },
  //       { label: "Top referrals", to: "/report/top-referrals" },
  //     ],
  //   },
  //   {
  //     label: "User Management",
  //     icon: <LuFileUser size={25} />,
  //     submenuKey: "user",
  //     submenu: [
  //       { label: "Create role", to: "/user/create-role" },
  //       { label: "Create user", to: "/user/create-user" },
  //       { label: "Modify User Role", to: "/user/modify-user" },
  //     ],
  //   },
];