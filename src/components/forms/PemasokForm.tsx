import React, { useEffect, useState } from 'react' // Import useState
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
    .max(15, 'Telepon must be at most 15 characters'),
  jenisPemasok: z.enum(['Yayasan', 'PT', 'CV', 'Bumdes'], {
    message: 'Jenis Pemasok is required'
  }),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  logoFile: z.instanceof(File).nullable().optional(), // Add logoFile to schema
  status: z.enum(['PENDING', 'APPROVE', 'REJECT'], {
    message: 'Status is required'
  }),
  email: z.string().min(1, 'Email is required').email('Invalid email address')
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
    setValue, // Import setValue
    formState: { errors }
  } = useForm<PemasokFormInputs>({
    resolver: zodResolver(pemasokSchema)
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null) // State for logo preview

  useEffect(() => {
    if (editingPemasok) {
      reset({
        namaPemasok: editingPemasok.namaPemasok,
        nik: editingPemasok.nik,
        alamat: editingPemasok.alamat,
        telepon: editingPemasok.telepon,
        jenisPemasok: editingPemasok.jenisPemasok,
        latitude: editingPemasok.latitude,
        longitude: editingPemasok.longitude,
        logoFile: null, // Clear file input when editing
        status: editingPemasok.status,
        email: editingPemasok.email
      })
      setLogoPreview(editingPemasok.logoUrl || null) // Set existing logo for preview
    } else {
      reset({
        namaPemasok: '',
        nik: '',
        alamat: '',
        telepon: '',
        jenisPemasok: 'Yayasan', // Default value
        latitude: null,
        longitude: null,
        logoFile: null,
        status: 'PENDING', // Default status for new pemasok
        email: ''
      })
      setLogoPreview(null) // Clear preview when adding new
    }
  }, [editingPemasok, reset, setValue])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setValue('logoFile', file) // Set the file in react-hook-form
      setLogoPreview(URL.createObjectURL(file)) // Create a preview URL
    } else {
      setValue('logoFile', null)
      setLogoPreview(null)
    }
  }

  const onSubmit = async (data: PemasokFormInputs) => {
    try {
      const { logoFile, ...pemasokData } = data // Separate logoFile from other data
      if (editingPemasok) {
        await updatePemasok(editingPemasok.id, { ...pemasokData, logoFile })
      } else {
        await addPemasok({ ...pemasokData, logoFile })
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
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingPemasok ? 'Edit Pemasok' : 'Tambah Pemasok'}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
              htmlFor="jenisPemasok"
              className="block text-sm font-medium text-gray-700"
            >
              Jenis Pemasok
            </label>
            <select
              id="jenisPemasok"
              {...register('jenisPemasok')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Yayasan">Yayasan</option>
              <option value="PT">PT</option>
              <option value="CV">CV</option>
              <option value="Bumdes">Bumdes</option>
            </select>
            {errors.jenisPemasok && (
              <p className="mt-1 text-sm text-red-600">
                {errors.jenisPemasok.message}
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
          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              step="any"
              {...register('latitude', { valueAsNumber: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.latitude && (
              <p className="mt-1 text-sm text-red-600">
                {errors.latitude.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              step="any"
              {...register('longitude', { valueAsNumber: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.longitude && (
              <p className="mt-1 text-sm text-red-600">
                {errors.longitude.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Status Field */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVE">APPROVE</option>
              <option value="REJECT">REJECT</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Logo Upload Field */}
          <div className="md:col-span-2">
            <label
              htmlFor="logoFile"
              className="block text-sm font-medium text-gray-700"
            >
              Logo Pemasok
            </label>
            <input
              type="file"
              id="logoFile"
              accept="image/*"
              onChange={handleLogoChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {logoPreview && (
              <div className="mt-4">
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="max-w-[120px] h-auto rounded-md shadow-md"
                />
              </div>
            )}
            {errors.logoFile && (
              <p className="mt-1 text-sm text-red-600">
                {errors.logoFile.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end space-x-3 mt-6">
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
