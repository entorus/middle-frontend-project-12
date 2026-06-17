import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAuthenticated, logout } from '../../slices/authSlice'
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(checkUserAuthenticated)
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow-sm"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {isAuthenticated && <Button variant="outline-light" size="sm" onClick={handleLogout}>{t('navigation.logout')}</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
