import { Body, Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import CreateUserDto from '../users/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    return this.authService.getAccessToken(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() req: any) {
    return this.authService.getAccessToken(req.user);
  }
}
