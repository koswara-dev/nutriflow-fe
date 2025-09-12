import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/assets/images/favicon.png'
import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  CircleStackIcon,
  ArchiveBoxArrowDownIcon
} from '@heroicons/react/24/outline'

const AdminSidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900 shadow-md">
        <img src={logo} alt="NutriFlow Logo" className="h-10 w-10 mr-2" />
        <span className="text-white text-xl font-semibold uppercase">
          NutriFlow Admin
        </span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <HomeIcon className="w-6 h-6 mr-3" />
          Dashboard
        </Link>
        <Link
          to="/admin/pemasok"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <ArchiveBoxArrowDownIcon className="w-6 h-6 mr-3" />
          Pemasok
        </Link>
        <Link
          to="/admin/produk"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <CircleStackIcon className="w-6 h-6 mr-3" />
          Produk
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <UsersIcon className="w-6 h-6 mr-3" />
          Users
        </Link>
        <Link
          to="/admin/orders"
          className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded-md"
        >
          <ShoppingCartIcon className="w-6 h-6 mr-3" />
          Orders
        </Link>
      </nav>
    </div>
  )
}

export default AdminSidebar
