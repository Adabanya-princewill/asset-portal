import React, { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../admin/AdminDashboard.css';
import './DashboardLayout.css';
import TopBanner from '../Top Banner/TopBanner';
import SideBar from '../SideBar/SideBar';
import MobileSidebar from '../SideBar/MobileSideBar';
import { useClickOutside } from '../hooks/ClickOutside';

const DashboardLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showRewardSubmenu, setShowRewardSubmenu] = useState(false);
  const [showReportSubmenu, setShowReportSubmenu] = useState(false);
  const [showUserSubmenu, setShowUserSubmenu] = useState(false);

  //const {user } = useContext(AuthContext);

  const toggleSubmenu = (option) => {
    if (option == "reward") {
      return setShowRewardSubmenu(!showRewardSubmenu);
    }
    if (option == "user") {
      return setShowUserSubmenu(!showUserSubmenu);
    }
    // else option is report
    setShowReportSubmenu(!showReportSubmenu)
  };

  const toggleSidebar = () => {
    setShowDropdown(!showDropdown);
  };

  useClickOutside(dropdownRef, () => setShowDropdown(false));

  
  return (
    <div>
      {/* Dropdown  starts */}
      <MobileSidebar
        showDropdown={showDropdown}
        dropdownRef={dropdownRef}
        toggleSubmenu={toggleSubmenu}
        showRewardSubmenu={showRewardSubmenu}
        showReportSubmenu={showReportSubmenu}
        showUserSubmenu={showUserSubmenu}
      />
      {/*Dropdown ends  */}
      <TopBanner toggleSidebar={toggleSidebar} />
      <div className='wrapper'>
        <SideBar
          toggleSubmenu={toggleSubmenu}
          showRewardSubmenu={showRewardSubmenu}
          showReportSubmenu={showReportSubmenu}
          showUserSubmenu={showUserSubmenu}
        />
        <div className="outlets">
          <Outlet />
         {/* {DashboardComponent ? <DashboardComponent /> : <UnauthorizedPage />} */}
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout;