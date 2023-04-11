import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import CreateTestDto from './create-test.dto';
import { TestsService } from './tests.service';
import TestResult from 'src/libraries/models/test-result.schema';

@Controller('api/testlab')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() req: any, @Body() createTestDto: CreateTestDto) {
    return this.testsService.createOrUpdate(createTestDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAllOwn(@Req() req: any): Promise<TestResult[]> {
    return this.testsService.findAllOwn(req.user.userId);
  }
}
