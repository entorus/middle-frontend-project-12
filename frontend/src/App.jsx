import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/Pages/LoginPage'
import MainPage from './Components/Pages/MainPage'
import RegisterPage from './Components/Pages/RegisterPage'
import NotFoundPage from './Components/Pages/NotFoundPage'
import Header from './Components/layout/Header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}

export default App
