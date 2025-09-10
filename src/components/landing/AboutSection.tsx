import React from 'react'

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          {/* Placeholder for an image or illustration */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-xl font-semibold">
              Gambar Tentang Kami
            </span>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-12 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Tentang NutriFlow
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            NutriFlow berdedikasi untuk merevolusi manajemen rantai pasok untuk
            dapur sehat. Kami memahami tantangan dalam mencari bahan baku segar,
            mengelola inventaris, dan memastikan kualitas di lingkungan yang
            serba cepat.
          </p>
          <p className="text-lg text-gray-600">
            Platform kami menyediakan solusi komprehensif untuk merampingkan
            operasi Anda, mengurangi pemborosan, dan memberdayakan Anda untuk
            fokus pada hal yang paling penting: menciptakan makanan lezat dan
            bergizi.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
