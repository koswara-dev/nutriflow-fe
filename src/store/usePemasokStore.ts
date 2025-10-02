import { create } from 'zustand'
import axios from '../utils/axios'
import { toast } from 'react-toastify'

export interface Pemasok {
  id: number
  namaPemasok: string
  nik: string
  alamat: string
  telepon: string
  jenisPemasok: 'Yayasan' | 'PT' | 'CV' | 'Bumdes'
  latitude?: number | null
  longitude?: number | null
  createdAt: string
  updatedAt: string
  logoUrl?: string | null // Add logoUrl
  status: 'PENDING' | 'APPROVE' | 'REJECT' // Add status field
  email: string // Add email field
}

interface PemasokState {
  pemasokList: Pemasok[]
  selectedPemasok: Pemasok | null
  loading: boolean
  error: string | null
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  fetchPemasok: (
    jenisPemasok?: Pemasok['jenisPemasok'] | '',
    namaPemasok?: string,
    page?: number,
    size?: number
  ) => Promise<void>
  fetchPemasokById: (id: string) => Promise<void>
  addPemasok: (
    pemasokData: Omit<
      Pemasok,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'latitude'
      | 'longitude'
      | 'logoUrl'
      | 'status'
      | 'email'
    > & {
      latitude?: number | null
      longitude?: number | null
      logoFile?: File | null
      status?: 'PENDING' | 'APPROVE' | 'REJECT' // Make status optional for add
      email: string // Add email field
    }
  ) => Promise<void>
  updatePemasok: (
    id: number,
    pemasokData: Omit<
      Pemasok,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'latitude'
      | 'longitude'
      | 'logoUrl'
      | 'email'
    > & {
      latitude?: number | null
      longitude?: number | null
      logoFile?: File | null
      status?: 'PENDING' | 'APPROVE' | 'REJECT' // Make status optional for update
      email: string // Add email field
    }
  ) => Promise<void>
  deletePemasok: (id: number) => Promise<void>
}

export const usePemasokStore = create<PemasokState>((set, get) => ({
  pemasokList: [],
  selectedPemasok: null,
  loading: false,
  error: null,
  pageNumber: 0,
  pageSize: 10,
  totalElements: 0,
  totalPages: 0,
  fetchPemasok: async (
    jenisPemasok = '',
    namaPemasok = '',
    page = 0,
    size = 10
  ) => {
    set({ loading: true, error: null })
    try {
      const params = new URLSearchParams()
      if (jenisPemasok) {
        params.append('jenisPemasok', jenisPemasok)
      }
      if (namaPemasok) {
        params.append('namaPemasok', namaPemasok)
      }
      params.append('page', String(page))
      params.append('size', String(size))

      const response = await axios.get('/pemasok', { params })
      if (response.data.success) {
        set({
          pemasokList: response.data.data.content,
          pageNumber: response.data.data.page.number,
          pageSize: response.data.data.page.size,
          totalElements: response.data.data.page.totalElements,
          totalPages: response.data.data.page.totalPages,
          loading: false
        })
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to fetch pemasok data')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to fetch pemasok data',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to fetch pemasok data')
    }
  },
  fetchPemasokById: async (id: string) => {
    set({ loading: true, error: null, selectedPemasok: null })
    try {
      const response = await axios.get(`/pemasok/${id}`)
      if (response.data.success) {
        set({ selectedPemasok: response.data.data, loading: false })
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to fetch pemasok details')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to fetch pemasok details',
        loading: false
      })
      toast.error(
        err.response?.data?.message || 'Failed to fetch pemasok details'
      )
    }
  },
  addPemasok: async (pemasokData) => {
    set({ loading: true, error: null })
    try {
      const formData = new FormData()
      for (const key in pemasokData) {
        if (
          pemasokData[key as keyof typeof pemasokData] !== null &&
          pemasokData[key as keyof typeof pemasokData] !== undefined
        ) {
          if (key === 'logoFile' && pemasokData.logoFile) {
            formData.append('logo', pemasokData.logoFile)
          } else if (key !== 'logoFile') {
            formData.append(
              key,
              String(pemasokData[key as keyof typeof pemasokData])
            )
          }
        }
      }

      const response = await axios.post('/pemasok', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.success) {
        get().fetchPemasok() // Refresh the list
        toast.success('Pemasok added successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to add pemasok')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to add pemasok',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to add pemasok')
    }
  },
  updatePemasok: async (id, pemasokData) => {
    set({ loading: true, error: null })
    try {
      const formData = new FormData()
      for (const key in pemasokData) {
        if (
          pemasokData[key as keyof typeof pemasokData] !== null &&
          pemasokData[key as keyof typeof pemasokData] !== undefined
        ) {
          if (key === 'logoFile' && pemasokData.logoFile) {
            formData.append('logo', pemasokData.logoFile)
          } else if (key !== 'logoFile') {
            formData.append(
              key,
              String(pemasokData[key as keyof typeof pemasokData])
            )
          }
        }
      }

      const response = await axios.put(`/pemasok/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.success) {
        get().fetchPemasok() // Refresh the list
        toast.success('Pemasok updated successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to update pemasok')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to update pemasok',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to update pemasok')
    }
  },
  deletePemasok: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.delete(`/pemasok/${id}`)
      if (response.data.success) {
        get().fetchPemasok() // Refresh the list
        toast.success('Pemasok deleted successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to delete pemasok')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to delete pemasok',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to delete pemasok')
    }
  }
}))
