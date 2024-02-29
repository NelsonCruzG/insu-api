import { CreatePolicyDto } from '../dto';
import { Policy, PolicyStatus, PolicyType } from '../entities/policy.entity';

export const mockPolicy: Partial<Policy> = {
  policyId: 1,
  policyNumber: 'C01234-1',
  policyType: PolicyType.AUTO,
  coverageDetails: '',
  startDate: new Date(),
  endDate: new Date(),
  premiumAmount: 200000,
  status: PolicyStatus.ACTIVE,
};

export const mockCreatePolicy: CreatePolicyDto = {
  policyNumber: 'C01234-1',
  policyType: PolicyType.AUTO,
  coverageDetails: '',
  startDate: new Date(),
  endDate: new Date(),
  premiumAmount: 200000,
  status: PolicyStatus.ACTIVE,
};
