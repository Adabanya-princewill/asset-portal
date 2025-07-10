import React, { useContext } from 'react'
import './SupportDashboardPage.css'
import { AuthContext } from '../../contexts/AuthContext'


const SupportDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className='page-title'>Dashboard</span>
        <div className='dashboard'>
          <h1>Welcome IT Support {user?.username} . id: {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default SupportDashboardPage
