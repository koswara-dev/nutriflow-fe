import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-r from-green-500 to-green-700 text-white py-20 md:py-32"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Sederhanakan Dapur Sehat Anda dengan NutriFlow
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manajemen Rantai Pasok yang Efisien untuk Bahan Baku Segar dan
            Operasi Optimal.
          </p>
          <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
            Pelajari Lebih Lanjut
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* Placeholder for an image or illustration */}
          <div className="w-64 h-64 md:w-96 md:h-96 bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              Ilustrasi di Sini
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
