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
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Manage Assets",
    to: "/assetportal/manage-assets",
    icon: <BsDatabaseFillGear size={20} />,
  },
  {
    label: "Manage Categories",
    to: "/assetportal/manage-categories",
    icon: <TbCategoryPlus size={20} />,
  },
  {
    label: "Manage Locations",
    to: "/assetportal/manage-locations",
    icon: <MdAddLocationAlt size={20} />,
  },
  {
    label: "Manage Departments",
    to: "/assetportal/manage-departments",
    icon: <FaBuildingUser size={20} />,
  },
];

export const adminMenuItems = [
  {
    label: "Dashboard",
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Create Department",
    to: "/assetportal/manage-departments",
    icon: <FaBuildingUser size={20} />,
  },
  {
    label: "User Management",
    to: "/assetportal/create-user",
    icon: <FaUsersGear size={20} />,
  },
];

export const corporateMenuItems = [
  {
    label: "Dashboard",
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "View Assets",
    to: "/assetportal/view",
    icon: <CiBoxList size={20} />,
  },
  {
    label: "All Assets",
    to: "/assetportal/dashboard",
    icon: <HiCollection size={20} />,
  },
  {
    label: "Manage Assets",
    to: "/actions",
    icon: <BsDatabaseFillGear size={20} />,
    submenuKey: "actions",
    submenu: [
      { label: "Create Asset", to: "/assetportal/create-asset" },
      { label: "Transfer Asset", to: "/assetportal/transfer-asset" },
      { label: "Retrieve Asset", to: "/assetportal/retrieve-asset" },
    ],
  },
  {
    label: "Asset History",
    to: "/assetportal/history",
    icon: <FaHistory size={20} />,
  },
];

export const auditMenuItems = [
  {
    label: "Dashboard",
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "View Log",
    to: "/assetportal/view-log",
    icon: <FaHistory size={20} />,
  },
];

export const financeMenuItems = [
  {
    label: "Dashboard",
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },

  {
    label: "View Assets",
    to: "/assetportal/view-assets",
    icon: <CiBoxList size={20} />,
  },

  {
    label: "Manage Categories",
    to: "/assetportal/manage-categories",
    icon: <TbCategoryPlus size={20} />,
  },
];

export const supportMenuItems = [
  {
    label: "Dashboard",
    to: "/assetportal",
    icon: <TbLayoutDashboardFilled size={20} />,
  },
  {
    label: "Transfer Assets",
    to: "/assetportal/transfer-asset",
    icon: <BiTransferAlt size={20} />,
  },
  {
    label: "Assets",
    to: "/assetportal/it-assets",
    icon: <BsDatabaseFillGear size={20} />,
  },
];
