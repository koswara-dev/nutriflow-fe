import { create } from 'zustand'
import axios from '../utils/axios'
import { toast } from 'react-toastify'

export interface Produk {
  id: number
  namaProduk: string
  harga: number
  stok: number
  jenisProduk: 'BahanPokok' | 'Makanan' | 'Minuman'
  pemasokId: number
  namaPemasok: string
  createdAt: string
  updatedAt: string
}

interface ProdukState {
  produkList: Produk[]
  loading: boolean
  error: string | null
  fetchProduk: (
    jenisProduk?: Produk['jenisProduk'] | '',
    pemasokId?: number | '',
    namaProduk?: string
  ) => Promise<void>
  addProduk: (
    produk: Omit<Produk, 'id' | 'namaPemasok' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  updateProduk: (
    id: number,
    produk: Omit<Produk, 'id' | 'namaPemasok' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  deleteProduk: (id: number) => Promise<void>
}

export const useProdukStore = create<ProdukState>((set, get) => ({
  produkList: [],
  loading: false,
  error: null,
  fetchProduk: async (jenisProduk = '', pemasokId = '', namaProduk = '') => {
    set({ loading: true, error: null })
    try {
      const params = new URLSearchParams()
      if (jenisProduk) {
        params.append('jenisProduk', jenisProduk)
      }
      if (pemasokId) {
        params.append('pemasokId', pemasokId.toString())
      }
      if (namaProduk) {
        params.append('namaProduk', namaProduk)
      }

      const response = await axios.get('/produk', { params })
      if (response.data.success) {
        set({ produkList: response.data.data, loading: false })
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to fetch produk data')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to fetch produk data',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to fetch produk data')
    }
  },
  addProduk: async (produk) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.post('/produk', produk)
      if (response.data.success) {
        get().fetchProduk() // Refresh the list
        toast.success('Produk added successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to add produk')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to add produk',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to add produk')
    }
  },
  updateProduk: async (id, produk) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.put(`/produk/${id}`, produk)
      if (response.data.success) {
        get().fetchProduk() // Refresh the list
        toast.success('Produk updated successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to update produk')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to update produk',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to update produk')
    }
  },
  deleteProduk: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await axios.delete(`/produk/${id}`)
      if (response.data.success) {
        get().fetchProduk() // Refresh the list
        toast.success('Produk deleted successfully!')
      } else {
        set({ error: response.data.message, loading: false })
        toast.error(response.data.message || 'Failed to delete produk')
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to delete produk',
        loading: false
      })
      toast.error(err.response?.data?.message || 'Failed to delete produk')
    }
  }
}))
