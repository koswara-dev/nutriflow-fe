import React from 'react'
import './App.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/auth/LoginPage'
import NotFoundPage from './pages/misc/NotFoundPage'
import DashboardPage from './pages/admin/DashboardPage'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardPage />} />{' '}
        {/* Default admin route */}
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/users" element={<div>Users Management</div>} />
        <Route
          path="/admin/products"
          element={<div>Products Management</div>}
        />
        <Route path="/admin/orders" element={<div>Orders Management</div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
