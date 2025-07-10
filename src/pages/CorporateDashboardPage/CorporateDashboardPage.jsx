import React, { useContext } from 'react'
import './CorporateDashboardPage.css'
import { AuthContext } from '../../contexts/AuthContext'


const CorporateDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className='page-title'>Dashboard</span>
        <div className='dashboard'>
           <h1>Welcome Corporate Services {user?.username} . id: {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default CorporateDashboardPage
