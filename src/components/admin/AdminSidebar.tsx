import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900 shadow-md">
        <span className="text-white text-xl font-semibold uppercase">
          NutriFlow Admin
        </span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          Dashboard
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M12 20.005v-2.355A4.002 4.002 0 0016 13.5c0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.72.68 3.29 1.81 4.445v2.355a1 1 0 001 1h4a1 1 0 001-1z"
            ></path>
          </svg>
          Users
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 16h.01"
            ></path>
          </svg>
          Orders
        </Link>
      </nav>
    </div>
  )
}

export default AdminSidebar
