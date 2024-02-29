import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isCorrect = await compare(pass, user.password);
    if (!isCorrect) throw new UnauthorizedException();

    const fullUser = await this.usersService.findById(user.userId);
    const payload = { sub: user.userId, email: fullUser.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
