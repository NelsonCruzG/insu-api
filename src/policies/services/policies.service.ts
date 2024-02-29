import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto, UpdatePolicyDto } from '../dto';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private policiesRepo: Repository<Policy>,
  ) {}

  async findAll(): Promise<Policy[]> {
    return this.policiesRepo.find();
  }

  async findById(policyId: number): Promise<Policy> {
    const policy = await this.policiesRepo.findOne({ where: { policyId } });
    if (!policy)
      throw new NotFoundException(`Policy with ID: [${policyId}] not found`);
    return policy;
  }

  async validatePolicy(policyNumber: string): Promise<void> {
    const policy = await this.policiesRepo.findOneBy({ policyNumber });
    if (policy) {
      throw new BadRequestException(
        `Policy number: [${policyNumber}] already exists`,
      );
    }
  }

  async create(createDto: CreatePolicyDto): Promise<Policy> {
    await this.validatePolicy(createDto.policyNumber);
    return this.policiesRepo.save(createDto);
  }

  async update(policyId: number, updateDto: UpdatePolicyDto): Promise<Policy> {
    await this.findById(policyId);
    const policy = await this.policiesRepo.preload({
      policyId,
      ...updateDto,
    });
    return this.policiesRepo.save(policy);
  }

  async remove(policyId: number): Promise<void> {
    await this.findById(policyId);
    await this.policiesRepo.delete({ policyId });
  }
}
