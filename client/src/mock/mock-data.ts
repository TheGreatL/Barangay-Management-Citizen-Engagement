import { faker } from '@faker-js/faker'

export const createMockUser = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['ADMIN', 'CITIZEN', 'OFFICIAL']),
  status: faker.helpers.arrayElement(['ACTIVE', 'INACTIVE', 'DEACTIVATED']),
  createdAt: faker.date.past().toISOString(),
})

export const createMockResident = () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  residentId: `RES-${faker.string.alphanumeric(8).toUpperCase()}`,
  email: faker.internet.email(),
  phone: faker.phone.number(),
  birthDate: faker.date.birthdate().toISOString(),
  gender: faker.helpers.arrayElement(['MALE', 'FEMALE', 'OTHER']),
  address: faker.location.streetAddress(),
  householdId: faker.string.uuid(),
  isHeadOfHousehold: faker.datatype.boolean(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
  lastVerified: faker.date.past().toISOString(),
  createdAt: faker.date.past().toISOString(),
})

export const createMockComplaint = () => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement(['pending', 'investigating', 'resolved']),
  priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
  category: faker.helpers.arrayElement([
    'Noise',
    'Garbage',
    'Conflict',
    'Infrastructure',
  ]),
  complainant: faker.person.fullName(),
  reporterId: faker.string.uuid(),
  assignedToId: faker.string.uuid(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})

export const createMockCertificate = () => ({
  id: faker.string.uuid(),
  residentId: faker.string.uuid(),
  residentName: faker.person.fullName(),
  type: faker.helpers.arrayElement([
    'Barangay Clearance',
    'Certificate of Indigency',
    'Barangay Residency',
    'Business Permit',
  ]),
  status: faker.helpers.arrayElement([
    'pending',
    'processing',
    'approved',
    'rejected',
    'ready',
  ]),
  requestDate: faker.date.past().toISOString(),
  trackingNumber: `TRK-${faker.string.alphanumeric(10).toUpperCase()}`,
})

export const generateList = <T>(generator: () => T, count: number): T[] => {
  return Array.from({ length: count }, generator)
}

export const generateResidents = (count: number) =>
  generateList(createMockResident, count)
export const generateComplaints = (count: number) =>
  generateList(createMockComplaint, count)
export const generateCertificates = (count: number) =>
  generateList(createMockCertificate, count)
