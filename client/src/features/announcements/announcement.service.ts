import api from '@/shared/api/api-config'
import type { TAnnouncement } from './announcement.schema'

export const announcementService = {
  list: async (page = 1, pageSize = 10) => {
    const response = await api.get('/announcements', {
      params: { page, pageSize, status: 'published' },
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
}
