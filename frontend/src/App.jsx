import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './GuestPages/Login'
import NoPage from './GuestPages/NoPage'
import Register from './GuestPages/Register'
import ForgetPassword from './GuestPages/ForgetPassword'
import DashboardIndex from './AuthPages/Pages/Dashboard/Index'
import VendorList from './AuthPages/Pages/Vendors/List'
import VendorForm from './AuthPages/Pages/Vendors/Form'
import CustomerList from './AuthPages/Pages/Customers/List'
import CustomerForm from './AuthPages/Pages/Customers/Form'
import ItemList from './AuthPages/Pages/Items/List'
import ItemForm from './AuthPages/Pages/Items/Form'
import OrderPurchaseList from './AuthPages/Pages/OrderPurchase/List'
import OrderPurchaseForm from './AuthPages/Pages/OrderPurchase/Form'
import OrderPurchaseDetail from './AuthPages/Pages/OrderPurchase/Detail'
import OrderSellList from './AuthPages/Pages/OrderSell/List'
import OrderSellDetail from './AuthPages/Pages/OrderSell/Detail'
import OrderSellForm from './AuthPages/Pages/OrderSell/Form'
import BankList from './AuthPages/Pages/Bank/List'
import BankForm from './AuthPages/Pages/Bank/Form'

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

        {/* Dashboard */}
        <Route path="/admin/dashboard" element={<DashboardIndex />} />
        
        {/* Bank */}
        <Route path="/admin/banks" element={<BankList />} />
        <Route path="/admin/bank-add" element={<BankForm />} />
        <Route path="/admin/bank-edit/:id" element={<BankForm />} />
        
        {/* Vendor */}
        <Route path="/admin/vendors" element={<VendorList />} />
        <Route path="/admin/vendor-add" element={<VendorForm />} />
        <Route path="/admin/vendor-edit/:id" element={<VendorForm />} />
        
        {/* Customer */}
        <Route path="/admin/customers" element={<CustomerList />} />
        <Route path="/admin/customer-add" element={<CustomerForm />} />
        <Route path="/admin/customer-edit/:id" element={<CustomerForm />} />
        
        {/* Item */}
        <Route path="/admin/items" element={<ItemList />} />
        <Route path="/admin/item-add" element={<ItemForm />} />
        <Route path="/admin/item-edit/:id" element={<ItemForm />} />
        
        {/* Order Purchase */}
        <Route path="/admin/orders-purchase" element={<OrderPurchaseList />} />
        <Route path="/admin/orders-purchase-detail/:id" element={<OrderPurchaseDetail />} />
        <Route path="/admin/orders-purchase-add" element={<OrderPurchaseForm />} />
        <Route path="/admin/orders-purchase-edit/:id" element={<OrderPurchaseForm />} />
        
        {/* Order Purchase */}
        <Route path="/admin/orders-sales" element={<OrderSellList />} />
        <Route path="/admin/orders-sales-detail/:id" element={<OrderSellDetail />} />
        <Route path="/admin/orders-sales-add" element={<OrderSellForm />} />
        <Route path="/admin/orders-sales-edit/:id" element={<OrderSellForm />} />
      </Routes>
      
    </>
  )
}

export default App
