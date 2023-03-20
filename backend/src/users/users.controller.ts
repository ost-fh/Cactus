import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import UsersService from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOwn(@Req() req: any) {
    const result = await this.usersService.findById(req.user.userId);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
