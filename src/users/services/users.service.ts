import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({
      where: { email },
      select: ['password', 'userId'],
    });
  }

  async findById(userId: number): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { userId },
    });
    if (!user) throw new NotFoundException(`User with ID: ${userId} not found`);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async validateEmail(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        `User with email: $${email} already exists`,
      );
    }
  }

  async create(createDto: CreateUserDto): Promise<User> {
    await this.validateEmail(createDto.email);
    const toBeSaved = this.usersRepo.create(createDto);
    const user = await this.usersRepo.save(toBeSaved);
    return plainToInstance(User, user);
  }
}
