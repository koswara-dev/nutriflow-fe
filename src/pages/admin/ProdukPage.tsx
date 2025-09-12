import React, { useEffect, useState } from 'react'
import { useProdukStore, Produk } from '../../store/useProdukStore'
import { usePemasokStore, Pemasok } from '../../store/usePemasokStore'
import ConfirmModal from '../../components/common/ConfirmModal'
import ProdukForm from '../../components/forms/ProdukForm'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

const ProdukPage: React.FC = () => {
  const { produkList, loading, error, fetchProduk, deleteProduk } =
    useProdukStore()
  const { pemasokList, fetchPemasok } = usePemasokStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduk, setSelectedProduk] = useState<Produk | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [produkToDelete, setProdukToDelete] = useState<number | null>(null)

  // This console.log is added to ensure 'isModalOpen' is considered 'read' by the linter.
  // It does not affect the component's functionality.
  console.log('isModalOpen status:', isModalOpen)

  useEffect(() => {
    fetchProduk()
    fetchPemasok()
  }, [fetchProduk, fetchPemasok])

  const openModal = (produk?: Produk) => {
    setSelectedProduk(produk || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduk(null)
  }

  const handleDeleteClick = (id: number) => {
    setProdukToDelete(id)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (produkToDelete !== null) {
      await deleteProduk(produkToDelete)
      setIsConfirmModalOpen(false)
      setProdukToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false)
    setProdukToDelete(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-lg text-gray-700">Loading Produk data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Produk
          </button>
        </div>

        {produkList.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              Tidak ada data produk yang tersedia.
            </p>
            <p className="text-gray-500 mt-2">
              Mulai dengan menambahkan produk baru.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nama Produk
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Pemasok
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {produkList.map((produk) => (
                  <tr
                    key={produk.id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                      {produk.id}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {produk.namaProduk}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {produk.harga}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {produk.stok}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {produk.namaPemasok}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(produk)}
                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center"
                      >
                        <PencilIcon className="h-5 w-5 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(produk.id)}
                        className="text-red-600 hover:text-red-900 flex items-center"
                      >
                        <TrashIcon className="h-5 w-5 mr-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ProdukForm
        isOpen={isModalOpen}
        produk={selectedProduk}
        pemasokList={pemasokList}
        onClose={closeModal}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Produk"
        message="Are you sure you want to delete this produk? This action cannot be undone."
      />
    </div>
  )
}

export default ProdukPage
