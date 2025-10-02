import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Produk, useProdukStore } from '../../store/useProdukStore'
import { Pemasok } from '../../store/usePemasokStore'

// Zod schema for validation
const produkSchema = z.object({
  namaProduk: z.string().min(1, 'Nama Produk is required'),
  harga: z.coerce.number().min(0, 'Harga must be a positive number'),
  stok: z.coerce.number().int().min(0, 'Stok must be a non-negative integer'),
  jenisProduk: z.enum(['BahanPokok', 'Makanan', 'Minuman'], {
    message: 'Jenis Produk is required'
  }),
  pemasokId: z.coerce.number().int().min(1, 'Pemasok is required')
})

type ProdukFormInputs = z.infer<typeof produkSchema>

interface ProdukFormProps {
  isOpen: boolean
  produk: Produk | null
  pemasokList: Pemasok[]
  onClose: () => void
}

const ProdukForm: React.FC<ProdukFormProps> = ({
  isOpen,
  produk,
  pemasokList,
  onClose
}) => {
  const { addProduk, updateProduk } = useProdukStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProdukFormInputs>({
    resolver: zodResolver(produkSchema) as any // Type assertion to bypass Zod/RHF type inference issue
  })

  useEffect(() => {
    if (produk) {
      reset({
        namaProduk: produk.namaProduk,
        harga: produk.harga,
        stok: produk.stok,
        jenisProduk: produk.jenisProduk,
        pemasokId: produk.pemasokId
      })
    } else {
      reset({
        namaProduk: '',
        harga: 0,
        stok: 0,
        jenisProduk: 'BahanPokok', // Default value
        pemasokId: 0
      })
    }
  }, [produk, reset])

  const onSubmit = async (data: ProdukFormInputs) => {
    try {
      if (produk) {
        await updateProduk(produk.id, data)
      } else {
        await addProduk(data)
      }
      onClose() // Close modal only on success
    } catch (error) {
      // Error handling is already done in useProdukStore with toasts
      // The modal will remain open for the user to correct input
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {produk ? 'Edit Produk' : 'Tambah Produk'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="namaProduk"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="namaProduk"
              {...register('namaProduk')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.namaProduk && (
              <p className="mt-1 text-sm text-red-600">
                {errors.namaProduk.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="harga"
              className="block text-sm font-medium text-gray-700"
            >
              Harga
            </label>
            <input
              type="number"
              id="harga"
              step="0.01"
              {...register('harga')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.harga && (
              <p className="mt-1 text-sm text-red-600">
                {errors.harga.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="stok"
              className="block text-sm font-medium text-gray-700"
            >
              Stok
            </label>
            <input
              type="number"
              id="stok"
              {...register('stok')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.stok && (
              <p className="mt-1 text-sm text-red-600">{errors.stok.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="pemasokId"
              className="block text-sm font-medium text-gray-700"
            >
              Pemasok
            </label>
            <select
              id="pemasokId"
              {...register('pemasokId')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Pilih Pemasok</option>
              {pemasokList.map((pemasok) => (
                <option key={pemasok.id} value={pemasok.id}>
                  {pemasok.namaPemasok}
                </option>
              ))}
            </select>
            {errors.pemasokId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.pemasokId.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="jenisProduk"
              className="block text-sm font-medium text-gray-700"
            >
              Jenis Produk
            </label>
            <select
              id="jenisProduk"
              {...register('jenisProduk')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="BahanPokok">Bahan Pokok</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
            </select>
            {errors.jenisProduk && (
              <p className="mt-1 text-sm text-red-600">
                {errors.jenisProduk.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {produk ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProdukForm
