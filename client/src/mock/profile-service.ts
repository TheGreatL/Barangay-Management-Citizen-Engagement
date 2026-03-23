import { faker } from '@faker-js/faker';
import { simulateSingleApiCall } from './mock-api';

export const getCitizenProfile = async () => {
  const profile = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString(),
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    householdRole: 'Head',
    createdAt: faker.date.past().toISOString(),
    members: [
      { id: '1', name: faker.person.fullName(), relationship: 'Spouse', age: 34 },
      { id: '2', name: faker.person.fullName(), relationship: 'Son', age: 12 },
      { id: '3', name: faker.person.fullName(), relationship: 'Daughter', age: 8 },
    ],
  };
  return simulateSingleApiCall(profile);
};
