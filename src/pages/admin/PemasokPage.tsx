import React, { useEffect, useState } from 'react'
import { usePemasokStore, Pemasok } from '../../store/usePemasokStore'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import PemasokForm from '../../components/forms/PemasokForm'
import ConfirmModal from '../../components/common/ConfirmModal'

const PemasokPage: React.FC = () => {
  const { pemasokList, loading, error, fetchPemasok, deletePemasok } =
    usePemasokStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPemasok, setEditingPemasok] = useState<Pemasok | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [pemasokToDeleteId, setPemasokToDeleteId] = useState<number | null>(
    null
  )

  useEffect(() => {
    fetchPemasok()
  }, [fetchPemasok])

  const openModal = (pemasok?: Pemasok) => {
    setEditingPemasok(pemasok || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPemasok(null)
  }

  const handleDeleteClick = (id: number) => {
    setPemasokToDeleteId(id)
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (pemasokToDeleteId !== null) {
      await deletePemasok(pemasokToDeleteId)
      setIsConfirmModalOpen(false)
      setPemasokToDeleteId(null)
    }
  }

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false)
    setPemasokToDeleteId(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="text-lg text-gray-700">Loading Pemasok data...</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Daftar Pemasok</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Tambah Pemasok
          </button>
        </div>

        {pemasokList.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              Tidak ada data pemasok yang tersedia.
            </p>
            <p className="text-gray-500 mt-2">
              Mulai dengan menambahkan pemasok baru.
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
                    Nama Pemasok
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    NIK
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Telepon
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pemasokList.map((pemasok) => (
                  <tr
                    key={pemasok.id}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                      {pemasok.id}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {pemasok.namaPemasok}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {pemasok.nik}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {pemasok.alamat}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                      {pemasok.telepon}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(pemasok)}
                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center"
                      >
                        <PencilIcon className="h-5 w-5 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(pemasok.id)}
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
      <PemasokForm
        isOpen={isModalOpen}
        onClose={closeModal}
        editingPemasok={editingPemasok}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Pemasok"
        message="Are you sure you want to delete this pemasok? This action cannot be undone."
      />
    </div>
  )
}

export default PemasokPage
