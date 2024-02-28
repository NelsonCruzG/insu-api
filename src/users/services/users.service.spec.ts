import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockRepository, createMockRepository } from '../../../utils';
import { User } from '../entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockCreateUser, mockUser } from '../mocks/user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<MockRepository>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    const { email } = mockUser;
    describe('When user exists', () => {
      it('Should return user', async () => {
        repository.findOne.mockReturnValue(mockUser);
        const user = await service.findByEmail(email);
        expect(user).toEqual(mockUser);
      });
    });

    describe('Otherwise', () => {
      it('Should return null', async () => {
        repository.findOne.mockReturnValue(null);
        const user = await service.findByEmail(email);
        expect(user).toBeNull();
      });
    });
  });

  describe('findById', () => {
    const { userId } = mockUser;
    describe('When user exists', () => {
      it('Should return user', async () => {
        repository.findOne.mockReturnValue(mockUser);
        const user = await service.findById(userId);
        expect(user).toEqual(mockUser);
      });
    });

    describe('Otherwise', () => {
      it('Should throw a NotFound Exception', async () => {
        repository.findOne.mockReturnValue(undefined);
        try {
          await service.findById(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User with ID: ${userId} not found`);
        }
      });
    });
  });

  describe('findAll', () => {
    describe('When there are users', () => {
      it('Should return all users', async () => {
        repository.find.mockReturnValue([mockUser]);
        const users = await service.findAll();
        expect(users).toEqual([mockUser]);
      });
    });

    describe('Otherwise', () => {
      it('Should return an empty array', async () => {
        repository.find.mockReturnValue([]);
        const users = await service.findAll();
        expect(users).toEqual([]);
      });
    });
  });

  describe('validateEmail', () => {
    const { email } = mockUser;
    describe('When the email already exists', () => {
      it('Should throw a BadRequest Exception', async () => {
        repository.findOne.mockReturnValue(email);
        try {
          await service.validateEmail(email);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toEqual(
            `User with email: $${email} already exists`,
          );
        }
      });
    });

    describe('Otherwise', () => {
      it('Should return undefined', async () => {
        repository.findOne.mockReturnValue(null);
        const result = await service.validateEmail(email);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('create', () => {
    it('Should create and return the new user without password prop', async () => {
      const { userId } = mockUser;
      repository.save.mockReturnValue(mockUser);
      const user = await service.create(mockCreateUser);
      const { password, ...rest } = mockCreateUser;

      const cleanedUser = { ...rest, userId };
      expect(user).toEqual(cleanedUser);
    });
  });
});
