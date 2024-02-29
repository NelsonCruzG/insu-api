import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  preload: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  createQueryBuilder: jest.fn(),
});
