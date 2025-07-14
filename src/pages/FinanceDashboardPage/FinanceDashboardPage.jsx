import { useContext } from 'react'
import './FinanceDashboardPage.css'
import { AuthContext } from '../../contexts/AuthContext'


const FinanceDashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="main-dashboard">
        <span className='page-title'>Dashboard</span>
        <div className='dashboard'>
          <h1>Welcome Finance {user?.username} . id: {user?.id}</h1>
        </div>
      </div>
    </>
  )
}

export default FinanceDashboardPage
