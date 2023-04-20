import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LibraryService } from './libraries.service';
import { ComponentsModule } from 'src/components/components.module';
import Library, { LibrarySchema } from '../common/models/library.schema';
import { LibraryController } from './controllers/library.controller';

@Module({
  imports: [
    ComponentsModule,
    MongooseModule.forFeature([{ name: Library.name, schema: LibrarySchema }]),
  ],
  providers: [LibraryService],
  exports: [LibraryService],
  controllers: [LibraryController],
})
export class LibraryModule {}
