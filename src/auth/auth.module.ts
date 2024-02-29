import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from '../config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register(jwtOptions)],
  exports: [AuthService],
})
export class AuthModule {}
