import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import CreateTestDto from './create-test.dto';
import { TestsService } from './tests.service';
import TestResult from 'src/common/models/test-result.schema';
import CreateTestFeedbackDto from './create-test-feedback.dto';

@Controller('testlab')
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
  @Post('feedback')
  async createFeedback(
    @Req() req: any,
    @Body() createTestFeedbackDto: CreateTestFeedbackDto,
  ) {
    return this.testsService.createTestFeedback(
      createTestFeedbackDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAllOwn(@Req() req: any): Promise<TestResult[]> {
    return this.testsService.findAllOwn(req.user.userId);
  }
}
