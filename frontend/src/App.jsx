import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './GuestPages/Login'
import NoPage from './GuestPages/NoPage'
import Register from './GuestPages/Register'
import ForgetPassword from './GuestPages/ForgetPassword'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </>
  )
}

export default App
