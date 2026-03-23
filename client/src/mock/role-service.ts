import { faker } from '@faker-js/faker';
import { simulateApiCall } from './mock-api';

const mockRoles = [
  {
    id: '1',
    name: 'ADMIN',
    description: 'System administrator with full access to all modules.',
    permissions: ['ALL'],
    userCount: 3,
    createdAt: faker.date.past().toISOString(),
  },
  {
    id: '2',
    name: 'OFFICIAL',
    description: 'Barangay official with access to operational modules.',
    permissions: ['READ_RESIDENTS', 'UPDATE_RESIDENTS', 'APPROVE_CERTIFICATES', 'MANAGE_COMPLAINTS'],
    userCount: 12,
    createdAt: faker.date.past().toISOString(),
  },
  {
    id: '3',
    name: 'CITIZEN',
    description: 'Barangay resident with access to service-related modules.',
    permissions: ['REQUEST_CERTIFICATES', 'REPORT_COMPLAINTS', 'VIEW_ANNOUNCEMENTS'],
    userCount: 4500,
    createdAt: faker.date.past().toISOString(),
  },
];

export const getRoles = async () => {
  return simulateApiCall(mockRoles, { limit: 100 });
};
