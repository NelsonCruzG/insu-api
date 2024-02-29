import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PolicyStatus, PolicyType } from '../entities/policy.entity';

export class CreatePolicyDto {
  @ApiProperty({ description: `The policy number-string` })
  @Length(3, 20)
  readonly policyNumber: string;

  @ApiProperty({ description: `The type of policy you're using` })
  @IsEnum(PolicyType, {
    message: `policyType must be: [${Object.values(PolicyType)}]`,
  })
  readonly policyType: PolicyType;

  @ApiProperty({ description: `Details about the coverage of the policy` })
  @Length(0, 100)
  readonly coverageDetails: string;

  @ApiProperty({ description: `The policy's start date` })
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({ description: `The policy's end date` })
  @IsDate()
  readonly endDate: Date;

  @ApiProperty({ description: `The policy's premium amount - interval cost` })
  @IsNumber()
  @Min(0.01)
  readonly premiumAmount: number;

  @ApiProperty({ description: `The status of policy` })
  @IsEnum(PolicyStatus, {
    message: `status must be: [${Object.values(PolicyStatus)}]`,
  })
  @IsOptional()
  readonly status: PolicyStatus;
}
