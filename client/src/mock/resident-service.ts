import { createMockResident, generateList } from './mock-data'
import { simulateApiCall } from './mock-api'

const mockResidents = generateList(createMockResident, 100)

export const getResidents = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockResidents, {
    ...params,
    searchKeys: ['firstName', 'lastName', 'address'],
  })
}
