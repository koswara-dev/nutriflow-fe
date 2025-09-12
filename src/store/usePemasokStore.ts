import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-toastify'

export interface Pemasok {
  id: number
  namaPemasok: string
  nik: string
  alamat: string
  telepon: string
  createdAt: string
  updatedAt: string
}

interface PemasokState {
  pemasokList: Pemasok[]
  loading: boolean
  error: string | null
  fetchPemasok: () => Promise<void>
  addPemasok: (
    pemasok: Omit<Pemasok, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  updatePemasok: (
    id: number,
    pemasok: Omit<Pemasok, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  deletePemasok: (id: number) => Promise<void>
}

export const usePemasokStore = create<PemasokState>((set, get) => ({
  pemasokList: [],
  loading: false,
  error: null,
  fetchPemasok: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get('http://localhost:8080/api/pemasok')
      if (response.data.success) {
        set({ pemasokList: response.data.data, loading: false })
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
  addPemasok: async (pemasok) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.post(
        'http://localhost:8080/api/pemasok',
        pemasok
      )
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
  updatePemasok: async (id, pemasok) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.put(
        `http://localhost:8080/api/pemasok/${id}`,
        pemasok
      )
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
      const response = await axios.delete(
        `http://localhost:8080/api/pemasok/${id}`
      )
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
