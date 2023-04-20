import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { ScoringService } from './scoring.service';
import { LibraryModule } from 'src/libraries/libraries.module';
import { UsersModule } from 'src/users/users.module';
import { ComponentsModule } from 'src/components/components.module';
import { MongooseModule } from '@nestjs/mongoose';
import TestResult, {
  TestResultSchema,
} from 'src/common/models/test-result.schema';
import TestFeedback, {
  TestFeedbackSchema,
} from 'src/common/models/test-feedback.schema';

@Module({
  imports: [
    LibraryModule,
    UsersModule,
    ComponentsModule,
    MongooseModule.forFeature([
      { name: TestResult.name, schema: TestResultSchema },
      { name: TestFeedback.name, schema: TestFeedbackSchema },
    ]),
  ],
  providers: [TestsService, ScoringService],
  controllers: [TestsController],
})
export class TestsModule {}
