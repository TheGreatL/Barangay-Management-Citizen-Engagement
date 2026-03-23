import api from '@/shared/api/api-config'
import type { TComplaint, TCreateComplaint } from './complaint.schema'

export const complaintService = {
  list: async (page = 1, pageSize = 10) => {
    const response = await api.get('/complaints', {
      params: { page, pageSize },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/complaints/${id}`)
    return response.data
  },

  create: async (data: TCreateComplaint) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('priority', data.priority)
    formData.append('location', data.location)

    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file)
      })
    }

    const response = await api.post('/complaints', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  update: async (id: string, data: Partial<TComplaint>) => {
    const response = await api.patch(`/complaints/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/complaints/${id}`)
    return response.data
  },
}
