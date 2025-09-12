import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/auth/LoginPage'
import NotFoundPage from './pages/misc/NotFoundPage'
import DashboardPage from './pages/admin/DashboardPage'
import AdminLayout from './components/admin/AdminLayout'
import PemasokPage from './pages/admin/PemasokPage'
import ProdukPage from './pages/admin/ProdukPage' // Import ProdukPage
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="pemasok" element={<PemasokPage />} />
          <Route path="produk" element={<ProdukPage />} />{' '}
          {/* Add ProdukPage route */}
          <Route path="users" element={<div>Users Management</div>} />
          <Route path="orders" element={<div>Orders Management</div>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
)
