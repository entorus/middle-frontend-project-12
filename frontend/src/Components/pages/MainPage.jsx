import { Link, Navigate } from 'react-router-dom'
import { checkUserAuthenticated } from '../../slices/authSlice'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const isAuth = useSelector(checkUserAuthenticated)

  if (! isAuth) {
    return <Navigate to="/login" replace />
  }
  
  return <nav>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
}

export default MainPage
