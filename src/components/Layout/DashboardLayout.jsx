import { useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css';
import TopBanner from '../Top Banner/TopBanner';
import SideBar from '../SideBar/SideBar';
import MobileSidebar from '../SideBar/MobileSideBar';
import { useClickOutside } from '../hooks/ClickOutside';

const DashboardLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showAssetSubmenu, setShowAssetSubmenu] = useState(false);
  const [showReportSubmenu, setShowReportSubmenu] = useState(false);
  const [showUserSubmenu, setShowUserSubmenu] = useState(false);

  const toggleSubmenu = (option) => {
    if (option == "asset") {
      return setShowAssetSubmenu(!showAssetSubmenu);
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
      <MobileSidebar
        showDropdown={showDropdown}
        dropdownRef={dropdownRef}
        toggleSubmenu={toggleSubmenu}
        showAssetSubmenu={showAssetSubmenu}
        showReportSubmenu={showReportSubmenu}
        showUserSubmenu={showUserSubmenu}
      />

      <div className='wrapper'>
        <SideBar
          toggleSubmenu={toggleSubmenu}
          showAssetSubmenu={showAssetSubmenu}
          showReportSubmenu={showReportSubmenu}
          showUserSubmenu={showUserSubmenu}
        />
        <div className="outlets">
          <TopBanner toggleSidebar={toggleSidebar} />
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout;