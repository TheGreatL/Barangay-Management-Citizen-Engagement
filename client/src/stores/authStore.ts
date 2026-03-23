import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TUser, TAuthResponse } from '@/types'

interface TAuthStore {
  user: TUser | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  setAuth: (response: TAuthResponse) => void
  setUser: (user: TUser) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  clearAuth: () => void
}

export const useAuthStore = create<TAuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,
      setAuth: (response: TAuthResponse) => {
        set({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          isAuthenticated: true,
        })
      },
      setUser: (user: TUser) => {
        set({ user })
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
