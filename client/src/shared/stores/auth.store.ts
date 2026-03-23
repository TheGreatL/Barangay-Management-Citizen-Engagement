import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { authService } from '../../features/auth/auth.service'
import { setAccessToken } from '../api/api-config'

interface TUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  avatar?: string
}

interface TAuthState {
  user: TUser | null
  isAuthenticated: boolean
  isMock: boolean
  hasHydrated: boolean
  setHasHydrated: (status: boolean) => void
  setAuth: (user: TUser, accessToken: string) => void
  mockLogin: (role: 'admin' | 'barangay_official' | 'citizen') => void
  getMe: () => Promise<void>
  initialize: () => Promise<void>
  logout: () => Promise<void>
}

const MOCK_USERS: Record<string, TUser> = {
  admin: {
    id: 'mock-admin-id',
    email: 'admin@mock.local',
    firstName: 'Mock',
    lastName: 'Admin',
    role: 'admin',
  },
  barangay_official: {
    id: 'mock-official-id',
    email: 'official@mock.local',
    firstName: 'Mock',
    lastName: 'Official',
    role: 'barangay_official',
  },
  citizen: {
    id: 'mock-citizen-id',
    email: 'citizen@mock.local',
    firstName: 'Mock',
    lastName: 'Citizen',
    role: 'citizen',
  },
}

export const useAuthStore = create<TAuthState>()(
  persist<TAuthState>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isMock: false,
      hasHydrated: false, // <-- manual flag
      setHasHydrated: (status: boolean) => set({ hasHydrated: status }),
      setAuth: (user: TUser, accessToken: string) => {
        if (accessToken) setAccessToken(accessToken)
        set({ user, isAuthenticated: true, isMock: false })
      },
      mockLogin: (role) => {
        const user = MOCK_USERS[role]
        set({ user, isAuthenticated: true, isMock: true })
        setAccessToken('mock-token')
      },
      getMe: async () => {
        if (get().isMock) return

        try {
          const response = await authService.getMe()
          if (response.success) {
            set({ user: response.data })
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error)
        }
      },
      initialize: async () => {
        if (get().isAuthenticated) {
          if (get().isMock) return
          await get().getMe()
        }
      },
      logout: async () => {
        const isMock = get().isMock
        setAccessToken(null)
        set({ user: null, isAuthenticated: false, isMock: false })

        if (!isMock) {
          try {
            await authService.logout()
          } catch (error) {
            console.error('Logout request failed:', error)
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          isMock: state.isMock,
        }) as TAuthState,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    },
  ),
)
