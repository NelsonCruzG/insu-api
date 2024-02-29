import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PoliciesService } from '../services/policies.service';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto, UpdatePolicyDto } from '../dto';

@ApiTags('Policies')
@Controller('policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @ApiOkResponse({ description: 'Lists all policies' })
  findAll(): Promise<Policy[]> {
    return this.policiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the specified policy by Id' })
  @ApiNotFoundResponse({ description: 'Returns a not found message' })
  findOne(@Param('id') id: number): Promise<Policy> {
    return this.policiesService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Returns the newly created policy' })
  @ApiBadRequestResponse({ description: 'Returns a list of errors' })
  create(@Body() createDto: CreatePolicyDto): Promise<Policy> {
    return this.policiesService.create(createDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated policy' })
  @ApiNotFoundResponse({ description: 'Returns a not found message' })
  update(
    @Param('id') id: number,
    @Body() updateDto: UpdatePolicyDto,
  ): Promise<Policy> {
    return this.policiesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Status for Ok response' })
  @ApiNotFoundResponse({ description: 'Returns a not found message' })
  remove(@Param('id') id: number) {
    return this.policiesService.remove(id);
  }
}
