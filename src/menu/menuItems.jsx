import { MdAddLocationAlt } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsDatabaseFillGear } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { FaBuildingUser, FaUsersGear } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { HiCollection } from "react-icons/hi";

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
  },
];

export const adminMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Create Department",
    to: "/manage-departments",
    icon: <FaBuildingUser size={20} />,
  },
  {
    label: "User Management",
    to: "/create-user",
    icon: <FaUsersGear size={20} />,
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
    label: "All Assets",
    to: "/dashboard",
    icon: <HiCollection size={20} />,
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
  {
    label: "Asset History",
    to: "/history",
    icon: <FaHistory size={20} />,
  },
];

export const auditMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "View Log",
    to: "/view-log",
    icon: <FaHistory size={20} />,
  },
];

export const financeMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },

  {
    label: "View Assets",
    to: "/view-assets",
    icon: <CiBoxList size={20} />,
  },

  {
    label: "Manage Categories",
    to: "/manage-categories",
    icon: <TbCategoryPlus size={20} />,
  },
];

export const supportMenuItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Transfer Assets",
    to: "/transfer-asset",
    icon: <BiTransferAlt size={20} />,
  },
  {
    label: "Assets",
    to: "/it-assets",
    icon: <BsDatabaseFillGear size={20} />,
  },
];
