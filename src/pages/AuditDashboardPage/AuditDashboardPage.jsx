import { useContext } from 'react'
import './AuditDashboardPage.css'
import { AuthContext } from '../../contexts/AuthContext'


const AuditDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className='page-title'>Dashboard</span>
        <div className='dashboard'>
          <h1>Welcome Audit {user?.username} . id: {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default AuditDashboardPage
