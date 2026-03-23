import api from '@/shared/api/api-config'

export const disasterService = {
  list: async () => {
    const response = await api.get('/disasters', {
      params: { status: 'alert,active,recovery' },
    })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/disasters/${id}`)
    return response.data
  },

  getActive: async () => {
    const response = await api.get('/disasters/active')
    return response.data
  },

  broadcastAlert: async (disasterId: string, message: string) => {
    const response = await api.post(`/disasters/${disasterId}/broadcast`, {
      message,
    })
    return response.data
  },
}
