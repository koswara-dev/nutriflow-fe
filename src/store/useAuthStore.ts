import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import axios from '../utils/axios'

interface AuthState {
  token: string | null
  user: { name: string; email: string; role: string } | null
  setToken: (token: string | null) => void
  logout: () => void
  login: (email: string, password: string) => Promise<any>
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('token')
    ? jwtDecode(localStorage.getItem('token') as string)
    : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token)
      set({ token, user: jwtDecode(token) })
    } else {
      localStorage.removeItem('token')
      set({ token: null, user: null })
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  },
  login: async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password
      })
      const { token } = response.data.data
      set({ token, user: jwtDecode(token) })
      localStorage.setItem('token', token)
      return response.data
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message)
      throw error
    }
  }
}))

export default useAuthStore
