import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { ScoringService } from './scoring.service';
import { LibraryModule } from 'src/libraries/libraries.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [LibraryModule, UsersModule],
  providers: [TestsService, ScoringService],
  controllers: [TestsController],
})
export class TestsModule {}
