import { faker } from '@faker-js/faker'
import { simulateApiCall } from './mock-api'

export const createMockCitizenDocument = () => ({
  id: faker.string.uuid(),
  documentType: faker.helpers.arrayElement([
    'BARANGAY_CLEARANCE',
    'RESIDENCY',
    'INDIGENCY',
    'PERMIT',
  ]),
  status: faker.helpers.arrayElement([
    'pending',
    'processing',
    'ready_for_pickup',
    'completed',
    'rejected',
  ]),
  purpose: faker.lorem.sentence(),
  createdAt: faker.date.recent().toISOString(),
  pickupDate: faker.date.future().toISOString(),
})

const mockCitizenDocuments = Array.from(
  { length: 20 },
  createMockCitizenDocument,
)

export const getCitizenDocuments = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockCitizenDocuments, {
    ...params,
    searchKeys: ['documentType', 'purpose', 'status'],
  })
}

export const createMockCitizenComplaint = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement([
    'pending',
    'investigating',
    'resolved',
    'closed',
  ]),
  category: faker.helpers.arrayElement([
    'noise',
    'garbage',
    'conflict',
    'infrastructure',
  ]),
  createdAt: faker.date.recent().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})

const mockCitizenComplaints = Array.from(
  { length: 15 },
  createMockCitizenComplaint,
)

export const getCitizenComplaints = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockCitizenComplaints, {
    ...params,
    searchKeys: ['title', 'description', 'category', 'status'],
  })
}
