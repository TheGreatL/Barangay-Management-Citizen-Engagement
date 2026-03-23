import { faker } from '@faker-js/faker'
import { simulateApiCall } from './mock-api'

export const createMockCertificateRequest = () => ({
  id: faker.string.uuid(),
  residentName: faker.person.fullName(),
  type: faker.helpers.arrayElement([
    'BARANGAY_CLEARANCE',
    'RESIDENCY',
    'INDIGENCY',
    'PERMIT',
  ]),
  status: faker.helpers.arrayElement([
    'PENDING',
    'APPROVED',
    'DENIED',
    'READY_FOR_PICKUP',
  ]),
  purpose: faker.lorem.sentence(),
  requestedAt: faker.date.recent().toISOString(),
  processedAt: faker.date.recent().toISOString(),
})

const mockCertificates = Array.from(
  { length: 50 },
  createMockCertificateRequest,
)

export const getCertificateRequests = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockCertificates, {
    ...params,
    searchKeys: ['residentName', 'type', 'purpose'],
  })
}
