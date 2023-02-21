import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LibraryService } from 'src/libraries/libraries.service';
import Library from '../models/library.schema';
import CreateLibraryVersionDto from './create-library-version.dto';
import CreateLibraryDto from './create-library.dto';

@Controller('api/libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  async findAll(): Promise<Library[]> {
    return this.libraryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.libraryService.findOne(id);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id')
  async createVersion(
    @Param('id') id: string,
    @Body() createVersionDto: CreateLibraryVersionDto,
  ) {
    return this.libraryService.createVersionInLibrary(id, createVersionDto);
  }
}
