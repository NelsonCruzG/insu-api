import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PolicyType {
  LIFE = 'LIFE',
  AUTO = 'AUTO',
  HEALTH = 'HEALTH',
  HOME = 'HOME',
}

export enum PolicyStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
}

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn({ name: 'policy_id' })
  userId: number;

  @Column({ name: 'policy_number' })
  policyNumber: string;

  @Column({
    name: 'user_role',
    type: 'enum',
    enum: PolicyType,
    default: PolicyType.LIFE,
  })
  policyType: PolicyType;

  @Column({ name: 'coverage_details' })
  coverageDetails: string;

  @Column({
    name: 'start_date',
    type: 'timestamp with time zone',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamp with time zone',
  })
  endDate: Date;

  @Column({
    name: 'premium_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  premiumAmount: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: PolicyStatus,
    default: PolicyStatus.PENDING,
  })
  status: PolicyStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
