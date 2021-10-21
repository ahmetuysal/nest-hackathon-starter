import { AuthUser } from '../../src/auth/auth-user';

export const mockUser = (fields?: Partial<AuthUser>): AuthUser => ({
  firstName: 'Ahmet',
  middleName: null,
  lastName: 'Uysal',
  username: 'ahmet',
  image: null,
  birthDate: new Date('1998-09-21'),
  registrationDate: new Date(),
  email: 'auysal16@ku.edu.tr',
  id: 1,
  emailVerified: true,
  passwordHash: 'passwordHash',
  ...fields,
});
