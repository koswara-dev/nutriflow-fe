import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pemasok, usePemasokStore } from '../../store/usePemasokStore'

// Zod schema for validation
const pemasokSchema = z.object({
  namaPemasok: z.string().min(1, 'Nama Pemasok is required'),
  nik: z
    .string()
    .min(1, 'NIK is required')
    .max(16, 'NIK must be at most 16 characters'),
  alamat: z.string().min(1, 'Alamat is required'),
  telepon: z
    .string()
    .min(1, 'Telepon is required')
    .max(15, 'Telepon must be at most 15 characters')
})

type PemasokFormInputs = z.infer<typeof pemasokSchema>

interface PemasokFormProps {
  isOpen: boolean
  onClose: () => void
  editingPemasok: Pemasok | null
}

const PemasokForm: React.FC<PemasokFormProps> = ({
  isOpen,
  onClose,
  editingPemasok
}) => {
  const { addPemasok, updatePemasok } = usePemasokStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PemasokFormInputs>({
    resolver: zodResolver(pemasokSchema)
  })

  useEffect(() => {
    if (editingPemasok) {
      reset({
        namaPemasok: editingPemasok.namaPemasok,
        nik: editingPemasok.nik,
        alamat: editingPemasok.alamat,
        telepon: editingPemasok.telepon
      })
    } else {
      reset({
        namaPemasok: '',
        nik: '',
        alamat: '',
        telepon: ''
      })
    }
  }, [editingPemasok, reset])

  const onSubmit = async (data: PemasokFormInputs) => {
    try {
      if (editingPemasok) {
        await updatePemasok(editingPemasok.id, data)
      } else {
        await addPemasok(data)
      }
      onClose() // Close modal only on success
    } catch (error) {
      // Error handling is already done in usePemasokStore with toasts
      // The modal will remain open for the user to correct input
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingPemasok ? 'Edit Pemasok' : 'Tambah Pemasok'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="namaPemasok"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Pemasok
            </label>
            <input
              type="text"
              id="namaPemasok"
              {...register('namaPemasok')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.namaPemasok && (
              <p className="mt-1 text-sm text-red-600">
                {errors.namaPemasok.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="nik"
              className="block text-sm font-medium text-gray-700"
            >
              NIK
            </label>
            <input
              type="text"
              id="nik"
              {...register('nik')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.nik && (
              <p className="mt-1 text-sm text-red-600">{errors.nik.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-700"
            >
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              {...register('alamat')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.alamat && (
              <p className="mt-1 text-sm text-red-600">
                {errors.alamat.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="telepon"
              className="block text-sm font-medium text-gray-700"
            >
              Telepon
            </label>
            <input
              type="text"
              id="telepon"
              {...register('telepon')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.telepon && (
              <p className="mt-1 text-sm text-red-600">
                {errors.telepon.message}
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
              {editingPemasok ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PemasokForm
