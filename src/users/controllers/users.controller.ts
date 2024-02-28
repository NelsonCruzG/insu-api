import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'Lists all users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Returns the newly created user' })
  @ApiBadRequestResponse({ description: 'Returns a list of errors' })
  create(@Body() createDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the specified user by Id' })
  @ApiNotFoundResponse({ description: 'Returns a not found message' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }
}
