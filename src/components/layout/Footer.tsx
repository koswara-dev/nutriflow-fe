import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-green-400">NutriFlow</h3>
            <p className="text-gray-400">
              Manajemen Rantai Pasok untuk Dapur Sehat
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#home" className="text-gray-300 hover:text-green-400">
              Beranda
            </a>
            <a href="#features" className="text-gray-300 hover:text-green-400">
              Fitur
            </a>
            <a href="#about" className="text-gray-300 hover:text-green-400">
              Tentang Kami
            </a>
            <a href="#contact" className="text-gray-300 hover:text-green-400">
              Kontak
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-4">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} NutriFlow. Semua hak dilindungi
            undang-undang.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
