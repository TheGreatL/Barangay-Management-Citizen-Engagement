import api from '@/shared/api/api-config'
import type { TCreateDocumentRequest } from './document.schema'

export const documentService = {
  list: async (page = 1, pageSize = 10) => {
    const response = await api.get('/document-requests', {
      params: { page, pageSize },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/document-requests/${id}`)
    return response.data
  },

  create: async (data: TCreateDocumentRequest) => {
    const response = await api.post('/document-requests', data)
    return response.data
  },

  cancel: async (id: string) => {
    const response = await api.delete(`/document-requests/${id}`)
    return response.data
  },

  downloadPDF: async (id: string) => {
    const response = await api.get(`/document-requests/${id}/download`, {
      responseType: 'blob',
    })
    return response.data
  },
}
