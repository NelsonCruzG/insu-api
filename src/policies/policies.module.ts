import { Module } from '@nestjs/common';
import { PoliciesService } from './services/policies.service';
import { PoliciesController } from './controllers/policies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './entities/policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
  providers: [PoliciesService],
  controllers: [PoliciesController],
})
export class PoliciesModule {}
