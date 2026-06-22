import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/pages/LoginPage'
import MainPage from './Components/pages/MainPage'
import RegisterPage from './Components/pages/RegisterPage'
import NotFoundPage from './Components/pages/NotFoundPage'
import Header from './Components/layout/Header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider, ErrorBoundary } from '@rollbar/react'

const rollbarAccessToken = import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN

const rollbarConfig = {
  accessToken: rollbarAccessToken,
  environment: import.meta.env.MODE,
  enabled: Boolean(rollbarAccessToken),
  captureUncaught: true,
  captureUnhandledRejections: true,
}

function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div className="app vh-100">
          <Header />
          <Container className="py-4 py-lg-5 h-100">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage/> } />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<RegisterPage />} />
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
      </ErrorBoundary>
    </Provider>
  )
}

export default App
