import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateLibraryVersionDto from './controllers/create-library-version.dto';
import CreateLibraryDto from './controllers/create-library.dto';
import Library, { LibraryDocument } from './models/library.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<LibraryDocument>,
  ) {}

  async findAll(): Promise<Library[]> {
    const libraries = await this.libraryModel.find().exec();

    /*
    const res = await Promise.all(
      libraries.map(async (library) => this.parseLib(library)),
    );*/
    return libraries;
  }

  /*
  private async parseLib(lib: LibraryDocument) {
    const jsonLib = lib.toJSON();
    const versions = await Promise.all(
      jsonLib.versions.map(async (version) => {
        const components = await Promise.all(
          version.components.map(async (c) => {
            return {
              ...c,
              component: await this.componentService.findOne(c.componentId),
            };
          }),
        );

        return { ...version, components };
      }),
    );

    return { ...jsonLib, versions };
  }
  */

  async findOne(id: string): Promise<LibraryDocument | null> {
    const lib = await this.libraryModel.findById(id).exec();

    if (!lib) {
      return null;
    }

    return lib; //this.parseLib(lib);
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
