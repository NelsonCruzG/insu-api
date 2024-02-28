import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { UserRole } from '../entities/users.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: `User's first name` })
  @Length(1, 15)
  readonly firstName: string;

  @ApiProperty({ description: `User's last name` })
  @Length(1, 15)
  readonly lastName: string;

  @ApiProperty({ description: `User's email` })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: `User's password` })
  @Length(8, 35)
  readonly password: string;

  @ApiProperty({ description: `User's company` })
  @Length(2, 40)
  readonly company: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive: boolean;

  @IsEnum(UserRole, {
    message: `userRole must be: [${Object.values(UserRole)}]`,
  })
  @IsOptional()
  readonly userRole: UserRole;
}
