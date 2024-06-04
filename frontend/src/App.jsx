import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './GuestPages/Login'
import NoPage from './GuestPages/NoPage'
import Register from './GuestPages/Register'
import ForgetPassword from './GuestPages/ForgetPassword'
import DashboardIndex from './AuthPages/Pages/Dashboard/Index'
import VendorList from './AuthPages/Pages/Vendors/List'

function App() {
  return (
    <>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<NoPage />} />
      
        {/* Protected Routes */}
        <Route path="/admin/dashboard" element={<DashboardIndex />} />
        <Route path="/admin/vendors" element={<VendorList />} />
      </Routes>
      
    </>
  )
}

export default App
