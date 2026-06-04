import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/Pages/LoginPage'
import MainPage from './Components/Pages/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/> } />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
