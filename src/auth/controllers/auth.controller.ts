import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login-user.dto';
import { Public } from '../../../utils';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { loginSchema } from './auth.schemas';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody(loginSchema)
  signIn(@Body() { email, password }: LoginDto) {
    return this.authService.signIn(email, password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
