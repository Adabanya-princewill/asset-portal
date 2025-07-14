import { useContext } from 'react'
import './ControlDashboardPage.css'
import { AuthContext } from '../../contexts/AuthContext'


const ControlDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className='page-title'>Dashboard</span>
        <div className='dashboard'>
          <h1>Welcome Control {user?.username} . id: {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default ControlDashboardPage;
