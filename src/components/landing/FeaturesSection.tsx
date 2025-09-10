import React from 'react'

const FeatureCard: React.FC<{
  icon: string
  title: string
  description: string
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
    <div className="text-green-600 text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '📦',
      title: 'Manajemen Inventaris',
      description:
        'Lacak bahan baku, pantau tingkat stok, dan kurangi pemborosan dengan pembaruan real-time.'
    },
    {
      icon: '🚚',
      title: 'Integrasi Pemasok',
      description:
        'Terhubung dengan pemasok Anda secara mulus untuk pemesanan otomatis dan pelacakan pengiriman.'
    },
    {
      icon: '📊',
      title: 'Analitik & Pelaporan',
      description:
        'Dapatkan wawasan tentang kinerja rantai pasok Anda dengan dasbor komprehensif.'
    },
    {
      icon: '✅',
      title: 'Kontrol Kualitas',
      description:
        'Pastikan kesegaran dan kualitas bahan baku Anda dari pertanian hingga dapur.'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Fitur Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
