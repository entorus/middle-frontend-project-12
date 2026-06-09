import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuthenticated, logout } from '../../slices/authSlice'

function Header() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(checkUserAuthenticated)
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar
      bg="primary"
      expand="lg"
      className="bg-body-tertiary justify-content-between"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="#">Chat Lesson</Navbar.Brand>
        {isAuthenticated && <Button onClick={handleLogout}>Выйти</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
