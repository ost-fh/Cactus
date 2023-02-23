import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from 'src/users/create-user.dto';
import User from 'src/users/user';
import UsersService from 'src/users/users.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }

    const passwordMatched = await this.passwordService.validatePassword(
      password,
      user.hashedPassword,
    );

    if (!passwordMatched) {
      return null;
    }

    return { id: user._id as any, username: user.username, email: user.email };
  }

  async getAccessToken(user: User) {
    const payload = { id: user.id, username: user.username, sub: user.id };
    return {
      ...payload,
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      user.password,
    );

    const result = await this.usersService.create({ ...user, hashedPassword });
    return {
      id: result._id as any,
      username: result.username,
      email: result.email,
    };
  }
}
