import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { ScoringService } from './scoring.service';
import { LibraryModule } from 'src/libraries/libraries.module';
import { UsersModule } from 'src/users/users.module';
import { ComponentsModule } from 'src/components/components.module';

@Module({
  imports: [LibraryModule, UsersModule, ComponentsModule],
  providers: [TestsService, ScoringService],
  controllers: [TestsController],
})
export class TestsModule {}
