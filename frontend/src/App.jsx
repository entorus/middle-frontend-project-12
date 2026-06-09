import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/Pages/LoginPage'
import MainPage from './Components/Pages/MainPage'
import RegisterPage from './Components/Pages/RegisterPage'
import NotFoundPage from './Components/Pages/NotFoundPage'
import Header from './Components/layout/Header'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <div className="app">
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/> } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  )
}

export default App
