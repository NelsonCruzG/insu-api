import { CreateUserDto } from '../dto';
import { User, UserRole } from '../entities/users.entity';

export const mockUser: Partial<User> = {
  userId: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'jDoe@email.com',
  password: 'Secret',
  company: 'Foo',
  isActive: true,
  userRole: UserRole.OPERATOR,
};

export const mockCreateUser: CreateUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'jDoe@email.com',
  password: 'Secret',
  company: 'Foo',
  isActive: true,
  userRole: UserRole.OPERATOR,
};
