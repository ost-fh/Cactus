import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getAccessToken(user: User) {
    const payload = { id: user.id, username: user.username, sub: user.id };
    return {
      ...payload,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }
}
