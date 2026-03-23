import { faker } from '@faker-js/faker'
import { simulateApiCall } from './mock-api'

export const createMockActivityLog = () => ({
  id: faker.string.uuid(),
  user: faker.person.fullName(),
  action: faker.helpers.arrayElement([
    'CREATE_USER',
    'UPDATE_RESIDENT',
    'APPROVE_CERTIFICATE',
    'RESOLVE_COMPLAINT',
    'LOGIN',
    'LOGOUT',
  ]),
  module: faker.helpers.arrayElement([
    'USER_MGMT',
    'RESIDENT_RECORDS',
    'DOCUMENTS',
    'COMPLAINTS',
    'AUTH',
  ]),
  details: faker.lorem.sentence(),
  ipAddress: faker.internet.ip(),
  timestamp: faker.date.recent().toISOString(),
})

const mockLogs = Array.from({ length: 100 }, createMockActivityLog)

export const getActivityLogs = async (params: {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
}) => {
  return simulateApiCall(mockLogs, {
    ...params,
    searchKeys: ['user', 'action', 'module', 'details'],
  })
}
