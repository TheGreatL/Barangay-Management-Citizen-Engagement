import api from '@/shared/api/api-config'

export const serviceService = {
  list: async () => {
    const response = await api.get('/services')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/services/${id}`)
    return response.data
  },

  getByCategory: async (category: string) => {
    const response = await api.get('/services', {
      params: { category },
    })
    return response.data
  },
}
