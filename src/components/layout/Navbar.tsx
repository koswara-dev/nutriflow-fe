import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          NutriFlow
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="text-gray-700 hover:text-green-600">
            Beranda
          </a>
          <a href="#features" className="text-gray-700 hover:text-green-600">
            Fitur
          </a>
          <a href="#about" className="text-gray-700 hover:text-green-600">
            Tentang Kami
          </a>
          <a href="#contact" className="text-gray-700 hover:text-green-600">
            Kontak
          </a>
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Masuk
          </Link>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button */}
          <button className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
