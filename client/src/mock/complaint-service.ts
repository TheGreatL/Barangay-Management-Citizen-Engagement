import { createMockComplaint, generateList } from './mock-data'
import { simulateApiCall } from './mock-api'

const mockComplaints = generateList(createMockComplaint, 60)

export const getComplaints = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockComplaints, {
    ...params,
    searchKeys: ['title', 'description', 'category', 'status'],
  })
}
