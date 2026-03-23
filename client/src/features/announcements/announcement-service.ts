import api from '@/shared/api/api-config'
import type { TAnnouncement, TAnnouncementStatus } from './announcement-schema'

export const announcementService = {
  list: async (page = 1, pageSize = 10) => {
    const response = await api.get('/announcements', {
      params: { page, pageSize, status: 'published' },
    })
    return response.data
  },

  listAdmin: async (status?: string) => {
    const response = await api.get('/admin/announcements', {
      params: { status: status === 'all' ? undefined : status },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/announcements/${id}`)
    return response.data
  },

  getFeatured: async () => {
    const response = await api.get('/announcements/featured')
    return response.data
  },

  create: async (data: Partial<TAnnouncement>) => {
    const response = await api.post('/admin/announcements', data)
    return response.data
  },

  update: async (id: string, data: Partial<TAnnouncement>) => {
    const response = await api.put(`/admin/announcements/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/announcements/${id}`)
    return response.data
  },
}
