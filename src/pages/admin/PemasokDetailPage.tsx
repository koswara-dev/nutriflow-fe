import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePemasokStore } from '../../store/usePemasokStore'
import { QRCode } from 'react-qrcode-logo' // Import QRCode component

const PemasokDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedPemasok, fetchPemasokById, loading, error } =
    usePemasokStore()

  useEffect(() => {
    if (id) {
      fetchPemasokById(id)
    }
  }, [id, fetchPemasokById])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Pemasok Details...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <h1 className="text-2xl font-bold mb-4">Error: {error}</h1>
        <button
          onClick={() => navigate('/admin/pemasok')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Pemasok List
        </button>
      </div>
    )
  }

  if (!selectedPemasok) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Pemasok not found.</h1>
        <button
          onClick={() => navigate('/admin/pemasok')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Pemasok List
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pemasok Details</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">ID Pemasok:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.id}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Nama Pemasok:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.namaPemasok}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">NIK:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.nik}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Alamat:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.alamat}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Telepon:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.telepon}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Jenis Pemasok:</p>
            <p className="text-gray-900 font-medium text-lg">
              {selectedPemasok.jenisPemasok}
            </p>
          </div>
        </div>
      </div>

      {selectedPemasok.logoUrl && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Logo Pemasok</h2>
          <img
            src={selectedPemasok.logoUrl}
            alt={`${selectedPemasok.namaPemasok} Logo`}
            className="max-w-xs h-auto rounded-md shadow-md"
          />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">QR Code NIK</h2>
        <QRCode value={selectedPemasok.nik} size={200} />
        <p className="text-gray-600 text-sm mt-2">
          Scan to view NIK: {selectedPemasok.nik}
        </p>
      </div>

      {selectedPemasok.latitude && selectedPemasok.longitude && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Lokasi Pemasok
          </h2>
          <div className="w-full h-96">
            <iframe
              title="Pemasok Location"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${selectedPemasok.latitude},${selectedPemasok.longitude}&output=embed`}
            ></iframe>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <a
          href={`https://wa.me/${selectedPemasok.telepon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center"
        >
          <img
            src="https://img.icons8.com/?size=48&id=16713&format=png&color=000000"
            alt="WhatsApp Icon"
            className="w-5 h-5 mr-2"
          />
          WhatsApp Me
        </a>
        <button
          onClick={() => navigate('/admin/pemasok')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Back to List
        </button>
      </div>
    </div>
  )
}

export default PemasokDetailPage
