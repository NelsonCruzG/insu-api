import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { MockRepository, createMockRepository } from '../../../utils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Policy } from '../entities/policy.entity';
import { mockCreatePolicy, mockPolicy } from '../mocks/policy.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PoliciesService', () => {
  let service: PoliciesService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoliciesService,
        {
          provide: getRepositoryToken(Policy),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
    repository = module.get<MockRepository>(getRepositoryToken(Policy));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    const { policyId } = mockPolicy;
    describe('When policy exists', () => {
      it('Should return policy', async () => {
        repository.findOne.mockReturnValue(mockPolicy);
        const policy = await service.findById(policyId);
        expect(policy).toEqual(mockPolicy);
      });
    });

    describe('Otherwise', () => {
      it('Should throw a NotFound Exception', async () => {
        repository.findOne.mockReturnValue(undefined);
        try {
          await service.findById(policyId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(
            `Policy with ID: [${policyId}] not found`,
          );
        }
      });
    });
  });

  describe('findAll', () => {
    describe('When there are policies', () => {
      it('Should return all policies', async () => {
        repository.find.mockReturnValue([mockPolicy]);
        const policies = await service.findAll();
        expect(policies).toEqual([mockPolicy]);
      });
    });

    describe('Otherwise', () => {
      it('Should return an empty array', async () => {
        repository.find.mockReturnValue([]);
        const policies = await service.findAll();
        expect(policies).toEqual([]);
      });
    });
  });

  describe('validatePolicy', () => {
    const { policyNumber } = mockPolicy;
    describe('When the policy number already exists', () => {
      it('Should throw a BadRequest Exception', async () => {
        repository.findOneBy.mockReturnValue(policyNumber);
        try {
          await service.validatePolicy(policyNumber);
        } catch (err) {
          expect(err).toBeInstanceOf(BadRequestException);
          expect(err.message).toEqual(
            `Policy number: [${policyNumber}] already exists`,
          );
        }
      });
    });

    describe('Otherwise', () => {
      it('Should return undefined', async () => {
        repository.findOneBy.mockReturnValue(null);
        const result = await service.validatePolicy(policyNumber);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('create', () => {
    it('Should create and return the new policy', async () => {
      repository.save.mockReturnValue(mockPolicy);
      const policy = await service.create(mockCreatePolicy);
      expect(policy).toEqual(mockPolicy);
    });
  });

  describe('update', () => {
    it('Should update and return the policy', async () => {
      repository.findOne.mockReturnValue(mockPolicy);
      repository.preload.mockReturnValue(mockPolicy);
      repository.save.mockReturnValue(mockPolicy);
      const policy = await service.update(
        mockPolicy.policyId,
        mockCreatePolicy,
      );
      expect(policy).toEqual(mockPolicy);
    });
  });

  describe('remove', () => {
    it('Should remove the policy', async () => {
      repository.findOne.mockReturnValue(mockPolicy);
      const policy = await service.remove(mockPolicy.policyId);
      expect(policy).toEqual(undefined);
    });
  });
});
