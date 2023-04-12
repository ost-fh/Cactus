import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateLibraryVersionDto from './controllers/create-library-version.dto';
import CreateLibraryDto from './controllers/create-library.dto';
import Library, { LibraryDocument } from './models/library.schema';
import TestResult from './models/test-result.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>,
  ) {}

  async findAll(testResults = false): Promise<Library[]> {
    if (testResults) {
      return this.libraryModel
        .find()
        .populate([
          {
            path: 'versions.components.modes',
            populate: {
              path: 'tests',
              model: TestResult.name,
            },
          },
        ])
        .exec();
    }

    return this.libraryModel.find().exec();
  }

  async findOne(
    id: string,
    testResults = false,
  ): Promise<LibraryDocument | null> {
    let lib;
    if (testResults) {
      lib = await this.libraryModel
        .findById(id)
        .populate([
          {
            path: 'versions.components.modes',
            populate: {
              path: 'tests',
              model: TestResult.name,
            },
          },
        ])
        .exec();
    } else {
      lib = await this.libraryModel.findById(id).exec();
    }

    if (!lib) {
      return null;
    }

    return lib;
  }

  async create(dto: CreateLibraryDto): Promise<Library> {
    const createdLibrary = new this.libraryModel({
      title: dto.title,
      linkHome: dto.linkHome,
      linkDocs: dto.linkDocs,
      currentVersion: dto.currentVersion.name,
      versions: [{ version: dto.currentVersion.name, components: [] }],
    });
    return createdLibrary.save();
  }

  async createVersionInLibrary(
    id: string,
    dto: CreateLibraryVersionDto,
  ): Promise<Library | null> {
    const library = await this.findOne(id);

    if (!library) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (library.versions.find((item) => item.version === dto.name)) {
      throw new HttpException('Version already exists', HttpStatus.BAD_REQUEST);
    }

    const createdVersion = { version: dto.name, components: [] };

    const updatedLibrary = await this.libraryModel
      .findByIdAndUpdate(id, {
        $push: { versions: createdVersion },
        $set: { currentVersion: createdVersion.version },
      })
      .exec();

    return updatedLibrary;
  }
}
