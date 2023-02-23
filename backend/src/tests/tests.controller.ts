import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import CreateTestDto from './create-test.dto';
import { TestsService } from './tests.service';

@Controller('api/testlab')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() req: any, @Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto, req.user.userId);
  }
}
