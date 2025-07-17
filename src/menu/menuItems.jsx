import { MdAddLocationAlt } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsDatabaseFillGear } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { FaBuildingUser, FaUsersGear } from "react-icons/fa6";


export const controlMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Manage Assets",
    to: "/manage-assets",
    icon: <BsDatabaseFillGear size={20} />,
  },
  {
    label: "Manage Categories",
    to: "/manage-categories",
    icon: <TbCategoryPlus size={20} />,
  },
  {
    label: "Manage Locations",
    to: "/manage-locations",
    icon: <MdAddLocationAlt size={20} />,
  },
  {
    label: "Manage Departments",
    to: "/manage-departments",
    icon: <FaBuildingUser size={20} />,
  }
];

export const adminMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "User Management",
    to: "/user",
    icon: <FaUsersGear size={20} />,
    submenuKey: "user",
    submenu: [
      { label: "Create User", to: "/create-user" },
      { label: "Edit Role", to: "/edit-user" },
      { label: "Deactivate User", to: "/delete-user" },
    ],
  },
];


export const corporateMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "View Assets",
    to: "/view",
    icon: <CiBoxList size={20} />,
  },
  {
    label: "Manage Assets",
    to: "/asset",
    icon: <BsDatabaseFillGear size={20} />,
    submenuKey: "asset",
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
    icon: <TbLayoutDashboardFilled size={20} />,
  }
];

export const financeMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  }
];

export const supportMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  }
];