import React, { useEffect, useState } from 'react'
import { usePemasokStore, Pemasok } from '../../store/usePemasokStore'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  EyeIcon // Import EyeIcon
} from '@heroicons/react/24/outline'
import PemasokForm from '../../components/forms/PemasokForm'
import ConfirmModal from '../../components/common/ConfirmModal'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const PemasokPage: React.FC = () => {
  const navigate = useNavigate() // Initialize useNavigate
  const {
    pemasokList,
    loading,
    error,
    fetchPemasok,
    deletePemasok,
    pageNumber,
    pageSize,
    totalElements,
    totalPages
  } = usePemasokStore()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPemasok, setEditingPemasok] = useState<Pemasok | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [pemasokToDeleteId, setPemasokToDeleteId] = useState<number | null>(
    null
  )
  const [filterJenisPemasok, setFilterJenisPemasok] = useState<
    Pemasok['jenisPemasok'] | ''
  >('')
  const [searchNamaPemasok, setSearchNamaPemasok] = useState<string>('') // Temporary state for search input
  const [filterNamaPemasok, setFilterNamaPemasok] = useState<string>('') // State that triggers fetch

  // Pagination states
  const [currentPage, setCurrentPage] = useState(pageNumber)
  const [itemsPerPage, setItemsPerPage] = useState(pageSize)

  useEffect(() => {
    fetchPemasok(
      filterJenisPemasok,
      filterNamaPemasok,
      currentPage,
      itemsPerPage
    )
  }, [
    fetchPemasok,
    filterJenisPemasok,
    filterNamaPemasok,
    currentPage,
    itemsPerPage
  ])

  useEffect(() => {
    setCurrentPage(pageNumber)
    setItemsPerPage(pageSize)
  }, [pageNumber, pageSize])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value))
    setCurrentPage(0) // Reset to first page when items per page changes
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setFilterNamaPemasok(searchNamaPemasok)
    }
  }

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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Pemasok</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <FunnelIcon className="h-5 w-5 text-gray-500 md:self-center" />
            <div className="w-full md:w-auto">
              <select
                id="filterJenisPemasok"
                value={filterJenisPemasok}
                onChange={(e) =>
                  setFilterJenisPemasok(
                    e.target.value as Pemasok['jenisPemasok'] | ''
                  )
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">All Jenis Pemasok</option>
                <option value="Yayasan">Yayasan</option>
                <option value="PT">PT</option>
                <option value="CV">CV</option>
                <option value="Bumdes">Bumdes</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <input
                type="text"
                id="searchNamaPemasok"
                placeholder="Search by Nama Pemasok"
                value={searchNamaPemasok}
                onChange={(e) => setSearchNamaPemasok(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out flex items-center w-full md:w-auto justify-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Tambah Pemasok
            </button>
          </div>
        </div>

        {pemasokList.length === 0 && !loading ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">
              Tidak ada data pemasok yang tersedia.
            </p>
            <p className="text-gray-500 mt-2">
              Mulai dengan menambahkan pemasok baru.
            </p>
          </div>
        ) : (
          <>
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
                      Jenis Pemasok
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
                      Latitude
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Longitude
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Logo
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
                        {pemasok.jenisPemasok}
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
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {pemasok.latitude?.toFixed(4) || '-'}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {pemasok.longitude?.toFixed(4) || '-'}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {pemasok.email}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {pemasok.status}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                        {pemasok.logoUrl ? (
                          <img
                            src={pemasok.logoUrl}
                            alt="Logo"
                            className="h-10 w-10 object-cover rounded-full"
                          />
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            navigate(`/admin/pemasok/${pemasok.id}`)
                          } // Detail button
                          className="text-green-600 hover:text-green-900 mr-4 flex items-center"
                        >
                          <EyeIcon className="h-5 w-5 mr-1" />
                          Detail
                        </button>
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

            {/* Pagination Controls */}
            {totalPages >= 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage + 1} of {totalPages} (Total {totalElements}{' '}
                  items)
                </span>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="itemsPerPage"
                    className="text-sm text-gray-700"
                  >
                    Items per page:
                  </label>
                  <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
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
