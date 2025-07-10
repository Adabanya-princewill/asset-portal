import React, { useContext } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';
import './TopBanner.css';

const TopBanner = ({ toggleSidebar }) => {
  const iconSize = 30;
  const { user } = useContext(AuthContext);

  return (
    <div className='welcome'>
      <FaUserCircle fill='#241B5E' size={iconSize} />
      <span className='text'>Welcome, {user.username}</span>
      <button className='menu-btn' onClick={toggleSidebar}>☰</button>
    </div>
  )
}

export default TopBanner;
