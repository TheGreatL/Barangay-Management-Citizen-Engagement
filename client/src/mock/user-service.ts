import { createMockUser, generateList } from './mock-data';
import { simulateApiCall } from './mock-api';

const mockUsers = generateList(createMockUser, 50);

export const getUsers = async (params: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}) => {
  return simulateApiCall(mockUsers, {
    ...params,
    searchKeys: ['firstName', 'lastName', 'email', 'role'],
  });
};
