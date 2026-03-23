import api from '@/shared/api/api-config'
import type {
  TComplaint,
  TCreateComplaint,
  TUpdateComplaintStatus,
  TComplaintStats,
} from './complaint-schema'

interface TComplaintParams {
  page?: number
  limit?: number
  status?: string
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export const complaintService = {
  listCitizen: async (params: TComplaintParams) => {
    const { data } = await api.get<{
      data: TComplaint[]
      meta: any
      stats: TComplaintStats
    }>('/citizen/complaints', { params })
    return data
  },

  listOfficial: async (params: TComplaintParams) => {
    const { data } = await api.get<{
      data: TComplaint[]
      meta: any
      stats: TComplaintStats
    }>('/official/complaints', { params })
    return data
  },

  listAdmin: async (params: TComplaintParams) => {
    const { data } = await api.get<{
      data: TComplaint[]
      meta: any
      stats: TComplaintStats
    }>('/admin/complaints', { params })
    return data
  },

  getById: async (id: string) => {
    const { data } = await api.get<TComplaint>(`/complaints/${id}`)
    return data
  },

  create: async (payload: TCreateComplaint) => {
    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('description', payload.description)
    formData.append('category', payload.category)
    formData.append('priority', payload.priority)
    formData.append('location', payload.location)

    if (payload.attachments) {
      payload.attachments.forEach((file) => {
        formData.append('attachments', file)
      })
    }

    const { data } = await api.post<TComplaint>('/complaints', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  updateStatus: async (id: string, payload: TUpdateComplaintStatus) => {
    const { data } = await api.patch<TComplaint>(
      `/complaints/${id}/status`,
      payload,
    )
    return data
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/complaints/${id}`)
    return data
  },
}
