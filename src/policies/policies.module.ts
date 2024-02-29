import { Module } from '@nestjs/common';
import { PoliciesService } from './services/policies.service';
import { PoliciesController } from './controllers/policies.controller';

@Module({
  providers: [PoliciesService],
  controllers: [PoliciesController],
})
export class PoliciesModule {}
