import type { TApiResponse } from '@/types'
import { useAuthStore } from '@/stores/authStore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

interface TFetchOptions extends RequestInit {
  skipAuth?: boolean
}

export async function apiCall<T>(
  endpoint: string,
  options: TFetchOptions = {}
): Promise<TApiResponse<T>> {
  const { skipAuth = false, ...fetchOptions } = options
  const authStore = useAuthStore.getState()

  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  if (!skipAuth && authStore.accessToken) {
    headers['Authorization'] = `Bearer ${authStore.accessToken}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        authStore.logout()
      }
      throw new Error(data.error?.message || 'API call failed')
    }

    return data
  } catch (error) {
    console.error('[v0] API call error:', error)
    throw error
  }
}

export const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuth: true,
      }),
    signup: (data: any) =>
      apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        skipAuth: true,
      }),
    logout: () => apiCall('/auth/logout', { method: 'POST' }),
    me: () => apiCall('/auth/me'),
    refreshToken: (refreshToken: string) =>
      apiCall('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        skipAuth: true,
      }),
  },

  // Complaint endpoints
  complaints: {
    list: (page = 1, pageSize = 10) =>
      apiCall(`/complaints?page=${page}&pageSize=${pageSize}`),
    create: (data: any) =>
      apiCall('/complaints', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: (id: string) => apiCall(`/complaints/${id}`),
    update: (id: string, data: any) =>
      apiCall(`/complaints/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiCall(`/complaints/${id}`, { method: 'DELETE' }),
  },

  // Document request endpoints
  documentRequests: {
    list: (page = 1, pageSize = 10) =>
      apiCall(`/document-requests?page=${page}&pageSize=${pageSize}`),
    create: (data: any) =>
      apiCall('/document-requests', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: (id: string) => apiCall(`/document-requests/${id}`),
    update: (id: string, data: any) =>
      apiCall(`/document-requests/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Announcement endpoints
  announcements: {
    list: (page = 1, pageSize = 10) =>
      apiCall(`/announcements?page=${page}&pageSize=${pageSize}`),
    create: (data: any) =>
      apiCall('/announcements', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: (id: string) => apiCall(`/announcements/${id}`),
    update: (id: string, data: any) =>
      apiCall(`/announcements/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Services endpoints
  services: {
    list: () => apiCall('/services'),
    create: (data: any) =>
      apiCall('/services', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getById: (id: string) => apiCall(`/services/${id}`),
    update: (id: string, data: any) =>
      apiCall(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  // Analytics endpoints
  analytics: {
    getDashboard: () => apiCall('/analytics/dashboard'),
    getComplaintStats: () => apiCall('/analytics/complaints'),
  },
}
